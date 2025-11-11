<template>
    <v-container>
        <v-row>
            <v-col v-for="match in matches" :key="match._id" cols="12" md="4">
                <v-card>
                    <v-img :src="`/images/${match.photo}`" height="200px"></v-img>
                    <v-card-title>{{ match.name }}</v-card-title>
                    <v-card-subtitle>{{ match.gender }}</v-card-subtitle>
                    <v-card-subtitle>{{ match.interest }}</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useLikeStore } from "@/stores/likeStore";

const likeStore = useLikeStore();
const matches = ref([]);

async function fetchMatches() {
    try {
        const userId = localStorage.getItem("userId"); 
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }
        const response = await likeStore.matches(userId);
        matches.value = response;
    } catch (err) {
        console.error("Failed to fetch matches:", err);
    }
}

onMounted(() => {
    fetchMatches();
});
</script>