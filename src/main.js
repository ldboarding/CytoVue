import Vue from "vue";
import App from "./App.vue";
import VueCytoscape from "vue-cytoscape";
import vuetify from "@/plugins/vuetify";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { jsonData } from './data/data'
import CiaoVuePopup from 'ciao-vue-popup'
import $ from 'jquery'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AxiosPlugin from 'vue-axios-cors';
 
Vue.use(AxiosPlugin)

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

window.self.$ = $

Vue.use(CiaoVuePopup)

Vue.config.productionTip = false;
Vue.prototype.$toggle = true;

Vue.use(VueCytoscape);

new Vue({
  jsonData: jsonData,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");