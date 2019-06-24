<template>
  <div class="card my-3 cartographer__mapbox-markers">
    <label class="block">Markers</label>
    <table class="cartographer__mapbox-marker-table">
      <thead>
        <th>Marker ID</th>
        <th>Position</th>
        <th>Style</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="marker in data.markers">
          <td>{{ marker.id.split('-')[0] }}</td>
          <td>
            <label class="block mr-2">Lat:</label>
            <input
              @change="updateMarkerPosition($event, marker.id, 'lat')"
              :value="data.markers[getMarkerIndex(marker.id)].position.lat"
              type="number"
              class="w-full mb-1"
            >
            <label class="block mr-2">Lng:</label>
            <input
              @change="updateMarkerPosition($event, marker.id, 'lng')"
              :value="data.markers[getMarkerIndex(marker.id)].position.lng"
              type="number"
              class="w-full"
            >
          </td>
          <td>
            <label class="block mr-2">Icon:</label>
            <input
              @change="setMarkerIcon($event, marker.id)"
              :value="data.markers[getMarkerIndex(marker.id)].icon"
              placeholder="..."
              type="text"
              class="w-full mb-1"
            >
            <label class="block mr-2">Color:</label>
            <input
              @change="setMarkerColor($event, marker.id)"
              :value="data.markers[getMarkerIndex(marker.id)].color"
              placeholder="#3FB1CE"
              type="text"
              class="w-full"
            >
          </td>
          <td>
            <a href="#" @click.prevent="removeMarker(marker.id)">Remove</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ["data", "getMarkerIndex"],

  methods: {
    removeMarker(markerId) {
      this.$emit("remove-marker", markerId);
    },

    updateMarkerPosition(e, markerId, coord) {
      const unChanged = coord === "lat" ? "lng" : "lat";
      const unChangedCoord = this.data.markers[this.getMarkerIndex(markerId)]
        .position[unChanged];
      let position = [e.target.value];
      position.splice(unChanged === "lat" ? 1 : 0, 0, unChangedCoord);
      this.$emit("marker-position-changed", markerId, position);
    },

    setMarkerColor(e, markerId) {
      const color = e.target.value;
      this.$emit("marker-color-changed", markerId, color);
    },

    setMarkerIcon(e, markerId) {
      const color = e.target.value;
      this.$emit("marker-icon-changed", markerId, color);
    }
  }
};
</script>
<style>
.cartographer__mapbox-markers {
  max-width: 750px;
}

.cartographer__mapbox-marker-table {
  margin: 10px 0;
}

.cartographer__mapbox-marker-table tbody tr:hover {
  background-color: #f1f5f9;
}
</style>
