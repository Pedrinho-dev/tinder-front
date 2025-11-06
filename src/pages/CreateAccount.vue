<template>
    <v-container>
        <v-icon icon="mdi-arrow-left" @click="goBack" />
        <h1>Profile Details</h1>
        <h4>Fill up the following Details</h4>

        <form @submit.prevent="save">
            <div>
                <v-btn icon>
                    <label for="photo" style="cursor: pointer; margin: 0;">
                        <v-icon icon="mdi-account" />
                    </label>
                </v-btn>
                <input id="photo" type="file" name="foto" style="display: none" @change="handlePhoto">
            </div>

            <v-text-field v-model="name" label="First name" />
            <v-text-field v-model="password" label="Password" />
            <v-date-input v-model="date" label="DOB" />
            <v-select v-model="gender" label="Select" :items="['Female', 'Male']" />

            <v-btn @click="save">Continue</v-btn>

        </form>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const name = ref("");
const password = ref("");
const date = ref("");
const gender = ref("");
const photo = ref(null);

function goBack() {
    router.push("/login");
}

function handlePhoto(event) {
    const file = event.target.files[0];
    if (file) {
        photo.value = file;
        alert("Foto capturada com sucesso!");
    }
}

async function save() {
    try {
        if (!name.value || !password.value || !date.value || !gender.value || !photo.value) {
            alert("Preencha todos os campos!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("password", password.value);
        formData.append("date", date.value);
        formData.append("gender", gender.value);
        const file = document.querySelector("#photo").files[0];
        formData.append("photo", file);

        await authStore.register(formData);
        alert("Usuário criado com sucesso!");
        router.push('/login')
    } catch (err) {
        console.error("Erro ao criar usuário:", err);
    }
}
</script>