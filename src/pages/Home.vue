<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-btn color="primary" class="mb-4" @click="logout">
                    Logout
                </v-btn>

                <FlashCards :items="items" @approve="handleSwipeApprove" @reject="handleSwipeReject">
                    <template #default="{ item }">
                        <TinderCard :item="item" />
                    </template>

                    <template #empty>
                        <v-card class="text-center pa-10">
                            <v-card-title>No more users!</v-card-title>
                        </v-card>
                    </template>

                    <template #actions="{ approve, reject, restore, isEnd, canRestore }">
                        <v-row justify="center" align="center" class="mt-5" no-gutters>

                            <v-btn icon color="red" :disabled="isEnd" class="mx-2" @click="handleReject(reject)">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>

                            <v-btn icon color="green" :disabled="isEnd || !currentItem" class="mx-2"
                                @click="handleLike(approve)">
                                <v-icon>mdi-thumb-up</v-icon>
                            </v-btn>
                        </v-row>

                    </template>
                </FlashCards>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { FlashCards } from "vue3-flashcards";
import { useUserStore } from "@/stores/userStore";
import { useLikeStore } from "@/stores/likeStore";
import TinderCard from "@/components/TinderCard.vue";

const router = useRouter();
const user = useUserStore();
const likeStore = useLikeStore();

const items = ref([]);
const loggedUserId = localStorage.getItem("userId");

const currentIndex = ref(0);

watch(
    () => user.users,
    (newUsers) => {
        items.value = newUsers.filter((u) => u.id !== loggedUserId);
        currentIndex.value = 0;
    },
    { immediate: true }
);

onMounted(() => {
    user.findUsers();
});

const currentItem = computed(() => {
    return items.value[currentIndex.value] ?? null;
});

function nextCard() {
    currentIndex.value = Math.min(
        currentIndex.value + 1,
        items.value.length - 1
    );
}

const handleLike = async (approveFn) => {
    const item = currentItem.value;
    if (!item) {
        console.warn("No cards!");
        return;
    }
    try {
        await likeStore.sendLike({ likedId: item.id });
        approveFn();
        nextCard();
    } catch (err) {
        console.error("Error to send", err);
    }
};

const handleSwipeApprove = async (item) => {
    if (!item) return;
    try {
        await likeStore.sendLike({ likedId: item.id });
    } catch (err) {
        console.error("Error to send (swipe)", err);
    }
    nextCard()
};


const handleReject = (rejectFn) => {
    rejectFn();
    nextCard()
};


const handleSwipeReject = () => {
    nextCard()
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
};
</script>
