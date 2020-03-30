<template>
    <div>
        <slot />
        <footer>
            <v-container>
                <div class="footer-brand">
                    <div class="site-brand">
                        <router-link :to="{ name: 'Home' }" class="site-logo">
                            INICIATIVA
                            <br />
                            <span class="red--text">COVID19CZ</span>
                        </router-link>
                        <div class="divider"></div>
                        <router-link :to="{ name: 'Home' }" class="site-title"
                            >Poloha pro{{ "\xa0" }}hygienu</router-link
                        >
                    </div>
                    <a
                        href="https://covid19cz.cz"
                        target="_blank"
                        class="d-block"
                    >
                        <img
                            class="iniciative-logo d-block"
                            src="/covid-logo.svg"
                        />
                    </a>
                </div>
                <div class="footer-nav">
                    <nav class="nav">
                        <h3>O projektu</h3>
                        <router-link :to="{ name: 'Terms' }" target="_blank"
                            >Podmínky užití</router-link
                        >
                        <router-link :to="{ name: 'Terms' }" v-slot="{ href }">
                            <a :href="href + '#zdrojove-kody'" target="_blank">
                                Zdrojové kódy
                            </a>
                        </router-link>
                    </nav>
                    <nav class="nav">
                        <h3>Iniciativa COVID19CZ</h3>
                        <a
                            href="https://covid19cz.cz/covid19-cz/manifest"
                            target="_blank"
                        >
                            Manifest
                        </a>
                        <a
                            href="https://covid19cz.cz/projekty/seznam-projektu"
                            target="_blank"
                        >
                            Další projekty
                        </a>
                    </nav>
                    <nav class="nav">
                        <h3>Máte dotaz?</h3>
                        Napište nám na<br />
                        <a
                            class="mail"
                            href="mailto:polohaprohygienu@gmail.com"
                            target="_blank"
                        >
                            polohaprohygienu@gmail.com
                        </a>
                    </nav>
                </div>
            </v-container>
        </footer>
    </div>
</template>

<style scoped>
footer {
    background-color: rgba(65, 65, 65);
    background-color: #020c20;
    color: white;
}

footer /deep/ .container {
    padding: 40px 32px;
    padding-bottom: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
}

.footer-brand {
    margin-right: auto;
    margin-bottom: 32px;
    padding-right: 80px;
    flex: 0 0 auto;
}

.footer-nav {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
}

.site-brand {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 22px;
}

.site-logo,
.site-title {
    color: inherit;
    text-decoration: none;
}

.site-logo {
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

.iniciative-logo {
    position: relative;
    left: -2px;
    width: 118px;
}

nav {
    font-size: 15px;
    font-weight: 300;
    margin-bottom: 40px;
}

nav:not(:last-child) {
    margin-right: 80px;
}

nav h3 {
    margin-bottom: 12px;
    font-size: 16px;
}

nav a {
    display: block;
    margin: 4px 0;
    color: white;
    text-decoration: none;
    white-space: nowrap;
}

.mail {
    color: #ffdf00;
}

@media (max-width: 599px) {
    .footer-brand {
        padding: 0;
    }

    .divider {
        margin: 0 24px;
    }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({ components: {} })
export default class HomeLayout extends Vue {}
</script>
