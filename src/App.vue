<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layout = computed(() => `${route.meta.layout || 'default-layout'}`);
</script>

<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<style scoped></style>
