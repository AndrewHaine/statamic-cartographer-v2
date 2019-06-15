<template>
  <div>
    <a href="#" class="my-1 btn btn-default" @click.prevent="toggleOpen">
      Advanced
      <i class="icon icon-plus icon-right"></i>
    </a>
    <div v-if="isOpen" class="card cartographer-field__advanced-panel">
      <label class="block">Custom styles</label>
      <small v-if="data.mode = 'google'" class="help-block">
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
</template>
<script>
export default {
  props: ["data"],

  data() {
    return {
      isOpen: false
    };
  },

  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
