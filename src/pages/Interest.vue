<template>
    <router-link to="/home"> Skip </router-link>
    <h1>Likes, Interest</h1>
    <v-btn v-for="item in interests" :key="item" @click="selectInterest(item)" class="text-none"
        :color="interestSelected.includes(item) ? 'primary' : 'medium-emphasis'" min-width="92" variant="outlined"
        rounded>
        {{ item }}
    </v-btn>

    <v-btn @click="saveInterest" color="medium-emphasis" min-width="92" variant="flat" rounded style="background: linear-gradient(90deg,rgba(255, 0, 212, 1) 0%, rgba(235, 56, 235, 1) 35%, rgba(105, 128, 194, 1) 100%);
">
        Continue
    </v-btn>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore.js";

const router = useRouter();
const user = useUserStore();

const interests = ["Photografy", "Animals", "Food", "Video Games", "Movies", "Fitness"];
const interestSelected = ref([]);

async function selectInterest(item) {
    const index = interestSelected.value.indexOf(item);
    if (index === -1) {
        interestSelected.value.push(item);
    } else {
        interestSelected.value.splice(index, 1);
    }
    console.log(interestSelected.value);
}

async function saveInterest() {
    const userId = localStorage.getItem("userId");
    if (interestSelected.value.length === 0) {
        alert("Please select at least one interest.");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("interest", JSON.stringify(interestSelected.value));

        await user.editProfile(userId, formData);
        alert("Interests successfully added!");
        router.push("/home");
    } catch (err) {
        alert("Failed to save interests. Please try again.");
    }
}
</script>