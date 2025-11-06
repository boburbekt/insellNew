<script setup lang="ts">
defineProps({
  status: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button
    class="btn min-w-50 cursor-pointer border-2 border-primary hover:border-primary text-primary text-sm md:text-md lg:text-lg dark:bg-primary-dark dark:hover:bg-primary dark:text-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
    :class="{
      'border-primary ': status,
    }"
  >
    <slot />
  </button>
</template>