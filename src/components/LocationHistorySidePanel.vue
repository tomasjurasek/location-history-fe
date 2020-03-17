<template>
    <v-row no-gutters class="flex-column fill-height">
        <v-col class="pa-3" style="flex: 0">
            <h2>Detaily</h2>
            <DatePicker
                :value="date"
                :allowed-dates="allowedDates"
                @input="$emit('update:date', $event)"
            />
        </v-col>
        <v-col class="pa-3 overflow-y-auto">
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
                            Souřadnice:
                            {{ location.latitude / 10 ** 7 }},
                            {{ location.longitude / 10 ** 7 }}
                            <br />
                            Přesnost:
                            {{
                                location.accuracy
                                    ? `${location.accuracy} m`
                                    : "-"
                            }}
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <div v-else>
                    <em class="grey--text">Žádné body ke zobrazení</em>
                </div>
            </div>
            <div v-else>
                <em class="grey--text"
                    >Vyberte datum ke zobrazení detailů bodů</em
                >
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
