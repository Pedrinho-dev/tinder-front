<template>
    <v-container>
        <v-icon icon="mdi-arrow-left" @click="goBack" />
        <h1>Profile Details</h1>
        <h4>Fill up the following Details</h4>
        <v-text-field v-model="name" label="First name" />
        <v-text-field v-model="password" label="Password" />
        <v-date-input v-model="date" label="DOB" />
        <v-select v-model="gender" label="Select" :items="['Female', 'Male']" />

        <v-btn @click="save">Continue</v-btn>
    </v-container>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const name = ref("");
const password = ref("");
const date = ref("");
const gender = ref("");

function goBack() {
    router.push("/login")
}

async function save() {
    try {
        const userData = {
            name: name.value,
            password: password.value,
            date: date.value,
            gender: gender.value
        };
        await userStore.createUser(userData);
        alert("Usuário criado com sucesso!");
    }catch(err){
        console.error(err)
    }
}
</script>