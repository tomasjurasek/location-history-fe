<template>
    <div>
        <IntroForm v-if="!loading"></IntroForm>
        <Loading v-if="loading"></Loading>
    </div>
</template>

<style scoped></style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UploadForm from "@/components/UploadForm.vue";
import Instructions from "./Instructions.vue";
import IntroForm from "@/components/IntroForm.vue";
import Loading from "./Loading.vue";
import axios from "axios";
import { locationHistoryStorage } from "@/services/LocationHistoryStorage";

@Component({ components: { UploadForm, Instructions, IntroForm, Loading } })
export default class Home extends Vue {
    loading = false;
    uploadFailed = false;

    mounted() {
        console.log("Registering ");
        this.$root.$on("upload-file", (file: any) => {
            console.log("Event fired ", event);
            this.uploadFile(file);
        });
    }

    uploadFile(file: any) {
        this.loading = true;
        console.log("Received upload file event", event);
        const formData = new FormData();
        formData.append("file", file);
        axios
            .post(`${process.env.VUE_APP_API_URL}/users/file`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                this.loading = false;
                console.log(response.data.id);
                this.$router.push({
                    name: "Done",
                    params: { id: response.data.id }
                });
            })
            .catch(e => {
                this.loading = false;
                console.log("Chybka", e);
                this.$router.push({
                    name: "Error"
                });
            });
    }
}
</script>
