<template>
    <v-card v-for="item in user.users" :key="item.id" class="mx-auto my-12" max-width="374">
      
        <v-img height="250" :src="item.photo" cover></v-img>

        <v-card-item>
            <v-card-title>{{item.name}}</v-card-title>

            <v-card-subtitle>
                <span class="me-1">Interests: Animals</span>

                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
        </v-card-item>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore'

const user = useUserStore();

onMounted(() => {
    user.findUsers()
});

</script>