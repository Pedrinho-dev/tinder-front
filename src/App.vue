<template>
  <v-app class="app-wrapper">
    <v-main class="main-content">
      <router-view />
    </v-main>

    <div v-if="showMenu" class="menu-container">
      <Menu />
    </div>
  </v-app>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Menu from '@/components/Menu.vue';

const route = useRoute();

const showMenu = computed(() => !['/login', '/createAccount', '/interest', '/'].includes(route.path));
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top, #1b0935 0%, #0d061b 55%, #090615 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.main-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 12px;
}
</style>
