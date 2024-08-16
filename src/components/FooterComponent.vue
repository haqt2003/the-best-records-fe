<template>
  <div
    class="max-w-[1440px] px-5 sm:px-[60px] xl:px-[120px] mx-auto pb-8 lg:pb-12"
  >
    <div class="mx-auto">
      <img src="../assets/images/commons/logo.svg" alt="" class="mx-auto" />
      <div
        @click="getPath"
        class="font-bold gap-10 sm:gap-[60px] flex col-span-2 mx-auto justify-center mt-6 text-[14px] sm:text-[16px]"
      >
        <router-link to="/" class="h-link"> TRANG CHỦ </router-link>
        <router-link to="/about" class="a-link"> VỀ CHÚNG TÔI </router-link>
        <router-link to="/products" class="s-link"> CỬA HÀNG </router-link>
      </div>
    </div>
    <div
      class="flex flex-wrap justify-between items-end lg:mt-16 xl:mt-10 text-[14px] sm:text-[16px]"
    >
      <div class="mt-12 w-full lg:w-auto lg:mt-0">
        <div class="flex justify-between items-center">
          <span class="font-bold text-[18px] sm:text-[20px]">Liên hệ</span>
          <!-- <img
            src="../assets/images/commons/arrow-footer.svg"
            alt=""
            class="block lg:hidden"
          /> -->
        </div>
        <span class="block mt-3 lg:mt-4"
          >140 Trần Phú, Quận Hà Đông, Hà Nội</span
        >
        <span class="block mt-3 lg:mt-4">0969.048.062</span>
        <span class="block mt-3 lg:mt-4">thebestrecords@gmail.com</span>
      </div>
      <div class="w-full lg:w-auto mt-7 lg:mt-0">
        <div class="flex justify-between items-center">
          <span class="font-bold text-[18px] sm:text-[20px]">Mạng xã hội</span>
          <!-- <img
            src="../assets/images/commons/arrow-footer.svg"
            alt=""
            class="block lg:hidden"
          /> -->
        </div>
        <a href="" class="block mt-3 lg:mt-4">Facebook</a>
        <a href="" class="block mt-3 lg:mt-4">Instagram</a>
        <a href="" class="block mt-3 lg:mt-4">Youtube</a>
      </div>
      <div class="mt-7 lg:mt-0 w-full lg:w-auto">
        <div class="flex justify-between items-center">
          <span class="font-bold text-[18px] sm:text-[20px]">Hỗ trợ</span>
          <!-- <img
            src="../assets/images/commons/arrow-footer.svg"
            alt=""
            class="block lg:hidden"
          /> -->
        </div>
        <a href="" class="block mt-3 lg:mt-4">Phương thức thanh toán</a>
        <a href="" class="block mt-3 lg:mt-4">Hoàn trả</a>
        <a href="" class="block mt-3 lg:mt-4">Chính sách pháp lý</a>
      </div>
      <img
        src="../assets/images/commons/img-footer.svg"
        alt=""
        class="lg:w-[160px] xl:w-auto lg:block hidden"
      />
    </div>
    <span
      class="font-semibold opacity-60 mt-8 block lg:mt-16 xl:mt-20 text-[14px] sm:text-[16px]"
      >2024 © The Best Records - Bản quyền thuộc Công ty TNHH The Best
      Records</span
    >
  </div>
</template>

<script>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();

    function getPath() {
      const path = route.path;
      document.querySelector(".h-link").style.opacity = path === "/" ? 1 : 0.6;
      document.querySelector(".a-link").style.opacity =
        path === "/about" ? 1 : 0.6;
      document.querySelector(".s-link").style.opacity =
        path === "/products" ? 1 : 0.6;
    }

    onMounted(() => {
      getPath();
    });

    watch(
      () => route.path,
      () => {
        getPath();
      }
    );

    return {
      getPath,
    };
  },
};
</script>
