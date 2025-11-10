<template>
    <v-container>
        <v-icon icon="mdi-arrow-left" @click="goBack" />
        <h1>Login</h1>
        <v-text-field v-model="name" label="Name" />
        <v-text-field v-model="password" label="Password" />
        <router-link to="/createAccount"> Sign up </router-link>
        <v-btn @click="login">Login</v-btn>
    </v-container>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref } from "vue";
import { useAuthStore } from '@/stores/authStore';


const router = useRouter();
const authStore = useAuthStore();

const name = ref("");
const password = ref("");


function goBack() {
    router.push("/")
}

async function login() {
    const user = { name: name.value, password: password.value };
    await authStore.login(user);
    if (localStorage.getItem('token')) {
        router.push('/home')
        alert(`Welcome: ${name.value}`);
    } else {
        alert('Login failed!')
    }

}
</script>