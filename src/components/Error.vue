<template>
    <v-container class="container">
        <div v-if="iconText" class="icon icon--text">{{ iconText }}</div>
        <v-icon v-else color="red darken-2" class="icon">{{
            icon || "mdi-alert-circle"
        }}</v-icon>
        <h1 class="text-center">{{ title }}</h1>
        <p class="description">
            <slot />
        </p>
        <v-btn color="#002DCF" x-large depressed :to="buttonLink" large>
            {{ buttonText }}
        </v-btn>
    </v-container>
</template>

<style scoped>
.container {
    padding-top: 60px;
    padding-bottom: 60px;
    text-align: center;
}

h1 {
    margin: 40px 0 20px 0;
    font-size: 36px;
    font-weight: 900;
}

.icon {
    display: block;
    margin: 0;
    margin-bottom: 40px;
    font-size: 72px;
}

.icon--text {
    font-weight: 900;
}

.v-btn {
    color: white;
    background-color: #002dcf !important;
    text-transform: none;
}

.description {
    margin-top: 20px;
    margin-bottom: 40px;
    line-height: 28px;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({})
export default class Error extends Vue {
    @Prop() icon!: string;
    @Prop() iconText!: string;
    @Prop() title!: string;
    @Prop() description!: string;
    @Prop() buttonText!: string;
    @Prop() buttonLink!: any;
}
</script>
