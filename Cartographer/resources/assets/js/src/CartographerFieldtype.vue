<template>
  <section class="cartographer-field">
    <div class="cartographer-field__controls flex justify-between items-center">
      <div class="cartograher-field__marker-controls">
        <div v-if="dirtyCenter || dirtyZoom" class="btn-group my-1 mr-1">
          <a
            v-if="dirtyCenter"
            href="#"
            class="btn btn-primary"
            @click.prevent="setCenter"
          >Set center</a>
          <a
            v-if="dirtyZoom"
            href="#"
            class="btn btn-primary"
            @click.prevent="setZoomLevel"
          >Set zoom level ({{ zoomLevel }})</a>
        </div>
        <div v-if="!selectedMarker" class="btn-group my-1 mr-2">
          <a href="#" class="btn btn-default" @click.prevent="addMarker">
            Marker
            <i class="icon icon-plus icon-right"></i>
          </a>
        </div>
        <div v-if="selectedMarker" class="btn-group my-1 mr-2">
          <a href="#" class="btn btn-white" @click.prevent="toggleMarkerEditBox">
            <i class="icon icon-pencil icon-left"></i>
            Edit
          </a>
          <a href="#" class="btn btn-danger" @click.prevent="removeMarker(selectedMarker)">Remove</a>
        </div>
      </div>
      <div v-if="data.searchEnabled" class="controls flex items-center lg:w-auto">
        <input
          v-on:keyup.13="requestLocation"
          type="text"
          class="filter-control search w-full"
          placeholder="Search for a location"
          :disabled="busy"
        >
      </div>
    </div>
    <div
      v-if="selectedMarker && markerEditBoxToggled"
      class="my-2 card cartographer-field__marker-edit-box"
    >
      <label class="block uppercase">Edit marker</label>
      <div class="w-full my-1">
        <div class="field-inner">
          <label class="block">Icon</label>
          <div class="help-block">Paste the url of the marker icon image</div>
          <input
            @change="setMarkerIcon"
            :value="data.markers[seletedMarkerIndex].icon"
            type="text"
            class="form-control type-text"
          >
        </div>
      </div>
      <div class="w-1/4 my-1">
        <div class="field-inner">
          <label class="block">Label</label>
          <div class="help-block">Set a marker label</div>
          <input
            @input="setMarkerLabel"
            :value="data.markers[selectedMarkerIndex].label"
            type="text"
            class="form-control type-text"
          >
        </div>
      </div>
    </div>
    <div class="cartographer-field__map" v-el:map-container>
      <div>
        <small v-if="!apiKey" class="help-block my-1 ml-2">
          <p>
            Please enter your Google Maps API key in the
            <a
              href="/admin/addons/cartographer/settings"
            >addon settings</a>.
          </p>
        </small>
      </div>
    </div>
    <a href="#" class="my-1 btn btn-default" @click.prevent="toggleAdvancedBox">
      Styles
      <i class="icon icon-plus icon-right"></i>
    </a>
    <div v-if="advancedBoxToggled" class="card cartographer-field__advanced-panel">
      <label class="block">Custom styles</label>
      <small class="help-block">
        These can be generated using
        <a
          href="https://snazzymaps.com/"
          target="_blank"
          rel="noopener"
        >SnazzyMaps</a>.
      </small>
      <textarea
        v-model="data.map_styles"
        placeholder="Paste custom styles here."
        class="w-full"
        rows="10"
      ></textarea>
    </div>
  </section>
</template>

<script>
import uuid from "uuid/v4";
import axios from "axios";

