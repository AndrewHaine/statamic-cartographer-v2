import uuid from "uuid/v4";

export default {
  attached() {
    if(!this.hasKey) return;
    this.setMode();
    this.initMap();
    this.addCenterMarker();
    this.populateMarkers(this.data.markers);
  },

  data() {
    return {
      busy: false,
      center: {},
      centerMarker: {},
      dirtyCenter: false,
      dirtyZoom: false,
      hasKey: false,
      map: null,
      markerObjects: [],
      selectedMarker: null,
      selectedMarkerIndex: 0,
      zoomLevel: 4
    };
  },

  methods: {
    generateNewMarker(mode) {
      let markerData = {
        id: uuid(),
        position: this.center,
        icon: null
      };

      if(mode === 'google') {
        markerData.label = null;
      }

      if(mode === 'mapbox') {
        markerData.color = null;
      }

      return markerData;
    },

    getMarkerById(markerId) {
      return this.markerObjects.filter(
        markerObject => markerObject.id === markerId
      )[0];
    },

    getMarkerIndex(id = null) {
      if (!id) return -1;
      return this.data.markers.findIndex(marker => marker.id === id);
    },

    getReplicatorPreviewText() {
      const { lat, lng } = this.data.center;
      return `Center: Lat: ${lat}, Lng: ${lng}`;
    },

    populateMarkers(markers) {
      markers.forEach(marker => this.addMarker(false, marker));
    },

    removeMarker(markerId) {
      this.selectedMarker = null;
      this.updateMarker(markerId, null, true);
      const markerObject = this.getMarkerById(markerId);
      this.removeMarkerObjectFromMap(markerObject);
    },

    updateMarker(markerId, data, remove = false) {
      const markerIndex = this.getMarkerIndex(markerId);
      const markers = this.data.markers;

      markers[markerIndex] = {
        ...markers[markerIndex],
        ...data
      };

      if (remove) markers.splice(markerIndex, 1);

      this.data = {
        ...this.data,
        markers
      };
    },
  }
}
