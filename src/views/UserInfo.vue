<template>
  <div class="">{{ user.name }}</div>
</template>

<script>
// import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const user = store.getters.getUser;
    return { user };
  },
};
</script>
