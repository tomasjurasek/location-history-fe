import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                anchor: "#002DCF"
            }
        },
        options: {
            customProperties: true
        }
    },
    icons: {
        iconfont: "mdi"
    }
});
