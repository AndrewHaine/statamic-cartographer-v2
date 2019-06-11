<template>
  <section class="cartographer-field">
    <div class="cartographer-field__controls flex justify-between items-center">
      <div class="cartograpger-field__marker-controls">
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
        <div class="btn-group my-1 mr-2">
          <a href="#" class="btn btn-default" @click.prevent="addMarker">
            Marker
            <i class="icon icon-plus icon-right"></i>
          </a>
        </div>
        <div v-if="selectedMarker" class="btn-group my-1 mr-2">
          <a href="#" class="btn btn-danger" @click.prevent="removeMarker(selectedMarker)">
            Remove Marker
            <i class="icon icon-trash icon-right"></i>
          </a>
        </div>
      </div>
      <div v-if="searchEnabled" class="controls flex items-center lg:w-auto">
        <input
          v-on:keyup.13="requestLocation"
          type="text"
          class="filter-control search w-full"
          placeholder="Search for a location"
          :disabled="isBusy"
        >
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
      apiKey: "",
      busy: false,
      center: {},
      dirtyCenter: false,
      dirtyZoom: false,
      map: null,
      map_type_id: "roadmap",
      markers: [],
      markerObjects: [],
      searchEnabled: false,
      selectedMarker: null,
      zoomLevel: 10
    };
  },

  computed: {
    isBusy() {
      return this.busy;
    }
  },

  attached() {
    this.apiKey = this.data.api_key;
    if (typeof google === "undefined" || !this.apiKey) return;

    this.searchEnabled = this.data.search_enabled;
    this.center = this.data.center || this.center;
    this.map_type_id = this.data.map_type_id || this.map_type_id;
    this.markers = this.data.markers || this.markers;
    this.zoomLevel = this.data.zoom_level || this.zoomLevel;

    const mapEl = this.$els.mapContainer;

    this.map = new google.maps.Map(mapEl, {
      center: this.center,
      fullscreenControl: false,
      mapTypeId: this.map_type_id,
      streetViewControl: false,
      zoom: this.zoomLevel
    });

    this.map.addListener("maptypeid_changed", this.handleMapTypeChange);

    this.map.addListener("dragend", () => (this.dirtyCenter = true));
    this.map.addListener("zoom_changed", () => {
      this.dirtyZoom = false;
      this.zoomLevel = this.map.getZoom();
    });

    this.centerMarker = new google.maps.Marker({
      draggable: true,
      map: this.map,
      position: this.center,
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

    this.markers && this.markers.length && this.populateMarkers(this.markers);
  },

  methods: {
    getReplicatorPreviewText() {
      const { lat, lng } = this.data.center;
      return `Center: Lat: ${lat}, Lng: ${lng}`;
    },

    addMarker(isNew = true, markerData = null) {
      if (isNew) {
        markerData = {
          id: uuid(),
          label: this.markers.length + 1,
          position: this.map.getCenter().toJSON()
        };
      }

      const { id, label, position } = markerData;
      if (isNew) this.markers.push({ id, position });

      const newMarker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        draggable: true,
        map: this.map,
        position: position,
        id,
        label: label.toString()
      });

      ["drag", "dragend"].forEach(eventType => {
        newMarker.addListener(eventType, event =>
          this.handleMarkerDragged(event, id)
        );
      });

      newMarker.addListener("click", () => this.toggleSelectedMarker(id));

      this.markerObjects.push(newMarker);
    },

    updateMarker(markerId, data, remove = false) {
      const markers = this.markers;
      const markerIndex = markers.findIndex(marker => marker.id === markerId);

      if (markerIndex < 0) return false;

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

    removeMarker(markerId) {
      this.selectedMarker = null;
      this.updateMarker(markerId, null, true);
      const markerObject = this.markerObjects.filter(
        markerObject => markerObject.id === markerId
      )[0];
      markerObject.setMap(null);
    },

    toggleSelectedMarker(markerId) {
      this.selectedMarker = this.selectedMarker === markerId ? null : markerId;
      this.markerObjects.forEach(markerObject => {
        if (markerObject.id === this.selectedMarker) {
          markerObject.setAnimation(google.maps.Animation.BOUNCE);
        } else {
          markerObject.setAnimation(null);
        }
      });
    },

    populateMarkers(markers) {
      markers.forEach((marker, i) => {
        this.addMarker(false, { ...marker, label: i + 1 });
      });
    },

    handleMapTypeChange() {
      this.data = {
        ...this.data,
        map_type_id: this.map.getMapTypeId()
      };
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
      this.data.zoom_level = this.zoomLevel;
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
