<script>
export default {
  data() {
    return {
      errorState: false,
    };
  },
  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: [Boolean, String],
      default: false,
    },
    modelValue: [String, Number],
    icon: String,
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    validate(value) {
      if (this.required && !value) {
        this.errorState = true;
        this.$emit("update:error", "Bu maydonni to'ldirish shart!");
      } else {
        this.errorState = false;
        this.$emit("update:error", false);
      }
    },
    updateValue(value) {
      this.$emit("update:modelValue", value);
      this.validate(value);
    },
  },
  mounted() {
    // Agar modelValue bo'sh bo'lsa, birinchi option qiymatini o'rnatamiz
 
    if (!this.modelValue && this.options?.length > 0) {
      this.$emit("update:modelValue", this.options[0].slug);
      
    }
  },
};
</script>

<template>
  <label class="form-control w-full " >
    <div class="label" v-if="label">
      {{ label }}
    </div>
    <select :value="modelValue" @change="updateValue($event.target.value)"
      class="select border-1 flex items-center gap-2" :class="errorState ? 'select-error' : 'select-success'"
      @blur="validate(modelValue)">
      <option v-for="opt in options" :key="opt.slug" :value="opt.slug" :disabled="opt.disabled" >
        {{ opt.name }}
      </option>
    </select>

    <div class="label p-0" v-if="errorState">
      <span class="label-text-alt text-error text-[12px]">{{ error }}</span>
    </div>
  </label>
</template>
