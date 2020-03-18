<template>
    <v-row no-gutters class="flex-column fill-height ml-6">
        <v-col style="flex: 0">
            <h2>Detaily</h2>
            <DatePicker
                :value="date"
                :allowed-dates="allowedDates"
                @input="$emit('update:date', $event)"
            />
        </v-col>
        <v-col class="pa-1 overflow-y-auto">
            <div v-if="date">
                <v-expansion-panels v-if="selectedLocations.length">
                    <v-expansion-panel
                        v-for="(location, index) in selectedLocations"
                        :key="index"
                    >
                        <v-expansion-panel-header>
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
                        Žádné body ke zobrazení
                    </span>
                </div>
            </div>
            <div v-else>
                <span class="caption grey--text">
                    Vyberte datum ke zobrazení podrobností
                </span>
            </div>
        </v-col>
    </v-row>
</template>

<style scoped></style>

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
