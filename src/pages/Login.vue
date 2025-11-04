<template>
    <v-container>
        <v-icon icon="mdi-arrow-left" @click="goBack" />
        <h1>Login</h1>
        <v-text-field />
        <v-text-field />
        <router-link to="/createAccount"> Sign up </router-link>
        <v-btn>Continue</v-btn>
    </v-container>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function goBack() {
    router.push("/")
}
</script>