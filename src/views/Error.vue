<template>
    <v-container class="header">
        <v-row align="center" justify="center" no-gutters>
            <v-col md="10" class="text-center">
                <h1 class="text-center">Nastala chyba</h1>
                <v-icon color="red darken-2" class="icon"
                    >mdi-cloud-off-outline</v-icon
                >
                <p class="description">
                    Něco se nepovedlo. <br />
                    Zkuste to, prosím znovu.
                </p>
                <v-btn class="primary ma-2" x-large depressed to="/" large>
                    <v-icon class="mr-2">mdi-reload</v-icon>
                    Zpět
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
h1 {
    margin: 40px 0 28px 0;
    font-size: 36px;
    font-weight: 900;
}

.icon {
    display: block;
    margin: 0;
    margin-bottom: 40px;
    font-size: 96px;
}

.description {
    margin: 40px 0;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Error extends Vue {}
</script>
