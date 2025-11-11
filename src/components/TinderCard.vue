<template>
  
  <v-card class="rounded-xl overflow-hidden tinder-card" :style="{
    backgroundImage: `url(${item.photo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }">
    <v-card-title class="text-white card-title">
      {{ item.name }}
    </v-card-title>

    <v-card-subtitle class="text-white card-subtitle" v-if="item.interest && item.interest.length > 0">
      {{ item.interest.join(", ") }}
    </v-card-subtitle>

    <v-card-actions class="text-white card-actions">
      <span>{{ item.gender }}</span>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object,
  },
});
</script>

<style scoped>

.tinder-card {
  width: 100%;
  max-width: 350px;
  min-height: 430px;
  position: relative;
  border-radius: 22px;
  background-color: #140826;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.45);
}


.tinder-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 3, 25, 0.15) 0%, rgba(7, 3, 16, 0.95) 100%);
  pointer-events: none;
}

.card-title,
.card-subtitle,
.card-actions {
  position: relative;
  z-index: 2;
}


.card-title {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 2px;
  padding-bottom: 0;
}


.card-subtitle {
  font-size: 12px;
  opacity: 0.9;
  padding-top: 2px;
}


.card-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 11px;
  opacity: 0.9;
  padding-bottom: 16px;
}


.tinder-card {
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .tinder-card {
    max-width: none;
    min-height: 420px;
  }
}
</style>
