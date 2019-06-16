<template>
  <div v-if="isOpen" class="my-2 card cartographer-field__marker-edit-box">
    <label class="block uppercase">Edit marker</label>
    <div v-if="data.mode == 'google'" class="w-full my-1">
      <div class="field-inner">
        <label class="block">Icon</label>
        <div class="help-block">Paste the url of the marker icon image</div>
        <input
          @change="setAttribute($event, 'icon')"
          :value="data.markers[markerIndex].icon"
          type="text"
          class="form-control type-text"
        >
      </div>
    </div>
    <div v-if="data.mode == 'google'" class="w-1/4 my-1">
      <div class="field-inner">
        <label class="block">Label</label>
        <div class="help-block">Set a marker label</div>
        <input
          @input="setAttribute($event, 'label')"
          :value="data.markers[markerIndex].label"
          type="text"
          class="form-control type-text"
        >
      </div>
    </div>
    <div v-if="data.mode == 'mapbox'" class="w-1/4 my-1">
      <div class="field-inner">
        <label class="block">Color</label>
        <div class="help-block">Set the marker color. e.g. `#ffee00`.</div>
        <input
          @input="setAttribute($event, 'label')"
          :value="data.markers[markerIndex].color"
          type="text"
          class="form-control type-text"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "isOpen", "markerIndex"],

  methods: {
    setAttribute(e, attr) {
      const val = e.target.value;
      this.data.markers[this.markerIndex][attr] = val;
      this.$emit("marker-attribute-changed", attr, val);
    }
  }
};
</script>
