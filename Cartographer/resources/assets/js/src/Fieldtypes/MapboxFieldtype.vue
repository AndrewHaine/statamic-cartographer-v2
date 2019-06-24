<template>
  <div>
    <section class="cartographer-field" v-if="hasKey">
      <cartographer-control-panel
        :busy="busy"
        :center="center"
        :data.sync="data"
        :dirty-center.sync="dirtyCenter"
        :dirty-zoom.sync="dirtyZoom"
        :zoom-level="zoomLevel"
        @add-marker="addMarker"
        @request-geocoder="requestGeocodedLocation"
        @set-center="setCenter"
      ></cartographer-control-panel>
      <div class="cartographer-field__map" v-el:map-container></div>
      <cartographer-advanced-box :data.sync="data" :name="name"></cartographer-advanced-box>
      <cartographer-mapbox-markers
        v-if="data.markers.length"
        :data.sync="data"
        :get-marker-index="getMarkerIndex"
        :marker-objects="markerObjects"
        @marker-color-changed="updateMarkerColor"
        @marker-icon-changed="updateMarkerIcon"
        @marker-position-changed="updateMarkerPosition"
        @remove-marker="removeMarker"
      ></cartographer-mapbox-markers>
    </section>
    <small v-else class="help-block my-1">
      <p>
        Please enter your Mapbox access token in the
        <a
          href="/admin/addons/cartographer/settings"
        >addon settings</a>.
      </p>
    </small>
  </div>
</template>

<script>
import axios from "axios";

import Cartographer from "../Mixins/Cartographer";

export default {
  props: ["data", "config", "name"],

  mixins: [Cartographer],

  created() {
    this.hasKey = !!this.data.access_token;
  },

  data() {
    return {
      fullscreenControl: new mapboxgl.FullscreenControl(),
      navigationControl: new mapboxgl.NavigationControl(),
      scaleControl: new mapboxgl.ScaleControl()
    };
  },

  watch: {
    "data.map_styles": function(val) {
      this.setMapStyles(val);
    },

    "data.map_controls": function(val) {
      this.setMapControls(val);
    }
  },

  methods: {
    addMarker(isNew = true, markerData = null) {
      if (isNew) {
        markerData = this.generateNewMarker("mapbox");
      }

      if (isNew) this.data.markers.push(markerData);

      const { id, position, color, icon } = markerData;
      const { lat, lng } = position;

      const markerOptions = {
        color,
        draggable: true
      };

      if (icon) {
        const iconEl = document.createElement("div");
        iconEl.classList.add("cartographer-mapbox-marker");
        iconEl.style.backgroundImage = `url('${icon}')`;
        markerOptions["element"] = iconEl;
      }

      const newMarker = new mapboxgl.Marker(markerOptions);

      newMarker.id = id;
      newMarker.setLngLat([lng, lat]).addTo(this.map);

      ["drag", "dragend"].forEach(eventType => {
        newMarker.on(eventType, () => {
          this.handleMarkerDragged(id);
        });
      });

      this.markerObjects.push(newMarker);
    },

    addCenterMarker() {
      this.centerMarker = new mapboxgl.Marker({
        draggable: true,
        color: "#FFEE00"
      });

      const { lat, lng } = this.data.center;

      this.centerMarker.setLngLat([lng, lat]).addTo(this.map);

      ["drag", "dragend"].forEach(eventType => {
        this.centerMarker.on(eventType, () => {
          this.dirtyCenter = false;
          this.handleMarkerDragged("center", true);
        });
      });
    },

    handleMarkerDragged(markerId, isCenter = false) {
      if (isCenter) {
        const { lat, lng } = this.centerMarker.getLngLat();
        this.data = {
          ...this.data,
          center: { lat, lng }
        };
      } else {
        const { lat, lng } = this.getMarkerById(markerId).getLngLat();
        this.updateMarker(markerId, { position: { lat, lng } });
      }
    },

    initMap() {
      this.center = this.data.center;

      mapboxgl.accessToken = this.data.access_token;
      const { lng, lat } = this.data.center;
      this.map = new mapboxgl.Map({
        container: this.$els.mapContainer,
        style: this.data.map_styles,
        center: [lng, lat],
        zoom: this.data.zoom_level
      });

      this.data.map_controls.forEach(control => {
        if (this[control]) {
          this.map.addControl(this[control]);
        }
      });

      this.map.on("zoomend", e => {
        this.dirtyZoom = true;
        this.zoomLevel = Math.round(this.map.getZoom() * 100) / 100;
      });

      this.map.on("dragend", () => {
        this.dirtyCenter = true;
        const { lat, lng } = this.map.getCenter();
        this.center = { lat, lng };
      });

      mapboxgl.Marker.prototype.id = "";
    },

    removeMarkerObjectFromMap(markerObject) {
      markerObject.remove();
    },

    requestGeocodedLocation(query) {
      this.busy = true;

      const encodedQuery = encodeURI(query);
      const endpointURI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?limit=1&&access_token=${
        this.data.access_token
      }`;

      axios
        .get(endpointURI)
        .then(response => {
          const result = response.data.features[0];
          const [lng, lat] = result.center;
          this.center = { lng, lat };
          this.dirtyCenter = true;

          setTimeout(() => {
            this.map.flyTo({
              center: [lng, lat],
              zoom: 13
            });
          }, 200);
        })
        .catch(e => console.error(e))
        .finally(() => {
          this.busy = false;
        });
    },

    setCenter() {
      const { lat, lng } = this.center;
      this.centerMarker.setLngLat([lng, lat]);
    },

    setMapControls(data) {
      // Currently no way to remove existing controls from the map - calling removeControl() errors
      // if an instance isn't on the map nad there is no way to 'get' the current controls
      // https://github.com/mapbox/mapbox-gl-js/issues/7682
      return;
    },

    setMapStyles(styles) {
      this.map.setStyle(styles, { diff: false });
    },

    setMode() {
      this.data.mode = "mapbox";
    },

    updateMarkerColor(markerId, color) {
      const markerIndex = this.getMarkerIndex(markerId);
      this.data.markers[markerIndex].color = color;
    },

    updateMarkerIcon(markerId, icon) {
      const markerIndex = this.getMarkerIndex(markerId);
      this.data.markers[markerIndex].icon = icon;
    },

    updateMarkerPosition(markerId, lngLat) {
      const marker = this.getMarkerById(markerId);
      marker.setLngLat(lngLat);
    }
  }
};
</script>
<style>
.cartographer-mapbox-marker {
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  width: 45px;
  height: 45px;
  cursor: pointer;
}
</style>
