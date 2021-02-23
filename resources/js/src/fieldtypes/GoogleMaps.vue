<template>
  <div>
    <section class="cartographer-field" v-if="hasKey">
      <cartographer-control-panel
        :busy="busy"
        :center="center"
        :data.sync="data"
        :dirty-center.sync="dirtyCenter"
        :dirty-zoom.sync="dirtyZoom"
        :selected-marker="selectedMarker"
        :selected-marker-index="selectedMarkerIndex"
        :zoom-level="zoomLevel"
        @add-marker="addMarker"
        @marker-attribute-changed="setMarkerAttribute"
        @remove-marker="removeMarker"
        @request-geocoder="requestGeocodedLocation"
        @set-center="setCenter"
      ></cartographer-control-panel>
      <div class="cartographer-field__map" ref="mapContainer"></div>
      <cartographer-advanced-box
        :data.sync="data"
        :name="name"
        @map-controls-changed="setMapControls"
    ></cartographer-advanced-box>
    </section>
    <small v-else class="help-block my-1">
      <p>
        Please enter your Google Maps API key in the Cartographer config.
      </p>
    </small>
  </div>
</template>

<script>
import axios from "axios";

import Cartographer from "../mixins/Cartographer";

// Components
import AdvancedBox from '../components/advanced-box.vue';
import ControlPanel from '../components/control-panel.vue';

export default {
  props: ["data", "meta", "config", "name"],

  components: {
    'cartographer-advanced-box': AdvancedBox,
    'cartographer-control-panel': ControlPanel
  },

  mixins: [Cartographer],

  created() {
    this.hasKey = !!this.meta.google_api_key;
  },

  watch: {
    "data.map_styles": function(val) {
      this.setMapStyles(val);
    }
  },

  methods: {
    addMarker(isNew = true, markerData = null) {
      if (isNew) {
        markerData = this.generateNewMarker();
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

    addCenterMarker() {
      this.centerMarker = new google.maps.Marker({
        draggable: true,
        map: this.map,
        position: this.map.getCenter(),
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
    },

    handleMarkerDragged(event, markerId, isCenter = false) {
      const [lat, lng] = [event.latLng.lat(), event.latLng.lng()];
      if (isCenter) {
        this.data.center = { lat, lng };
      } else {
        this.updateMarker(markerId, { position: { lat, lng } });
      }
    },

    initMap() {
      const mapOptions = {
        center: new google.maps.LatLng(this.data.center),
        disableDefaultUI: true,
        mapTypeId: this.data.map_type_id,
        zoom: this.data.zoom_level
      };

      this.data.map_controls.forEach(control => (mapOptions[control] = true));

      this.map = new google.maps.Map(this.$refs.mapContainer, mapOptions);

      if (this.data.map_styles) {
        try {
          const styles = JSON.parse(this.data.map_styles);
          this.setMapStyles(styles);
        } catch (e) {
          console.error(`Failed to set initial styles: ${e}`);
        }
      }

      this.center = this.map.getCenter().toJSON();

      this.map.addListener("maptypeid_changed", () => {
        this.data.map_type_id = this.map.getMapTypeId();
      });

      this.map.addListener("dragend", () => {
        this.dirtyCenter = true;
        this.center = this.map.getCenter().toJSON();
      });
      this.map.addListener("zoom_changed", () => {
        this.zoomLevel = this.map.getZoom();
        this.dirtyZoom = true;
      });
    },

    removeMarkerObjectFromMap(markerObject) {
      markerObject.setMap(null);
    },

    requestGeocodedLocation(query) {
      this.busy = true;

      const encodedQuery = encodeURI(query);
      const endpointURI = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedQuery}&key=${
        this.data.api_key
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
          this.center = { lat, lng };
          this.map.panTo(this.center);
          this.map.setZoom(14);
          this.dirtyCenter = true;
        })
        .catch(e => console.error(e))
        .finally(() => {
          this.busy = false;
        });
    },

    setCenter() {
      this.centerMarker.setPosition(this.map.getCenter());
      this.data.center = this.map.getCenter();
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

    setMapControls(newValue) {
      let controls = {
        fullscreenControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: false
      };
      newValue.forEach(control => (controls[control] = true));
      this.map.setOptions(controls);
      this.data.map_controls = newValue;
    },

    setMapStyles(stylesRaw) {
      if (!stylesRaw) return this.map.setOptions({ styles: [] });
      try {
        const styles = JSON.parse(stylesRaw);
        this.map.setOptions({ styles });
      } catch (e) {
        console.error(`Failed to parse map styles: ${e}`);
      }
    },

    setMode() {
      this.data.mode = "google";
    },

    toggleSelectedMarker(markerId) {
      this.selectedMarker = this.selectedMarker === markerId ? null : markerId;
      this.selectedMarkerIndex = this.getMarkerIndex(this.selectedMarker);
      this.markerObjects.forEach(markerObject => {
        if (markerObject.id === this.selectedMarker) {
          markerObject.setAnimation(google.maps.Animation.BOUNCE);
        } else {
          markerObject.setAnimation(null);
        }
      });
    }
  }
};
</script>
