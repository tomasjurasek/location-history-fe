<template>
    <div class="pa-3">
        <v-row align="center" justify="center" no-gutters>
            <v-col cols="10">
                <h1 class="text-center mb-10">Nahrávání</h1>
                <v-progress-linear
                    color="light-blue"
                    height="15"
                    indeterminate
                    striped
                ></v-progress-linear>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped></style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Loading extends Vue {
    progress = 0;
}
</script>
