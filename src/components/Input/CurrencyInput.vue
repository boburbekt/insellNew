<template>
  <label class="form-control w-full dark:bg-gray-900 dark:text-gray-100">
    <div class="label leading-0 p-0" v-if="label">
      {{ label }}
    </div>
    <div
      class="input input-bordered flex items-center border-1 border-primary dark:border-gray-500 w-full gap-2 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:bg-gray-900 dark:text-gray-100"
    >
      <span
        v-if="icon && iconPosition === 'start'"
        class="h-5 w-8 text-gray-500"
        v-html="icon"
      ></span>

      <input
        type="text"
        :value="formattedValue"
        @input="onInput"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :minlength="minlength"
        :id="id"
        :disabled="disabled"
        :required="required"
        :step="step"
        :autofocus="autofocus"
        @focusout="
          validate($event.target.value);
          $event.target.value == '' && type == 'number'
            ? $emit('update:modelValue', 0)
            : '';
        "
        @focus="
          $event.target.value == 0 ? $emit('update:modelValue', null) : ''
        "
        class="w-full translate-y-[2px] dark:placeholder:text-gray-100"
      />
      <span
        v-if="icon && iconPosition === 'end'"
        class="h-5 w-8 text-gray-500"
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

<script setup>
import { computed, watch, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  maxlength: Number,
  minlength: Number,
  step: [Number, String],
  mask: String,
  icon: String,
  id: String,
  required: {
    type: Boolean,
    default: false,
  },
  label: String,
  iconPosition: {
    type: String,
    default: "end",
    validator: (value) => ["start", "end"].includes(value),
  },
  autofocus: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const errorState = ref(false);
function validate(e) {
  if (
    props.required &&
    (e === null || e === "" || e === 0 || e === undefined)
  ) {
    errorState.value = true;
    emit("update:error", "Bu maydonni to'ldirish shart!");
  } else if (props.required && !e) {
    errorState.value = true;
    emit("update:error", props.error);
  } else {
    errorState.value = false;
    emit("update:error", false);
  }
}
const rawValue = ref(props.modelValue?.toString().replace(/\s/g, "") || "");

watch(
  () => props.modelValue,
  (newVal) => {
    rawValue.value = newVal?.toString().replace(/\s/g, "") || "";
  }
);

const formattedValue = computed(() => {
  return rawValue.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
});

// const onInput = (event) => {
//   const digitsOnly = event.target.value.replace(/\D/g, '')
//   rawValue.value = digitsOnly
//   emit('update:modelValue', digitsOnly)
// }

const onInput = (event) => {
  let input = event.target.value;
  input = input
    .replace(/[^0-9.]/g, "")
    .replace(/^0+(?=\d)/, "")
    .replace(/(\..*?)\..*/g, "$1");
  const [intPart, decimalPart] = input.split(".");

  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const formatted =
    decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
  rawValue.value = input;
  emit("update:modelValue", input);
  event.target.value = formatted;
};
</script>
