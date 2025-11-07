<script>
export default {
  name: "Pagination",
  props: {
    modelValue: {
      default: {
        current_page: 1,
        pages: 1,
        limit: 1,
      },
    },
  },
  emits: ["update:modelValue", "get"],
  computed: {
    pagination() {
      return this.$props.modelValue;
    },
  },
  methods: {
    setValue(property, value) {
      let data = this.pagination;
      data[property] = value;
      this.$emit("update:modelValue", data);
      this.$emit("get");
    },
  },
};
</script>

<template>
  <div class="v-pagination" v-if="pagination.data.length">
    <div class="v-pagination-div">
      <button class="btn_refresh" @click="$emit('get')">&#x21bb;</button>
      <button :disabled="pagination.current_page == 1" @click="setValue('current_page', 1)">
        &#171;
      </button>
      <button :disabled="pagination.current_page == 1" @click="setValue('current_page', pagination?.current_page - 1)">
        &#8249;
      </button>
      <select :value="pagination?.current_page" @change="setValue('current_page', $event.target.value)">
        <option :value="page" v-for="page in pagination?.pages" :key="page">
          {{ page }}
        </option>
      </select>
      <!-- <button class="active">{{ pagination?.current_page + 1 }}</button> -->
      <button :disabled="pagination.current_page == pagination.pages"
        @click="setValue('current_page', pagination?.current_page + 1)">
        &#8250;
      </button>
      <button :disabled="pagination.current_page == pagination.pages"
        @click="setValue('current_page', pagination?.pages)">
        &#187;
      </button>
      <select :value="pagination?.limit" @change="setValue('limit', $event.target.value)">
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
      </select>
    </div>
  </div>
  <div v-else class="flex items-center justify-center w-full font-medium text-xl">
    Ma'lumot topilmadi !
  </div>
</template>

<style scoped lang="scss">
* {
  padding: unset;
  border-radius: unset;
  outline: none;
}

.v-pagination {
  width: 100%;
  display: flex;
  place-content: center;
  gap: 1px;
  border-radius: 10px;
}

.v-pagination-div {
  display: inline-block;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--P-Gray);

  .btn_refresh {
    background: var(--White);
  }
}

html.dark {
  .v-pagination-div {
    border: 1px solid var(--P-Gray);
  }
}

.v-pagination button {
  padding: 5px 10px;
  color: var(--Primary);
  background: var(--White);
}

.v-pagination button:disabled {
  color: var(--P-Gray);
  cursor: not-allowed;
}

.v-pagination button:not(.active) {
  font-size: large;
}

.v-pagination select {
  background-color: var(--White);
  border: thin solid transparent;
}

.v-pagination>*:first-child {
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

.v-pagination>*:last-child {
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}

select {
  color: var(--Primary);
}
</style>