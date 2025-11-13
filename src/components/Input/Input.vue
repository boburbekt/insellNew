<script>
import store from "@/store";

export default {
  data() {
    return {
      errorState: false,
    };
  },

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
    modelValue: [String, Number],
    id: String,
    maxlength: Number,
    minlength: Number,
    name: String,
    step: [Number, String],
    mask: String,
    icon: [String, Number],
    iconPosition: {
      type: String, // "start" or "end"
      default: "start",
      validator: (value) => ["start", "end"].includes(value),
    },
  },

  methods: {
    validate(e) {
      if (
        this.required &&
        (e === null || e === "" || e === 0 || e === undefined)
      ) {
        this.errorState = true;
        this.$emit("update:error", "Bu maydonni to'ldirish shart!");
      }
      if (this.required && !e) {
        this.errorState = true;
        this.$emit("update:error", this.$props.error);
      } else {
        this.errorState = false;
        this.$emit("update:error", false);
      }
    },
  },

  computed: {
    current_user() {
      return store.getters?.user;
    },
    maskInput() {
      const code =
        this.current_user?.role !== "admin"
          ? this.current_user?.country_tel_code
          : Number(this.icon?.toString().replace(/^\+/, ""));

      switch (code) {
        case 998:
          return "(##) ### ## ##";
        case 7:
          return "(###) ###-##-##";
        case 0:
          return "(##) ### ## ##";
        default:
          return "";
      }
    },
  },
  watch: {},
};
</script>

<template>
  <label class="form-control w-full dark:bg-gray-900 dark:text-gray-100">
    <div class="label leading-0 p-0" v-if="label">
      {{ label }}
    </div>
    <div
      class="input input-bordered flex items-center border-1 w-full gap-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
      :class="
        errorState ? 'input-error' : 'border-primary dark:border-gray-500'
      "
    >
      <span
        v-if="icon && iconPosition === 'start' && !mask"
        class="h-5 w-8 text-gray-500 translate-y-[-1px]"
        v-html="icon"
      ></span>
      <span v-if="mask" class="h-5 w-8 text-gray-500 translate-y-[-1px]">{{
        mask == "true" ? `+${current_user?.country_tel_code || 998}` : icon
      }}</span>
      <input
        class="w-full dark:text-gray-100 dark:placeholder:text-gray-300"
        v-if="mask"
        v-mask="maskInput"
        :type="type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :minlength="minlength"
        :id="id"
        :disabled="disabled"
        :required="required"
        :step="step"
        :autofocus="autofocus"
        :value="modelValue"
        @focusout="validate($event.target.value), validate($event.target.value)"
        @input="$emit('update:modelValue', $event.target.value)"
        :name="name"
      />
      <input
        class="w-full dark:text-gray-100 dark:placeholder:text-gray-300"
        v-else
        :type="type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :minlength="minlength"
        :id="id"
        :disabled="disabled"
        :required="required"
        :step="step"
        :autofocus="autofocus"
        :value="modelValue"
        @focusout="
          validate($event.target.value);
          $event.target.value == '' && type == 'number'
            ? $emit('update:modelValue', 0)
            : '';
        "
        @input="
          $emit('update:modelValue', $event.target.value),
            validate($event.target.value)
        "
        @focus="
          $event.target.value == 0 ? $emit('update:modelValue', null) : ''
        "
        :name="name"
      />
      <span
        v-if="icon && iconPosition === 'end'"
        class="h-5 w-8 text-gray-500 dark:text-gray-300"
        v-html="icon"
      ></span>
    </div>
    <div class="label p-0" v-if="errorState">
      <span class="label-text-alt text-error text-[12px]">{{
        Object.prototype.toString.call(error).match(/\[object (\w+)\]/)[1] ==
        "String"
          ? error
          : "Bu maydonni to'ldirish shart"
      }}</span>
    </div>
  </label>
</template>
