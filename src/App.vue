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
            <nav class="nav hidden-xs-only">
                <router-link :to="{ name: 'Terms' }" target="_blank"
                    >Podmínky užití</router-link
                >
                <router-link :to="{ name: 'Contacts' }" target="_blank"
                    >Kontakty</router-link
                >
            </nav>
            <v-menu class="menu">
                <template v-slot:activator="{ on: toggle }">
                    <v-app-bar-nav-icon
                        v-on="toggle"
                        class="menu__toggle hidden-sm-and-up"
                    ></v-app-bar-nav-icon>
                </template>
                <v-list>
                    <v-list-item :to="{ name: 'Terms' }" target="_blank">
                        <v-list-item-title>
                            Podmínky užití
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ name: 'Contacts' }" target="_blank">
                        <v-list-item-title>
                            Kontakty
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
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
    padding-right: 0;
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

.menu__toggle {
    margin-left: auto;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class App extends Vue {}
</script>
