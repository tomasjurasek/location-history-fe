<template>
    <v-container class="pa-0">
        <v-row no-gutters class="my-6">
            <v-col class="mr-6" style="flex: 0">
                <v-icon color="success" large>mdi-cloud-check</v-icon>
            </v-col>
            <v-col>
                <!-- todo FE better structure -->
                <div v-if="isProccesing">
                    <Uploading :status="UploadStatus.PROCESSING" />
                </div>
                <div v-else>
                    <span class="title">Nahrávání úspěšné, děkujeme!</span>
                    <br />
                    <br />Pro vaše data byl přiřazen následující identifikátor.
                    Pro úspěšné dokončení ho odešlete e-mailem nebo sdělte
                    pracovníkovi hygienické stanice:
                    <br />
                    <br />
                    <div>
                        <span
                            class="display-1 mr-6"
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
                            <v-icon class="mr-2">mdi-email</v-icon>Odeslat
                            e-mailem
                        </v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row no-gutters class="location-history">
            <v-col cols="9" class="fill-height">
                <LocationHistoryMap
                    :locations="date ? selectedLocations : locations"
                    :highlighted-location="highlightedLocation"
                    :draw-line="!!date"
                />
            </v-col>
            <v-col cols="3" class="fill-height">
                <LocationHistorySidePanel
                    :date="date"
                    :locations="locations"
                    :selected-locations="selectedLocations"
                    @update:date="filterLocations"
                    @update:highlightedLocation="highlightedLocation = $event"
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
import Uploading from "./Uploading.vue";
import { Location } from "@/types/Location";
import axios from "axios";
import { UploadStatus } from "@/types/UploadStatus";

@Component({
    components: { LocationHistorySidePanel, LocationHistoryMap, Uploading }
})
export default class LocationHistory extends Vue {
    id = "";
    token = "";
    mailto = "";
    isProccesing = true;
    UploadStatus = UploadStatus;

    locations: Location[] = [];
    selectedLocations: Location[] = [];
    highlightedLocation: Location | null = null;
    date = "";

    mounted() {
        this.id = this.$route.params.id;
        this.token = this.$route.query.token as string;
        this.mailto = `mailto:test@hygiena.cz?subject=Data pro ${this.id}`;
        if (!this.loadFakeLocations()) {
            this.loadLocations();
        }
    }

    async loadLocations() {
        const url = `${process.env.VUE_APP_API_URL}/users/${this.id}/locations`;
        const params = { token: this.token };

        try {
            const response = await axios.get(url, { params });
            const locations = response.data;
            console.log(locations);
            this.isProccesing = response.status === 204;
            if (this.isProccesing) {
                console.log("try laod locations");
                await setTimeout(() => this.loadLocations(), 10 * 1000);
            } else {
                this.locations = response.data;
            }
        } catch (error) {
            this.isProccesing = false;
            console.error({ error });
            //todo FE error modal
        }
    }

    loadFakeLocations(): boolean {
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
            return true;
        }
        return false;
    }

    filterLocations(date: string) {
        this.date = date;
        this.selectedLocations = this.locations.filter(location => {
            return location.dateTimeUtc.startsWith(date);
        });
    }
}
</script>