export default {
  mixins: [Fieldtype],

  props: ["data", "config", "name"],

  data() {
    return {
      advancedBoxToggled: false,
      apiKey: "",
      busy: false,
      dirtyCenter: false,
      dirtyZoom: false,
      map: null,
      markerEditBoxToggled: false,
      markerObjects: [],
      selectedMarker: null,
      zoomLevel: this.data.zoom_level
    };
  },

  computed: {
    computedMarkers: function() {
      return JSON.parse(JSON.stringify(this.data.markers));
    }
  },

  watch: {
    "data.map_styles": function(val) {
      this.setMapStyles(val);
    }
  },

  attached() {
    this.apiKey = this.data.api_key;
    if (typeof google === "undefined" || !this.apiKey) return;

    const mapEl = this.$els.mapContainer;

    this.map = new google.maps.Map(mapEl, {
      center: this.data.center,
      fullscreenControl: false,
      mapTypeId: this.data.map_type_id,
      streetViewControl: false,
      styles: this.data.map_styles ? JSON.parse(this.data.map_styles) : [],
      zoom: this.data.zoom_level
    });

    this.map.addListener("maptypeid_changed", () => {
      this.data.map_type_id = this.map.getMapTypeId();
    });

    this.map.addListener("dragend", () => (this.dirtyCenter = true));
    this.map.addListener("zoom_changed", () => {
      this.zoomLevel = this.map.getZoom();
      this.dirtyZoom = true;
    });

    this.centerMarker = new google.maps.Marker({
      draggable: true,
      map: this.map,
      position: this.data.center,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        strokeColor: "red"
      }
    });

    ["drag", "dragend"].forEach(eventType => {
      this.centerMarker.addListener(eventType, event => {
        this.dirtyCenter = false;
        this.handleMarkerDragged(event, "center", true);
      });
    });

    this.populateMarkers(this.data.markers);
  },

  methods: {
    getReplicatorPreviewText() {
      const { lat, lng } = this.data.center;
      return `Center: Lat: ${lat}, Lng: ${lng}`;
    },

    toggleAdvancedBox() {
      this.advancedBoxToggled = !this.advancedBoxToggled;
    },

    toggleMarkerEditBox() {
      this.markerEditBoxToggled = !this.markerEditBoxToggled;
    },

    addMarker(isNew = true, markerData = null) {
      if (isNew) {
        markerData = {
          id: uuid(),
          position: this.map.getCenter().toJSON(),
          icon: null,
          label: null
        };
      }

      if (isNew) this.data.markers.push(markerData);

      const { id, label, position, icon } = markerData;

      const newMarker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        draggable: true,
        map: this.map,
        position: position,
        icon,
        id,
        label
      });

      ["drag", "dragend"].forEach(eventType => {
        newMarker.addListener(eventType, event =>
          this.handleMarkerDragged(event, id)
        );
      });

      newMarker.addListener("click", () => this.toggleSelectedMarker(id));

      this.markerObjects.push(newMarker);
    },

    getMarkerIndex(id) {
      const markerIndex = this.data.markers.findIndex(
        marker => marker.id === id
      );
      return markerIndex >= 0 ? markerIndex : null;
    },

    updateMarker(markerId, data, remove = false) {
      const markerIndex = this.getMarkerIndex(markerId);
      const markers = this.data.markers;

      markers[markerIndex] = {
        ...markers[markerIndex],
        ...data
      };

      if (remove) markers.splice(markerIndex, 1);

      this.data = {
        ...this.data,
        markers
      };
    },

    getMarkerById(markerId) {
      return this.markerObjects.filter(
        markerObject => markerObject.id === markerId
      )[0];
    },

    setMarkerIcon(e) {
      const val = e.target.value;
      this.data.markers[this.selectedMarkerIndex].icon = e.target.value;
      this.setMarkerAttribute("icon", val);
    },

    setMarkerLabel(e) {
      const val = e.target.value;
      this.data.markers[this.selectedMarkerIndex].label = e.target.value;
      this.setMarkerAttribute("label", val);
    },

    setMarkerAttribute(attr, val) {
      const marker = this.getMarkerById(this.selectedMarker);
      switch (attr) {
        case "icon":
          marker.setIcon(val);
          break;
        case "label":
          marker.setLabel(val ? String(val) : "");
          break;
        default:
          break;
      }
    },

    removeMarker(markerId) {
      this.selectedMarker = null;
      this.updateMarker(markerId, null, true);
      const markerObject = this.getMarkerById(markerId);
      markerObject.setMap(null);
    },

    toggleSelectedMarker(markerId) {
      this.selectedMarker = this.selectedMarker === markerId ? null : markerId;
      this.selectedMarkerIndex = this.getMarkerIndex(markerId);
      this.markerObjects.forEach(markerObject => {
        if (markerObject.id === this.selectedMarker) {
          markerObject.setAnimation(google.maps.Animation.BOUNCE);
        } else {
          this.markerEditBoxToggled = false;
          markerObject.setAnimation(null);
        }
      });
    },

    populateMarkers(markers) {
      markers.forEach(marker => this.addMarker(false, marker));
    },

    handleMarkerDragged(event, markerId, isCenter = false) {
      const [lat, lng] = [event.latLng.lat(), event.latLng.lng()];
      if (isCenter) {
        this.data = {
          ...this.data,
          center: { lat, lng }
        };
      } else {
        this.updateMarker(markerId, { position: { lat, lng } });
      }
    },

    setCenter() {
      this.dirtyCenter = false;
      this.centerMarker.setPosition(this.map.getCenter());
      this.data.center = this.map.getCenter().toJSON();
    },

    setZoomLevel() {
      this.dirtyZoom = false;
      this.data.zoom_level = this.map.getZoom();
    },

    setMapStyles(stylesRaw) {
      if (!stylesRaw) return this.map.setOptions({ styles: [] });
      try {
        const styles = JSON.parse(stylesRaw);
        this.map.setOptions({ styles });
      } catch (e) {
        return swal({
          type: "error",
          title: "Could not parse styles",
          text: e,
          confirmButtonText: "OK",
          showCancelButton: false
        });
      }
    },

    requestLocation(e) {
      this.busy = true;

      const query = encodeURI(e.target.value);
      const endpointURI = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${
        this.apiKey
      }`;

      axios
        .get(endpointURI)
        .then(response => {
          if (response.data.status !== "OK") {
            return swal({
              type: "error",
              title: "Location Search Failed",
              text: response.data.error_message || response.data.status,
              confirmButtonText: "OK",
              showCancelButton: false
            });
          }
          const result = response.data.results[0];
          const { lat, lng } = result.geometry.location;
          const center = new google.maps.LatLng(lat, lng);
          this.map.panTo(center);
          this.map.setZoom(14);
          this.dirtyCenter = true;
        })
        .catch(e => console.error(e))
        .finally(() => {
          this.busy = false;
        });
    }
  }
};
</script>
