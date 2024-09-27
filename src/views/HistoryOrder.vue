<template>
  <header-component />
  <back-to-top />
  <div
    class="max-w-[1440px] px-5 sm:px-[60px] xl:px-[120px] mt-16 mx-auto pb-20"
  >
    <h1
      class="font-[Anton] text-black text-[36px] sm:text-[44px] text-center lg:hidden"
    >
      LỊCH SỬ ĐẶT HÀNG
    </h1>
    <div class="flex flex-wrap justify-between mt-14 lg:mt-0">
      <div class="w-full lg:w-[25%] hidden lg:block">
        <div class="relative w-[200px] h-[200px] mx-auto">
          <div class="w-[200px] h-[200px] overflow-hidden rounded-full">
            <img
              v-if="!avatar"
              src="../assets/images/commons/user-big.svg"
              alt=""
              class="w-full h-full object-cover"
            />
            <img
              v-if="avatar"
              :src="avatar"
              alt=""
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div class="mx-auto text-center mt-7">
          <span class="block font-semibold text-[18px]">{{ name }}</span>
          <span class="block font-light mt-1">{{ email }}</span>
        </div>
        <div class="hidden lg:block mt-10">
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
      <div class="w-full lg:w-[67%]">
        <h1 class="font-[Anton] text-[40px] hidden lg:block">
          LỊCH SỬ ĐẶT HÀNG
        </h1>
        <div v-if="orders.length" class="lg:mt-[40px] sm:mt-[32px]">
          <div
            v-for="(order, index) in orders"
            :key="index"
            class="lg:text-[16px] text-[14px] lg:mb-[16px] mb-[12px]"
          >
            <div
              @click="togglist(index)"
              class="w-full justify-between flex items-center h-[80px] rounded-lg bg-grey cursor-pointer"
            >
              <p class="hidden sm:block ml-[32px]">Đơn hàng #{{ index + 1 }}</p>
              <p class="sm:hidden ml-[28px]">#{{ index }}</p>
              <p>{{ formatCurrency(order.total) }}</p>
              <p>{{ formatDate(order.createdAt) }}</p>
              <div class="hidden lg:block">
                <div class="flex items-center">
                  <div
                    class="w-[154px] h-[36px] rounded-3xl"
                    :class="{
                      'bg-black text-white':
                        order.shippingStatus == 'Delivered',
                      'bg-white text-black border border-black':
                        order.shippingStatus == 'Delivering',
                    }"
                  >
                    <p class="mt-[7px] ml-[18px]">
                      {{
                        order.shippingStatus == "Delivering"
                          ? "Đang giao hàng"
                          : "Giao thành công"
                      }}
                    </p>
                  </div>
                  <div>
                    <img
                      src="../assets/images/details/arrow.svg"
                      alt=""
                      class="ml-[34px] mr-[24px]"
                      :class="{
                        '-rotate-90': isListVisible[index],
                        'rotate-90': !isListVisible[index],
                      }"
                    />
                  </div>
                </div>
              </div>
              <div class="lg:hidden">
                <div class="flex items-center mr-[29px]">
                  <div>
                    <img
                      v-if="order.shippingStatus == 'Delivered'"
                      src="../assets/images/user/has_check.svg"
                      alt=""
                    />
                    <img
                      v-if="order.shippingStatus == 'Delivering'"
                      src="../assets/images/user/check.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <transition name="fade">
              <div
                v-if="isListVisible[index]"
                class="mt-[12px] overflow-hidden"
              >
                <div
                  v-for="(item, index) in order.products"
                  :key="index"
                  class="flex justify-between w-full items-center px-5 sm:px-10 gap-4 lg:gap-0"
                >
                  <img :src="item.product.img" class="w-[120px] h-[120px]" />
                  <div class="lg:ml-[53px] lg:w-[200px] ml-[10px] w-[120px]">
                    <p class="font-medium">{{ item.product.title }}</p>
                    <p
                      class="lg:text-[14px] lg:mt-[8px] sm:text-[12px] mt-[3px]"
                    >
                      {{ item.product.singer }}
                    </p>
                    <p class="sm:hidden mt-[12px]">
                      {{ formatCurrency(item.product.price) }}
                    </p>
                  </div>
                  <p class="hidden sm:block ml-[100px] mr-[100px] w-[50px]">
                    {{ item.quantity }}
                  </p>
                  <p class="sm:hidden block w-[20px] ml-[48px]">
                    X{{ item.quantity }}
                  </p>
                  <p class="hidden sm:block">
                    {{ formatCurrency(item.product.price) }}
                  </p>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div v-if="!orders.length" class="mt-16 lg:mt-32 text-center">
          Chưa có đơn hàng!
        </div>
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
    const orders = ref([]);
    const getOrders = async () => {
      const response = await OrderAPI.getUserOrders(id);
      orders.value = response.data;
    };

    onMounted(async () => {
      await getOrders();
    });
    return { avatar, email, name, orders };
  },
  data() {
    return {
      isListVisible: [],
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB");
    },
    formatCurrency(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    },
    togglist(index) {
      this.isListVisible[index] = !this.isListVisible[index];
    },
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
