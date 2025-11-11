<template>
  <v-card class="rounded-xl overflow-hidden" :style="{
    backgroundImage: `url(${item.photo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }">
    <v-card-title class="text-white">
      {{ item.name }}
    </v-card-title>

    <v-card-subtitle class="text-white" v-if="item.interest && item.interest.length > 0">
      {{ item.interest }}
    </v-card-subtitle>

    <v-card-actions class="text-white">
      <span>{{ item.gender }}</span>
      <span>{{ item.date }}</span>
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
