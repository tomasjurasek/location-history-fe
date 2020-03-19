<template>
    <div class="form">
        <v-file-input
            class="file-input"
            placeholder="Vybrat soubor"
            accept=".zip"
            v-model="file"
            background-color="white"
            hide-details
            outlined
        />
        <v-btn
            class="upload-button"
            v-on:click="submitFile()"
            :loading="uploading"
            :disabled="!file"
            color="success"
            x-large
            depressed
            dark
        >
            Nahrát
        </v-btn>
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
import { Prop } from "vue-property-decorator";
import axios from "axios";

@Component({})
export default class UploadForm extends Vue {
    uploading = false;
    file: File | null = null;

    submitFile() {
        this.uploadFile(this.file!);
    }

    async uploadFile(file: File) {
        this.uploading = true;

        try {
            const formData = new FormData();
            formData.append("file", file);
            const url = `${process.env.VUE_APP_API_URL}/users/file`;
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            this.$router.push({
                name: "LocationHistory",
                params: { id: response.data.id },
                query: { token: response.data.token }
            });
        } catch (e) {
            this.$router.push({
                name: "Error"
            });
        }
    }
}
</script>
