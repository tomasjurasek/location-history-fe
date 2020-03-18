<template>
    <div>
        <Uploading :status="UploadStatus.PROCESSING" />
    </div>
</template>

<style scoped></style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Uploading from "./Uploading.vue";
import axios from "axios";
import { UploadStatus } from "@/types/UploadStatus";

@Component({
    components: { Uploading }
})
export default class Home extends Vue {
    id = "";
    token = "";

    UploadStatus = UploadStatus;

    mounted() {
        this.id = this.$route.params.id;
        this.token = this.$route.query.token as string;

        this.checkStatusAndRedirectWhenDone();
    }

    async checkStatusAndRedirectWhenDone() {
        // TODO: check for status endpoint
        const url = `${process.env.VUE_APP_API_URL}/users/${this.id}/locations`;
        const params = { token: this.token };
        try {
            const response = await axios.get(url, { params });
            this.$router.push({
                name: "LocationHistory",
                params: { id: this.id },
                query: { token: this.token }
            });
        } catch (error) {
            this.$router.push({
                name: "Error"
            });
        }
    }
}
</script>
