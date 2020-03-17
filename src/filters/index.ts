import Vue from "vue";
import { formatDate } from "./date";
import { formatDatetime } from "./datetime";
import { formatDistance } from "./distance";
import { formatPosition } from "./position";
import { formatNumber } from "./number";

Vue.filter("date", formatDate);
Vue.filter("datetime", formatDatetime);
Vue.filter("distance", formatDistance);
Vue.filter("position", formatPosition);
Vue.filter("number", formatNumber);
