<template>
    <div>
        <h2>Jaký máte chytrý telefon?</h2>
        <v-row>
            <v-col class="choices">
                <v-sheet @click="chooseAndroid" class="choice choice--android">
                    <v-icon class="choice__icon"
                        >mdi-android-debug-bridge</v-icon
                    >
                    <h3 class="choice__title">Android</h3>
                    <p class="choice__description">
                        Samsung, Huawei,<br />Xiaomi, Honor, LG, Google,<br />Motorola,
                        Nokia, ...
                    </p>
                </v-sheet>
                <v-sheet @click="chooseiPhone" class="choice choice--apple">
                    <v-icon class="choice__icon">mdi-apple</v-icon>
                    <h3 class="choice__title">iPhone</h3>
                    <p class="choice__description">
                        Telefon od Apple<br />
                        (s jablkem na zadní straně)
                    </p>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
h2 {
    margin: 36px 0;
    color: #ffdf00;
    font-size: 24px;
    text-align: center;
}

.choices {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.choice {
    position: relative;
    flex: 0 1 auto;
    margin: 8px 20px;
    width: 340px;
    min-height: 312px;
    border-radius: 8px;
    padding: 50px 30px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.choice::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 8px;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.2s ease-in-out;
}

.choice:hover {
    transform: scale(1.02);
}

.choice:hover::after {
    opacity: 1;
}

.choice__icon {
    margin-bottom: 40px;
    color: black !important;
    font-size: 60px !important;
}

.choice--android .choice__icon {
    color: rgb(92, 177, 32) !important;
}

.choice__title {
    margin: 16px 0;
    font-size: 20px;
}

.choice__description {
    margin: 0;
    font-size: 15px;
    color: #444444;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class ChooseDevice extends Vue {
    chooseAndroid() {
        this.$emit("chooseAndroidDeviceEvent");
    }
    chooseiPhone() {
        this.$emit("chooseAppleDeviceEvent");
    }
}
</script>
