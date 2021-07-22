import { PropType } from 'vue';
import type { Component, App } from "vue"

export declare interface VueGoogleMapsOptions {
  load: {
    key: string;
  }
}

declare const VueGoogleMapsPlugin: VueGoogleMaps

export default VueGoogleMapsPlugin;

export declare interface VueGoogleMaps {
  install: (app: App, settings?: VueGoogleMapsOptions) => any;
}
