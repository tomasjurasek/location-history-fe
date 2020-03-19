<template>
    <HomeLayout>
        <span>Apple intructions</span>
    </HomeLayout>
</template>

<style></style>

<script lang="ts">
import Vue from "vue";
import HomeLayout from "@/HomeLayout.vue";
import Component from "vue-class-component";

@Component({ components: { HomeLayout } })
export default class AppleInstructions extends Vue {}
</script>
