<script>
import api from "../../server/api";

export default {
  name: "Register",
  data() {
    return {
      data: {
        name: "",
        password: "",
        phone: "",
      },
      passwords: {
        password1: "",
        password2: "",
      },
      type: true,
      type2: true,
      otpValue: ["", "", "", ""],
      sms_tab: false,
      rety_sms: false,
      seconds: 120,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    displayTime() {
      let minutes = Math.floor(this.seconds / 60);
      let remainingSeconds = this.seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? "0" : ""
        }${remainingSeconds}`;
    },
  },
  created() {
    this.$store.dispatch("setUser", null);
  },
  methods: {
    post() {
      this.data.phone = this.data.phone.replace(/[- )(]/g, "");
      if (this.passwords.password1 == this.passwords.password2) {
        this.data.password = this.passwords.password1;
        this.data.username = this.data.phone
        api
          .create_admin(this.data)
          .then((res) => {
            this.$store.dispatch("setUser", res.data);
            this.sms_tab = true;
            this.startTimer();
          })
          .catch((err) => {
            if (err.response.status == 401) {
              this.$util.toastError(
                "error",
                "Telefon raqam yoki parolda xatolik"
              );
            }
            if (err.response.status == 500) {
              this.$util.toastError("error", "Serverda xatolik!");
            }
          });
      } else {
        this.$util.toastError("error", "Paro'lda hatolik ");
      }
    },
    smsPost() {
      let sms = "";
      let phone = this.data.phone.replace(/[- )(]/g, "");
      this.otpValue.forEach((e) => {
        sms += e;
      });

      api
        .confirm_user({ phone: phone, code: sms })
        .then((res) => {
          this.postLogin()

          // this.$router.push("/sign-in");
        })
        .catch(() => { });
    },
    retry_sms() {
      api
        .retry_sms({ phone: this.data.phone.replace(/[- )(]/g, "") })
        .then((res) => { });
    },
    formatPhoneNumber(value) {
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
    },
    phoneNumberFormatter() {
      const inputField = document.getElementById("phone-number");
      const formattedInputValue = this.formatPhoneNumber(inputField.value);
      inputField.value = formattedInputValue;
    },
    moveToNextInput(index) {
      // if (
      //   index < this.otpValue.length - 1 &&
      //   this.otpValue[index].length > 0 &&
      //   this.$refs.inputs &&
      //   this.$refs.inputs[index + 1]
      // ) {
      //   this.$refs.inputs[index + 1].focus();
      // }
      const refs = this.$refs.inputs;
      const next = Array.isArray(refs) ? refs[index + 1] : refs;
      if (!next) return;
      this.$nextTick(() => {
        const dom = next.$el ? next.$el.querySelector('input') : next;
        if (dom && typeof dom.focus === 'function') dom.focus();
      });
    },
    moveToPreviousInput(index) {
      if (
        index > 0 &&
        this.otpValue[index].length === 0 &&
        this.$refs.inputs &&
        this.$refs.inputs[index - 1]
      ) {
        this.$refs.inputs[index - 1].focus();
      }
    },
    startTimer() {
      this.intervalId = setInterval(() => {
        if (this.seconds <= 0) {
          clearInterval(this.intervalId);
          this.rety_sms = true;
        } else {
          this.seconds--;
        }
      }, 1000);
    },
    postLogin() {
      let data = {
        username: this.data.phone.replace(/[- )(]/g, ""),
        password: this.data.password,
      };

      api
        .token(data)
        .then((res) => {
          this.$store.dispatch("setUser", res.data);
          if (
            this.$store.getters.user?.role == "admin" ||
            this.$store.getters.user?.role == "crud_admin"
          ) this.$router.push("/branches");
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.$util.toastError(
              "error",
              "Telefon raqam yoki parolda xatolik"
            );
          }
        });
    },
  },
};
</script>

<template>
  <main v-if="!sms_tab">
    <div class="sign-in-card">
      <form @submit.prevent="post()">
        <div class="row gap-2">
          <div class="col-12">
            <img src="../../assets/images/logo.png" alt="insell-logo" />
          </div>
          <div class="col-12">
            <h2>Ro‘yxatdan o‘tish</h2>
            <p>Iltimos ro‘yxatdan o‘tish uchun ma’lumotlarni kiriting</p>
          </div>
          <div class="col-12">
            <label for="phone-number">Ism</label>
            <div class="input-group">
              <Input type="text" class="form-control" placeholder="Ismingizni kiriting" autofocus required
                v-model="data.name" autocomplete="off" />
            </div>
          </div>
          <div class="col-12">
            <label for="phone-number">Telefon raqam</label>
            <div class="input-group">
              <div class="input-group-text bg-transparent">+998</div>
              <Input type="tel" class="form-control" placeholder="" autofocus required v-model="data.phone"
                id="phone-number" minlength="14" maxlength="14" autocomplete="off" @keypress="phoneNumberFormatter()" />
            </div>
          </div>
          <div class="col-12">
            <label for="input_password">Parol</label>
            <div class="input-group">
              <Input :type="type ? 'password' : 'text'" class="form-control" placeholder="Parol kiriting" autofocus
                required id="input_password" v-model="passwords.password1" autocomplete="off" />
              <div class="input-group-text">
                <i @click="type = !type" class="fa-solid text-secondary cursor"
                  :class="type ? 'fa-eye' : 'fa-eye-slash'" />
              </div>
            </div>
          </div>
          <div class="col-12">
            <label for="input_password">Parol takrorlash</label>
            <div class="input-group">
              <Input :type="type2 ? 'password' : 'text'" class="form-control" placeholder="Parolni takror kiriting"
                autofocus required id="input_password" v-model="passwords.password2" autocomplete="off" />
              <div class="input-group-text">
                <i @click="type2 = !type2" class="fa-solid text-secondary cursor"
                  :class="type2 ? 'fa-eye' : 'fa-eye-slash'" />
              </div>
            </div>
          </div>
          <div class="col-12 pt-3">
            <button class="btn_submit">Ro‘yxatdan o‘tish</button>
          </div>
          <div>
            <p>
              Hisobingiz mavjudmi ?
              <router-link to="/sign-in"> Kirish </router-link>
            </p>
          </div>
        </div>
      </form>
    </div>
  </main>
  <div v-if="sms_tab">
    <div class="d-flex align-items-center justify-content-center" style="height: 100vh">
      <div class="text-center border border-2 p-3 bg-transparent" style="border-radius: 10px">
        <h4 class="h5_title">+998 {{ data.phone }}</h4>
        <p class="">
          Telefon raqamiga yuborilgan
          <span class="d-inline-block" style="font-size: 18px; font-weight: 800">SMS kod</span>ni kiriting
        </p>
        <form class="form" @submit.prevent="smsPost()">
          <div class="d-flex justify-content-center gap-1 my-3">
            <Input v-for="(char, index) in otpValue" :key="index" type="text" class="form-control otp-input text-center"
              v-model="otpValue[index]" @input="moveToNextInput(index)" @keydown.backspace="moveToPreviousInput(index)"
              maxlength="1" minlength="1" ref="inputs" required />
          </div>
          <button class="btn btn-sm form_submit">Keyingi</button>
        </form>
        <p class="pt-3" v-if="!rety_sms">{{ displayTime }}</p>
        <p class="pt-3" v-else>
          Kod kelmadimi ?
          <span @click="retry_sms()" style="color: blue; cursor: pointer; font-size: 15px"
            class="cursor-pointer d-inline-block">Qayta kod jo‘natish</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

h1,
h2,
h3,
h4,
h5,
h6,
label,
input,
p,
button {
  font-family: "Inter", sans-serif;
}

p {
  font-size: 16px;
  color: var(--p-black);
  font-weight: 600;
}

.form_submit {
  font-size: 18px;
  color: var(--white);
}

.btn_submit {
  color: var(--white);
}

.otp-input {
  width: 3rem;
  text-align: center;
}

main {
  display: flex;
  place-content: center;
  place-items: center;
  background-size: cover;
  background-position: right;
  position: relative;
}

.sign-in-card {
  padding: 3rem;
  width: 450px;
  height: max-content;
  color: var(--p-white);
  background-color: rgb(255, 255, 255, 0.2);
  backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  text-align: center;
  background: var(--p-white);
}

.sign-in-card img {
  width: 150px;
  margin-bottom: 40px;
}

h2 {
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--p-black);
}

.input-group {
  width: 100%;
  margin: auto;
}

label {
  color: var(--p-black);
  text-align: start;
  width: 100%;
  margin-bottom: 3px;
}

.icon {
  width: 20px !important;
  height: 20px !important;
}

button {
  padding: 0.7rem 1.4rem;
  color: var(--p-white);
  background-color: var(--orangred);
  font-size: small;
  letter-spacing: 2px;
  width: 100%;
}

button:active {
  border-color: var(--p-white);
}

a {
  font-size: 14px;
}

@media (max-width: 500px) {
  .sign-in-card {
    padding: 30px 0 0 0;

    img {
      margin-bottom: 10px;
    }
  }

  h2 {
    font-size: 18px;
  }

  p {
    font-size: 14px;
  }
}

@media (max-width: 425px) {
  .sign-in-card {
    width: 95%;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
