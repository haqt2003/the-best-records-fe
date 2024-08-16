<template>
  <header-component />
  <back-to-top />
  <div></div>
  <footer-component />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import BackToTop from "@/components/BackToTop.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  components: {
    HeaderComponent,
    BackToTop,
    FooterComponent,
  },
  setup() {
    return {};
  },
};
</script>
