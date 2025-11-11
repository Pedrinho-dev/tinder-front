<template>
    <v-container>
        <v-row>
            <v-col v-for="user in receivedLikes" :key="user.id" cols="12" md="4">
                <v-card>
                    <v-card-title>{{ user.liker.name }}</v-card-title>
                    <v-card-subtitle>{{ user.liker.gender }}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn @click="showDetails(user)">See Details</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog v-model="isModalOpen" max-width="500px">
            <v-card>
                <v-card-title>User Details</v-card-title>
                <v-card-text>
                    <p><strong>Name:</strong> {{ selectedUser?.liker.name }}</p>
                    <p><strong>Gender:</strong> {{ selectedUser?.liker.gender }}</p>
                    <p><strong>Date of Birth:</strong> {{ selectedUser?.liker.date }}</p>
                    <p><strong>Interests:</strong> {{ selectedUser?.liker.interest?.join(', ') }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="isModalOpen = false">Close</v-btn>
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