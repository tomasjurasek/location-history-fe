<template>
    <Error
        title="Stránka nebyla nalezena"
        iconText="404"
        buttonText="Domů"
        buttonLink="/"
    >
        Zadali jste buď chybnout adresu stránky,<br />nebo stránka již
        neexistuje.
    </Error>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Error from "@/components/Error.vue";

@Component({ components: { Error } })
export default class NotFound extends Vue {}
</script>
