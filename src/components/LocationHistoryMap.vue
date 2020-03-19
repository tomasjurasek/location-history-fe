<template>
    <div ref="map" class="fill-height map"></div>
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
import colors from "vuetify/lib/util/colors";

@Component({})
export default class LocationHistoryMap extends Vue {
    $refs!: {
        map: HTMLDivElement;
    };

    @Prop({ default: [] }) locations!: Location[];
    @Prop() highlightedLocation!: Location;
    @Prop() drawLine!: boolean;

    map!: mapboxgl.Map;
    mapLoaded = false;

    red = colors.red.base;
    blue = colors.blue.accent4;
    grey = colors.grey.base;

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
            this.map.addSource("points-highlighted", {
                type: "geojson",
                data: { type: "FeatureCollection", features: [] }
            });
            this.map.addLayer({
                id: "lines",
                type: "line",
                source: "lines",
                layout: {},
                paint: {
                    "line-color": this.red
                }
            });
            this.map.addLayer({
                id: "points",
                type: "circle",
                source: "points",
                layout: {},
                paint: {
                    "circle-color": this.red
                }
            });
            this.map.addLayer({
                id: "points-highlighted",
                type: "circle",
                source: "points-highlighted",
                layout: {},
                paint: {
                    "circle-color": this.blue
                }
            });

            this.mapLoaded = true;

            this.renderLocations();
            this.renderLine();
        });
    }

    @Watch("locations")
    renderLocations() {
        if (!this.map) {
            return;
        }

        this.fitBounds(this.locations);

        if (!this.mapLoaded) {
            return;
        }

        (this.map.getSource("lines") as GeoJSONSource).setData(
            this.locationsToLine(this.locations)
        );
        (this.map.getSource("points") as GeoJSONSource).setData(
            this.locationsToPoints(this.locations)
        );
    }

    @Watch("highlightedLocation")
    renderHighlightedLocation() {
        if (!this.map || !this.mapLoaded) {
            return;
        }

        if (this.highlightedLocation) {
            this.map.setPaintProperty("lines", "line-color", this.grey);
            this.map.setPaintProperty("points", "circle-color", this.grey);
            (this.map.getSource("points-highlighted") as GeoJSONSource).setData(
                this.locationsToPoints([this.highlightedLocation])
            );
        } else {
            this.map.setPaintProperty("lines", "line-color", this.red);
            this.map.setPaintProperty("points", "circle-color", this.red);
            (this.map.getSource("points-highlighted") as GeoJSONSource).setData(
                {
                    type: "FeatureCollection",
                    features: []
                }
            );
        }
    }

    @Watch("drawLine")
    renderLine() {
        if (!this.map || !this.mapLoaded) {
            return;
        }

        this.map.setLayoutProperty(
            "lines",
            "visibility",
            this.drawLine ? "visible" : "none"
        );
    }

    fitBounds(locations: Location[]) {
        const bounds = this.locationsToBounds(locations);
        this.map.fitBounds(bounds, { padding: 100, maxDuration: 1 });
    }

    locationToPosition(location: Location): [number, number] {
        return [location.longitude / 10 ** 7, location.latitude / 10 ** 7];
    }

    locationsToBounds(locations: Location[]): mapboxgl.LngLatBounds {
        const lngLats = locations.map(location => {
            const position = this.locationToPosition(location);
            return new mapboxgl.LngLat(position[0], position[1]);
        });
        const bounds = lngLats.reduce(
            (bounds, position) => bounds.extend(position),
            new mapboxgl.LngLatBounds(lngLats[0], lngLats[0])
        );
        return bounds;
    }

    locationsToLine(
        locations: Location[]
    ): GeoJSON.FeatureCollection<GeoJSON.LineString> {
        return {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: locations.map(location =>
                            this.locationToPosition(location)
                        )
                    },
                    properties: {}
                }
            ]
        };
    }

    locationsToPoints(
        locations: Location[]
    ): GeoJSON.FeatureCollection<GeoJSON.Point> {
        return {
            type: "FeatureCollection",
            features: locations.map(location => this.locationToPoint(location))
        };
    }

    locationToPoint(location: Location): GeoJSON.Feature<GeoJSON.Point> {
        return {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: this.locationToPosition(location)
            },
            properties: location
        };
    }
}
</script>
