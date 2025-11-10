<script>
import api from "../../server/api";
export default {
  name: "SignIn",
  data() {
    return {
      data: {
        username: null,
        password: "",
      },
      type: true,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    this.$store.dispatch("setUser", null);
  },
  methods: {
    post() {
      let data = {
        username: this.data.username.replace(/[- )(]/g, ""),
        password: this.data.password,
      };
      api
        .token(data)
        .then((res) => {
          this.prepare();
          // if (res.data.branch_id !== 0) {
          //   api.get_branch({ branch_id: res.data.branch_id }).then((branch) => {
          //     if (!branch.data.Branches.start)
          //       this.$router.push("/start_branch");
          //     else this.prepare();
          //   });
          //   this.$store.dispatch("setLoading", false);
          // } else this.prepare();
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
    },
    prepare() {
      if (
        this.$store.getters.user?.role == "admin" ||
        this.$store.getters.user?.role == "crud_admin"
      )
        this.$router.push("/branches");
      else if (this.$store.getters.user?.role == "seller")
        this.$router.push("/order");
      else if (this.$store.getters.user?.role == "dostavshik")
        this.$router.push("/orders");
      else if (this.$store.getters.user?.role == "branch_admin")
        this.$router.push("/order");
      else this.$router.push("/order");
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
  },
};
</script>

<template>
  <main>
    <div class="sign-in-card">
      <form @submit.prevent="post()">
        <div class="row gap-2">
          <div class="col-12">
            <img src="../../assets/images/logo.png" alt="insell-logo" />
          </div>
          <div class="col-12">
            <h2>XUSH KELIBSIZ</h2>
          </div>
          <div class="col-12">
            <div class="input-group">
              <div class="input-group-text">
                <img
                  class="icon"
                  v-if="false"
                  src="../../assets/icons/User.svg"
                  alt="user"
                />
                <i class="fa-solid fa-phone text-secondary" />
              </div>
              <Input
                type="tel"
                class="form-control"
                placeholder="TELEFON RAQAM"
                autofocus
                required
                v-model="data.username"
                id="phone-number"
                minlength="14"
                maxlength="14"
                autocomplete="off"
                @keypress="phoneNumberFormatter()"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="input-group">
              <div class="input-group-text">
                <img
                  class="icon"
                  v-if="false"
                  src="../../assets/icons/Lock.svg"
                  alt="lock"
                />
                <i class="fa-solid fa-lock text-secondary" />
              </div>
              <Input
                :type="type ? 'password' : 'text'"
                class="form-control"
                placeholder="PAROL"
                autofocus
                required
                v-model="data.password"
                autocomplete="off"
              />
              <div class="input-group-text">
                <i
                  @click="type = !type"
                  class="fa-solid text-secondary cursor"
                  :class="type ? 'fa-eye' : 'fa-eye-slash'"
                />
              </div>
            </div>
          </div>
          <div class="col-12 pt-3">
            <button>KIRISH</button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  place-content: center;
  place-items: center;
  background-image: url("../../assets/images/sign-in-backgroun.jpg");
  background-size: cover;
  background-position: right;
}

.sign-in-card {
  padding: 3rem;
  width: 30%;
  height: max-content;
  color: white;
  background-color: rgb(255, 255, 255, 0.2);
  backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  box-shadow: 16px 12px 24px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.sign-in-card img {
  width: 120px;
}

h2 {
  font-weight: 900;
  letter-spacing: 1px;
}

.input-group {
  width: 80%;
  margin: auto;
}

.form-control {
  font-size: small;
}

.icon {
  width: 20px !important;
  height: 20px !important;
}

button {
  padding: 0.7rem 1.4rem;
  color: white;
  background-color: var(--red);
  font-size: x-small;
  letter-spacing: 2px;
}

button:active {
  border-color: white;
}

@media (max-width: 768px) {
  .sign-in-card {
    width: 50%;
  }
}

@media (max-width: 425px) {
  .sign-in-card {
    width: 90%;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
