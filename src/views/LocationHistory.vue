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
                    ><v-icon class="mr-2">mdi-email</v-icon> Odeslat
                    mailem</v-btn
                >
            </v-col>
        </v-row>
        <v-row no-gutters class="fill-height-hack">
            <v-col cols="9" class="fill-height">
                <LocationHistoryMap :locations="locations" />
            </v-col>
            <v-col cols="3" class="fill-height">
                <LocationHistorySidePanel :locations="locations" />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.fill-height-hack {
    height: calc(100vh - 80px);
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
    id = "";
    mailto = "";

    mounted() {
        let locationHistory = locationHistoryStorage.load();
        if (!locationHistory && location.hostname === "localhost") {
            locationHistory = {
                id: "localhost",
                locations: [
                    {
                        dateTimeUtc: "20200316T14:00:00Z",
                        latitude: 500437725,
                        longitude: 144549068,
                        accuracy: 96
                    },
                    {
                        dateTimeUtc: "20200316T15:00:00Z",
                        latitude: 500437275,
                        longitude: 144545330,
                        accuracy: 33
                    }
                ]
            };
        }

        if (locationHistory) {
            this.id = locationHistory.id;
            this.locations = locationHistory.locations;
            this.mailto = "mailto:test@hygiena.cz?subject=Data pro " + this.id;
        }
    }
}
</script>
