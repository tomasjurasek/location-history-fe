<template>
    <v-form v-model="valid" ref="form">
        <section class="section">
            <v-icon>mdi-shield-alert</v-icon>
            <h3>Ověřte svoji totožnost</h3>
            <div v-if="!verificationCodeSent">
                <p>
                    Zadejte svoje telefonní číslo, na které vám obratem zašleme
                    SMS a ověřovacím kódem.
                </p>
                <div class="d-flex align-start flex-wrap">
                    <v-select
                        class="phone-calling-code-input"
                        :items="phoneCallingCodeOptions"
                        v-model="phoneCallingCode"
                        filled
                        rounded
                        dense
                        background-color="white"
                        hide-details
                    >
                        <template slot="selection" slot-scope="data">
                            <div class="phone-calling-code">
                                <img :src="data.item.icon" class="flag-icon" />
                                {{ data.item.text }}
                            </div>
                        </template>
                        <template slot="item" slot-scope="data">
                            <div class="phone-calling-code">
                                <img :src="data.item.icon" class="flag-icon" />
                                {{ data.item.text }}
                                {{ data.item.description }}
                            </div>
                        </template>
                    </v-select>
                    <v-text-field
                        class="phone-input"
                        v-model="phoneNumber"
                        placeholder="777 123 456"
                        background-color="white"
                        filled
                        rounded
                        dense
                        :rules="[phoneNumberValidation]"
                    />
                    <v-btn
                        class="verification-button"
                        color="success"
                        dark
                        x-large
                        depressed
                        :loading="verificationCodeSending"
                        :disabled="!phoneValid"
                        @click="sendVerificationCode"
                    >
                        Odeslat kód
                    </v-btn>
                </div>
            </div>
            <div v-else>
                <p>
                    SMS s kódem byla odeslána na telefonní číslo
                    <strong
                        >{{ phoneCallingCode.text }} {{ phoneNumber }}</strong
                    >.
                    <br />
                    SMS nepřišla?
                    <a href="javascript:void(0)" @click="resetVerification">
                        Zaslat kód znovu.
                    </a>
                </p>

                <v-text-field
                    v-model="verificationCode"
                    label="Ověřovací kód z SMS"
                    background-color="white"
                    filled
                    rounded
                    :rules="[verificationCodeValidation]"
                    class="d-inline-block"
                    style="width: 323px"
                />
            </div>
        </section>
        <section class="section" :class="{ disabled: !verificationCode }">
            <v-icon>mdi-cloud-upload</v-icon>
            <h3>Nahrajte soubor</h3>
            <p>
                Stažený soubor (např. takeout-20200315T06505Z-001.zip) nahrajte
                zde:
            </p>

            <v-file-input
                class="mt-2"
                v-model="file"
                label="Vyberte soubor"
                background-color="white"
                filled
                rounded
                show-size
                prepend-icon=""
                prepend-inner-icon="mdi-paperclip"
                accept=".zip"
                :disabled="!verificationCode"
                :rules="[fileValidation]"
            />
            <v-checkbox
                class="terms-consent"
                v-model="termsConsent"
                :disabled="!verificationCode"
                :rules="[termsConsentValidation]"
                dark
            >
                <template v-slot:label>
                    <span>
                        Souhlasím s
                        <router-link :to="{ name: 'Terms' }" v-slot="{ href }">
                            <a :href="href" target="_blank" @click.stop>
                                podmínkami užití
                            </a>
                        </router-link>
                    </span>
                </template>
            </v-checkbox>
            <v-btn
                v-on:click="submitFile()"
                :loading="uploading"
                :disabled="!valid"
                color="success"
                x-large
                depressed
                dark
                class="upload-button"
            >
                Nahrát soubor
            </v-btn>
        </section>
    </v-form>
</template>

<style scoped>
.section {
    position: relative;
}

.section:not(:last-child) {
    padding-bottom: 6px;
    border-bottom: solid 1px rgba(255, 255, 255, 0.2);
}

.section.disabled {
    opacity: 0.5;
}

.section .v-icon {
    position: absolute;
    left: -36px;
    color: white;
}

.section h3 {
    margin-top: 24px;
    margin-bottom: 8px;
}

.section a {
    color: inherit;
}

