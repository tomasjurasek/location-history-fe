<template>
    <div>
        <Instructions :uploading="uploading" @upload-file="uploadFile" />
        <footer>Footer. Zpracování dat, odkazy, atd.</footer>
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
import ChooseDevice from "@/components/ChooseDevice.vue";
import Loading from "@/components/Loading.vue";
import axios from "axios";

@Component({
    components: { UploadForm, Instructions, Loading, ChooseDevice }
})
export default class Home extends Vue {
    uploading = false;
    choosedAndroidDevice = false;
    choosedAppleDevice = false;

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

    chooseAndroidDevice() {
        console.log("droid");

        this.choosedAndroidDevice = true;
    }

    chooseAppleDevice() {
        console.log("orange");

        this.choosedAppleDevice = true;
    }
}
</script>
