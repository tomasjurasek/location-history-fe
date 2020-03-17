<template>
    <div class="pa-3">
        <v-row align="center" justify="center" no-gutters>
            <v-col cols="10">
                <h1 class="text-center mb-10">Nahrávání úspěšné, děkujeme!</h1>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="3" class="text-center">
                <v-icon color="green darken-2" class="xxl"
                    >mdi-cloud-check</v-icon
                >

                <v-btn
                    class="primary ma-2"
                    x-large
                    elevation="0"
                    :href="mailto"
                    large
                >
                    <v-icon class="mr-2">mdi-email</v-icon>
                    Odeslat e-mailem
                </v-btn>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="10" class="text-center">
                <p>
                    Nebo sdělte pracovníkovi hygienické stanice váš unikátní
                    identifikátor:
                </p>
                <h3 class="mt-0">{{ id }}</h3>
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
export default class Done extends Vue {
    id = "";
    mailto = "";

    mounted() {
        this.id = this.$route.params.id;
        this.mailto = `mailto:test@hygiena.cz?subject=Data pro ${this.id}`;
    }
}
</script>
