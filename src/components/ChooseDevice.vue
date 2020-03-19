<template>
    <div>
        <span>Získavaní lokací nakaženého človeka pomocí Google Maps</span>
        <span>Vyberte váš chytrí telefon:</span>
        <v-row>
            <v-col>
                <v-btn @click="chooseAndroid">
                    <v-icon>mdi-android</v-icon>
                </v-btn>
            </v-col>
            <v-col>
                <v-btn @click="chooseiPhone">
                    <v-icon>mdi-cellphone-iphone</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<style></style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class ChooseDevice extends Vue {
    chooseAndroid() {
        this.$emit("chooseAndroidDeviceEvent");
    }
    chooseiPhone() {
        this.$emit("chooseAppleDeviceEvent");
    }
}
</script>
