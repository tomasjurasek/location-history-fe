<template>
    <div>
        <HomeLayout>
            <v-container class="header" fluid>
                <v-row align="center" justify="center" no-gutters>
                    <v-col md="10">
                        <h2 class="header__title">
                            <v-icon class="header__icon">mdi-apple</v-icon>
                            iPhone
                        </h2>
                        <p class="short-instructions">
                            Zobrazte si vaši historii polohy v nastavení a
                            sdělte ji pracovníkům hygieny telefonicky,<br />
                            nebo lépe - pošlete ji emailem jako snímky obrazovky
                            (screenshoty).
                        </p>
                    </v-col>
                </v-row>
            </v-container>

            <v-container id="navod">
                <v-row>
                    <v-col>
                        <h1>
                            Návod - jak zobrazit historii polohy na iPhonech
                        </h1>

                        <div class="steps row">
                            <section class="step col-lg-4-bak col-sm-6-bak">
                                <header class="step__header">
                                    <div class="step__number">1.</div>
                                    <div>
                                        <h2 class="step__title">
                                            Jděte do <strong>Nastavení</strong>
                                        </h2>
                                        <p class="step__description">
                                            (Settings)
                                        </p>
                                    </div>
                                </header>
                                <img
                                    class="step__image"
                                    src="instructions/iphone/iphone-step-1.jpg"
                                />
                            </section>

                            <section class="step col-lg-4-bak col-sm-6-bak">
                                <header class="step__header">
                                    <div class="step__number">2.</div>
                                    <div>
                                        <h2 class="step__title">
                                            Zvolte
                                            <strong>Soukromí</strong>
                                        </h2>
                                        <p class="step__description">
                                            (Privacy)
                                        </p>
                                    </div>
                                </header>
                                <img
                                    class="step__image"
                                    src="instructions/iphone/iphone-step-2.jpg"
                                />
                            </section>

                            <section class="step col-lg-4-bak col-sm-6-bak">
                                <header class="step__header">
                                    <div class="step__number">3.</div>
                                    <div>
                                        <h2 class="step__title">
                                            Vyberte
                                            <strong>Polohové služby</strong>
                                        </h2>
                                        <p class="step__description">
                                            (Location services)
                                        </p>
                                    </div>
                                </header>
                                <img
                                    class="step__image"
                                    src="instructions/iphone/iphone-step-3.jpg"
                                />
                            </section>

                            <section class="step col-lg-4-bak col-sm-6-bak">
                                <header class="step__header">
                                    <div class="step__number">4.</div>
                                    <div>
                                        <h2 class="step__title">
                                            Pokračujte na
                                            <strong>Systémové služby</strong>
                                        </h2>
                                        <p class="step__description">
                                            (System services) úplně na konci
                                            seznamu.
                                        </p>
                                    </div>
                                </header>
                                <img
                                    class="step__image"
                                    src="instructions/iphone/iphone-step-4.jpg"
                                />
                            </section>

                            <section class="step col-lg-4-bak col-sm-6-bak">
                                <header class="step__header">
                                    <div class="step__number">5.</div>
                                    <div>
                                        <h2 class="step__title">
                                            Vyberte
                                            <strong>Významná místa</strong>
                                        </h2>
                                        <p class="step__description">
                                            (Significant locations)
                                        </p>
                                    </div>
                                </header>
                                <img
                                    class="step__image"
                                    src="instructions/iphone/iphone-step-5.jpg"
                                />
                            </section>

                            <section class="step col-lg-4-bak col-sm-6-bak">
                                <header class="step__header">
                                    <div class="step__number">6.</div>
                                    <div>
                                        <h2 class="step__title">
                                            V sekci
                                            <strong>Historie</strong> vyberte
                                            postupně všechny lokality, kde jste
                                            byli od února 2020
                                        </h2>
                                    </div>
                                </header>
                                <img
                                    class="step__image"
                                    src="instructions/iphone/iphone-step-6.jpg"
                                />
                            </section>

                            <section class="step col-lg-4-bak col-sm-6-bak">
                                <header class="step__header">
                                    <div class="step__number">7.</div>
                                    <div>
                                        <h2 class="step__title">
                                            U každé lokality se zobrazí
                                            <strong>mapka</strong> a podrobnější
                                            <strong>seznam lokalit</strong>.
                                            Tady
                                            <strong
                                                >postupně rolujte dolů</strong
                                            >
                                            a pořizujte snímky obrazovky.
                                        </h2>
                                    </div>
                                </header>
                                <img
                                    class="step__image"
                                    src="instructions/iphone/iphone-step-7.jpg"
                                />
                            </section>

                            <section class="step col-lg-4-bak col-sm-6-bak">
                                <header class="step__header">
                                    <div class="step__number">8.</div>
                                    <div>
                                        <h2 class="step__title">
                                            Nezapomeňte se vrátit na
                                            <strong>Významná místa</strong> a
                                            nasnímkovat i další lokality.
                                        </h2>
                                    </div>
                                </header>
                            </section>

                            <section class="step col-lg-4-bak col-sm-6-bak">
                                <header class="step__header">
                                    <div class="step__number">9.</div>
                                    <div>
                                        <h2 class="step__title">
                                            Na závěr běžte do aplikace Fotky
                                            (Photos), zvolte Vybrat v pravém
                                            horním rohu, označte všechny
                                            pořízené snímky obrazovky a klikněte
                                            na ikonu sdílení vlevo dole.
                                            Odešlete snímky emailem (postačí
                                            nejnižší kvalita).
                                        </h2>
                                    </div>
                                </header>
                            </section>

                            <div class="step-placeholder"></div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </HomeLayout>
    </div>
</template>

<style scoped>
.header {
    padding-top: 48px;
    padding-bottom: 68px;

    background-color: rgba(0, 45, 207, 0.8);
    color: white;

    text-align: center;
}

.header__title {
    font-size: 36px;
    font-weight: 500;
}

.header__icon {
    position: relative;
    top: -8px;
    margin-right: 8px;
    color: white;
    font-size: 56px;
}

.short-instructions {
    padding: 20px;
    margin: 0;
    font-weight: 300;
}

.short-instructions a {
    color: inherit;
}

h1 {
    margin-top: 48px;
    font-size: 36px;
    font-weight: 600;
    text-align: center;
}

.steps {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    /*max-width: 1300px;
    margin: 0 auto;*/
}

.step {
    min-height: 658px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 52px;
    margin-bottom: 32px;
    width: 364px;
    padding: 0 32px;
    /*flex: 0 1 auto;
    margin: 0 auto;*/
}

.step__header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 16px 0;
    margin-bottom: 16px;
    margin-right: -32px;
    line-height: 28px;
}

.step__number {
    margin-right: 32px;
    line-height: 0.75;
    font-size: 72px;
    font-weight: 600;
}

.step__header > div:nth-child(2) {
}

.step__title {
    font-size: 16px;
}

.step__title a {
    text-decoration: none;
}

.step__title:not(.strong) {
    font-weight: normal;
}

.step__description {
    margin: 0;
    font-weight: normal;
    opacity: 0.8;
}

.step__image {
    display: block;
    max-width: 100%;
    margin-top: auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.step-placeholder {
    width: 364px;
}

@media (max-width: 751px) {
    .step {
        min-height: 0;
    }
}

@media (max-width: 400px) {
    .step {
        width: auto;
        max-width: 300px;
        padding: 0;
    }

    .step__header {
        margin-right: 0;
    }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HomeLayout from "@/HomeLayout.vue";

@Component({ components: { HomeLayout } })
export default class AppleInstructions extends Vue {}
</script>
