<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                :value="value | date"
                @input="onInput"
                label="Datum"
                clearable
                v-on="on"
                readonly
            />
        </template>
        <v-date-picker
            :value="value"
            :allowed-dates="isDateAllowed"
            :first-day-of-week="1"
            no-title
            @input="onInput"
        />
    </v-menu>
</template>

<style scoped></style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({})
export default class DatePicker extends Vue {
    @Prop() value!: string;

    @Prop() allowedDates!: string[];

    menu = false;

    isDateAllowed(date: string) {
        return this.allowedDates ? this.allowedDates.includes(date) : true;
    }

    onInput(value: string) {
        this.menu = false;
        this.$emit("input", value);
    }
}
</script>
