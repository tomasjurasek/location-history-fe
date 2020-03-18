<template>
    <v-container fluid class="content">
        <v-row no-gutters>
            <v-col class="success-info-wrapper">
                <div class="spacer"></div>
                <div class="success-info">
                    <v-icon class="success-info__icon" color="success" large
                        >mdi-cloud-check</v-icon
                    >
                    <h3 class="success-info__title">
                        Nahrávání úspěšné, děkujeme!
                    </h3>
                    <p class="success-info__description">
                        Pro vaše data byl přiřazen následující identifikátor.
                        Pro úspěšné dokončení ho odešlete e-mailem nebo sdělte
                        pracovníkovi hygienické stanice:
                    </p>
                    <div>
                        <span class="code">{{ id }}</span>
                        <v-btn
                            class="success"
                            large
                            elevation="0"
                            :href="mailto"
                        >
                            Odeslat e-mailem
                        </v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row no-gutters class="location-history">
            <v-col cols="9" class="fill-height map">
                <div v-if="isProccesing" class="map-overlay loading">
                    <Loading
                        title="Zpracovávání ..."
                        description="Mějte strpení, před zobrazením dat v mapě, je třeba je nejprve zpracovat, může to trvat několik minut."
                    />
                </div>
                <div
                    v-else-if="noLocationsFound"
                    class="map-overlay no-locations-found"
                >
                    <h3>Bohužel</h3>
                    <p>
                        Za poslední dobu nebyly nalezeny žádné záznamy polohy.
                    </p>
                </div>
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
.content {
    display: flex;
    flex-direction: column;

    padding: 0;
    height: 100%;
}

.content > * {
    flex: 0 0 auto;
}

.spacer {
    flex: 1 0 auto;
    max-width: 150px;
}

.success-info-wrapper {
    display: flex;
    flex-direction: row;
}

.success-info {
    position: relative;
    margin: 32px;
    margin-bottom: 52px;

    flex: 0 1 auto;

    padding-left: 52px;
}

.success-info__icon {
    position: absolute;
    left: 0;
    top: 0;
}

.success-info__title {
    line-height: 36px;
}

.success-info__description {
    margin-top: 12px;
    margin-bottom: 40px;
}

.code {
    font-size: 36px;
    margin-right: 32px;
    vertical-align: middle;
}

.location-history {
    flex: 1 0 auto;
}

.map {
    position: relative;
}

.map-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: white;

    z-index: 100;
}

.loading {
}

.no-locations-found {
    padding: 32px;
    font-size: 16px;
}

.no-locations-found h3 {
    margin-bottom: 12px;
}

.no-locations-found p {
    margin: 0;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import LocationHistoryMap from "@/components/LocationHistoryMap.vue";
import LocationHistorySidePanel from "@/components/LocationHistorySidePanel.vue";
import Loading from "@/components/Loading.vue";
import { Location } from "@/types/Location";
import axios from "axios";

@Component({
    components: { LocationHistorySidePanel, LocationHistoryMap, Loading }
})
export default class LocationHistory extends Vue {
    id = "";
    token = "";
    mailto = "";
    isProccesing = true;
    noLocationsFound = false;

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
            this.noLocationsFound = true;
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
