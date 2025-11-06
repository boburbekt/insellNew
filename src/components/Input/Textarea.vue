<script>
export default {
  data() {
    return {
      errorState: false,
    };
  },
  props: {
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
  <label class="form-control w-full dark:bg-gray-900 dark:text-gray-100">
    <div class="label p-0" v-if="label">
      {{ label }}
    </div>
    <textarea
      :placeholder="placeholder"
      :id="id"
      :disabled="disabled"
      :required="required"
      class="textarea border-1 w-full leading-3 dark:bg-gray-900 dark:text-white"
      :class="errorState ? 'input-error' : 'border-primary'"
      :value="modelValue"
      @focusout="validate($event.target.value)"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    </textarea>
    <div class="label p-0" v-if="errorState">
      <span class="label-text-alt text-error text-[12px]">{{ error }}</span>
    </div>
  </label>
</template>
