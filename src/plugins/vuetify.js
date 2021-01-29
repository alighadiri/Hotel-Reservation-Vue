import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#5eaaa8",
        secondary: "#666",
        accent: "#a3d2ca",
        error: "#ef4f4f",
        success: "#16c79a"
      },
      dark: {
        primary: "#5eaaa8",
        secondary: "#eb5e0b",
        accent: "#a3d2ca",
        error: "#ef4f4f",
        success: "#16c79a"
      },
    },
  },
});
