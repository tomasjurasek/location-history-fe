<template>
    <div>
        <Loading
            v-if="uploading"
            title="Nahrávání ..."
            description="Mějte strpení, data se mohou nahrávat několik minut."
        />
        <div v-if="!uploading">
            <v-container class="header" fluid>
                <v-row align="center" justify="center" no-gutters>
                    <v-col md="10">
                        <h2 class="header__title">
                            Pomozte zjistit historii vaší polohy
                        </h2>
                        <p class="short-instructions">
                            Historii polohy stáhněte z Google podle
                            <a href="#navod">návodu níže</a>.<br />
                            Výsledný soubor (nazvaný např.
                            <strong>takeout-20200315T062605Z-001.zip</strong>)
                            nahrajte zde:
                        </p>
                        <UploadForm @upload-file="uploadFile" />
                    </v-col>
                </v-row>
            </v-container>
            <Instructions />
            <footer>
                Footer. Zpracování dat, odkazy, atd.
            </footer>
        </div>
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

.short-instructions {
    padding: 20px;
    font-weight: 300;
}

.short-instructions a {
    color: inherit;
}

footer {
    padding: 90px;
    background-color: rgba(65, 65, 65);
    color: white;
    text-align: center;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UploadForm from "@/components/UploadForm.vue";
import Instructions from "@/components/Instructions.vue";
import Loading from "@/components/Loading.vue";
import axios from "axios";
import { UploadStatus } from "@/types/UploadStatus";

@Component({
    components: { UploadForm, Instructions, Loading }
})
export default class Home extends Vue {
    uploading = false;

    UploadStatus = UploadStatus;

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
