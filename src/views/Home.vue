<template>
    <div>
        <IntroForm v-if="!uploading" @upload-file="uploadFile" />
        <Uploading v-if="uploading" :status="UploadStatus.UPLOADING" />
    </div>
</template>

<style scoped></style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UploadForm from "@/components/UploadForm.vue";
import Instructions from "./Instructions.vue";
import IntroForm from "@/components/IntroForm.vue";
import Uploading from "./Uploading.vue";
import axios from "axios";
import { UploadStatus } from "@/types/UploadStatus";

@Component({
    components: { UploadForm, Instructions, IntroForm, Uploading }
})
export default class Home extends Vue {
    id = "";
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

            this.id = response.data.id;

            this.$router.push({
                name: "Status",
                params: { id: this.id }
            });
        } catch (e) {
            this.$router.push({
                name: "Error"
            });
        }
    }
}
</script>
