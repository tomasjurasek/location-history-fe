<template>
    <div class="pa-3">
        <v-row align="center" justify="center" no-gutters>
            <v-col cols="10">
                <h1 class="text-center mb-10">Nastala chyba</h1>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="3" class="text-center">
                <v-icon color="red darken-2" class="xxl"
                    >mdi-cloud-off-outline</v-icon
                >
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="10" class="text-center">
                <p>
                    Něco se nepovedlo, zkuste to, prosím znovu.
                </p>
            </v-col>
        </v-row>

        <v-row align="center" justify="center">
            <v-col cols="3" class="text-center">
                <v-btn class="primary ma-2" x-large elevation="0" to="/" large>
                    <v-icon class="mr-2">mdi-reload</v-icon>
                    Zpět
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
.xxl {
    font-size: 11em;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Error extends Vue {}
</script>
