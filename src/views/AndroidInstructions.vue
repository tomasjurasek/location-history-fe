<template>
    <div>
        <Loading
            v-if="isUploading"
            title="Nahrávání ..."
            description="Mějte strpení, data se mohou nahrávat několik minut."
        />
        <Error
            v-else-if="isError"
            title="Soubor se nepodařilo nahrát"
            buttonText="Zkusit znovu"
            buttonLink="/"
        >
            Pokud tuto chybu vidíte opakovaně,<br />napište nám prosím na
            <a href="mailto:covid19cz@keboola.cloud" target="_blank"
                >covid19cz@keboola.cloud</a
            >.
        </Error>
        <HomeLayout v-else>
            <v-container class="header" fluid>
                <v-row align="center" justify="center" no-gutters>
                    <v-col md="10">
                        <h2 class="header__title">
                            <v-icon class="header__icon"
                                >mdi-android-debug-bridge</v-icon
                            >
                            Android - Nahrajte historii svojí polohy
                        </h2>
                        <div class="upload">
                            <section class="upload__section">
                                <v-icon class="upload__icon"
                                    >mdi-history</v-icon
                                >
                                <h3 class="upload__title">
                                    Připravte historii
                                </h3>
                                <p class="upload__description">
                                    Historii polohy připravte podle
                                    <a href="#navod">návodu</a>.<br />
                                </p>
                            </section>
                            <UploadForm @uploadFileEvent="uploadFile" />
                        </div>
                    </v-col>
                </v-row>
            </v-container>

            <v-container id="navod">
                <v-row>
                    <v-col>
                        <h1>Jak na to?</h1>

                        <section class="step">
                            <header class="step__header">
                                <div class="step__number">1.</div>
                                <div>
                                    <h2 class="step__title">
                                        Navštivte stránku
                                        <a
                                            href="https://takeout.google.com"
                                            target="_blank"
                                        >
                                            Google Takeout -
                                            https://takeout.google.com
                                        </a>
                                        <br />a přihlašte se.
                                    </h2>
                                </div>
                            </header>
                            <img
                                class="step__image"
                                src="instructions/android/takeout-step-1.jpg"
                            />
                        </section>

                        <section class="step">
                            <header class="step__header">
                                <div class="step__number">2.</div>
                                <div>
                                    <h2 class="step__title">
                                        Nejprve zvolte
                                        <strong>Zrušit výběr všech</strong>.
                                    </h2>
                                    <p class="step__description">
                                        Zajímají nás jen data o poloze.
                                    </p>
                                </div>
                            </header>
                            <img
                                class="step__image"
                                src="instructions/android/takeout-step-2.jpg"
                            />
                        </section>

                        <section class="step">
                            <header class="step__header">
                                <div class="step__number">3.</div>
                                <div>
                                    <h2 class="step__title">
                                        Zaškrtněte
                                        <strong>pouze</strong> položku
                                        <strong>Historie polohy</strong>
                                    </h2>
                                    <p class="step__description">
                                        ve spodní půlce seznamu.
                                    </p>
                                </div>
                            </header>
                            <img
                                class="step__image"
                                src="instructions/android/takeout-step-3.jpg"
                            />
                        </section>

                        <section class="step">
                            <header class="step__header">
                                <div class="step__number">4.</div>
                                <div>
                                    <h2 class="step__title">
                                        Pokračujte tlačítkem
                                        <strong>Další krok</strong>
                                    </h2>
                                    <p class="step__description">
                                        na konci sekce.
                                    </p>
                                </div>
                            </header>
                            <img
                                class="step__image"
                                src="instructions/android/takeout-step-4.jpg"
                            />
                        </section>

                        <section class="step">
                            <header class="step__header">
                                <div class="step__number">5.</div>
                                <div>
                                    <h2 class="step__title">
                                        Vyberte
                                        <strong
                                            >Odeslat odkaz ke stažení
                                            e-mailem</strong
                                        >, ponechejte ve výběru
                                        <strong>Exportovat jednou</strong> a
                                        potvrďte tlačítkem
                                        <strong>Vytvořit export</strong>.
                                    </h2>
                                </div>
                            </header>
                            <img
                                class="step__image"
                                src="instructions/android/takeout-step-5.gif"
                            />
                        </section>

                        <section class="step">
                            <header class="step__header">
                                <div class="step__number">6.</div>
                                <div>
                                    <h2 class="step__title">
                                        <strong>Vyčkejte</strong> dokud neskončí
                                        export.
                                    </h2>
                                    <p class="step__description">
                                        <v-icon>mdi-timer-sand</v-icon> Může to
                                        trvat několik minut.
                                    </p>
                                </div>
                            </header>
                            <img
                                class="step__image"
                                src="instructions/android/takeout-step-6.jpg"
                            />
                        </section>

                        <section class="step">
                            <header class="step__header">
                                <div class="step__number">7.</div>
                                <div>
                                    <h2 class="step__title">
                                        Po skončení exportu zvolte
                                        <strong>Stáhnout</strong> a uložte
                                        výsledný soubor na
                                        <strong>plochu</strong> nebo někam, kde
                                        ho snadno najdete.
                                    </h2>
                                </div>
                            </header>
                            <img
                                class="step__image"
                                src="instructions/android/takeout-step-7.jpg"
                            />
                        </section>
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="upload-step" fluid>
                <v-row align="center" justify="center" no-gutters>
                    <v-col>
                        <section class="step">
                            <header class="step__header">
                                <div class="step__number">8.</div>
                                <div>
                                    <h2 class="step__title strong">
                                        Téměr hotovo!
                                    </h2>
                                    <p class="step__description">
                                        Poslední krok -
                                        <strong>nahrajte stažený soubor</strong>
                                        zde:
                                    </p>
                                </div>
                            </header>
                            <div class="upload">
                                <UploadForm @uploadFileEvent="uploadFile" />
                            </div>
                        </section>
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
}

