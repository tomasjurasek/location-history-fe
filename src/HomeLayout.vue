<template>
    <div>
        <slot />
        <footer>
            <nav class="nav">
                <router-link :to="{ name: 'Terms' }"
                    >Podmínky užití</router-link
                >
                <router-link :to="{ name: 'Contacts' }">Kontakty</router-link>
            </nav>
        </footer>
    </div>
</template>

<style scoped>
footer {
    padding: 90px 0;
    background-color: rgba(65, 65, 65);
    background-color: #020c20;
    color: white;
    text-align: center;
}

nav > a {
    display: inline-block;
    margin: 16px;
    color: white;
    text-decoration: none;
    white-space: nowrap;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({ components: {} })
export default class HomeLayout extends Vue {}
</script>
