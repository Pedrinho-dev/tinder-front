<template>
  <v-img style="width: 23rem;" src="../assets/LogoTinder.png" />
  <v-btn @click="gotologin">Get Started</v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function gotologin() {
  router.push("/login")
}
</script>
