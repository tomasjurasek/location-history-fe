<template>
    <v-container>
        <v-row align="center" justify="center" no-gutters>
            <v-col md="10">
                <h1 class="text-center">
                    {{ title }}
                </h1>
                <v-progress-linear
                    class="progress"
                    color="#5CB120"
                    height="16"
                    indeterminate
                    rounded
                />
                <p class="text-center description">
                    {{ description }}
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
h1 {
    margin: 40px 0;
    font-size: 36px;
    font-weight: 900;
}

.progress {
    margin: 40px auto;
    max-width: 530px;
    border-radius: 8px;
}

.progress /deep/ .v-progress-linear__background {
    background-color: #d8d8d8 !important;
}

.progress /deep/ .v-progress-linear__indeterminate.long,
.progress /deep/ .v-progress-linear__indeterminate.short {
    border-radius: 8px;
}

.description {
    font-size: 16px;
    line-height: 28px;
    color: #666666;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({})
export default class Loading extends Vue {
    @Prop() title!: string;
    @Prop() description!: string;
}
</script>
