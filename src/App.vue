<template>
    <v-app>
        <v-container class="topbar" fluid>
            <router-link :to="{ name: 'Home' }" class="logo">
                PROJEKT
                <br />
                <span class="red--text">#STOPCOVIDCZ</span>
            </router-link>
            <router-link :to="{ name: 'Home' }" class="site-title"
                >Historie polohy</router-link
            >
            <nav class="nav">
                <router-link :to="{ name: 'Terms' }"
                    >Podmínky užití</router-link
                >
                <router-link :to="{ name: 'Contacts' }">Kontakty</router-link>
            </nav>
        </v-container>

        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<style scoped>
.topbar {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 80px;

    border-bottom: solid 1px rgba(0, 0, 0, 0.075);
}

.logo,
.site-title {
    padding: 0 32px;
    color: inherit;
    text-decoration: none;
}

.logo {
    padding: 8px 32px;
    margin-left: -12px;

    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
    border-right: solid 1px black;
}

.site-title {
    font-size: 16px;
}

.nav {
    margin-left: auto;
    margin-right: 32px;
}

.nav > a {
    margin-left: 28px;
    font-size: 16px;
    color: inherit;
    text-decoration: none;
}

.nav > a:hover {
    color: #002dcf;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class App extends Vue {}
</script>
