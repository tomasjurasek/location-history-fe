<template>
    <div>
        <IntroForm v-if="!uploading" />
        <Uploading v-if="uploading" :status="uploadStatus" />
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
    uploadStatus: UploadStatus | null = null;

    mounted() {
        console.log("Registering ");
        this.$root.$on("upload-file", (file: any) => {
            console.log("Event fired ", event);
            this.uploadFile(file);
        });
    }

    async uploadFile(file: any) {
        this.uploading = true;
        this.uploadStatus = UploadStatus.UPLOADING;
        console.log("Received upload file event", event);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const url = `${process.env.VUE_APP_API_URL}/users/file`;
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            this.uploadStatus = UploadStatus.PROCESSING;
            this.id = response.data.id;
            console.log(this.id);
        } catch (e) {
            this.$router.push({
                name: "Error"
            });
        }

        this.checkStatusAndRedirectWhenDone();
    }

    async checkStatusAndRedirectWhenDone() {
        // TODO: check for status endpoint
        const url = `${process.env.VUE_APP_API_URL}/users/${this.id}/locations`;
        const response = await axios.get(url);
        const locations = response.data;
        console.log(locations);

        if (locations && locations.length) {
            this.$router.push({
                name: "LocationHistory",
                params: { id: this.id }
            });
        } else {
            setTimeout(() => this.checkStatusAndRedirectWhenDone(), 10 * 1000);
        }
    }
}
</script>
