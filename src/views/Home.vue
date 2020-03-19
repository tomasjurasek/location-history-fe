<template>
    <HomeLayout>
        <ChooseDevice
            @chooseAndroidDeviceEvent="chooseAndroidDevice"
            @chooseAppleDeviceEvent="chooseAppleDevice"
        />
    </HomeLayout>
</template>

<style scoped></style>

<script lang="ts">
import Vue from "vue";
import HomeLayout from "@/HomeLayout.vue";
import Component from "vue-class-component";
import ChooseDevice from "@/components/ChooseDevice.vue";

@Component({ components: { ChooseDevice, HomeLayout } })
export default class Home extends Vue {
    chooseAndroidDevice() {
        this.$router.push({ name: "AndroidInstructions" });
    }

    chooseAppleDevice() {
        this.$router.push({ name: "AppleInstructions" });
    }
}
</script>
