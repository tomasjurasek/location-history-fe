<template>
    <div class="pa-3">
        <v-row class="ma2">
            <v-col cols="9">
                <v-alert type="success">
                    <strong>Nahrávání úspěšné, děkujeme!</strong> <br />
                    Prosím, sdělte pracovníkovi hygienické stanice následující
                    kód:
                    <h3>{{ id }}</h3>
                </v-alert>
            </v-col>
            <v-col cols="3">
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
    </div>
</template>

<style scoped></style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Done extends Vue {
    id = "";

    mounted() {
        this.id = this.$route.params.id;
    }
}
</script>
