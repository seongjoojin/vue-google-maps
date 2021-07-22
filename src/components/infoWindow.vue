<template>
  <div ref="infoWindow">
    <slot></slot>
  </div>
</template>

<script>
import buildComponent from './build-component.js'
import { defineComponent, ref } from 'vue';

const props = {
  options: {
    type: Object,
    required: false,
    default() {
      return {}
    },
  },
  position: {
    type: Object,
    twoWay: true,
  },
  zIndex: {
    type: Number,
    twoWay: true,
  },
}

const events = ['domready', 'click', 'closeclick', 'content_changed']

export default buildComponent({
  mappedProps: props,
  events,
  name: 'infoWindow',
  ctr: () => google.maps.InfoWindow,
  props: {
    opened: {
      type: Boolean,
      default: true,
    },
    infoWindow: {
      type: Boolean,
      default: null,
    },
    serial: {
      type: String,
      required: false
    },
    selectedMarker: {
      type: String,
      required: false
    }
  },

  inject: {
    $markerPromise: {
      default: null,
    },
  },
  mounted() {
    const el = this.$refs.infoWindow
    el.parentNode.removeChild(el)
  },

  beforeCreate(options) {
    options.content = this.$refs.infoWindow

    if (this.$markerPromise) {
      delete options.position
      return this.$markerPromise.then((mo) => {
        this.$markerObject = mo
        return mo
      })
    }
  },
  emits: events,
  methods:{
    _openInfoWindow() {
      this.$infoWindowObject.close()
      if (this.infoWindow) {
        if(this.serial === this.selectedMarker) {
          this.$infoWindowObject.open(this.$map, this.$markerObject)
        }
      }
    },
  },

  afterCreate(inst) {
    events.forEach((event) => {
      inst.addListener(event, () => {
        this.$emit(event);
      })
    })
    this._openInfoWindow()
    this.$watch('selectedMarker', (infoWindow) => {
      this._openInfoWindow()
    })
  },
})
</script>
