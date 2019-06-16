<template>
  <div>
    <div class="btn-group my-1 mr-1">
      <a href="#" class="btn btn-default" @click.prevent="toggleOpen">
        Advanced
        <i class="icon icon-plus icon-right"></i>
      </a>
    </div>
    <div v-if="isOpen" class="card cartographer-field__advanced-panel">
      <div v-if="data.mode == 'mapbox'">
        <label class="block">Custom styles</label>
        <small class="help-block">
          Choose from the predefined styles below or copy the link to your custom style set, you can create your own styles using the
          <a
            href="https://studio.mapbox.com/styles"
            target="_blank"
            rel="noopener"
          >styles studio</a>.
        </small>
        <div class="field-inner my-2">
          <radio-fieldtype :data.sync="data['map_styles']" :config="mapboxRadioConfig"></radio-fieldtype>
        </div>
        <input type="text" class="w-full" v-model="data.map_styles">
      </div>
      <div v-if="data.mode == 'google'">
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
    </div>
  </div>
</template>
<script>
import mapboxRadioConfig from "../config/mapbox-radio";

export default {
  props: ["data"],

  data() {
    return {
      isOpen: false,
      mapboxRadioConfig: mapboxRadioConfig
    };
  },

  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
