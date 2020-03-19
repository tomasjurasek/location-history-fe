<template>
    <div>
        <!-- <router-view /> -->
        <slot />
        <footer>Footer. Zpracování dat, odkazy, atd.</footer>
    </div>
</template>

<style scoped>
footer {
    padding: 90px;
    background-color: rgba(65, 65, 65);
    color: white;
    text-align: center;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({ components: {} })
export default class HomeLayout extends Vue {}
</script>
