<template>
    <v-container class="pa-0 profile-page">
        <div class="profile-wrapper">
            <v-icon icon="mdi-arrow-left" class="back-icon" @click="goBack" />
            <h1 class="title">Profile Details</h1>
            <h4 class="subtitle">Fill up the following Details</h4>
            <form @submit.prevent="save" class="profile-form">
                <div class="avatar-wrapper">
                    <div class="avatar-circle">
                        <v-icon icon="mdi-account" class="avatar-icon" />
                    </div>
                    <v-btn icon class="camera-btn" variant="flat" size="small">
                        <label for="photo" style="cursor: pointer; margin: 0;">
                            <v-icon icon="mdi-camera" class="camera-icon" />
                        </label>
                    </v-btn>
                    <input id="photo" type="file" name="foto" style="display: none" @change="handlePhoto">
                </div>
                <v-text-field v-model="name" label="First name" variant="solo" class="gradient-input" hide-details />
                <v-text-field v-model="password" label="Password" variant="solo" class="gradient-input" type="text"
                    hide-details />
                <v-date-input v-model="date" label="DOB" variant="solo" class="gradient-input" hide-details
                    prepend-inner-icon="mdi-calendar" />
                <v-select v-model="gender" label="Select" :items="['Female', 'Male']" variant="solo"
                    class="gradient-input" hide-details prepend-inner-icon="mdi-menu-down" />
                <v-btn class="continue-btn" @click="save" block>Continue</v-btn>
            </form>
        </div>
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
        router.push("/login");
    } catch (err) {
        console.error("Erro ao criar usuário:", err);
    }
}
</script>

<style scoped>
.profile-page {
    min-height: 100vh;
    background: #3a4a63;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-wrapper {
    width: 280px;
    background: radial-gradient(circle at top, #15102E 0%, #090915 60%, #060816 100%);
    border-radius: 16px;
    padding: 20px 18px 26px;
    position: relative;
}

.back-icon {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 10px;
}

.title {
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 2px;
}

.subtitle {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    margin-bottom: 22px;
}

.profile-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.avatar-wrapper {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    position: relative;
}

.avatar-circle {
    width: 96px;
    height: 96px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.02);
}

.avatar-icon {
    color: rgba(255, 255, 255, 0.7);
    font-size: 38px;
}

.camera-btn {
    position: absolute;
    bottom: 4px;
    right: 7px;
    width: 28px;
    height: 28px;
    min-width: 0;
    border-radius: 50%;
    padding: 0;
    background: linear-gradient(120deg, #ff4d7a 0%, #8458ff 100%);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.camera-icon {
    color: #fff;
    font-size: 15px;
}

.gradient-input :deep(.v-field) {
    background: transparent !important;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
}

.gradient-input :deep(.v-field__overlay) {
    background: rgba(0, 0, 0, 0.15) !important;
}

.gradient-input :deep(input),
.gradient-input :deep(.v-field__input),
.gradient-input :deep(.v-select__selection-text) {
    color: #fff !important;
}

.gradient-input :deep(.v-label) {
    color: rgba(255, 255, 255, 0.6) !important;
}

.gradient-input :deep(.v-field--variant-solo) {
    box-shadow: none !important;
}

.continue-btn {
    border-radius: 999px;
    background: linear-gradient(120deg, #ff4d7a 0%, #8458ff 100%);
    color: #fff;
    text-transform: none;
    font-weight: 600;
    height: 42px;
    box-shadow: 0 12px 25px rgba(132, 88, 255, 0.28);
}

@media (max-width: 600px) {
    .profile-page {
        background: transparent;
        padding: 0;
        min-height: 100vh;
    }

    .profile-wrapper {
        width: 100vw;
        min-height: 100vh;
        border-radius: 0;
        padding: 26px 20px 30px;
    }
}
</style>
