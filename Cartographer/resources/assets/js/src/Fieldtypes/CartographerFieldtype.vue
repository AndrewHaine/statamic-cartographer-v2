<template>
  <div>
    <component v-bind:is="mapsComponent" :data.sync="data"></component>
  </div>
</template>

<script>
import axios from "axios";

import Cartographer from "../Mixins/Cartographer";

export default {
  props: ["data", "config", "name"],

  mixins: [Fieldtype, Cartographer],

  data() {
    return {
      mapsComponent: "google"
    };
  },

  created() {
    let cartographerComponent;
    switch (this.config.mode) {
      case "mapbox":
        cartographerComponent = "mapbox";
        break;
      case "google":
      default:
        cartographerComponent = "google_maps";
        break;
    }
    this.mapsComponent = `cartographer-${cartographerComponent}-fieldtype`;
  }
};
</script>
