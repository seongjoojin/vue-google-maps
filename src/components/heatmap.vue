<template>
  <div ref="heatmap" :style="`width: ${mapWidth}; height: ${mapHeight}`"></div>
</template>
<script>
import buildComponent from './build-component.js'

export default buildComponent({
  name: 'heatmap',
  props: {
    lat: {
      type: Number,
      default: () => 37.775
    },
    lng: {
      type: Number,
      default: () => -122.434
    },
    initialZoom: {
      type: Number,
      default: () => 13
    },
    mapType: {
      type: String,
      default: () => 'roadmap'
    },
    points: {
      type: Array,
      required: true
    },
    width: {
      type: [String, Number],
      default: () => '100%'
    },
    height: {
      type: [String, Number],
      default: () => '100%'
    }
  },
  computed: {
    mapWidth() {
      if (typeof this.width === 'string') {
        return this.width;
      } else {
        return `${this.width}px`;
      }
    },
    mapHeight() {
      if (typeof this.height === 'string') {
        return this.height;
      } else {
        return `${this.height}px`;
      }
    },
    heatmapPoints() {
      return this.points.map(
        point => new google.maps.LatLng(point.lat, point.lng)
      );
    }
  },
  created() {
    return loaded.then(() => {
      const mapElement = this.$refs.heatmap;
      this.$mapObject = new google.maps.Map(mapElement, {
        zoom: this.initialZoom,
        center: { lat: this.lat, lng: this.lng },
        mapTypeId: this.mapType
      });
      this.$heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapPoints,
        map: this.$mapObject
      });
      this.$heatmap.setMap(this.$mapObject);
    });
  }
});
</script>