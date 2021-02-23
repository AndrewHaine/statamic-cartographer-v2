<template>
  <div>
    <component
        v-bind:is="mapsComponent"
        :name="name"
        :value="value"
        :data="data"
        :meta="meta"
        v-on:update:data="data = $event"
    >
    </component>
  </div>
</template>

<script>
import GoogleMapsFieldtype from './GoogleMaps';
import MapboxFieldtype from './Mapbox';

export default {
  props: ["name", "value", "meta"],

  components: {
    'cartographer-google_maps-fieldtype': GoogleMapsFieldtype,
    'cartographer-mapbox-fieldtype': MapboxFieldtype
  },

  mixins: [Fieldtype],
  data() {
    return {
      mapsComponent: "",
      data: {
        mode: 'google',
        center: this.meta.default_center,
        zoom_level: 4,
        markers: [],
        map_controls: [],
        ...this.value
      }
    };
  },
  created() {
    let cartographerComponent;
    switch (this.meta.mode) {
      case "mapbox":
        cartographerComponent = "mapbox";
        break;
      case "google":
      default:
        cartographerComponent = "google_maps";
        break;
    }
    this.mapsComponent = `cartographer-${cartographerComponent}-fieldtype`;
  },
  watch: {
    data: {
        deep: true,
        handler(data) {
            console.log(data);
            this.update(data);
        }
    }
  }
};
</script>
