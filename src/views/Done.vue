<template>
    <v-container class="header" fluid>
        <v-row align="center" justify="center" no-gutters>
            <v-col md="10" class="text-center">
                <h1 class="text-center">Nahrávání úspěšné, děkujeme!</h1>
                <v-icon class="icon">mdi-cloud-check</v-icon>
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
                <p class="description">
                    Nebo sdělte pracovníkovi hygienické stanice váš unikátní
                    identifikátor:
                </p>
                <div class="id">{{ id }}</div>
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
    color: #5cb120;
}

.description {
    margin: 40px 0 28px 0;
}

.id {
    font-size: 28px;
    font-weight: 600;
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
