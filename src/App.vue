<template>
    <v-app>
        <v-container class="topbar" fluid>
            <router-link :to="{ name: 'Home' }" class="logo">
                PROJEKT
                <br />
                <span class="red--text">#STOPCOVIDCZ</span>
            </router-link>
            <div class="divider"></div>
            <router-link :to="{ name: 'Home' }" class="site-title"
                >Historie polohy</router-link
            >
            <nav class="nav hidden-xs-only">
                <router-link :to="{ name: 'Terms' }"
                    >Podmínky užití</router-link
                >
                <router-link :to="{ name: 'Contacts' }">Kontakty</router-link>
            </nav>
            <v-menu class="menu">
                <template v-slot:activator="{ on: toggle }">
                    <v-app-bar-nav-icon
                        v-on="toggle"
                        class="menu__toggle hidden-sm-and-up"
                    ></v-app-bar-nav-icon>
                </template>
                <v-list>
                    <v-list-item :to="{ name: 'Terms' }">
                        <v-list-item-title>
                            Podmínky užití
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ name: 'Contacts' }">
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

    padding: 0 32px;
    height: 80px;

    border-bottom: solid 1px rgba(0, 0, 0, 0.075);
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
    margin: 0 32px;
    height: 60%;
    width: 1px;
    background: black;
}

.site-title {
    line-height: 1.2;
    font-size: 16px;
}

.nav {
    margin-left: auto;
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

@media (max-width: 599px) {
    .topbar {
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
