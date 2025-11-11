<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <Menu v-if="showMenu" />
  </v-app>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Menu from '@/components/Menu.vue';

const route = useRoute();

const showMenu = computed(() => !['/login', '/createAccount', '/'].includes(route.path));
</script>
