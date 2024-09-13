<template>
  <transition name="slide-fade" class="h-full">
    <div
      v-if="isOpenTab"
      class="w-[70%] max-w-[400px] h-full px-5 sm:px-[60px] py-6 xl:hidden fixed inset-0 bg-[#F1F1F1] z-[110] shadow-[0_0_35px_-10px_rgba(0,0,0,0.3)]"
    >
      <img
        @click="toggleTab"
        src="../assets/images/commons/menu-icon-black.svg"
        alt=""
        class="cursor-pointer"
      />
      <div class="">
        <router-link @click="toggleTab" to="/" class="mt-10 block font-bold"
          >Trang chủ</router-link
        >
        <router-link @click="toggleTab" to="/about" class="mt-9 block font-bold"
          >Về chúng tôi</router-link
        >
        <router-link
          @click="toggleTab"
          to="/products"
          class="mt-9 block font-bold"
          >Cửa hàng</router-link
        >
      </div>
    </div>
  </transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const isOpenTab = computed(() => store.getters.getStatusTab);

    function toggleTab() {
      store.commit("TOGGLE_TAB");
    }
    return { isOpenTab, toggleTab };
  },
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  @apply transition-transform duration-500 ease-in-out;
}
.slide-fade-enter-from {
  @apply -translate-x-full;
}
.slide-fade-enter-to {
  @apply translate-x-0;
}
.slide-fade-leave-from {
  @apply translate-x-0;
}
.slide-fade-leave-to {
  @apply -translate-x-full;
}
</style>
