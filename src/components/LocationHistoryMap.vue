<template>
    <div ref="map" class="fill-height"></div>
</template>

<style scoped>
@import "~mapbox-gl/dist/mapbox-gl.css";
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import { Prop, Watch } from "vue-property-decorator";
import { Location } from "@/types/Location";
import { formatDistance } from "@/filters/distance";
import { formatDatetime } from "@/filters/datetime";
import { formatPosition } from "@/filters/position";

@Component({})
export default class LocationHistoryMap extends Vue {
    $refs!: {
        map: HTMLDivElement;
    };

    map!: mapboxgl.Map;
    mapLoaded = false;

    @Prop({ default: [] }) locations!: Location[];
    @Prop({ default: false }) drawLine!: boolean;

    async mounted() {
        this.loadMap();
    }

    loadMap() {
        this.map = new mapboxgl.Map({
            container: this.$refs.map,
            style:
                "https://api.maptiler.com/maps/streets/style.json?key=R1lSouzUdcrAwXeY6zJy",
            center: [15.339133, 49.7437],
            zoom: 6
        });
        this.map.addControl(new mapboxgl.NavigationControl(), "top-right");
        this.map.addControl(new mapboxgl.ScaleControl(), "bottom-right");

        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        this.map.on("mouseenter", "points", event => {
            this.map.getCanvas().style.cursor = "pointer";

            const feature = event.features![0] as GeoJSON.Feature<
                GeoJSON.Point
            >;
            const position = feature.geometry.coordinates as [number, number];
            const location = feature.properties as Location;
            const html = `
                <div class="body-2 mb-3">${formatDatetime(
                    location.dateTimeUtc
                )}</div>
                <div>Souřadnice: ${formatPosition(position)}</div>
                ${
                    location.accuracy
                        ? `<div>Přesnost: ${formatDistance(
                              location.accuracy
                          )}</div>`
                        : ""
                }
            `;

            popup
                .setLngLat(new mapboxgl.LngLat(position[0], position[1]))
                .setHTML(html)
                .addTo(this.map);
        });
        this.map.on("mouseleave", "points", () => {
            this.map.getCanvas().style.cursor = "";
            popup.remove();
        });

        this.map.on("load", () => {
            this.map.addSource("lines", {
                type: "geojson",
                data: { type: "FeatureCollection", features: [] }
            });
            this.map.addSource("points", {
                type: "geojson",
                data: { type: "FeatureCollection", features: [] }
            });
            this.map.addLayer({
                id: "lines",
                type: "line",
                source: "lines",
                layout: {},
                paint: {
                    "line-color": "#ff0000"
                }
            });
            this.map.addLayer({
                id: "points",
                type: "circle",
                source: "points",
                layout: {},
                paint: {
                    "circle-color": "#ff0000"
                }
            });

            this.map.setLayoutProperty(
                "lines",
                "visibility",
                this.drawLine ? "visible" : "none"
            );

            this.mapLoaded = true;
        });
    }

    @Watch("locations")
    renderLocations() {
        if (!this.map || !this.mapLoaded) {
            setTimeout(() => this.renderLocations(), 200);
            return;
        }

        (this.map.getSource("lines") as GeoJSONSource).setData({
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: this.locations.map(location => {
                            return [
                                location.longitude / 10 ** 7,
                                location.latitude / 10 ** 7
                            ];
                        })
                    },
                    properties: {}
                }
            ]
        });
        (this.map.getSource("points") as GeoJSONSource).setData({
            type: "FeatureCollection",
            features: this.locations.map(location => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            location.longitude / 10 ** 7,
                            location.latitude / 10 ** 7
                        ]
                    },
                    properties: location
                };
            })
        });

        const positions = this.locations.map(
            location =>
                new mapboxgl.LngLat(
                    location.longitude / 10 ** 7,
                    location.latitude / 10 ** 7
                )
        );
        const bounds = positions.reduce(
            (bounds, position) => bounds.extend(position),
            new mapboxgl.LngLatBounds(positions[0], positions[0])
        );
        this.map.fitBounds(bounds, { padding: 100, maxDuration: 1 });
    }

    @Watch("drawLine")
    renderLine() {
        if (!this.map || !this.mapLoaded) {
            setTimeout(() => this.renderLine(), 200);
            return;
        }

        this.map.setLayoutProperty(
            "lines",
            "visibility",
            this.drawLine ? "visible" : "none"
        );
    }
}
</script>
