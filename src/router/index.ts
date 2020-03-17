import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import LocationHistory from "@/views/LocationHistory.vue";
import About from "@/views/About.vue";
import Instructions from "@/views/Instructions.vue";
import Loading from "@/views/Loading.vue";
import Done from "@/views/Done.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/map",
        name: "LocationHistory",
        component: LocationHistory
    },
    {
        path: "/about",
        name: "About",
        component: About
    },
    {
        path: "/instructions",
        name: "Instructions",
        component: Instructions
    },
    {
        path: "/done/:id",
        name: "Done",
        component: Done
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
