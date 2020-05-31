<template>
  <div>
    <div class="btn-group my-1 mr-1">
      <a href="#" class="btn-flat rounded-full px-3 py-1 shadow-sm text-sm text-grey-70 flex items-center" @click.prevent="toggleOpen">
        Advanced
        <i class="icon icon-right" v-bind:class="{ 'icon-minus': isOpen, 'icon-plus': !isOpen }"></i>
      </a>
    </div>
    <div v-if="isOpen" class="card cartographer-field__advanced-panel">
      <div v-if="data.mode == 'mapbox'">
        <div class="mb-1">
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
            <radio-fieldtype
              :data.sync="data['map_styles']"
              :config="mapboxStylesRadioConfig"
              name="map_styles"
            ></radio-fieldtype>
          </div>
          <input type="text" class="w-full" v-model="data.map_styles">
        </div>
        <div class="mt-2 inline-checkboxes">
          <label class="block">Map controls</label>
          <small class="help-block">Set which UI controls show on this map</small>
          <checkboxes-fieldtype
            :data.sync="data['map_controls']"
            :config="mapboxControlsCheckboxConfig"
            name="map_controls"
          ></checkboxes-fieldtype>
        </div>
      </div>
      <div v-if="data.mode == 'google'">
        <div class="mb-1">
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
        <div class="mt-1 inline-checkboxes">
          <label class="block">Map controls</label>
          <small class="help-block">Set which UI controls show on this map</small>
          <checkboxes-fieldtype
            v-bind:value="data['map_controls']"
            :config="googleControlsCheckboxConfig"
            :name="controlsFieldname"
            v-on:input="data['map_controls'] = $event"
          ></checkboxes-fieldtype>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import googleControlsCheckboxConfig from "../config/google-controls-checkboxes";
import mapboxControlsCheckboxConfig from "../config/mapbox-controls-checkboxes";
import mapboxStylesRadioConfig from "../config/mapbox-styles-radio";

export default {
  props: ["data", "name"],

  data() {
    return {
      isOpen: false,
      googleControlsCheckboxConfig,
      mapboxControlsCheckboxConfig,
      mapboxStylesRadioConfig
    };
  },

  computed: {
    controlsFieldname() {
      return this.name + "_map_controls";
    }
  },

  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
