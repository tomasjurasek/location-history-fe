<template>
    <HomeLayout>
        <h1>Kontakty</h1>
    </HomeLayout>
</template>

<style scoped></style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HomeLayout from "@/HomeLayout.vue";

@Component({ components: { HomeLayout } })
export default class Contacts extends Vue {}
</script>
