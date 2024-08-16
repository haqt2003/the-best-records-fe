<template>
  <div
    class="w-screen h-screen overflow-hidden relative bg-cover bg-no-repeat bg-[url('@/assets/images/login/bg.svg')]"
  >
    <div
      class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 sm:left-auto sm:-translate-x-0 py-10 px-10 w-[90%] sm:w-auto sm:right-[15%] sm:py-12 sm:px-14 bg-white rounded-xl"
    >
      <h1 class="font-[Anton] text-[36px] text-center">ĐĂNG KÝ</h1>
      <form @submit.prevent="" action="" class="mt-10">
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
        <label v-if="step === 2" for="email" class="font-semibold">Email</label>
        <input
          v-if="step === 2"
          v-model="email"
          id="email"
          type="email"
          placeholder="example@gmail.com"
          class="block outline-none border-b-[0.1px] border-black py-[10px] w-full sm:w-[310px]"
        />
        <label v-if="step === 2" for="password" class="font-semibold mt-8 block"
          >Mật khẩu</label
        >
        <div class="">
          <input
            v-if="step === 2"
            v-model="password"
            id="password"
            type="password"
            placeholder="******"
            class="block outline-none border-b-[0.1px] border-black py-[10px] w-full sm:w-[310px]"
          />
        </div>
        <button
          @click="nextStep"
          v-if="step === 1"
          type="submit"
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
      <div
        class="w-full sm:w-[310px] cursor-pointer bg-none border-black border-[0.5px] rounded-xl mt-6 font-semibold h-[56px] flex justify-center items-center"
      >
        <img src="../assets/images/login/gg.svg" alt="" class="block" />
        <span class="block ml-5">Đăng ký với Google</span>
      </div>
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
export default {
  setup() {
    const step = ref(1);
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);

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

    return { step, name, email, password, nextStep, inputName };
  },
};
</script>

<style scoped>
.hide {
  display: none;
}
</style>
