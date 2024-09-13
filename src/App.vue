<template>
  <router-view />
  <side-menu />
</template>

<script>
import SideMenu from "./components/SideMenu.vue";

export default {
  components: {
    SideMenu,
  },
  setup() {},
};
</script>
