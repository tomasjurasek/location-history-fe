<template>
    <div class="pa-3">
        <v-row align="center" justify="center" no-gutters>
            <v-col cols="10">
                <h1 class="text-center">Stránka nebyla nalezena</h1>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="10" class="text-center">
                <span class="xxl">404</span>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="10" class="text-center">
                <p>
                    Zadali jste buď chybnout adresu stránky a nebo stránka již
                    neexistuje.
                </p>
            </v-col>
        </v-row>

        <v-row align="center" justify="center">
            <v-col cols="10" class="text-center">
                <v-btn class="primary ma-2" x-large elevation="0" to="/" large>
                    <v-icon class="mr-2">mdi-home</v-icon>
                    Domů
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
.xxl {
    font-size: 8em;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class NotFound extends Vue {}
</script>
