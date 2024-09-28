<template>
  <div
    class="w-screen h-screen overflow-hidden relative bg-cover bg-no-repeat bg-[url('@/assets/images/login/bg.svg')]"
  >
    <div
      class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 sm:left-auto sm:-translate-x-0 py-9 px-10 w-[90%] sm:w-auto sm:right-[15%] sm:py-12 sm:px-14 bg-white rounded-xl"
    >
      <h1 class="font-[Anton] text-[36px] text-center">ĐĂNG KÝ</h1>
      <form @submit.prevent="register" action="" class="mt-10">
        <label v-if="step === 1" for="name" class="font-semibold"
          >Họ và tên</label
        >
        <input
          @input="inputName"
          v-if="step === 1"
          v-model="name"
          id="name"
          type="text"
          class="block outline-none border-b-[0.1px] border-black py-[10px] w-full sm:w-[310px]"
        />
        <span class="mt-4 block text-[14px] hide warn text-red"
          >Vui lòng nhập tên của bạn</span
        >
        <div class="relative">
          <label v-if="step === 2" for="email" class="font-semibold"
            >Email</label
          >
          <input
            @input="inputEmail"
            v-if="step === 2"
            v-model="email"
            id="email"
            type="email"
            placeholder="example@gmail.com"
            autocomplete="email"
            class="block outline-none border-b-[0.1px] border-black py-[10px] w-full sm:w-[310px]"
          />
          <span
            class="mt-4 block text-[14px] hide warnEmail text-red absolute bottom-2 right-0"
            >Vui lòng nhập email</span
          >
        </div>
        <label v-if="step === 2" for="password" class="font-semibold mt-8 block"
          >Mật khẩu</label
        >
        <div class="relative">
          <input
            v-if="step === 2"
            v-model="password"
            id="password"
            type="password"
            placeholder="******"
            autocomplete="password"
            class="block outline-none border-b-[0.1px] border-black py-[10px] w-full sm:w-[310px]"
          />
          <div
            @click="togglePassword"
            class="absolute right-4 top-2 cursor-pointer"
          >
            <img
              v-if="isShowPassword && password"
              src="../assets/images/login/showPassword.svg"
              alt=""
            />
            <img
              v-if="!isShowPassword && password"
              src="../assets/images/login/hidePassword.svg"
              alt=""
            />
          </div>
          <span
            class="mt-4 block text-[14px] hide warnPassword text-red absolute bottom-2 right-0"
            >Vui lòng nhập mật khẩu</span
          >
        </div>
        <button
          @click="nextStep"
          v-if="step === 1"
          type="button"
          class="w-full sm:w-[310px] bg-yellow rounded-xl mt-7 font-semibold h-[56px] hover:bg-yellowHover"
        >
          Tiếp tục
        </button>
        <button
          v-if="step === 2"
          type="submit"
          class="w-full sm:w-[310px] bg-yellow rounded-xl mt-7 font-semibold h-[56px] hover:bg-yellowHover"
        >
          Đăng ký
        </button>
      </form>
      <div class="mt-6 flex items-center mx-auto justify-center">
        <div class="h-[0.5px] bg-black w-[68px]"></div>
        <span class="text-[14px] mx-6">Hoặc</span>
        <div class="h-[0.5px] bg-black w-[68px]"></div>
      </div>
      <GoogleLogin :callback="callback" popup-type="TOKEN" class="w-full">
        <button
          class="sm:w-[310px] cursor-pointer w-full bg-none border-black border-[0.5px] rounded-xl mt-6 font-semibold h-[56px] flex justify-center items-center"
        >
          <img src="../assets/images/login/gg.svg" alt="" class="block" />
          <span class="block ml-5">Đăng ký với Google</span>
        </button>
      </GoogleLogin>
      <span class="mt-7 block text-center"
        >Bạn đã có tài khoản?
        <router-link to="/login" class="font-semibold"
          >Đăng nhập</router-link
        ></span
      >
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const step = ref(1);
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);

    const isShowPassword = ref(false);

    function togglePassword() {
      isShowPassword.value = !isShowPassword.value;
      const passwordField = document.getElementById("password");
      if (passwordField.type === "password") {
        passwordField.type = "text";
      } else {
        passwordField.type = "password";
      }
    }

    function nextStep() {
      if (name.value) {
        step.value = 2;
      } else {
        document.querySelector(".warn").classList.remove("hide");
      }
    }

    function inputName() {
      if (name.value) {
        document.querySelector(".warn").classList.add("hide");
      } else {
        document.querySelector(".warn").classList.remove("hide");
      }
    }

    function inputEmail() {
      if (email.value) {
        document.querySelector(".warnEmail").classList.add("hide");
      } else {
        document.querySelector(".warnEmail").classList.remove("hide");
      }
    }

    function inputPassword() {
      if (password.value) {
        document.querySelector(".warnPassword").classList.add("hide");
      } else {
        document.querySelector(".warnPassword").classList.remove("hide");
      }
    }

    function checkInfor() {
      inputEmail(), inputPassword();
    }

    async function register() {
      checkInfor();
      try {
        await store.dispatch("register", {
          name: name.value,
          email: email.value,
          password: password.value,
        });
        if (store.state.user.name !== "") {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }

    const callback = async (response) => {
      try {
        await store.dispatch("authGoogle", response.access_token);
        if (store.state.user.name !== "") {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      step,
      name,
      email,
      password,
      isShowPassword,
      nextStep,
      inputName,
      register,
      togglePassword,
      callback,
      inputPassword,
      inputEmail,
    };
  },
};
</script>

<style scoped>
.hide {
  display: none;
}
</style>
