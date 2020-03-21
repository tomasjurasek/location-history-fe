<template>
    <v-form v-model="valid" ref="form">
        <div v-if="!verificationCodeSending && !verificationCodeSent">
            <v-text-field
                v-model="phoneNumber"
                label="Telefonní číslo"
                background-color="white"
                filled
                rounded
                :rules="[phoneNumberValidation]"
                class="d-inline-block"
                style="width: 323px"
            />
            <v-btn
                color="success"
                dark
                x-large
                depressed
                :loading="verificationCodeSending"
                :disabled="!valid"
                @click="sendVerificationCode"
            >
                <v-icon class="mr-2">mdi-android-messages</v-icon> Odeslat
                ověřovací SMS
            </v-btn>
        </div>
        <div v-else>
            <p class="short-instructions">
                <v-progress-circular
                    indeterminate
                    class="ma-2"
                    v-if="verificationCodeSending"
                ></v-progress-circular>
                <span v-else>
                    Ověřovací SMS s kódem byla odeslána na telefonní číslo
                    {{ phoneNumber }}.
                    <br />
                    SMS nepřišla?
                    <a href="javascript:void(0)" @click="sendVerificationCode">
                        Zaslat kód znovu.
                    </a>
                </span>
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
            <br />
            Stažený soubor (např. takeout-20200315T06505Z-001.zip) nahrajte zde:

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
                :rules="[fileValidation]"
            />
            <v-btn
                v-on:click="submitFile()"
                :loading="uploading"
                :disabled="!valid"
                color="success"
                x-large
                depressed
                dark
            >
                <v-icon class="mr-2">mdi-cloud-upload-outline</v-icon> Nahrát
            </v-btn>
        </div>
    </v-form>
</template>

<style scoped>
.v-form {
    text-align: center;
    max-width: 600px;
    margin: 0 auto !important;
}

.v-text-field--rounded {
    border-radius: 4px;
}

.v-file-input /deep/ .v-input__prepend-inner {
    margin-left: -8px;
    padding-right: 24px !important;
}

.v-input /deep/ .v-messages.error--text {
    color: var(--v-error-lighten4) !important;
}

.v-btn:not(.v-btn--round).v-size--x-large {
    height: 60px;
    padding: 0 48px;
}

.v-btn.v-btn.v-btn--disabled.theme--dark:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #777777 !important;
    color: white !important;
}

.short-instructions a {
    color: inherit;
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

    phoneNumber = "";
    verificationCodeSending = false;
    verificationCodeSent = false;
    id = "";
    verificationCode = "";
    file: File | null = null;

    valid = false;

    uploading = false;

    async sendVerificationCode() {
        this.$refs.form.resetValidation();
        this.verificationCodeSending = true;
        const url = `${process.env.VUE_APP_API_URL}/users/send`;
        const data = this.phoneNumber;
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
        if (!value) {
            return "Telefonní číslo je povinné";
        }
        if (!value.match(/^\d{9}$/)) {
            return "Formát telefonního čísla je nnnnnnnnn (9 číslic)";
        }
        return true;
    }

    verificationCodeValidation(value: string) {
        if (!value) {
            return "Ověřovací kód z SMS je povinný";
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
