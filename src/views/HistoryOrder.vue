<template>
  <header-component />
  <back-to-top />
  <div
    class="max-w-[1440px] px-5 sm:px-[60px] xl:px-[120px] mt-16 mx-auto pb-20"
  >
    <div class="flex flex-wrap justify-between">
      <div class="w-full sm:w-[25%]">
        <div class="relative w-[200px] h-[200px] mx-auto">
          <div class="w-[200px] h-[200px] overflow-hidden rounded-full">
            <img :src="avatar" alt="" class="w-full h-full" />
          </div>
        </div>
        <div class="mx-auto text-center mt-7">
          <span class="block font-semibold text-[18px]">{{ name }}</span>
          <span class="block font-light mt-1">{{ email }}</span>
        </div>
        <div class="hidden sm:block mt-10">
          <div class="font-medium">
            <router-link
              to="/user-info"
              class="rounded-lg px-8 py-4 cursor-pointer block"
            >
              Thông tin cá nhân
            </router-link>
            <div class="h-[0.5px] bg-yellow w-line mx-auto opacity-50"></div>
            <div class="px-8 py-4 cursor-pointer rounded-lg active-box">
              Lịch sử đặt hàng
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-[67%]">
        <h1 class="font-[Anton] text-[40px]">LỊCH SỬ ĐẶT HÀNG</h1>
      </div>
    </div>
  </div>
  <footer-component />
</template>

<script>
import { ref, onMounted } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import BackToTop from "@/components/BackToTop.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { useStore } from "vuex";
import OrderAPI from "@/apis/modules/order";
export default {
  components: {
    HeaderComponent,
    BackToTop,
    FooterComponent,
  },
  setup() {
    const store = useStore();

    const avatar = ref(store.state.user.avatar);

    const email = ref(store.state.user.email);
    const name = ref(store.state.user.name);
    const id = store.state.user.id;
    const getOrders = async () => {
      const response = await OrderAPI.getUserOrders(id);
      console.log(response.data);
    };

    onMounted(async () => {
      await getOrders();
    });
    return { avatar, email, name, getOrders };
  },
};
</script>

<style scoped>
.active-box {
  background-color: #f6d776;
  color: white;
  border-color: #f6d776;
}
</style>
