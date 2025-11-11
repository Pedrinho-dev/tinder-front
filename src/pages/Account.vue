<template>
    <v-container>
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
            <v-text-field v-model="password" label="Password" type="password"/>
            <v-date-input v-model="date" label="DOB" />
            <v-select v-model="gender" label="Gender" :items="['Female', 'Male']" />
            <v-select v-model="interest" label="Interest"
                :items="['Photografy', 'Animals', 'Food', 'Video Games', 'Movies', 'Fitness']" multiple />

            <v-btn @click="save">Continue</v-btn>
        </form>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const name = ref("");
const password = ref("");
const date = ref("");
const gender = ref("");
const interest = ref([]);
const photo = ref(null);

function handlePhoto(event) {
    const file = event.target.files[0];
    if (file) {
        photo.value = file;
        alert("Foto capturada com sucesso!");
    }
}

async function save() {
    try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("User ID not found!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("password", password.value);
        formData.append("date", date.value);
        formData.append("gender", gender.value);
        interest.value.forEach((item) => formData.append("interest", item)); // Adiciona cada interesse ao FormData
        if (photo.value) {
            formData.append("photo", photo.value);
        }

        await userStore.editProfile(userId, formData);
        alert("User successfuly edited!");
    } catch (err) {
        console.error("Error:", err);
    }
}


onMounted(async () => {
    try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("User ID not found!");
            return;
        }

        const user = await userStore.getUserById(userId); 
        if (user) {
            name.value = user.name;
            date.value = user.date;
            gender.value = user.gender;
            interest.value = user.interest || [];
        }
    } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
    }
});
</script>