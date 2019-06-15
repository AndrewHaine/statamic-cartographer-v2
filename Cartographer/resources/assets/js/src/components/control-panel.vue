<template>
  <div>
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
          <a href="#" class="btn btn-white" @click.prevent="toggleMarkerEditorOpen">
            <i class="icon icon-pencil icon-left"></i>
            Edit
          </a>
          <a href="#" class="btn btn-danger" @click.prevent="removeMarker">Remove</a>
        </div>
      </div>
      <div v-if="data.search_enabled" class="controls flex items-center lg:w-auto">
        <div v-if="busy" class="loading loading-basic">
          <span class="icon icon-circular-graph animation-spin"></span>
        </div>
        <input
          type="text"
          class="filter-control search w-full"
          placeholder="Search for a location"
          :disabled="busy"
          @keyup.13="requestGeocoder"
        >
      </div>
    </div>
    <cartographer-marker-editor
      :data.sync="data"
      :is-open="markerEditorOpen"
      :marker-index="selectedMarkerIndex"
      @marker-attribute-changed="markerAttributeChanged"
      v-if="selectedMarkerIndex >= 0"
    ></cartographer-marker-editor>
  </div>
</template>
<script>
export default {
  props: [
    "busy",
    "center",
    "data",
    "dirtyCenter",
    "dirtyZoom",
    "selectedMarker",
    "selectedMarkerIndex",
    "zoomLevel"
  ],

  data() {
    return {
      markerEditorOpen: false
    };
  },

  methods: {
    addMarker() {
      this.$emit("add-marker");
    },

    markerAttributeChanged(attr, val) {
      this.$emit("marker-attribute-changed", attr, val);
    },

    removeMarker() {
      this.$emit("remove-marker", this.selectedMarker);
    },

    requestGeocoder(e) {
      this.$emit("request-geocoder", e.target.value);
    },

    setCenter() {
      this.$emit("set-center");
      this.dirtyCenter = false;
      this.data.center = this.center;
    },

    setZoomLevel() {
      this.$emit("set-zoom-level");
      this.dirtyZoom = false;
      this.data.zoom_level = this.zoomLevel;
    },

    toggleMarkerEditorOpen() {
      if (this.selectedMarkerIndex < 0) {
        return (this.markerEditorOpen = false);
      }
      this.markerEditorOpen = !this.markerEditorOpen;
    }
  }
};
</script>
