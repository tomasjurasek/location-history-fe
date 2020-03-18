<template>
    <v-container class="pa-0">
        <v-row class="mb-3">
            <v-col style="flex: 0">
                <v-icon color="success" large>mdi-cloud-check</v-icon>
            </v-col>
            <v-col>
                <span class="title">Nahrávání úspěšné, děkujeme!</span>
                <br /><br />
                Pro vaše data byl přiřazen následující kód. Pro úspěšné
                dokončení ho odešlete e-mailem nebo sdělte pracovníkovi
                hygienické stanice:
                <br /><br />
                <div>
                    <span
                        class="display-1 mr-5"
                        style="vertical-align: middle"
                        >{{ id }}</span
                    >
                    <v-btn
                        class="success"
                        x-large
                        elevation="0"
                        :href="mailto"
                        large
                    >
                        <v-icon class="mr-2">mdi-email</v-icon>
                        Odeslat e-mailem
                    </v-btn>
                </div>
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
import axios from "axios";

@Component({
    components: { LocationHistorySidePanel, LocationHistoryMap }
})
export default class LocationHistory extends Vue {
    id = "";
    token = "";
    mailto = "";

    locations: Location[] = [];
    selectedLocations: Location[] = [];
    date = "";

    mounted() {
        this.id = this.$route.params.id;
        this.token = this.$route.query.token as string;
        this.mailto = `mailto:test@hygiena.cz?subject=Data pro ${this.id}`;

        this.loadLocations();
    }

    async loadLocations() {
        if (this.id === "localhost") {
            this.locations = [
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
            ];
            return;
        }

        const url = `${process.env.VUE_APP_API_URL}/users/${this.id}/locations`;
        const params = { token: this.token };
        const response = await axios.get(url, { params });
        this.locations = response.data;
    }

    filterLocations(date: string) {
        this.date = date;
        this.selectedLocations = this.locations.filter(location => {
            return location.dateTimeUtc.startsWith(date);
        });
    }
}
</script>
