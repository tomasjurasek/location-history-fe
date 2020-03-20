<template>
    <v-form v-model="valid">
        <div v-if="!verificationCodeSent">
            <v-text-field
                v-model="phoneNumber"
                label="Telefonní číslo"
                background-color="white"
                filled
                rounded
                :rules="[phoneNumberValidation]"
                class="mx-auto"
                style="width: 323px"
            />
            <v-btn
                color="success"
                dark
                x-large
                depressed
                :disabled="!valid"
                @click="sendVerificationCode"
            >
                Odeslat ověřovací SMS
            </v-btn>
        </div>
        <div v-else>
            <p>
                Ověřovací SMS s kódem byla odeslána na telefonní číslo
                {{ phoneNumber }}
            </p>
            <v-text-field
                v-model="verificationCode"
                label="Ověřovací kód z SMS"
                background-color="white"
                filled
                rounded
                :rules="[verificationCodeValidation]"
                class="mx-auto"
                style="width: 323px"
            />
            <v-file-input
                placeholder="Vybrat soubor"
                accept=".zip"
                v-model="file"
                background-color="white"
                hide-details
                outlined
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
                Nahrát
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

.v-file-input /deep/ .v-input__prepend-outer {
    position: absolute;
    top: 0;
    left: 16px;
    margin-top: 16px;
    z-index: 100;
}

.v-file-input /deep/ .v-input__prepend-outer button {
    color: black;
}

.v-file-input /deep/ .v-input__slot {
    padding-left: 5em !important;
}

.v-btn {
    margin-top: 20px;
}

.v-btn:not(.v-btn--round).v-size--x-large {
    height: 60px;
    padding: 0 48px;
}

.v-btn.v-btn.v-btn--disabled.theme--dark:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #777777 !important;
    color: white !important;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class UploadForm extends Vue {
    phoneNumber = "+420";
    verificationCodeSent = false;
    verificationCode = "";
    file: File | null = null;

    valid = false;

    uploading = false;

    sendVerificationCode() {
        // TODO: send verification code to phone number
        this.verificationCodeSent = true;
    }

    submitFile() {
        this.uploading = true;
        // TODO: send verification code with file upload
        this.$emit("uploadFileEvent", this.file);
    }

    phoneNumberValidation(value: string) {
        return !!value.match(/^\+420\d{9}$/); // TODO: international phone numbers
    }

    verificationCodeValidation(value: string) {
        return !!value.match(/^\d{6}$/); // TODO: match with real verification code format
    }

    fileValidation(value: File | null) {
        return (
            (value && value.size < 200 * 1024 * 1024) ||
            "Maximální povolená velikost souboru je 200 MB"
        );
    }
}
</script>
