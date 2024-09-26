<template>
  <div
    class="w-screen h-screen overflow-hidden relative bg-cover bg-no-repeat bg-[url('@/assets/images/login/bg.svg')]"
  >
    <div
      class="absolute top-1/2 -translate-y-1/2 left-1/2 sm:left-auto sm:-translate-x-0 -translate-x-1/2 sm:right-[15%] py-10 px-10 sm:py-20 sm:px-14 bg-white rounded-xl w-[88%] sm:w-auto"
    >
      <router-link to="/forgot-password" class="flex items-center gap-3">
        <img src="../assets/images/login/back.svg" alt="" />
        <span class="block">Quay lại</span>
      </router-link>
      <span class="font-bold text-[20px] mt-8 block">Quên mật khẩu</span>
      <p class="max-w-[275px] mt-3 font-light text-[14px]">
        Tạo mật khẩu mới cho tài khoản của bạn, nhớ nó cho lần đăng nhập sau.
      </p>
      <form @submit.prevent="submitPassword" action="" class="mt-10">
        <div class="relative">
          <label for="password" class="font-semibold">Mật khẩu mới</label>
          <input
            @input="inputPassword"
            v-model="password"
            id="password"
            type="text"
            autocomplete="password"
            class="block outline-none border-b-[0.1px] border-black py-[10px] w-full sm:w-[310px]"
          />
          <span class="mt-3 block text-[14px] hide warnPassword text-red"
            >Vui lòng nhập mật khẩu</span
          >
        </div>

        <button
          type="submit"
          class="sm:w-[310px] w-full bg-yellow rounded-xl mt-7 font-semibold h-[56px] hover:bg-yellowHover"
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  </div>
  <div
    v-if="isSuccess !== null"
    class="fixed top-0 left-0 w-full h-full px-5 bg-[rgba(0,0,0,0.4)] z-50"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[70%] max-w-[400px] bg-white rounded-xl py-9"
    >
      <div v-if="isSuccess" class="text-center mt-10">
        <span class="block">Đổi mật khẩu thành công!</span>
        <button
          @click="toggleSuccess"
          class="bg-yellow hover:bg-yellowHover rounded-lg px-5 py-3 mt-6 font-semibold"
        >
          OK
        </button>
      </div>
      <div v-if="isSuccess === false" class="text-center mt-10">
        <span class="block">Đổi mật khẩu thất bại!</span>
        <button
          @click="toggleSuccess"
          class="bg-yellow hover:bg-yellowHover rounded-lg px-5 py-3 mt-6 font-semibold"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthAPI from "@/apis/modules/auth";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const password = ref("");

    const isSuccess = ref(null);

    function toggleSuccess() {
      if (isSuccess.value === true) router.push("/login");
      isSuccess.value = null;
    }

    function inputPassword() {
      if (password.value) {
        document.querySelector(".warnPassword").classList.add("hide");
      } else {
        document.querySelector(".warnPassword").classList.remove("hide");
      }
    }

    async function submitPassword() {
      inputPassword();
      if (password.value) {
        try {
          const response = await AuthAPI.newPassword({
            email: route.query.email,
            password: password.value,
          });
          if (response) {
            isSuccess.value = true;
          }
        } catch (error) {
          isSuccess.value = false;
        }
      }
    }

    return {
      password,
      isSuccess,
      inputPassword,
      submitPassword,
      toggleSuccess,
    };
  },
};
</script>

<style scoped>
.hide {
  display: none;
}
</style>
