<template>
    <div>
        <v-container id="navod">
            <v-row align="center" justify="center" no-gutters>
                <v-col md="10">
                    <h2 class="header__title">
                        Pomozte zjistit historii vaší polohy
                    </h2>
                    <p class="short-instructions">
                        Historii polohy stáhněte z Google podle
                        <a href="#navod">návodu níže</a>. <br />Výsledný soubor
                        (nazvaný např.
                        <strong>takeout-20200315T062605Z-001.zip</strong>)
                        nahrajte zde:
                    </p>
                    <UploadForm
                        :uploading="uploading"
                        @upload-file="uploadFile"
                    />
                </v-col>

                <v-col md="10">
                    <h1>Návod jak stáhnout data z Google</h1>

                    <section class="step">
                        <header class="step__header">
                            <div class="step__number">1.</div>
                            <div>
                                <h2 class="step__title">
                                    Navštivte web
                                    <a
                                        href="https://takeout.google.com"
                                        target="_blank"
                                    >
                                        Google Takeout -
                                        https://takeout.google.com
                                    </a>
                                    <br />a přihlaste se
                                </h2>
                            </div>
                        </header>
                        <img
                            class="step__image"
                            src="instructions/takeout-step-1.jpg"
                        />
                    </section>

                    <section class="step">
                        <header class="step__header">
                            <div class="step__number">2.</div>
                            <div>
                                <h2 class="step__title">
                                    Klikněte na
                                    <strong>Zrušit výběr všech</strong>
                                </h2>
                                <p class="step__description">
                                    Ulehčí to následující kroky
                                </p>
                            </div>
                        </header>
                        <img
                            class="step__image"
                            src="instructions/takeout-step-2.jpg"
                        />
                    </section>

                    <section class="step">
                        <header class="step__header">
                            <div class="step__number">3.</div>
                            <div>
                                <h2 class="step__title">
                                    Vyberte pouze položku
                                    <strong>Historie polohy</strong>
                                </h2>
                                <p class="step__description">
                                    Najdete ji níže v seznamu
                                </p>
                            </div>
                        </header>
                        <img
                            class="step__image"
                            src="instructions/takeout-step-3.jpg"
                        />
                    </section>

                    <section class="step">
                        <header class="step__header">
                            <div class="step__number">4.</div>
                            <div>
                                <h2 class="step__title">
                                    Klikněte na tlačítko
                                    <strong>Další krok</strong>
                                </h2>
                                <p class="step__description">
                                    na konci seznamu
                                </p>
                            </div>
                        </header>
                        <img
                            class="step__image"
                            src="instructions/takeout-step-4.jpg"
                        />
                    </section>

                    <section class="step">
                        <header class="step__header">
                            <div class="step__number">5.</div>
                            <div>
                                <h2 class="step__title">
                                    Vyberte
                                    <strong>
                                        Odeslat odkaz ke stažení e-mailem
                                    </strong>
                                    a klikněte na tlačítko
                                    <strong>Vytvořit export</strong>
                                </h2>
                            </div>
                        </header>
                        <img
                            class="step__image"
                            src="instructions/takeout-step-5.gif"
                        />
                    </section>

                    <section class="step">
                        <header class="step__header">
                            <div class="step__number">6.</div>
                            <div>
                                <h2 class="step__title">
                                    <strong>Vyčkejte</strong> až se objeví
                                    následující obrazovka
                                </h2>
                                <p class="step__description">
                                    s exportem, který jste právě vytvořili
                                </p>
                            </div>
                        </header>
                        <img
                            class="step__image"
                            src="instructions/takeout-step-6.jpg"
                        />
                    </section>

                    <section class="step">
                        <header class="step__header">
                            <div class="step__number">7.</div>
                            <div>
                                <h2 class="step__title">
                                    Klikněte na tlačítko
                                    <strong>Stáhnout</strong>
                                </h2>
                                <p class="step__description">
                                    Na disk se stáhne soubor např.
                                    takeout-20200314T194428Z-001.zip
                                </p>
                            </div>
                        </header>
                        <img
                            class="step__image"
                            src="instructions/takeout-step-7.jpg"
                        />
                    </section>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="upload-step" fluid>
            <v-row align="center" justify="center" no-gutters>
                <v-col md="7">
                    <section class="step">
                        <header class="step__header">
                            <div class="step__number">8.</div>
                            <div>
                                <h2 class="step__title strong">
                                    Téměr hotovo!
                                </h2>
                                <p class="step__description">
                                    Zbývá už jen
                                    <strong>nahrát stažený soubor sem:</strong>
                                </p>
                            </div>
                        </header>
                        <UploadForm
                            :uploading="uploading"
                            @upload-file="uploadFile"
                        />
                    </section>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>
h1 {
    margin: 48px 0;
    font-size: 36px;
    font-weight: 600;
    text-align: center;
}

.step {
    max-width: 600px;
    margin: 0 auto;
}

.step__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 38px 0;
    padding: 16px 0;
    line-height: 28px;
}

.step__number {
    margin-right: 32px;
    font-size: 72px;
    font-weight: 600;
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
    max-width: 100%;
    margin-top: 16px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.upload-step {
    margin-top: 64px;
    padding-bottom: 30px;
    background-color: rgba(0, 45, 207, 0.8);
    color: white;
}

.upload-step .step__header {
    margin-top: 24px;
}

.upload-step .step__description {
    opacity: 1;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UploadForm from "@/components/UploadForm.vue";
import { Prop } from "vue-property-decorator";

@Component({
    components: { UploadForm }
})
export default class Instructions extends Vue {
    @Prop() uploading!: boolean;

    uploadFile(event: any) {
        this.$emit("upload-file", event);
    }
}
</script>
