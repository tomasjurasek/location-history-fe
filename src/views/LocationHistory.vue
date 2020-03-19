<template>
    <v-container fluid class="content" v-if="!isLoading">
        <v-row no-gutters>
            <v-col class="success-info-wrapper">
                <div class="spacer"></div>
                <div class="success-info" v-if="isProcessing || isSuccess">
                    <v-icon class="success-info__icon" color="success" large
                        >mdi-cloud-check</v-icon
                    >
                    <h3 class="success-info__title">
                        Nahrávání úspěšné, děkujeme!
                    </h3>
                    <p class="success-info__description">
                        Pro vaše data byl přiřazen následující identifikátor.
                        Pro úspěšné dokončení ho odešlete e-mailem nebo sdělte
                        pracovníkovi hygienické stanice.
                        <br />
                        Data můžete na této stránce kdykoliv smazat.
                    </p>
                    <div>
                        <span class="code">{{ id }}</span>
                        <v-btn class="success" large depressed :href="mailto">
                            Odeslat e-mailem
                        </v-btn>
                        <v-btn
                            color="error"
                            text
                            class="float-right"
                            :loading="isDeleting"
                            large
                            depressed
                            @click="deleteLocations"
                        >
                            Smazat
                        </v-btn>
                    </div>
                </div>
                <div class="success-info" v-if="isError || isDeleted">
                    <v-icon
                        class="success-info__icon"
                        color="red darken-2"
                        large
                        >mdi-cloud-off-outline</v-icon
                    >
                    <h3 class="success-info__title">
                        <span v-if="isDeleted">
                            Data byla úspěšně smazána
                        </span>
                        <span v-else>
                            Žádná data pro zadaný identifikátor nenalezena
                        </span>
                    </h3>
                    <p class="success-info__description"></p>
                    <div>
                        <v-btn
                            large
                            depressed
                            @click="$router.push({ name: 'Home' })"
                        >
                            Nahrát data
                        </v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row
            no-gutters
            class="location-history"
            v-if="isProcessing || isSuccess"
        >
            <v-col cols="9" class="fill-height map">
                <div v-if="isProcessing" class="map-overlay loading">
                    <Loading
                        title="Zpracovávání ..."
                        description="Mějte strpení, před zobrazením dat v mapě je třeba data nejprve zpracovat, může to trvat několik minut."
                    />
                </div>
                <div
                    v-else-if="isSuccess && !locations.length"
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
    isLoading = true;
    isProcessing = false;
    isSuccess = false;
    isError = false;
    isDeleting = false;
    isDeleted = false;

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
            this.isLoading = false;
            this.isProcessing = response.status === 204;
            if (this.isProcessing) {
                await setTimeout(() => this.loadLocations(), 5 * 1000);
            } else {
                this.isProcessing = false;
                this.isSuccess = true;
                this.locations = locations;
            }
        } catch (error) {
            this.isLoading = false;
            this.isProcessing = false;
            this.isError = true;
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

    async deleteLocations() {
        this.isDeleting = true;
        const url = `${process.env.VUE_APP_API_URL}/users/${this.id}`;
        const params = { token: this.token };
        await axios.delete(url, { params });
        this.isSuccess = false;
        this.isDeleting = false;
        this.isDeleted = true;
    }

    filterLocations(date: string) {
        this.date = date;
        this.selectedLocations = this.locations.filter(location => {
            return location.dateTimeUtc.startsWith(date);
        });
    }
}
</script>
