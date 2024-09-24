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
      <p class="max-w-[280px] mt-3 font-light text-[14px]">
        Vui lòng nhập mã được gửi tới email của bạn.
      </p>
      <form @submit.prevent="submitCode" action="" class="mt-10">
        <div class="relative">
          <label for="code" class="font-semibold">Nhập mã xác minh</label>
          <input
            @input="inputCode"
            v-model="code"
            id="code"
            type="code"
            autocomplete="code"
            class="block outline-none border-b-[0.1px] border-black py-[10px] w-full sm:w-[310px]"
          />
          <span class="mt-3 block text-[14px] hide warnCode text-red"
            >Vui lòng nhập mã xác minh</span
          >
        </div>

        <button
          type="submit"
          class="sm:w-[310px] w-full bg-yellow rounded-xl mt-7 font-semibold h-[56px] hover:bg-yellowHover"
        >
          Tiếp tục
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const code = ref("");

    function inputCode() {
      if (code.value) {
        document.querySelector(".warnCode").classList.add("hide");
      } else {
        document.querySelector(".warnCode").classList.remove("hide");
      }
    }

    function submitCode() {
      inputCode();
      router.push("/new-password");
    }

    return { code, inputCode, submitCode };
  },
};
</script>

<style scoped>
.hide {
  display: none;
}
</style>
