<template>
  <v-container class="splash-screen" fluid>
    <v-row justify="center" align="center" class="full-height">
      <v-col cols="12" class="text-center">
        <v-img class="logo" src="../assets/LogoTinder.png" />
        <h1 class="app-title">Destined</h1>
        <p class="app-subtitle">Online Dating App</p>
        <v-btn class="get-started-btn" @click="gotologin">
          Get Started <v-icon icon="mdi-arrow-right" />
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function gotologin() {
  router.push("/login");
}
</script>

<style scoped>
.splash-screen {
  background: radial-gradient(circle at top, #1b0935 0%, #0d061b 60%, #090615 100%);
  color: white;
}

.full-height {
  height: 100vh;
}

.logo {
    width: 300px;
    margin: 5px auto;
}

.app-title {
  font-size: 2rem;
  font-weight: bold;
}

.app-subtitle {
  font-size: 1rem;
  margin-bottom: 30px;
}

.get-started-btn {
  background: linear-gradient(90deg, #ff4081, #673ab7);
  color: white;
  font-weight: bold;
  border-radius: 25px;
  padding: 10px 20px;
}
</style>