import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import AppleInstructions from "@/views/AppleInstructions.vue";
import AndroidInstructions from "@/views/AndroidInstructions.vue";
import LocationHistory from "@/views/LocationHistory.vue";
import About from "@/views/About.vue";
import Contacts from "@/views/Contacts.vue";
import Error from "@/views/Error.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/iphone",
        name: "AppleInstructions",
        component: AppleInstructions
    },
    {
        path: "/iphone",
        name: "AndroidInstructions",
        component: AndroidInstructions
    },
    {
        path: "/map/:id",
        name: "LocationHistory",
        component: LocationHistory
    },
    {
        path: "/about",
        name: "About",
        component: About
    },
    {
        path: "/contacts",
        name: "Contacts",
        component: Contacts
    },
    {
        path: "/error",
        name: "Error",
        component: Error
    },
    {
        path: "*",
        name: "NotFound",
        component: NotFound
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
