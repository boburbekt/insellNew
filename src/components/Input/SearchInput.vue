<script>
export default {
  data() {
    return {
      errorState: false,
    };
  },
  emits: ["update:modelValue", "get"],
  props: {
    type: {
      type: String,
      default: "text",
    },
    label: String,
    placeholder: String,
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
    // Ekran kichirayganda inputlarni mobile ko'rinishga o'tqazish
    mobile: {
      type: Boolean,
      default: false,
    },
    modelValue: [String, Number],
    id: String,
    maxlength: Number,
    minlength: Number,
    step: [Number, String],
    icon: String,
  },
  methods: {
    validate(e) {
      if (
        this.required &&
        (e === null || e === "" || e === 0 || e === undefined)
      ) {
        this.errorState = true;
        this.$emit("update:error", "Bu maydonni to'ldirish shart!");
      } else {
        this.errorState = false;
        this.$emit("update:error", false);
      }
    },
  },
  watch: {},
};
</script>

<template>
  <label class="form-control w-full">
    <div class="label" v-if="label">
      {{ label }}
    </div>
    <label
      class="input border-1 flex items-center gap-1 w-full dark:bg-gray-900 dark:text-gray-100"
      :class="[
        errorState ? 'input-error' : 'border-primary dark:border-gray-500',
        mobile ? 'w-32 h-10' : 'w-full md:w-full md:gap-2 max-md:h-10',
      ]"
    >
      <input
        :type="type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :minlength="minlength"
        :id="id"
        :disabled="disabled"
        :required="required"
        :step="step"
        :autofocus="autofocus"
        class="grow max-md:text-xs overflow-hidden dark:placeholder:text-gray-400"
        :class="{ 'text-xs': mobile }"
        :value="modelValue"
        @focusout="validate($event.target.value)"
        @input="
          $emit('update:modelValue', $event.target.value);
          $emit('get', $event.target.value);
        "
      />
      <i :class="`text-primary max-md:fa-sm fa fa-${icon}`"></i>
    </label>
    <div class="label p-0" v-if="errorState">
      <span class="label-text-alt text-error md:text-[12px]">{{ error }}</span>
    </div>
  </label>
</template>
