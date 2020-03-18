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

    UploadStatus = UploadStatus;

    mounted() {
        this.id = this.$route.params.id;

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
