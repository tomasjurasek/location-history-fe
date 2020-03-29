<template>
    <v-app>
        <div class="topbar">
            <v-container class="topbar__content">
                <router-link :to="{ name: 'Home' }" class="logo">
                    INICIATIVA
                    <br />
                    <span class="red--text">#STOPCOVIDCZ</span>
                </router-link>
                <div class="divider"></div>
                <router-link :to="{ name: 'Home' }" class="site-title"
                    >Poloha pro{{ "\xa0" }}hygienu</router-link
                >
                <nav class="nav hidden-xs-only">
                    <router-link :to="{ name: 'Terms' }" target="_blank"
                        >Podmínky užití</router-link
                    >
                    <a href="mailto:historie.lokaci@gmail.com" target="_blank">
                        Napište nám
                    </a>
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
                        <v-list-item
                            href="mailto:historie.lokaci@gmail.com"
                            target="_blank"
                        >
                            <v-list-item-title>
                                Napište nám
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-container>
        </div>

        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<style>
.container {
    max-width: 1260px !important;
}

.container--fluid {
    max-width: 100% !important;
}
</style>

<style scoped>
.topbar {
    width: 100%;
    border-bottom: solid 1px rgba(0, 0, 0, 0.075);
}

.topbar__content {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 32px;
    height: 80px;
}

.logo,
.site-title {
    color: inherit;
    text-decoration: none;
}

.logo {
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
}

.divider {
    display: inline-block;
    margin: 0 28px;
    height: 32px;
    width: 1px;
    background-color: #999999;
}

.site-title {
    line-height: 1.2;
    font-size: 16px;
    font-weight: 600;
}

.nav {
    margin-left: auto;
    white-space: nowrap;
}

.nav > a {
    margin-left: 28px;
    font-size: 16px;
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
}

.nav > a:hover {
    color: #002dcf;
}

.menu__toggle {
    margin-left: auto;
}

@media (max-width: 599px) {
    .topbar__content {
        height: 70px;
        padding: 0 24px;
    }

    .divider {
        margin: 0 24px;
    }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class App extends Vue {}
</script>
