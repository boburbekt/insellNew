<template>
  <div class="flex justify-between w-full gap-3 max-md:gap-1">
    <div v-for="(tab, index) in tabs" :key="index" v-show="isMobile ? tab === 1 : true"
      class="v-modal-body border-2 border-primary max-md:border-0 h-[89vh] rounded-xl p-2 max-md:p-0 overflow-hidden flex flex-col relative" :class="{
        // Desktop
        'w-[33%]': tabs.length === 3 && !isMobile && !isTable,
        'w-[25%]': tabs.length === 2 && tab === 1 && !isMobile,
        'w-[75%]': tabs.length === 2 && [2, 3, 4, 5, 6].includes(tab) && !isMobile,
        // Table
        'w-[35%]': tabs.length === 2 && tab === 1 && isTable,
        'w-[65%]': tabs.length === 2 && [2, 3, 4, 5, 6].includes(tab) && isTable,
        // Mobile
        'w-[100%]': tabs.length === 1 || isMobile
      }">
      <div class="mb-2">
        <slot :name="'header' + tab"></slot>
      </div>
      <div class="overflow-auto grow scrollbarView p-0">
        <slot :name="'tab' + tab">
        </slot>
      </div>
      <div>
        <slot :name="'footer' + tab"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

// Propsni aniqlash
defineProps({
  tabs: {
    type: Array as () => number[], // `number` tipidagi massiv
    default: () => [1],
  },
  currentTab: {
    type: Number || String,
  },
  active: {
    type: Number,
    required: false
  }
});

const isMobile = ref(false);
const isTable = ref(false);

// Ekran o‘lchamini tekshirish funksiyasi
function checkScreenSize() {
  isMobile.value = window.innerWidth <= 640;
  isTable.value = window.innerWidth > 640 && window.innerWidth <= 1024;
}

// Mounted lifecycle
onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

// Unmount lifecycle
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>
