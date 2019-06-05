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
export default {
  mixins: [Fieldtype],

  props: ["data", "config", "name"],

  attached() {
    if (typeof google === "undefined") return;

    const mapEl = this.$els.mapContainer;
    const defaultCoords = {
      lat: this.data.center.lat || 52.6318051,
      lng: this.data.center.lng || 1.296734
    };
    const map = new google.maps.Map(this.$els.mapContainer, {
      center: defaultCoords,
      fullscreenControl: false,
      mapTypeId: this.data.map_type_id || "roadmap",
      streetViewControl: false,
      zoom: 3
    });

    map.addListener("maptypeid_changed", () => this.handleMapTypeChange(map));

    const centerMarker = new google.maps.Marker({
      draggable: true,
      map: map,
      position: defaultCoords
    });

    ["drag", "dragend"].forEach(eventType => {
      centerMarker.addListener(eventType, event =>
        this.handleMarkerDragged(event, "center", true)
      );
    });
  },

  methods: {
    handleMapTypeChange(map) {
      this.data = {
        ...this.data,
        map_type_id: map.getMapTypeId()
      };
    },
    handleMarkerDragged(event, markerId, isCenter = false) {
      const [lat, lng] = [event.latLng.lat(), event.latLng.lng()];
      if (isCenter) {
        this.data = {
          ...this.data,
          center: { lat, lng }
        };
      }
    }
  }
};
</script>
