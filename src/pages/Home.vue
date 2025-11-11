<template>

    <v-container class="home-page pa-0" fluid>
        <v-row justify="center" class="home-row">
            <v-col cols="12" md="6" class="home-col">
                <div class="card-area">
                    <h2 class="homeText">Home</h2>
                    <FlashCards :items="items" @approve="handleSwipeApprove" @reject="handleSwipeReject">
                        <template #default="{ item }">
                            <TinderCard :item="item" />
                        </template>

                        <template #empty>
                            <v-card class="text-center pa-10 empty-card">
                                <v-card-title>No more users!</v-card-title>
                            </v-card>
                        </template>

                        <template #actions="{ approve, reject, restore, isEnd, canRestore }">
                            <v-row justify="center" align="center" class="actions-row" no-gutters>
                                <v-btn icon color="red" :disabled="isEnd" class="mx-2 action-btn"
                                    @click="handleReject(reject)">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>

                                <v-btn icon color="green" :disabled="isEnd || !currentItem" class="mx-2 action-btn"
                                    @click="handleLike(approve)">
                                    <v-icon>mdi-thumb-up</v-icon>
                                </v-btn>
                            </v-row>
                        </template>
                    </FlashCards>
                </div>
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
    nextCard();
};

const handleReject = (rejectFn) => {
    rejectFn();
    nextCard();
};

const handleSwipeReject = () => {
    nextCard();
};


</script>

<style scoped>
.home-page {
    min-height: 100vh;
    background: radial-gradient(circle at top, #1b0935 0%, #0d061b 55%, #090615 100%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.home-row {
    width: 100%;
    justify-content: center;
}

.home-col {
    display: flex;
    justify-content: center;
    position: relative;
}

.logout-btn {
    position: absolute;
    top: 18px;
    left: 18px;
    background: rgba(0, 0, 0, 0.35) !important;
    text-transform: none;
    z-index: 5;
}

.card-area {
    width: 100%;
    max-width: 360px;
    margin-top: 60px;
    margin-bottom: 20px;
    position: relative;
}

.empty-card {
    background: transparent;
    color: #fff;
    box-shadow: none;
}

.actions-row {
    margin-top: 26px;
    gap: 12px;
}

.action-btn {
    width: 48px;
    height: 48px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

@media (max-width: 600px) {
    .home-page {
        background: radial-gradient(circle at top, #1b0935 0%, #0d061b 55%, #090615 100%);
        padding-inline: 0;
    }

    .card-area {
        max-width: 100%;
        margin-top: 80px;
        padding-inline: 6px;
    }
}
</style>
