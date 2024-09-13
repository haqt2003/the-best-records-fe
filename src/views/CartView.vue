<template>
  <header-component />
  <back-to-top />
  <div
    class="max-w-[1440px] px-5 sm:px-[60px] xl:px-[120px] mt-16 mx-auto pb-20"
  >
    <h1 class="font-[Anton] text-black text-[36px] sm:text-[44px] text-center">
      GIỎ HÀNG
    </h1>
    <div v-if="cartList.length" class="">
      <div
        class="w-full h-[60px] xl:h-[68px] bg-yellow rounded-lg mt-20 xl:grid xl:grid-cols-12 items-center xl:gap-6 flex justify-between"
      >
        <div class="xl:col-span-2">
          <label class="custom-checkbox flex items-center px-4 xl:pl-8">
            <input
              @click="selectAll($event)"
              type="checkbox"
              class="checkAll"
            />
            <span class="checkmark"></span>
            <span class="ml-4 xl:ml-5">Chọn tất cả</span>
          </label>
        </div>
        <div class="col-span-3 font-semibold text-center hidden xl:block">
          Sản phẩm
        </div>
        <div class="col-span-2 font-semibold text-center hidden xl:block">
          Giá
        </div>
        <div class="col-span-2 font-semibold text-center hidden xl:block">
          Số lượng
        </div>
        <div class="col-span-2 font-semibold text-center hidden xl:block">
          Tổng
        </div>
        <div
          @click="deleteAll"
          class="xl:col-span-1 font-semibold mr-4 xl:mr-0 xl:ml-4 cursor-pointer"
        >
          <span v-show="isSelectAll" class="">Xóa</span>
        </div>
      </div>
      <div class="w-full mt-10" v-for="(item, index) in cartList" :key="index">
        <div
          class="flex justify-between xl:grid xl:grid-cols-12 xl:gap-6 items-center"
        >
          <div class="xl:col-span-2">
            <label class="custom-checkbox1 flex items-center pl-4 xl:pl-8">
              <input
                @click="addToPay($event, item)"
                type="checkbox"
                class="itemCheck"
              />
              <span class="checkmark"></span>
            </label>
          </div>
          <div
            @click="goToProduct(item.product._id)"
            class="xl:col-span-3 flex items-center overflow-hidden w-[50%] xl:w-auto cursor-pointer"
          >
            <img
              :src="item.product.img"
              alt=""
              class="w-[80px] xl:w-[110px] block drop-shadow-sm"
            />
            <div class="ml-2 xl:ml-6">
              <span
                class="font-semibold xl:font-normal text-[12px] xl:text-[16px] text-nowrap"
                >{{ item.product.title }}
              </span>
              <span
                class="block font-light text-[12px] xl:text-[14px] xl:mt-1 text-nowrap"
                >{{ item.product.singer }}</span
              >
            </div>
          </div>
          <div class="col-span-2 text-center hidden xl:block">
            {{ formatCurrency(item.product.price) }}
          </div>
          <div class="xl:col-span-2 font-semibold text-center">
            <input
              @change="updateCartProduct(item.product._id, $event)"
              type="number"
              class="w-6 h-6 xl:w-7 xl:h-7 text-center border border-black rounded outline-none text-[12px] xl:text-[16px]"
              :value="item.quantity"
            />
          </div>
          <div class="col-span-2 text-center hidden xl:block">
            {{ formatCurrency(item.product.price * item.quantity) }}
          </div>
          <div
            @click="deleteItem(item.product._id)"
            class="xl:col-span-1 mr-4 xl:mr-0 xl:ml-6 cursor-pointer"
          >
            <img src="../assets/images/cart/delete.svg" alt="" />
          </div>
        </div>
      </div>
      <div v-if="payList.length" class="max-w-[588px] mt-10 xl:mt-[60px]">
        <h2 class="font-semibold text-[16px] xl:text-[20px]">
          Bạn có mã giảm giá?
        </h2>
        <span class="mt-2 xl:mt-4 font-light block text-[14px] xl:text-[16px]"
          >Áp mã để nhận ưu đãi ngay lập tức</span
        >
        <div class="flex items-center mt-5 xl:mt-8">
          <input
            v-model="discountCode"
            type="text"
            class="rounded-lg h-[48px] bg-grey px-7 text-[14px] font-light outline-none w-[70%] xl:w-[60%]"
            placeholder="Nhập mã giảm giá"
          />
          <div
            @click="applyDiscount"
            class="ml-4 lg:ml-6 bg-yellow hover:bg-yellowHover rounded-lg font-semibold text-[14px] xl:text-[16px] h-[48px] flex items-center justify-center w-[35%] xl:w-[28%] cursor-pointer"
          >
            Áp dụng
          </div>
        </div>
      </div>
      <div
        v-if="payList.length"
        class="px-7 py-8 xl:px-[60px] xl:py-[52px] bg-grey mt-10 xl:mt-[60px] rounded-xl xl:rounded-lg flex-wrap flex xl:flex-nowrap justify-between"
      >
        <div class="w-full xl:w-[65%]">
          <h1 class="font-semibold">THÔNG TIN THANH TOÁN</h1>
          <div class="justify-between mt-10 hidden xl:flex">
            <h1 class="w-[40%]">Sản phẩm</h1>
            <h1 class="w-[30%] text-center">Số lượng</h1>
            <h1 class="w-[30%] text-center">Tổng tiền</h1>
          </div>
          <div
            v-for="(item, index) in payList"
            :key="index"
            class="flex justify-between mt-7 xl:mt-10 items-center"
          >
            <div
              class="flex w-full xl:justify-normal xl:w-[40%] items-center overflow-hidden"
            >
              <div class="xl:hidden w-[18%] text-center">
                {{ item.quantity }}x
              </div>
              <div class="flex items-center w-[80%]">
                <img :src="item.product.img" alt="" class="w-[110px]" />
                <div class="ml-5 xl:ml-7">
                  <span class="truncate">{{ item.product.title }}</span>
                  <span
                    class="block font-light text-[14px] truncate overflow-hidden"
                    >{{ item.product.singer }}</span
                  >
                </div>
              </div>
            </div>
            <h1 class="w-[30%] text-center hidden xl:block">
              {{ item.quantity }}
            </h1>
            <h1 class="w-[30%] text-center hidden xl:block">
              {{ formatCurrency(item.product.price * item.quantity) }}
            </h1>
          </div>
        </div>
        <div class="w-full xl:w-[28%] mt-12 xl:mt-0">
          <div
            class="flex items-center font-semibold xl:justify-end cursor-pointer"
          >
            Thanh toán khi nhận hàng
            <img src="../assets/images/cart/cod.svg" alt="" class="w-6 ml-2" />
          </div>
          <div class="mt-8 xl:mt-10 flex justify-between">
            <div class="">
              <span class="block">Tổng tiền hàng</span>
              <span class="mt-6 block">Phí ship</span>
              <span v-if="discount" class="mt-6 block">Giảm giá</span>
              <span class="mt-6 block">Tổng thanh toán</span>
            </div>
            <div class="">
              <span class="block text-right font-semibold">{{
                formatCurrency(totalProducts)
              }}</span>
              <span class="mt-6 block text-right font-semibold">{{
                formatCurrency(shipCost)
              }}</span>
              <span v-if="discount" class="mt-6 block text-right font-semibold"
                >-{{ formatCurrency(discount) }}</span
              >
              <span class="mt-6 block text-right font-semibold">{{
                formatCurrency(total)
              }}</span>
            </div>
          </div>
          <div
            @click="goToPay()"
            class="bg-yellow hover:bg-yellowHover cursor-pointer text-center py-4 font-semibold w-[70%] mt-8 rounded-lg mx-auto"
          >
            Thanh toán
          </div>
        </div>
      </div>
    </div>
    <div v-if="!cartList.length" class="mt-20 mx-auto">
      <div class="text-center">Giỏ hàng của bạn đang trống!</div>
      <router-link
        to="/products"
        class="max-w-[280px] mt-16 h-[56px] cursor-pointer bg-yellow hover:bg-yellowHover font-semibold flex items-center justify-center rounded-lg mx-auto"
      >
        Quay về cửa hàng
      </router-link>
    </div>
  </div>
  <footer-component />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CartAPI from "@/apis/modules/cart";
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
    const router = useRouter();
    const store = useStore();

    const cartList = ref([]);
    const payList = ref([]);

    const isSelectAll = ref(false);
    const isCheckFull = ref(true);

    const totalProducts = ref(null);
    const shipCost = ref(30000);
    const discount = ref(0);
    const discountCode = ref("");
    const total = computed(
      () => totalProducts.value + shipCost.value - discount.value
    );

    function addToPay(e, item) {
      if (e.target.checked) {
        payList.value.push(item);
        totalProducts.value = payList.value.reduce(
          (accumulator, currentValue) => {
            return (
              accumulator +
              Number(currentValue.product.price) * currentValue.quantity
            );
          },
          0
        );
      } else {
        document.querySelector(".checkAll").checked = false;
        isSelectAll.value = false;
        payList.value = payList.value.filter(
          (product) => product.product._id !== item.product._id
        );
        totalProducts.value = payList.value.reduce(
          (accumulator, currentValue) => {
            return (
              accumulator +
              Number(currentValue.product.price) * currentValue.quantity
            );
          },
          0
        );
      }
    }

    function formatCurrency(value) {
      if (value) {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      }
    }

    function goToProduct(productID) {
      router.push({
        path: `/products/${productID}`,
      });
    }

    const getCartList = async () => {
      try {
        const userID = store.state.user.id;
        const response = await CartAPI.getCartList(userID);
        cartList.value = response.data.cart;
      } catch (error) {
        console.log(error);
      }
    };

    const updateCartProduct = async (productID, e) => {
      try {
        await store.dispatch("updateItemFromCart", {
          userID: store.state.user.id,
          productID: productID,
          quantity: Number(e.target.value),
        });
        await getCartList();
        const product = payList.value.find(
          (item) => item.product._id === productID
        );
        product.quantity = Number(e.target.value);
      } catch (error) {
        console.log(error);
      }
    };

    const deleteItem = async (productID) => {
      try {
        await store.dispatch("deleteItemFromCart", {
          userID: store.state.user.id,
          productID: productID,
        });
        await getCartList();
        payList.value = payList.value.filter(
          (item) => item.product._id !== productID
        );
      } catch (error) {
        console.log(error);
      }
    };

    function selectAll(e) {
      if (e.target.checked) {
        const items = document.querySelectorAll(".itemCheck");
        items.forEach((item) => {
          item.checked = true;
        });
        payList.value = [...cartList.value];
        isSelectAll.value = true;
        totalProducts.value = payList.value.reduce(
          (accumulator, currentValue) => {
            return (
              accumulator +
              Number(currentValue.product.price) * currentValue.quantity
            );
          },
          0
        );
      } else {
        const items = document.querySelectorAll(".itemCheck");
        items.forEach((item) => {
          item.checked = false;
        });
        payList.value = [];
        isSelectAll.value = false;
      }
    }

    function deleteAll() {
      store.dispatch("deleteCart", { userID: store.state.user.id });
      cartList.value = [];
    }

    function applyDiscount() {
      if (discountCode.value === "TBR") discount.value = 200000;
    }

    function goToPay() {
      router.push({ name: "infooder" });
      store.commit("SET_PAY", { list: payList.value, total: total.value });
    }

    onMounted(async () => {
      await getCartList();
    });

    return {
      cartList,
      payList,
      totalProducts,
      shipCost,
      discount,
      discountCode,
      total,
      isSelectAll,
      isCheckFull,
      addToPay,
      formatCurrency,
      goToProduct,
      getCartList,
      updateCartProduct,
      deleteItem,
      selectAll,
      deleteAll,
      applyDiscount,
      goToPay,
    };
  },
};
</script>
