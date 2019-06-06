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
      map: null
    };
  },

  attached() {
    if (typeof google === "undefined") return;

    const mapEl = this.$els.mapContainer;

    const center = {
      lat: this.data.center.lat || 52.6318051,
      lng: this.data.center.lng || 1.296734
    };

    this.map = new google.maps.Map(mapEl, {
      center: center,
      fullscreenControl: false,
      mapTypeId: this.data.map_type_id || "roadmap",
      streetViewControl: false,
      zoom: 3
    });

    this.map.addListener("maptypeid_changed", this.handleMapTypeChange);

    const centerMarker = new google.maps.Marker({
      draggable: true,
      map: this.map,
      position: center,
      label: "C"
    });

    ["drag", "dragend"].forEach(eventType => {
      centerMarker.addListener(eventType, event =>
        this.handleMarkerDragged(event, "center", true)
      );
    });

    this.data.markers = this.data.markers || [];
    this.data.markers.length && this.populateMarkers(this.data.markers);
  },

  methods: {
    addMarker() {
      const id = uuid();

      const newMarker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        draggable: true,
        map: this.map,
        position: this.map.getCenter(),
        id
      });

      this.data.markers.push({
        id,
        position: this.map.getCenter().toJSON()
      });

      ["drag", "dragend"].forEach(eventType => {
        newMarker.addListener(eventType, event =>
          this.handleMarkerDragged(event, id)
        );
      });
    },

    populateMarkers(markers) {
      markers.forEach((marker, i) => {
        i++;
        const markerObj = new google.maps.Marker({
          draggable: true,
          map: this.map,
          position: marker.position,
          id: marker.id,
          label: i.toString()
        });

        ["drag", "dragend"].forEach(eventType => {
          markerObj.addListener(eventType, event =>
            this.handleMarkerDragged(event, markerObj.id)
          );
        });
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
      const markers = this.data.markers;
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
