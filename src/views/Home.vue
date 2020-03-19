<template>
    <HomeLayout>
        <v-container fluid class="container">
            <div class="background"></div>
            <div class="content">
                <h1>Pomozte nám určit svou polohu<br />v minulých dnech</h1>
                <ChooseDevice
                    @chooseAndroidDeviceEvent="chooseAndroidDevice"
                    @chooseAppleDeviceEvent="chooseAppleDevice"
                />
            </div>
        </v-container>
    </HomeLayout>
</template>

<style scoped>
.container {
    position: relative;
    padding-bottom: 32px;
    min-height: 850px;
    background-color: rgba(0, 45, 207, 0.8);
    overflow: hidden;
}

.background {
    position: absolute;
    top: 190px;
    left: 50%;
    transform: translateX(-50%);
    background-image: url("../../public/map-bg.png");
    background-size: cover;
    width: 1213px;
    height: 605px;
    opacity: 0.5;
    z-index: 0;
}

.content {
    position: relative;
    z-index: 1;
}

h1 {
    margin: 48px auto;
    color: white;
    font-size: 36px;
    text-align: center;
}
</style>

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
