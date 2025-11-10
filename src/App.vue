<script setup lang="ts">
import { ref } from "vue";
import { inject } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <h1>
    <router-view />
  </h1>
</template>

<style scoped></style>
