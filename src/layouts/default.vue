<template>
  <header-component />
  <slot />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  name: {
    name: "default-view",
  },
  components: { HeaderComponent: HeaderComponent },
};
</script>
