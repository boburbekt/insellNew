<template>
  <div class="dropdown-wrapper">
    <button type="button" class="btn btn_dropdown" :disabled="disabled" @click="toggleDropdown">
      {{ text }}
    </button>

    <div class="values" v-if="multiple && modelValue?.length">
      <span v-for="(item, i) in modelValue" :key="i" class="value">
        {{ formatName(item) }}
        <button class="v-close" @click="update(i, true)">&#10006;</button>
      </span>
    </div>

    <div v-if="isOpen" class="dropdown-menu dark:bg-gray-900 dark:text-gray-100" @scroll="scroll">
      <input v-if="searchable" type="search" class="form-control mb-1" placeholder="Qidiruv..." v-model="search"
        @input="onSearch" />
      <ul class="list dark:bg-gray-900 dark:text-gray-100">
        <li v-if="all" @click="update(null)">Barchasi</li>
        <li v-for="item in data || list" :key="item.id || item" @click="update(item)"
          :class="{ selected: selected(item) }">
          {{ formatName(item) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/server/module/api";

export default {
  name: "DataDropdown",
  props: {
    modelValue: [Object, Array, null],
    data: Array,
    type: String,
    property: String,
    property2: String,
    all: Boolean,
    params: Object,
    disabled: Boolean,
    multiple: Boolean,
  },
  emits: ["update:modelValue", "change"],
  data() {
    return {
      id: Date.now(),
      search: "",
      list: [],
      current_page: 1,
      pages: 1,
      isOpen: false,
    };
  },
  computed: {
    request() {
      const type = this.type;
      switch (type) {
        case "user":
          return "get_users";
        case "main_user":
          return "get_main_users";
        case "customer":
          return "get_customers";
        case "manba":
          return "get_manba";
        case "xizmat":
          return "get_xizmat";
        case "region":
          return "get_regions";
        case "country":
          return "get_countries";
        case "tokcha":
          return "get_places";
        case "kassa":
          return "get_kassa";
        case "raw_material":
          return "get_raw_materials";
        case "expense_type":
          return "get_expense_types";
        case "language":
          return "get_languages";
        default:
          return null;
      }
    },
    param() {
      const param = this.params || {};
      return {
        category_id: param.category_id || 0,
        product_id: param.product_id || 0,
        search: this.search || param.search || "",
        role: param.role || "",
        page: this.current_page,
        status: param.status || null,
        limit: 20,
        for_order_done: param.for_order_done || null,
        to_step: param.to_step || 0,
        from_step: param.from_step || 0,
        section_id: param.section_id || 0,
        country_id: param.country_id || 0,
        branch_id: param.branch_id || 0,
      };
    },
    searchable() {
      return [
        "customer",
        "product_type",
        "cell",
        "product",
        "region",
        "raw_material",
        "market",
        "service",
        "category",
        "expense",
        "user",
        "raw_mt",
      ].includes(this.type);
    },
    title() {
      switch (this.type) {
        case "user":
          return "Hodimlar";
        case "customer":
          return "Mijozlar";
        case "manba":
          return "Manba";
        case "xizmat":
          return "Xizmatlar";
        case "region":
          return "Hududlar";
        case "country":
          return "Davlat";
        case "main_user":
          return "Hodimlar";
        case "tokcha":
          return "Tokchalar";
        case "kassa":
          return "Kassalar";
        case "raw_material":
          return "Homashyo";
        case "expense_type":
          return "Chiqim turlari";
        case "language":
          return "Tillar"
        default:
          return "Tanlang";
      }
    },
    text() {
      if (!this.multiple) {
        if (this.modelValue) {
          return this.formatText(this.modelValue);
        } else {
          return this.title;
        }
      } else {
        return this.title;
      }
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen && !this.data) {
        this.list = [];
        this.current_page = 1;
        this.get();
      }
    },
    onSearch() {
      this.list = [];
      this.current_page = 1;
      this.get();
    },
    get() {
      if (!this.request) return;
      api[this.request](this.param).then((res) => {
        this.list = this.list.concat(res.data.data);
        this.current_page = res.data.current_page;
        this.pages = res.data.pages;
      });
    },
    scroll(event) {
      const element = event.target;
      if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        if (this.current_page < this.pages) {
          this.current_page += 1;
          this.get();
        }
      }
    },
    update(data, action) {
      let value = null;
      if (this.multiple) {
        let array = Array.isArray(this.modelValue) ? [...this.modelValue] : [];
        if (action) {
          array.splice(data, 1);
        } else {
          if (!this.selected(data)) array.push(data);
        }
        value = array;
      } else {
        value = data;
        this.isOpen = false;
      }
      this.$emit("update:modelValue", value);
      this.$emit("change", value);

    },
    selected(data) {
      const array = this.modelValue;
      if (Array.isArray(array)) {
        return array.some((item) =>
          typeof item === "object" ? item?.id === data?.id : item === data
        );
      }
      return false;
    },
    formatName(item) {
      switch (this.type) {
        case "category":
          return item?.Categories?.[this.property];
        case "section":
          return item?.Sections?.[this.property];
        default:
          return item?.[this.property];
      }
    },
    formatText(item) {
      switch (this.type) {
        case "category":
          return item?.Categories?.[this.property];
        case "section":
          return item?.Sections?.[this.property];
        default:
          return item?.[this.property];
      }
    },
  },
};
</script>

<style scoped lang="scss">
.dropdown-wrapper {
  position: relative;
  @apply border-2 border-primary rounded-lg;
  width: 100%;
}
.dark .dropdown-wrapper {
  @apply border-gray-200;
}

.btn_dropdown {
  width: 100%;
  background-color: var(--White);
  color: var(--Primary);
  border: 1px solid var(--Primary);

  &:hover {
    color: var(--Primary);
  }
}

.values {
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
}

.value {
  padding: 5px;
  border: thin solid var(--p-gray);
  border-radius: 10px;
  font-size: small;
  margin: 2px;
}

.v-close {
  margin-left: 5px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: small;
  color: var(--Primary);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  border: 1px solid rgba(93, 93, 97, 0.2);
  border-radius: 10px;
  max-height: 25vh;
  overflow-y: auto;
  padding: 5px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.dark .dropdown-menu {
  @apply border-gray-200;
}
.form-control {
  width: calc(100% - 10px);
  margin: 5px;
  border-radius: 10px;
  padding: 5px;
  border: 1px solid rgba(93, 93, 97, 0.2);
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: white;
}

.list li {
  padding: 5px 10px;
  cursor: pointer;
}

.list li.selected {
  background-color: rgba(0, 0, 255, 0.1);
}

.list li:hover {
  background-color: rgba(93, 93, 97, 0.2);
}
</style>
