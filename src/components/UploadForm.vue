<template>
    <v-form v-model="valid" ref="form">
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
                :loading="verificationCodeSending"
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
                v-model="file"
                label="Soubor"
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

.v-file-input /deep/ .v-input__slot {
    padding-left: 12px !important;
}

.v-file-input /deep/ .v-input__prepend-inner {
    padding-right: 24px !important;
}

.v-input /deep/ .v-messages.error--text {
    color: var(--v-error-lighten4) !important;
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
    $refs!: {
        form: Vue & { resetValidation: () => void };
    };

    phoneNumber = "+420";
    verificationCodeSending = false;
    verificationCodeSent = false;
    verificationCode = "";
    file: File | null = null;

    valid = false;

    uploading = false;

    async sendVerificationCode() {
        this.verificationCodeSending = true;
        // TODO: send verification code to phone number
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.verificationCodeSending = false;
        this.verificationCodeSent = true;
        this.$refs.form.resetValidation();
    }

    submitFile() {
        this.uploading = true;
        // TODO: send verification code with file upload
        this.$emit("uploadFileEvent", this.file);
    }

    phoneNumberValidation(value: string) {
        // TODO: international phone numbers?
        if (!value.match(/^\+420\d{9}$/)) {
            return "Povolený formát telefonního čísla je +420nnnnnnnnn";
        }
        return true;
    }

    verificationCodeValidation(value: string) {
        // TODO: match with real verification code format
        if (!value.match(/^\d{6}$/)) {
            return "Očekávaný formát ověřovacího kódu je nnnnnn";
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
