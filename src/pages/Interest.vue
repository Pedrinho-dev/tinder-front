<template>
    <v-container class="pa-0 interest-page" fluid>
        <div class="interest-wrapper">
            <div class="top-bar">
                <v-icon icon="mdi-arrow-left" class="back-icon" @click="goBack" />
                <router-link to="/home" class="skip-link">Skip</router-link>
            </div>
            <h1 class="title">Likes, Interests</h1>
            <p class="subtitle">Share your likes & passion with others</p>

            <div class="interest-grid">
                <v-btn v-for="item in interests" :key="item" @click="selectInterest(item)" class="interest-btn"
                    :class="{ active: interestSelected.includes(item) }" variant="outlined" rounded>
                    <v-icon v-if="icons[item]" :icon="icons[item]" size="18" />
                    {{ item }}
                </v-btn>
            </div>

            <v-btn class="continue-btn" @click="saveInterest">Continue</v-btn>
        </div>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore.js";

const router = useRouter();
const user = useUserStore();

const interests = [
    "Photography", "Cooking", "Video Games", "Music",
    "Travelling", "Shopping", "Speeches", "Art & Crafts",
    "Swimming", "Drinking", "Extreme Sports", "Fitness"
];

const icons = {
    "Photography": "mdi-camera",
    "Cooking": "mdi-silverware-fork-knife",
    "Video Games": "mdi-gamepad-variant",
    "Music": "mdi-music",
    "Travelling": "mdi-airplane",
    "Shopping": "mdi-shopping",
    "Speeches": "mdi-microphone",
    "Art & Crafts": "mdi-palette",
    "Swimming": "mdi-pool",
    "Drinking": "mdi-glass-cocktail",
    "Extreme Sports": "mdi-ski",
    "Fitness": "mdi-dumbbell"
};

const interestSelected = ref([]);

function goBack() {
    router.push("/login");
}

function selectInterest(item) {
    const index = interestSelected.value.indexOf(item);
    if (index === -1) interestSelected.value.push(item);
    else interestSelected.value.splice(index, 1);
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

<style scoped>
.interest-page {
    min-height: 100vh;
    background: radial-gradient(circle at top, #1b0935 0%, #0d061b 60%, #090615 100%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.interest-wrapper {
    width: 100%;
    max-width: 420px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 26px 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
}

.top-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.back-icon {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
}

.skip-link {
    color: #ff4d7a;
    font-size: 13px;
    text-decoration: none;
}

.title {
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    margin-top: 6px;
}

.subtitle {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    margin-bottom: 4px;
}

.interest-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(130px, 1fr));
    gap: 12px;
    width: 100%;
}

.interest-btn {
    width: 100%;
    justify-content: center;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    text-transform: none;
    font-size: 13px;
    font-weight: 500;
    gap: 6px;
}

.interest-btn.active {
    border: 1px solid #ff4d7a;
    color: #fff;
    background: rgba(255, 77, 122, 0.08);
}

.continue-btn {
    border-radius: 999px;
    background: linear-gradient(120deg, #ff4d7a 0%, #8458ff 100%);
    color: #fff;
    text-transform: none;
    font-weight: 600;
    height: 42px;
    box-shadow: 0 12px 25px rgba(132, 88, 255, 0.28);
    width: 180px;
    margin-top: 50px;
}

@media (max-width: 600px) {
    .interest-wrapper {
        max-width: none;
        min-height: 100vh;
    }

    .interest-grid {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
