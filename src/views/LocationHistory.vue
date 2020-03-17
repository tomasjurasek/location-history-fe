<template>
    <v-container class="pa-0">
        <v-row class="ma2">
            <v-col cols="9">
                <v-alert type="success" v-if="id">
                    <strong>Nahrávání úspěšné, děkujeme!</strong> <br />
                    Prosím, sdělte pracovníkovi hygienické stanice následující
                    kód:
                    <h3>{{ id }}</h3>
                </v-alert>
            </v-col>
            <v-col cols="3">
                <v-btn
                    class="primary ma-2"
                    x-large
                    elevation="0"
                    :href="mailto"
                    large
                >
                    <v-icon class="mr-2">mdi-email</v-icon>
                    Odeslat e-mailem
                </v-btn>
            </v-col>
        </v-row>
        <v-row no-gutters class="location-history">
            <v-col cols="9" class="fill-height">
                <LocationHistoryMap
                    :locations="date ? selectedLocations : locations"
                    :draw-line="!!date"
                />
            </v-col>
            <v-col cols="3" class="fill-height">
                <LocationHistorySidePanel
                    :date="date"
                    :locations="locations"
                    :selected-locations="selectedLocations"
                    @update:date="filterLocations"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.location-history {
    height: 600px;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import LocationHistoryMap from "@/components/LocationHistoryMap.vue";
import LocationHistorySidePanel from "@/components/LocationHistorySidePanel.vue";
import { Location } from "@/types/Location";
import { locationHistoryStorage } from "@/services/LocationHistoryStorage";

@Component({
    components: { LocationHistorySidePanel, LocationHistoryMap }
})
export default class LocationHistory extends Vue {
    locations: Location[] = [];
    selectedLocations: Location[] = [];
    date = "";
    id = "";
    mailto = "";

    mounted() {
        let locationHistory = locationHistoryStorage.load();
        if (!locationHistory && location.hostname === "localhost") {
            locationHistory = {
                id: "localhost",
                locations: [
                    {
                        dateTimeUtc: "2020-03-16T14:00:00Z",
                        latitude: 500437725,
                        longitude: 144549068,
                        accuracy: 96
                    },
                    {
                        dateTimeUtc: "2020-03-16T15:00:00Z",
                        latitude: 500437275,
                        longitude: 144545330,
                        accuracy: 1033
                    }
                ]
            };
        }

        if (locationHistory) {
            this.id = locationHistory.id;
            this.locations = locationHistory.locations;
            this.mailto = `mailto:test@hygiena.cz?subject=Data pro ${this.id}`;
        }
    }

    filterLocations(date: string) {
        this.date = date;
        this.selectedLocations = this.locations.filter(location => {
            return location.dateTimeUtc.startsWith(date);
        });
    }
}
</script>
