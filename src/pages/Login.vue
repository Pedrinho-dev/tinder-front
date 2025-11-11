<template>
    <v-container class="login-screen" fluid>
        <v-row justify="center" align="center" class="full-height">
            <v-col cols="12" sm="8" md="6" class="text-center">
                <v-icon class="back-icon" icon="mdi-arrow-left" @click="goBack" />
                <h1 class="login-title">Login</h1>
                <v-img class="logo" src="../assets/LogoTinder.png" />
                <p class="app-subtitle">Online Dating App</p>
                <v-text-field v-model="name" label="Email" outlined class="input-field" />
                <v-text-field v-model="password" label="Password" type="password" outlined class="input-field" />
                <router-link to="/createAccount" class="sign-up-link">Sign up</router-link>
                <v-btn class="continue-btn" @click="login">Continue</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const name = ref('');
const password = ref('');

function goBack() {
    router.push('/');
}

async function login() {
    const user = { name: name.value, password: password.value };
    await authStore.login(user);
    if (localStorage.getItem('token')) {
        router.push('/interest');
        alert(`Welcome: ${name.value}`);
    } else {
        alert('Login failed!');
    }
}
</script>

<style scoped>
.login-screen {
    background: radial-gradient(circle at top, #1b0935 0%, #0d061b 60%, #090615 100%);
    color: white;
}

.full-height {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly; 
    align-items: center;
    padding: 60px;
}

.back-icon {
    font-size: 24px;
    color: white;
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
}

.login-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.logo {
    width: 100px;
    margin: 20px auto;
}

.app-subtitle {
    font-size: 1rem;
    margin-bottom: 30px;
}

.input-field {
    width: 100%;
    max-width: 300px;
    margin: 10px auto;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
}

.sign-up-link {
    display: block;
    margin: 10px auto;
    color: #ff4081;
    text-decoration: none;
    font-size: 0.9rem;
}

.continue-btn {
    background: linear-gradient(90deg, #ff4081, #673ab7);
    color: white;
    font-weight: bold;
    border-radius: 25px;
    padding: 10px 20px;
    width: 100%;
    max-width: 300px;
    margin: 20px auto;
}
</style>