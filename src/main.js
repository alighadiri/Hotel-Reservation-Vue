import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import * as _ from "lodash";

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, "_", { value: _ });

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
