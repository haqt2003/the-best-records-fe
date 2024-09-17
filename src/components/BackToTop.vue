<template>
  <img
    @click="backToTop"
    v-if="isScrolled"
    src="@/assets/images/commons/back-to-top.svg"
    alt=""
    class="fixed right-5 sm:right-10 bottom-14 z-30 cursor-pointer"
  />
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
export default {
  setup() {
    const isScrolled = ref(false);

    function handleScroll() {
      isScrolled.value = window.scrollY > 50;
    }

    function backToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    onMounted(() => {
      isScrolled.value = window.scrollY > 50;
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { isScrolled, handleScroll, backToTop };
  },
};
</script>
