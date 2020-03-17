<template>
    <div class="form">
        <v-alert class="failed" type="warning" v-if="uploadFailed">
            <strong>Něco se pokazilo!</strong> <br />
            Prosím, zkuste to znovu.
        </v-alert>
        <v-file-input
            class="file-input"
            placeholder="Vybrat soubor"
            accept=".zip"
            v-model="file"
            background-color="white"
            hide-details
            outlined
        ></v-file-input>
        <v-btn
            class="upload-button"
            v-on:click="submitFile()"
            :disabled="!file"
            :loading="loading"
            color="success"
            x-large
            elevation="0"
            dark
            >Nahrát</v-btn
        >
    </div>
</template>

<style scoped>
.failed {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.form {
    text-align: center;
}

.file-input {
    max-width: 600px;
    margin: 0 auto !important;
}

.file-input /deep/ .v-input__prepend-outer {
    position: absolute;
    top: 0;
    left: 16px;
    margin-top: 16px;
    z-index: 100;
}

.file-input /deep/ .v-input__prepend-outer button {
    color: black;
}

.file-input /deep/ .v-input__slot {
    padding-left: 5em !important;
}

.upload-button {
    height: 60px !important;
    min-width: 200px !important;
    margin-top: 20px;
}

.upload-button.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #777777 !important;
    color: white !important;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { locationHistoryStorage } from "@/services/LocationHistoryStorage";

@Component({})
export default class UploadForm extends Vue {
    file: any = null;
    uploadFailed = false;
    loading = false;
    id: string = this.generateId();

    generateId() {
        return (
            this.rand3Digits() +
            "-" +
            this.rand3Digits() +
            "-" +
            this.rand3Digits()
        );
    }

    rand3Digits() {
        return ("000" + Math.floor(Math.random() * 1000)).slice(-3);
    }

    submitFile() {
        this.uploadFailed = false;
        this.loading = true;
        const formData = new FormData();
        formData.append("file", this.file);
        axios
            .post(
                `${process.env.VUE_APP_API_URL}/users/${this.id}/file`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            .then(response => {
                this.loading = false;
                locationHistoryStorage.save(response.data);
                this.$router.push({ path: "map" });
            })
            .catch(e => {
                this.loading = false;
                this.uploadFailed = true;
                console.log("Chybka", e);
            });
    }
}
</script>
