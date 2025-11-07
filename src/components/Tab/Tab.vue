<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

interface Tab {
  id: number;
  name: string;
}
const router = useRouter();
const route = useRoute();

const props = defineProps<{
  tabs: Tab[];
  active_status?: boolean;
}>();

const emit = defineEmits<{
  (event: "change", active: number): void;
}>();

const active = ref(
  props.active_status ? -1 : route.query.tab ? Number(route.query.tab) : 0
);
let timeout: ReturnType<typeof setTimeout> | null = null;

const setTab = (tab: number) => {
  if (timeout) clearTimeout(timeout);

  active.value = -1;
  const currentQuery = { ...route.query };

  currentQuery.tab = String(tab);

  router.push({ query: currentQuery });
  timeout = setTimeout(() => {
    active.value = Number(route.query.tab);
    emit("change", active.value);
  }, 100);
};

watch(
  () => props.active_status,
  (newVal) => {
    active.value = newVal ? -1 : 0;
  }
);
</script>


<template>
  <div
    class="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-1 w-full rounded"
  >
    <button
      v-for="(item, index) in tabs"
      :key="index"
      :class="{ active: item == tabs[active] }"
      @click="setTab(index)"
    >
      {{ item }}
    </button>
  </div>
  <Transition name="v-tab" mode="out-in">
    <div class="v-tab-content" v-if="active + 1">
      <slot :name="active + 1"></slot>
    </div>
  </Transition>
</template>

<style scoped>
.v-tab-buttons {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-radius: 10px;
}

button {
  /* flex: 1 1 auto; */
  background: whitesmoke;
  border-color: transparent;
  font-size: small;
  font-weight: 400;
  transition: all 0.25s;
  padding: 7px 0;
  border-radius: 7px;
}
.dark button {
  background: transparent;
  border: thin solid gray;
}
.dark button:hover {
  background-color: rgb(1, 12, 94);
}
.dark button.active {
  background-color: rgb(32, 64, 175);
  color: white;
}

button:hover {
  background-color: lightgray;
}

button:active {
  border-color: transparent;
}

button.active {
  color: white;
  @apply bg-primary;
}

.v-tab-content {
  margin-top: 5px;
  padding: 0.5rem;
  width: 100%;
  border: thin solid whitesmoke;
  border-radius: 10px;
  overflow: auto;
}

.v-tab-enter-active {
  animation: toggleTab 0.25s;
}

.v-tab-leave-active {
  animation: toggleTab 0.25s reverse;
}

@keyframes toggleTab {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>