.section p {
    font-weight: 300;
}

.v-btn {
    text-transform: none;
}

.v-text-field--rounded {
    border-radius: 4px;
}

.phone-calling-code-input {
    position: absolute;
    width: 125px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: solid 1px #d8d8d8;
    z-index: 10;
}

.phone-calling-code-input /deep/ .v-input__slot {
    padding: 6px 16px !important;
    padding-right: 4px !important;
}

.phone-calling-code-input /deep/ .v-select__slot {
    height: 40px;
}

.phone-calling-code {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.flag-icon {
    margin-right: 8px;
    width: 28px;
}

.phone-input {
    display: inline-block;
    width: 335px;
    margin-right: 16px !important;
}

.phone-input /deep/ .v-input__slot {
    padding-left: 149px !important;
    height: 52px;
}

.verification-button {
    margin-bottom: 16px;
}

.v-file-input /deep/ .v-input__prepend-inner {
    margin-left: -8px;
    padding-right: 24px !important;
}

.v-input /deep/ .v-messages.error--text {
    color: var(--v-error-lighten4) !important;
}

.v-btn.v-btn.v-btn--disabled.theme--dark:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #777777 !important;
    color: white !important;
}

.terms-consent {
    margin-top: 0;
    margin-bottom: 6px;
    padding-top: 0;
}

.terms-consent /deep/ .v-label {
    color: white;
    font-weight: 300;
}

.terms-consent /deep/ .v-icon.mdi-checkbox-blank-outline::before {
    content: "\F012E";
}

@media (max-width: 599px) {
    .section .v-icon {
        left: 0;
    }

    .section h3 {
        padding-left: 36px;
    }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

@Component({})
export default class UploadForm extends Vue {
    $refs!: {
        form: Vue & { resetValidation: () => void };
    };

    phoneCallingCodeOptions = [
        {
            icon: "/cz-flag.png",
            value: "420",
            text: "+420",
            description: "Česká republika"
        },
        {
            icon: "/sk-flag.png",
            value: "421",
            text: "+421",
            description: "Slovensko"
        }
    ];

    phoneCallingCode = this.phoneCallingCodeOptions[0];
    phoneNumber = "";
    termsConsent = false;
    verificationCodeSending = false;
    verificationCodeSent = false;
    id = "";
    verificationCode = "";
    file: File | null = null;

    valid = false;
    phoneValid = false;

    uploading = false;

    resetVerification() {
        this.id = "";
        this.verificationCode = "";
        this.verificationCodeSending = false;
        this.verificationCodeSent = false;
    }

    async sendVerificationCode() {
        this.$refs.form.resetValidation();
        this.verificationCodeSending = true;
        const url = `${process.env.VUE_APP_API_URL}/users/send`;
        const data = `${this.phoneCallingCode.value}${this.phoneNumber.replace(
            /\s/g,
            ""
        )}`;
        const response = await axios.post(url, data, {
            headers: {
                // FIXME: text/plain? or change BE to accept and send JSON
                "Content-Type": "application/json"
            }
        });
        this.id = response.data;
        this.verificationCodeSending = false;
        this.verificationCodeSent = true;
    }

    submitFile() {
        this.uploading = true;
        const event = {
            id: this.id,
            verificationCode: this.verificationCode,
            file: this.file
        };
        this.$emit("uploadFileEvent", event);
    }

    phoneNumberValidation(value: string) {
        this.phoneValid = false;

        if (!value) {
            return "Telefonní číslo je povinné";
        }
        if (!value.match(/^\s*(\d\s*){9}$/)) {
            return "Formát telefonního čísla je nnnnnnnnn (9 číslic)";
        }

        this.phoneValid = true;

        return true;
    }

    verificationCodeValidation(value: string) {
        if (!value) {
            return "Ověřovací kód z SMS je povinný";
        }
        return true;
    }

    termsConsentValidation(value: boolean) {
        if (!value) {
            return "Musíte souhlasit s podmínkami užití";
        }

        return true;
    }

    fileValidation(value: File | null) {
        if (!value) {
            return "Soubor je povinný";
        }
        if (value.size >= 100 * 1024 * 1024) {
            return "Maximální povolená velikost souboru je 100 MB";
        }
        return true;
    }
}
</script>
