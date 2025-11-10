<script>
import api from "../../server/api";
import { IMaskDirective } from "vue-imask";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import QrCodeScannerWithoutModal from "../../components/QrCodeScannerWithoutModal.vue";
import "../../style.scss";
import "../../assets/styles/bootstrap.min.css";
import "../../assets/bootstrap/bootstrap.min";
export default {
  name: "SignIn",
  directives: {
    imask: IMaskDirective,
  },
  components: {
    Swiper,
    SwiperSlide,
    QrCodeScannerWithoutModal,
  },

  data() {
    return {
      modules: [Autoplay, Navigation, Pagination, EffectCoverflow],
      branch: {},
      data: {
        username: null,
        password: "",
      },
      activeIndex: 0,
      swiperInstance: null,
      type: true,
      icon_logo: [
        {
          icon: "paint.svg",
          title: "Xo'jalik mollari",
          active: false,
        },
        {
          icon: "Washshing machine.svg",
          title: "Maishiy texnika",
          active: false,
        },
        {
          icon: "Carpet.svg",
          title: "Gilam",
          active: false,
        },
        {
          icon: "book.svg",
          title: "Konstavar va kitob",
          active: false,
        },
        {
          icon: "couch.svg",
          title: "Mebel",
          active: true,
        },
        {
          icon: "mobile-solid 1.svg",
          title: "Telefon",
          active: false,
        },
        {
          icon: "Silk.svg",
          title: "Material",
          active: false,
        },
        {
          icon: "Bolt.svg",
          title: "Furnitura",
          active: false,
        },
        {
          icon: "laptop-solid 1.svg",
          title: "Kompyuter",
          active: false,
        },
        {
          icon: "Parmacy.svg",
          title: "Apteka",
          active: false,
        },
        {
          icon: "ball.svg",
          title: "Sport buyumlari va kiyimlari",
          active: false,
        },
        {
          icon: "shirt-solid 1.svg",
          title: "Kiyim kechak",
          active: false,
        },
        {
          icon: "Car service.svg",
          title: "Avtomobil ehtiyot qisimlari",
          active: false,
        },
        {
          icon: "gift.svg",
          title: "Gul va buketlar",
          active: false,
        },
      ],
      fp: false,
      upd_password: {
        phone: null,
        password: "",
        password2: "",
      },
      retry_sms_phone: {
        phone: null,
      },
      confirm_sms: {
        phone: null,
        code: "",
      },
      typePass: true,
      typePass2: true,
      retry_sms: false,
      otpValue: ["", "", "", ""],
      seconds: 120,
      check_sms: false,
      value: "",
      upd_passwordValue: "",
      mask: {
        mask: "(00) 000-00-00",
        lazy: false,
      },
      mask1: {
        mask: "(00) 000-00-00",
        lazy: false,
      },
      tabs: [{ text: 'Login', icon: 'fa-solid fa-right-to-bracket' }, { text: 'QR orqali', icon: 'fa-solid fa-qrcode' }]
    };
  },
  created() {
    this.$store.dispatch("setUser", null);
    // this.startTimer();
  },
  methods: {
    getImageUrl(name) {
      return new URL(`../../assets/icons-login/${name}`, import.meta.url).href;
    },
    onSwiper(swiper) {
      this.swiperInstance = swiper
      this.activeIndex = swiper.realIndex
    },
    onSlideChange() {
      if (this.swiperInstance) {
        this.activeIndex = this.swiperInstance.realIndex
      }
    },
    getSlideStyle(index) {
      if (!this.swiperInstance) {
        return {
          transform: 'scale(0.9)',
          opacity: '0.7',
          zIndex: '1',
          transition: 'all 0.3s ease'
        }
      }

      const totalSlides = this.icon_logo.length
      const activeIndex = this.activeIndex

      // Calculate the relative position considering the loop
      let relativePosition = index - activeIndex

      // Handle wrapping for looped carousel
      if (relativePosition > totalSlides / 2) {
        relativePosition -= totalSlides
      } else if (relativePosition < -totalSlides / 2) {
        relativePosition += totalSlides
      }

      const absPosition = Math.abs(relativePosition)

      let scale, opacity, zIndex

      if (absPosition === 0) {
        // Center slide (activeIndex)
        scale = 1
        opacity = 1
        zIndex = 3
      } else if (absPosition === 1) {
        // Slides next to center (±1 position)
        scale = 0.8
        opacity = 1
        zIndex = 2
      } else if (absPosition === 2) {
        // Slides further (±2 position)
        scale = 0.5
        opacity = 1
        zIndex = 1
      } else {
        // All other slides
        scale = 0.3
        opacity = 1
        zIndex = 0
      }

      return {
        transform: `scale(${scale})`,
        opacity: opacity.toString(),
        zIndex: zIndex.toString(),
        transition: 'all 0.3s ease'
      }
    },
    goToPrevious() {
      if (this.swiperInstance) {
        this.swiperInstance.slidePrev()
      }
    },
    goToNext() {
      if (this.swiperInstance) {
        this.swiperInstance.slideNext()
      }
    },
    post() {
      let data = {
        username: this.data.username.replace(/[- )(]/g, ""),
        password: this.data.password,
      };
      api
        .token(data)
        .then((res) => {
          this.getBranch(res.data);
          this.$store.dispatch("setUser", res.data);
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
    getBranch(branch) {
      api.get_branch({ branch_id: branch.branch_id }).then((res) => {
        this.branch = res.data;
        this.prepare(branch);
      });
    },
    prepare(user) {
      // if (this.branch?.start == false && !['admin', 'crud_admin'].includes(user.role)) {
      //   this.$router.push("/start");
      // }
      
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
      const phoneNumber = value.replace(/\D/g, "");
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
      if (
        index < this.otpValue.length - 1 &&
        this.otpValue[index].length > 0 &&
        this.$refs.inputs &&
        this.$refs.inputs[index + 1]
      ) {
        this.$refs.inputs[index + 1].focus();
      }
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
          this.retry_sms = true;
        } else {
          this.seconds--;
        }
      }, 1000);
    },
    RetrySms() {
      api
        .retry_sms_for_password({
          phone: this.upd_password.username.replace(/[- )(]/g, ""),
        })
        .then((res) => {
          this.otpValue = ["", "", "", ""];
          this.seconds = 120;
          this.retry_sms = false;
          this.startTimer();
        });
    },
    NewPassword() {
      if (this.upd_password.password == this.upd_password.password2) {
        let data = {
          phone: this.upd_password.username.replace(/[-_ )(]/g, ""),
          password: this.upd_password.password,
        };
        api.update_password(data).then((res) => {
          this.check_sms = true;
          this.startTimer();
        });
      } else {
        this.$util.toastError("error", "Parolda hatolik ");
      }
    },
    confirmSms() {
      let sms = "";
      this.otpValue.forEach((e) => {
        sms += e;
      });
      let data = {
        phone: this.upd_password.username.replace(/[- )(]/g, ""),
        code: sms,
      };
      api
        .confirm_sms_for_password(data)
        .then((res) => {
          window.location.reload();
          this.$store.dispatch("setUser", res.data);
          this.prepare();
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
          this.startTimer();
        });
    },
    onAccept(e) {
      const maskRef = e.detail;
      this.value = maskRef.value;
    },
    onComplete(e) {
      const maskRef = e.detail;
      this.data.username = maskRef.unmaskedValue;
    },
    qrcodeValue(e) {
      this.data = e;
      this.post();
    },
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
    swiperWrapperStyle() {
      return {
        width: '80%',
        position: 'relative',
      }
    },
    slideContentStyle() {
      return {
        height: 'auto',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease'
      }
    },
    slideNumberStyle() {
      return {
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '15px',
        opacity: '0.8'
      }
    },
    slideDescriptionStyle() {
      return {
        fontSize: '16px',
        lineHeight: '1.5',
        opacity: '0.9',
        margin: '0'
      }
    },
    controlsStyle() {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginTop: '40px'
      }
    },
    buttonStyle() {
      return {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
      }
    },
    indicatorStyle() {
      return {
        fontSize: '18px',
        fontWeight: '600',
        color: '#475569'
      }
    }
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center ">
    <div class="sign-in-card">
      <form @submit.prevent="post()" v-if="!fp" class="m-1">
        <div class="text-white">
        </div>
        <div class="row gap-2">
          <div class="col-12">
            <img src="../../assets/images/logo.png" alt="insell-logo" />
          </div>
          <div class="col-12">
            <h2 class="fs-1 fw-bolder">Hisobga kirish</h2>
            <p class="text-secondary">Iltimos hisobga kirish uchun login va parol kiriting</p>
          </div>
          <div class="col-12 ">
            <label for="phone-number">Login</label>
            <div class="input-group ">
              <div class="input-group-text bg-transparent rounded-left-5">+998</div>

              <input type="tel" class="form-control rounded-right-5" placeholder="Login kiriting" autofocus required
                id="phone-number" minlength="14" autocomplete="off" :value="value" v-imask="mask" @accept="onAccept"
                @complete="onComplete" />
            </div>
          </div>
          <div class="col-12">
            <label for="input_password">Parol</label>
            <div class="input-group">
              <input :type="type ? 'password' : 'text'" class="form-control rounded-left-5"
                placeholder="Parol kiriting" autofocus required id="input_password" v-model="data.password"
                autocomplete="off" />
              <div class="input-group-text rounded-right-5">
                <i @click="type = !type" class="fa-solid text-secondary cursor"
                  :class="type ? 'fa-eye' : 'fa-eye-slash'" />
              </div>
            </div>
            <div class="text-end mt-2">
              <a class="a" @click="fp = true"> Parolni unutdingizmi ? </a>
            </div>
          </div>
          <div class="pt-3">
            <button style="width: 80% !important" class="rounded-5 fs-6" type="submit">KIRISH</button>
          </div>
          <div>
            <p class="text-secondary">
              Hali hisobingiz mavjud emasmi ?
              <router-link to="/register"> Ro‘yxatdan o‘tish </router-link>
            </p>
          </div>
        </div>
      </form>
      <form @submit.prevent="NewPassword()" v-else>
        <div class="row my-auto gap-2" v-if="!check_sms">
          <div class="col-12">
            <h2>Yangi parol kiritish</h2>
          </div>
          <div class="col-12">
            <label for="phone-number1">Login</label>
            <div class="input-group">
              <div class="input-group-text bg-transparent ">+998</div>

              <input type="tel" class="form-control" placeholder="Login kiriting" autofocus required
                v-model="upd_password.username" id="phone-number" minlength="14" maxlength="14"
                @keypress="phoneNumberFormatter()" autocomplete="off" />
            </div>
          </div>
          <div class="col-12">
            <label for="input_password">Yangi parol</label>
            <div class="input-group">
              <input :type="typePass ? 'password' : 'text'" class="form-control" placeholder="Parol kiriting"
                autofocus required id="input_password" v-model="upd_password.password" autocomplete="off"
                minlength="6" />
              <div class="input-group-text">
                <i @click="typePass = !typePass" class="fa-solid text-secondary cursor"
                  :class="typePass ? 'fa-eye' : 'fa-eye-slash'" />
              </div>
            </div>
          </div>
          <div class="col-12">
            <label for="input_password2">Parolni takrorlash</label>
            <div class="input-group">
              <input :type="typePass2 ? 'password' : 'text'" class="form-control"
                placeholder="Parolni takror kiriting" autofocus required id="input_password2"
                v-model="upd_password.password2" autocomplete="off" minlength="6" />
              <div class="input-group-text">
                <i @click="typePass2 = !typePass2" class="fa-solid text-secondary cursor"
                  :class="typePass2 ? 'fa-eye' : 'fa-eye-slash'" />
              </div>
            </div>
          </div>
          <div class="col-12 pt-3">
            <button>SMS kodni olish</button>
          </div>
          <div>
            <a @click="fp = false"> <i class="fa fa-arrow-left"></i> Ortga </a>
          </div>
        </div>
        <div v-else class="text-center border border-2 p-3 bg-transparent " style="border-radius: 10px">
          <h4>+998 {{ upd_password.username }}</h4>
          <p class="">
            Telefon raqamiga yuborilgan
            <span class="d-inline-block" style="font-size: 18px; font-weight: 800">SMS kod</span>ni kiriting
          </p>
          <form class="form" @submit.prevent="confirmSms()">
            <div class="d-flex justify-content-center gap-1 my-3">
              <input v-for="(char, index) in otpValue" :key="index" type="text"
                class="form-control otp-input text-center" v-model="otpValue[index]" @input="moveToNextInput(index)"
                @keydown.backspace="moveToPreviousInput(index)" maxlength="1" minlength="1" ref="inputs" required />
            </div>
            <button class="btn btn-sm form_submit">Tasdiqlash</button>
          </form>
          <p class="pt-3" v-if="!retry_sms">{{ displayTime }}</p>
          <p class="pt-3" v-else>
            Kod kelmadimi ?
            <span @click="RetrySms()" style="color: blue; cursor: pointer; font-size: 15px"
              class="cursor-pointer d-inline-block">Qayta kod jo‘natish</span>
          </p>
        </div>
      </form>
    </div>
    <div :style="swiperWrapperStyle">
      <swiper ref="swiperRef" :modules="modules" :slides-per-view="5" :centered-slides="true" :space-between="20"
        :loop="true" :grab-cursor="true" :autoplay="{ delay: 2000 }" @swiper="onSwiper" @slide-change="onSlideChange"
        :style="swiperStyle">
        <swiper-slide v-for="(slide, index) in icon_logo" :key="slide.id" :style="getSlideStyle(index)"
          class="logos_item">

          <div class="logos_icon" :class="slide.active ? 'scale-10' : ''">
            <img v-if="slide.icon" :src="getImageUrl(slide.icon)" :alt="slide.title" />
          </div>
          <h6 v-if="slide.title">{{ slide.title }}</h6>
        </swiper-slide>
      </swiper>
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
p {
  font-family: "Inter", sans-serif;
  color: var(--p-black);
}

p {
  font-size: 16px;
  color: var(--p-black);
  font-weight: 600;
}

.logos {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  margin-top: 10px;
  padding: 0 5rem;

  @media (max-width: 400px) {
    padding: 0 2rem;

  }

  &_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    text-decoration: none;

    &.active {
      width: 100px;
      height: max-content;
      scale: 2;

      .logos_icon {
        background-color: var(--orangred);
      }
    }

    .logos_icon {
      padding: 10px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;

      img {
        width: 35px;
        height: 35px;
        object-fit: contain;
      }
    }

    h6 {
      text-align: center;
      font-size: 12px;
      color: var(--p-black);
    }
  }
}

@media (max-width: 1024px) {
  .logos {
    padding: 40px 0 0 0;

    &_item {
      &.active {
        scale: 1.5;
      }

      .logos_icon {
        img {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}

main {
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  background-size: cover;
  background-position: right;
}

.sign-in-card {
  padding: 3rem 3rem 20px;
  width: 450px;
  height: 85vh;
  color: var(--p-white);
  background-color: rgb(255, 255, 255, 0.2);
  backdrop-filter: blur(3px);
 
  text-align: center;
  background: var(--p-white);
}

@media (max-width: 450px) {
  .sign-in-card {
    padding: 10px 0 0 0;
  }

  .logos {
    padding-top: 30px;
    transform: translateY(-10px);
  }
}

.sign-in-card img {
  width: 150px;
  margin-bottom: 40px;

  @media (max-width: 400px) {
    margin-bottom: 0px;
  }
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
  color: white;
  background-color: var(--orangred);
  font-size: x-small;
  letter-spacing: 2px;
  width: 100%;
}

button:active {
  border-color: white;
}

a {
  font-size: 14px;
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

.a {
  color: #0d6efd;
  text-decoration: underline;
  cursor: pointer;
}
</style>
