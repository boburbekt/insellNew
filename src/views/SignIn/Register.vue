<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { confirm_user, create_admin, retry_sms } from "../../server/module/users.request";
import tokenapi from "../../server/tokenapi";
import type { adminCreate } from "../../../@types/modules/users.types"; 

interface Passwords {
  password1: string;
  password2: string;
}

const store = useStore();
const router = useRouter();
const data = ref<adminCreate>({
  name: "",
  username: "",
  password: "",
  phone: "",
});
const passwords = ref<Passwords>({
  password1: "",
  password2: "",
});
const type = ref(true);
const type2 = ref(true);
const otpValue = ref<string[]>(["", "", "", ""]);
const sms_tab = ref(false);
const rety_sms = ref(false);
const seconds = ref(120);
const inputs = ref<(HTMLInputElement | null)[]>([]);
let intervalId: number | null = null;
const user = computed(() => store.getters.user);

const displayTime = computed(() => {
  const minutes = Math.floor(seconds.value / 60);
  const remainingSeconds = seconds.value % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
});

// Methods
const formatPhoneNumber = (value: string): string => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 2) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
  }
  return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
    2,
    5
  )}-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7, 9)}`;
};

const phoneNumberFormatter = () => {
  const inputField = document.getElementById(
    "phone-number"
  ) as HTMLInputElement;
  if (inputField) {
    const formattedInputValue = formatPhoneNumber(inputField.value);
    inputField.value = formattedInputValue;
  }
};

const startTimer = () => {
  intervalId = window.setInterval(() => {
    if (seconds.value <= 0) {
      if (intervalId) clearInterval(intervalId);
      rety_sms.value = true;
    } else {
      seconds.value--;
    }
  }, 1000);
};

const post = async () => {
  data.value.phone = (data.value.phone + "").replace(/[- )(]/g, "");

  if (passwords.value.password1 !== passwords.value.password2) {
    // Toast error - parolda xatolik
    console.error("Parolda xatolik");
    return;
  }

  data.value.password = passwords.value.password1;
  data.value.username = data.value.phone;

  try {
    const res = await create_admin(data.value);
    store.dispatch("setUser", res.data);
    sms_tab.value = true;
    startTimer();
  } catch (err: any) {
    if (err.response?.status === 401) {
      console.error("Telefon raqam yoki parolda xatolik");
    }
    if (err.response?.status === 500) {
      console.error("Serverda xatolik!");
    }
  }
};

const smsPost = async () => {
  let sms = "";
  const phone = (data.value.phone + "").replace(/[- )(]/g, "");
  otpValue.value.forEach((e) => {
    sms += e;
  });

  try {
    await confirm_user({ phone, code: sms });
    postLogin();
  } catch (err) {
    console.error(err);
  }
};

const retrySms = async () => {
  try {
    await retry_sms({ phone: (data.value.phone + "").replace(/[- )(]/g, "") });
    seconds.value = 120;
    rety_sms.value = false;
    startTimer();
  } catch (err) {
    console.error(err);
  }
};

const postLogin = async () => {
  const loginData = {
    username: (data.value.phone + "").replace(/[- )(]/g, ""),
    password: data.value.password,
  };

  try {
    const res = await tokenapi.token(loginData);
    store.dispatch("setUser", res.data);
    if (
      store.getters.user?.role === "admin" ||
      store.getters.user?.role === "crud_admin"
    ) {
      router.push("/branches");
    }
  } catch (err: any) {
    if (err.response?.status === 401) {
      console.error("Telefon raqam yoki parolda xatolik");
    }
  }
};

const moveToNextInput = (index: number) => {
  if (
    index < otpValue.value.length - 1 &&
    otpValue.value[index] !== undefined &&
    otpValue.value[index].length > 0 &&
    inputs.value &&
    Array.isArray(inputs.value)
  ) {
    nextTick(() => {
      const nextInput = inputs.value[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    });
  }
};

const moveToPreviousInput = (index: number) => {
  if (
    index > 0 &&
    otpValue.value[index] !== undefined &&
    otpValue.value[index].length === 0 &&
    inputs.value &&
    Array.isArray(inputs.value)
  ) {
    const prevInput = inputs.value[index - 1];
    if (prevInput) {
      prevInput.focus();
    }
  }
};
// Lifecycle
onMounted(() => {
  store.dispatch("setUser", null);
});
</script>

<template>
  <main
    v-if="!sms_tab"
    class="flex items-center justify-center min-h-screen bg-cover bg-right"
  >
    <div
      class="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200"
    >
      <form @submit.prevent="post()" class="space-y-4">
        <!-- Logo -->
        <div class="text-center mb-8">
          <img
            src="../../assets/images/logo.png"
            alt="insell-logo"
            class="w-32 mx-auto mb-6"
          />
        </div>

        <!-- Title -->
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Ro'yxatdan o'tish
          </h2>
          <p class="text-sm text-gray-600 font-medium">
            Iltimos ro'yxatdan o'tish uchun ma'lumotlarni kiriting
          </p>
        </div>

        <!-- Name Input -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-900 mb-1"
            >Ism</label
          >
          <input
            type="text"
            id="name"
            v-model="data.name"
            placeholder="Ismingizni kiriting"
            required
            autocomplete="off"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Phone Input -->
        <div>
          <label
            for="phone-number"
            class="block text-sm font-medium text-gray-900 mb-1"
          >
            Telefon raqam
          </label>
          <div class="flex">
            <span
              class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg"
            >
              +998
            </span>
            <input
              type="tel"
              id="phone-number"
              v-model="data.phone"
              placeholder="(99) 999-99-99"
              required
              minlength="14"
              maxlength="14"
              autocomplete="off"
              @keypress="phoneNumberFormatter()"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Password Input -->
        <div>
          <label
            for="input_password"
            class="block text-sm font-medium text-gray-900 mb-1"
          >
            Parol
          </label>
          <div class="relative">
            <input
              :type="type ? 'password' : 'text'"
              id="input_password"
              v-model="passwords.password1"
              placeholder="Parol kiriting"
              required
              autocomplete="off"
              class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              @click="type = !type"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <i class="fa-solid" :class="type ? 'fa-eye' : 'fa-eye-slash'" />
            </button>
          </div>
        </div>

        <!-- Confirm Password Input -->
        <div>
          <label
            for="input_password2"
            class="block text-sm font-medium text-gray-900 mb-1"
          >
            Parol takrorlash
          </label>
          <div class="relative">
            <input
              :type="type2 ? 'password' : 'text'"
              id="input_password2"
              v-model="passwords.password2"
              placeholder="Parolni takror kiriting"
              required
              autocomplete="off"
              class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              @click="type2 = !type2"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <i class="fa-solid" :class="type2 ? 'fa-eye' : 'fa-eye-slash'" />
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button
            type="submit"
            class="w-full py-2.5 text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Ro'yxatdan o'tish
          </button>
        </div>

        <!-- Sign In Link -->
        <div class="text-center pt-2">
          <p class="text-sm text-gray-600">
            Hisobingiz mavjudmi?
            <router-link
              to="/sign-in"
              class="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Kirish
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </main>
  <!-- OTP Modal -->
  <div
    v-if="sms_tab"
    class="flex items-center justify-center min-h-screen bg-gray-50"
  >
    <div
      class="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border-2 border-gray-200 text-center"
    >
      <h4 class="text-xl font-bold text-gray-900 mb-2">
        +998 {{ data.phone }}
      </h4>
      <p class="text-gray-600 mb-6">
        Telefon raqamiga yuborilgan
        <span class="font-bold text-lg">SMS kod</span>ni kiriting
      </p>

      <form @submit.prevent="smsPost()">
        <div class="flex justify-center gap-2 mb-6">
          <Input
            v-for="(char, index) in otpValue"
            :key="index"
            type="text"
            v-model="otpValue[index]"
            @input="moveToNextInput(index)"
            @keydown.backspace="moveToPreviousInput(index)"
            maxlength="1"
            minlength="1"
            ref="otpInput"
            required
            class="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2.5 text-white font-medium bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Keyingi
        </button>
      </form>

      <p v-if="!rety_sms" class="mt-6 text-gray-700 font-semibold">
        {{ displayTime }}
      </p>
      <p v-else class="mt-6 text-gray-600">
        Kod kelmadimi?
        <span
          @click="retrySms()"
          class="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
        >
          Qayta kod jo'natish
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

* {
  font-family: "Inter", sans-serif;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>