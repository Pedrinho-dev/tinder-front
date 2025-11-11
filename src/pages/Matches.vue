<template>
    <v-container class="pa-0 users-page">
        <div v-if="receivedLikes.length === 0" class="no-likes-message">
            Any user liked you
        </div>

        <v-row v-else class="users-grid">
            <v-col v-for="user in receivedLikes" :key="user.id" cols="12" md="4">
                <v-card class="user-card">
                    <v-card-title class="user-title">{{ user.liker.name }}</v-card-title>
                    <v-card-subtitle class="user-subtitle">{{ user.liker.gender }}</v-card-subtitle>
                    <v-card-actions class="user-actions">
                        <v-btn class="details-btn" @click="showDetails(user)">See Details</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog v-model="isModalOpen" max-width="500px">
            <v-card class="details-card">
                <v-card-title class="details-title">User Details</v-card-title>
                <v-card-text class="details-text">
                    <p><strong>Name:</strong> {{ selectedUser?.liker.name }}</p>
                    <p><strong>Gender:</strong> {{ selectedUser?.liker.gender }}</p>
                    <p><strong>Date of Birth:</strong> {{ selectedUser?.liker.date }}</p>
                    <p><strong>Interests:</strong> {{ selectedUser?.liker.interest?.join(', ') }}</p>
                </v-card-text>
                <v-card-actions class="details-actions">
                    <v-btn color="primary" class="close-btn" @click="isModalOpen = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useLikeStore } from "@/stores/likeStore";

const likeStore = useLikeStore();
const receivedLikes = ref([]);
const isModalOpen = ref(false);
const selectedUser = ref(null);

async function fetchReceivedLikes() {
    try {
        const userId = localStorage.getItem("userId");
        const likes = await likeStore.receivedLike(userId);
        receivedLikes.value = likes;
    } catch (err) {
        console.error("Failed to fetch received likes:", err);
    }
}

function showDetails(user) {
    selectedUser.value = user;
    isModalOpen.value = true;
}

onMounted(() => {
    fetchReceivedLikes();
});
</script>

<style scoped>
.users-page {
    min-height: 100vh;
    background: radial-gradient(circle at top, #1b0935 0%, #0d061b 55%, #090615 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 22px 0 90px;
    text-align: center;
}

.no-likes-message {
    color: rgba(255, 255, 255, 0.8);
    font-size: 15px;
    margin-top: 120px;
    background: rgba(255, 255, 255, 0.05);
    padding: 14px 22px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.users-grid {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    row-gap: 16px;
}

.user-card {
    background: linear-gradient(180deg, #2a174c 0%, #130a24 100%);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 16px;
    color: #fff;
    min-height: 150px;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
}

.user-title {
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    padding-bottom: 2px;
}

.user-subtitle {
    color: rgba(255, 255, 255, 0.75);
    font-size: 12px;
}

.user-actions {
    padding: 8px 16px 16px;
    display: flex;
    justify-content: flex-start;
}

.details-btn {
    border-radius: 999px;
    text-transform: none;
    font-weight: 600;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.12);
}

.details-card {
    background: linear-gradient(180deg, #2a174c 0%, #130a24 100%);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 16px;
}

.details-title {
    color: #fff;
    font-weight: 700;
}

.details-text p {
    margin: 6px 0;
    color: rgba(255, 255, 255, 0.9);
}

.details-actions {
    justify-content: flex-end;
    padding: 12px 16px 16px;
}

.close-btn {
    border-radius: 999px;
    text-transform: none;
    font-weight: 600;
    background: linear-gradient(120deg, #ff4d7a 0%, #8458ff 100%);
    color: #fff;
}

@media (max-width: 600px) {
    .users-page {
        padding: 12px 8px 90px;
    }
}
</style>