.header__title {
    font-size: 36px;
    font-weight: 500;
    text-align: center;
}

.header__icon {
    position: relative;
    top: -5px;
    margin-right: 8px;
    color: white;
    font-size: 56px;
}

.upload {
    max-width: 500px;
    margin: 0 auto;
    margin-top: 52px;
}

.upload__section {
    position: relative;
    padding-bottom: 14px;
    border-bottom: solid 1px rgba(255, 255, 255, 0.2);
}

.upload__icon {
    position: absolute;
    left: -36px;
    color: white;
}

.upload__title {
    margin-top: 30px;
    margin-bottom: 8px;
}

.upload__section a {
    color: inherit;
}

.upload__description {
    font-weight: 300;
}

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

.step__description /deep/ .v-icon {
    position: relative;
    top: -2px;
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

@media (max-width: 599px) {
    .upload__section .v-icon {
        left: 0;
    }

    .upload__section h3 {
        padding-left: 36px;
    }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UploadForm from "@/components/UploadForm.vue";
import Loading from "@/components/Loading.vue";
import Error from "@/components/Error.vue";
import HomeLayout from "@/HomeLayout.vue";
import axios from "axios";

@Component({ components: { UploadForm, HomeLayout, Loading, Error } })
export default class AndroidInstructions extends Vue {
    isUploading = false;
    isError = false;

    async uploadFile(event: {
        id: string;
        verificationCode: string;
        file: File;
    }) {
        this.isUploading = true;
        this.isError = false;
        try {
            const url = `${process.env.VUE_APP_API_URL}/users/${event.id}/file`;
            const params = { verifyCode: event.verificationCode };
            const data = new FormData();
            data.append("file", event.file);
            const response = await axios.post(url, data, { params });

            this.$router.push({
                name: "LocationHistory",
                params: { id: response.data.id },
                query: { token: response.data.token }
            });
        } catch (e) {
            this.isError = true;
        } finally {
            this.isUploading = false;
        }
    }
}
</script>
