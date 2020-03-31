<template>
    <div class="side-panel">
        <h2>Detaily</h2>
        <DatePicker
            class="date-picker"
            :value="date"
            :allowed-dates="allowedDates"
            @input="$emit('update:date', $event)"
        />
        <div class="point-list">
            <div v-if="date">
                <v-expansion-panels v-if="selectedLocations.length">
                    <v-expansion-panel
                        v-for="(location, index) in selectedLocations"
                        :key="index"
                    >
                        <v-expansion-panel-header
                            @mouseover="
                                $emit('update:highlightedLocation', location)
                            "
                            @mouseout="
                                $emit('update:highlightedLocation', null)
                            "
                        >
                            {{ location.dateTimeUtc | datetime }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="caption">
                                Souřadnice:
                                {{
                                    [
                                        location.longitude / 10 ** 7,
                                        location.latitude / 10 ** 7
                                    ] | position
                                }}
                            </div>
                            <div class="caption" v-if="location.accuracy">
                                Přesnost:
                                {{ location.accuracy | distance }}
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <div v-else>
                    <span class="caption grey--text">
                        Žádné body k zobrazení
                    </span>
                </div>
            </div>
            <div v-else>
                <span class="caption grey--text">
                    Vyberte datum pro zobrazení podrobností
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.side-panel {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 16px;
}

.side-panel /deep/ > * {
    flex: 0 0 auto !important;
}

h2 {
    font-size: 20px;
}

.date-picker {
    margin: 8px 0;
}

.point-list {
    flex: 1 1 0 !important;
    padding: 4px;
    margin: -4px;
    overflow: auto;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Location } from "@/types/Location";
import DatePicker from "@/components/DatePicker.vue";
import { format, parseISO } from "date-fns";

@Component({
    components: { DatePicker }
})
export default class LocationHistorySidePanel extends Vue {
    @Prop() date!: string;

    @Prop({ default: [] }) locations!: Location[];

    @Prop({ default: [] }) selectedLocations!: Location[];

    get allowedDates() {
        return Array.from(
            new Set(
                this.locations.map(location =>
                    format(parseISO(location.dateTimeUtc), "yyyy-MM-dd")
                )
            )
        );
    }
}
</script>
