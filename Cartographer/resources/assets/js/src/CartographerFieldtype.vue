<template>
  <section class="cartographer-field">
    <div class="btn-group my-1 mr-2">
      <a href="#" class="btn btn-default" @click.prevent="addMarker">
        Marker
        <i class="icon icon-plus icon-right"></i>
      </a>
    </div>
    <div class="cartographer-field__map" v-el:map-container></div>
  </section>
</template>

<script>
import uuid from "uuid/v4";

export default {
  mixins: [Fieldtype],

  props: ["data", "config", "name"],

  data() {
    return {
      center: {},
      map: null,
      map_type_id: "roadmap",
      markers: [],
      selectedMarker: null
    };
  },

  attached() {
    if (typeof google === "undefined") return;

    const mapEl = this.$els.mapContainer;

    this.center = (this.data && this.data.center) || {
      lat: 52.6318051,
      lng: 1.296734
    };
    this.map_type_id = (this.data && this.data.map_typ_id) || "roadmap";
    this.markers = (this.data && this.data.markers) || [];

    this.map = new google.maps.Map(mapEl, {
      center: this.center,
      fullscreenControl: false,
      mapTypeId: this.map_type_id,
      streetViewControl: false,
      zoom: 3
    });

    this.map.addListener("maptypeid_changed", this.handleMapTypeChange);

    const centerMarker = new google.maps.Marker({
      draggable: true,
      map: this.map,
      position: this.center,
      label: "C"
    });

    ["drag", "dragend"].forEach(eventType => {
      centerMarker.addListener(eventType, event =>
        this.handleMarkerDragged(event, "center", true)
      );
    });

    this.markers.length && this.populateMarkers(this.markers);
  },

  methods: {
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

    updateMarker(markerId, data) {
      const markers = this.markers;
      const markerIndex = markers.findIndex(marker => marker.id === markerId);

      if (markerIndex < 0) return false;

      markers[markerIndex] = {
        ...markers[markerIndex],
        ...data
      };
      this.data = {
        ...this.data,
        markers
      };
    }
  }
};
</script>
