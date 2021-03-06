<template>
    <v-container fluid class="content" v-if="!isLoading">
        <div class="info-wrapper" v-if="isProcessing || isSuccess">
            <v-container class="info-container">
                <div class="success-info">
                    <v-icon class="success-info__icon" color="success"
                        >mdi-cloud-check</v-icon
                    >
                    <h3 class="success-info__title">
                        Nahrávání dokončeno
                    </h3>
                </div>
                <div class="flex-grow-1">
                    <p class="success-info__description">
                        Na tomto unikátním odkazu si můžete opětovně zobrazit
                        svou historii polohy.
                    </p>
                    <div class="d-flex align-start flex-wrap">
                        <input
                            type="text"
                            class="success-info__url"
                            name="url"
                            :value="url"
                            readonly
                        />
                        <div
                            class="d-flex justify-space-between flex-grow-1 flex-wrap"
                        >
                            <v-btn
                                color="#002DCF"
                                @click="copyUrl"
                                depressed
                                text
                            >
                                <v-icon>mdi-content-copy</v-icon>
                                Zkopírovat odkaz
                            </v-btn>
                            <v-btn
                                color="error"
                                text
                                :loading="isDeleting"
                                depressed
                                @click="deleteLocations"
                            >
                                <v-icon>mdi-trash-can-outline</v-icon>
                                Smazat data
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-container>
        </div>
        <Error
            v-else-if="isDeleted"
            icon="mdi-trash-can-outline"
            title="Data byla úspěšně smazána"
            buttonText="Domů"
            buttonLink="/"
        >
        </Error>
        <Error
            v-else
            icon="mdi-cloud-off-outline"
            title="Žádná data nenalezena"
            buttonText="Domů"
            buttonLink="/"
        >
            Pro zadaný identifikátor nebyla nalezena žádná data.<br />
            Zkontroluje si adresu stránky, zda je zadaná správně.
        </Error>
        <div class="map-wrapper" v-if="isProcessing || isSuccess">
            <div class="map">
                <div v-if="isProcessing" class="map-overlay">
                    <div class="map-overlay__content">
                        <v-progress-circular
                            class="map-overlay__progress"
                            color="rgba(0, 45, 208)"
                            size="50"
                            width="6"
                            indeterminate
                        />
                        <h1 class="map-overlay__title">
                            Generování mapy historie polohy
                        </h1>
                        <p class="map-overlay__description">
                            Za malou chvíli uvidíte svou historii polohy na
                            mapě.
                        </p>
                    </div>
                </div>
                <div
                    v-else-if="isSuccess && !locations.length"
                    class="map-overlay"
                >
                    <div class="map-overlay__content">
                        <h1 class="map-overlay__title">
                            Bohužel
                        </h1>
                        <p class="map-overlay__description">
                            Za poslední dobu nebyly nalezeny žádné záznamy
                            polohy.
                        </p>
                    </div>
                </div>
                <LocationHistoryMap
                    :locations="date ? selectedLocations : locations"
                    :highlighted-location="highlightedLocation"
                    :show-details="!!date"
                    @update:highlightedLocation="highlightedLocation = $event"
                />
            </div>
            <div class="side-panel">
                <LocationHistorySidePanel
                    :date="date"
                    :locations="locations"
                    :selected-locations="selectedLocations"
                    @update:date="filterLocations"
                    @update:highlightedLocation="highlightedLocation = $event"
                />
            </div>
        </div>
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

.info-wrapper {
    border-bottom: solid 1px rgba(0, 0, 0, 0.075);
}

.info-container {
    padding: 20px 32px;
    padding-bottom: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.success-info {
    margin-bottom: 12px;
    margin-right: 40px;
    position: relative;

    flex: 0 0 auto;

    padding-left: 52px;
}

.success-info__icon {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 28px;
}

.success-info__title {
    font-size: 16px;
    line-height: 28px;
}

.success-info__description {
    font-size: 14px;
    line-height: 28px;
    margin-bottom: 4px;
}

.success-info__url {
    font-size: 12px;
    color: #002dcf;
    padding: 8px 12px;
    border: solid 1px #dfdfdf;
    border-radius: 4px;
    outline: none;
    width: 520px;
    margin-right: 20px;
    margin-bottom: 16px;
}

.v-btn {
    display: inline-block;
    font-size: 14px !important;
    font-weight: 400;
    padding: 0 !important;
    margin-bottom: 20px;
    text-transform: none !important;
}

.v-btn:not(:last-child) {
    margin-right: 16px;
}

.v-btn .v-icon {
    font-size: 18px;
    margin-right: 4px;
}

.v-btn:hover::before {
    display: none;
}

.map-wrapper {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
}

.map {
    position: relative;
    min-height: 400px;
    flex: 1 1 auto;
}

.map-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.85);

    z-index: 100;
}

.map-overlay__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 358px;

    text-align: center;

    z-index: 100;
}

.map-overlay__title {
    font-size: 20px;
    font-weight: 900;
    margin-top: 24px;
    margin-bottom: 16px;
}

.map-overlay__description {
    font-size: 16px;
    font-weight: 500;
    opacity: 0.75;
}

.side-panel {
    position: relative;
    width: 300px;
    min-height: 400px;
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

@media (max-width: 599px) {
    .success-info__url {
        width: 100%;
        margin-right: 0;
    }
}

@media (max-width: 959px) {
    .map-wrapper {
        flex-direction: column;
    }

    .side-panel {
        width: auto;
    }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import LocationHistoryMap from "@/components/LocationHistoryMap.vue";
import LocationHistorySidePanel from "@/components/LocationHistorySidePanel.vue";
import Loading from "@/components/Loading.vue";
import Error from "@/components/Error.vue";
import { Location } from "@/types/Location";
import axios from "axios";

@Component({
    components: { LocationHistorySidePanel, LocationHistoryMap, Loading, Error }
})
export default class LocationHistory extends Vue {
    id = "";
    token = "";
    mailto = "";
    isLoading = true;
    isProcessing = false;
    isSuccess = false;
    isDeleting = false;
    isDeleted = false;

    locations: Location[] = [];
    selectedLocations: Location[] = [];
    highlightedLocation: Location | null = null;
    date = "";

    url = location.href;

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
            if (this.isProcessing && !this.isDeleted) {
                await setTimeout(() => this.loadLocations(), 5 * 1000);
            } else {
                this.isProcessing = false;
                this.isSuccess = true;
                this.locations = locations;
            }
        } catch (error) {
            this.isLoading = false;
            this.isProcessing = false;
            this.isSuccess = false;
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
        this.isProcessing = false;
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

    copyUrl() {
        const input = document.querySelector<HTMLInputElement>("[name=url]")!;

        input.select();
        input.setSelectionRange(0, 99999);

        document.execCommand("copy");
    }
}
</script>
