<template>
  <div
    class="max-w-[1440px] px-5 sm:px-[60px] xl:px-[120px] flex justify-between xl:justify-normal xl:grid xl:grid-cols-4 items-center mt-6 xl:mt-2 mx-auto"
  >
    <router-link to="/" class="float-left hidden xl:block"
      ><img src="../assets/images/commons/logo.svg" alt="" class="w-[120px]"
    /></router-link>

    <div class="font-bold gap-[60px] hidden xl:flex col-span-2 mx-auto">
      <router-link to="/" class="opacity-60 home-link"> TRANG CHỦ </router-link>
      <router-link to="/about" @click="getPath" class="opacity-60 about-link">
        VỀ CHÚNG TÔI
      </router-link>
      <router-link
        to="/products"
        @click="getPath"
        class="opacity-60 store-link"
      >
        CỬA HÀNG
      </router-link>
    </div>
    <div class="xl:hidden">
      <img
        @click="openTab()"
        src="../assets/images/commons/menu-icon-black.svg"
        alt=""
      />
    </div>
    <div class="flex gap-4 sm:gap-5 justify-end">
      <div class="cursor-pointer hidden sm:block">
        <img
          v-if="!isSearch"
          @click="toggleSearch"
          src="../assets/images/commons/search-icon-black.svg"
          alt=""
          class="w-8 sm:w-9"
        />
        <div
          v-if="isSearch"
          class="bg-grey rounded-full h-10 px-6 flex items-center"
        >
          <img
            src="../assets/images/commons/search-mini.svg"
            alt=""
            class="w-4 h-4"
          />
          <input
            type="text"
            placeholder="Search..."
            class="text-[#222] text-[12px] font-light outline-none bg-grey ml-2"
          />
        </div>
      </div>
      <router-link to="/cart" class="cursor-pointer relative" @click="goCart">
        <img
          src="../assets/images/commons/cart-icon-black.svg"
          alt=""
          class="w-8 sm:w-9"
        />
        <div
          v-if="totalCartItems"
          class="absolute top-0 right-0 w-[14px] h-[14px] sm:w-4 sm:h-4 bg-black text-white flex items-center justify-center rounded-full text-[10px]"
        >
          {{ totalCartItems }}
        </div>
      </router-link>
      <div @click="toggleMenu" class="cursor-pointer relative">
        <img
          v-if="!avatar"
          src="../assets/images/commons/user-icon-black.svg"
          alt=""
          class="w-8 sm:w-9"
        />
        <div v-if="avatar" class="w-8 sm:w-9 rounded-full overflow-hidden">
          <img :src="avatar" alt="" />
        </div>
        <div
          v-if="!isUser && isShowMenu"
          class="absolute z-10 bg-white right-0 top-14 p-1 border-[#D5D5D5] border-[0.5px] rounded-lg w-[194px] shadow-[2px_2px_4px_rgba(0,0,0,0.2)]"
        >
          <router-link
            to="/login"
            class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4"
          >
            <img
              src="../assets/images/commons/login-icon.svg"
              alt=""
              class="w-[18px] h-[18px]"
            />
            <span class="block ml-2 font-medium text-[12px]">Đăng nhập</span>
          </router-link>
          <router-link
            to="/signup"
            class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4 mt-1"
          >
            <img
              src="../assets/images/commons/logup-icon.svg"
              alt=""
              class="w-[18px] h-[18px]"
            />
            <span class="block ml-2 font-medium text-[12px]">Đăng ký</span>
          </router-link>
        </div>
        <div
          v-if="isUser && isShowMenu"
          class="absolute z-10 bg-white right-0 top-14 p-1 border-[#D5D5D5] border-[0.5px] rounded-lg w-[194px] shadow-[2px_2px_4px_rgba(0,0,0,0.2)]"
        >
          <router-link
            to="/user-info"
            class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4"
          >
            <img
              src="../assets/images/commons/user2-icon.svg"
              alt=""
              class="w-[18px] h-[18px]"
            />
            <span class="block ml-2 font-medium text-[12px]"
              >Thông tin tài khoản</span
            >
          </router-link>
          <router-link
            to="/settings"
            class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4 mt-1"
          >
            <img
              src="../assets/images/commons/setting-icon.svg"
              alt=""
              class="w-[18px] h-[18px]"
            />
            <span class="block ml-2 font-medium text-[12px]">Cài đặt</span>
          </router-link>
          <div
            class="h-[0.5px] bg-[#D9D9D9] w-full absolute left-0 top-[89px]"
          ></div>
          <router-link
            to="/login"
            @click="logout"
            class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4 mt-[10px]"
          >
            <img
              src="../assets/images/commons/logout-icon.svg"
              alt=""
              class="w-[18px] h-[18px]"
            />
            <span class="block ml-2 font-medium text-[12px]">Đăng xuất</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import getToken from "@/composables/getToken";
import removeToken from "@/composables/removeToken";
export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const isSearch = ref(false);
    const isUser = getToken();
    const isShowMenu = ref(false);

    function openTab() {
      store.commit("TOGGLE_TAB");
    }

    const totalCartItems = computed(() =>
      store.getters.totalCartItems < 100 ? store.getters.totalCartItems : "99+"
    );
    const avatar = store.state.user.avatar;

    function getPath() {
      const path = route.path;
      document.querySelector(".home-link").style.opacity =
        path === "/" ? 1 : 0.6;
      document.querySelector(".about-link").style.opacity =
        path === "/about" ? 1 : 0.6;
      document.querySelector(".store-link").style.opacity =
        path === "/products" ? 1 : 0.6;
    }

    function goCart() {
      document.querySelector(".home-link").style.opacity = 0.6;
      document.querySelector(".about-link").style.opacity = 0.6;
      document.querySelector(".store-link").style.opacity = 0.6;
    }

    function toggleSearch() {
      isSearch.value = !isSearch.value;
    }

    function toggleMenu() {
      isShowMenu.value = !isShowMenu.value;
    }

    function logout() {
      store.dispatch("logout");
      removeToken();
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
      isSearch,
      isShowMenu,
      isUser,
      avatar,
      totalCartItems,
      getPath,
      goCart,
      logout,
      toggleMenu,
      toggleSearch,
      openTab,
    };
  },
};
</script>
