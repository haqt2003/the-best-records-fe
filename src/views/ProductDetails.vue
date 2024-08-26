<template>
  <header-component />
  <back-to-top />
  <div
    class="max-w-[1440px] px-5 sm:px-[60px] xl:px-[120px] mt-16 mx-auto pb-20"
  >
    <div class="flex items-center">
      <router-link to="/products">Cửa hàng</router-link>
      <img src="../assets/images/details/arrow.svg" alt="" class="ml-3" />
      <span class="font-semibold block ml-3">Chi tiết sản phẩm</span>
    </div>
    <div class="flex mt-10 sm:mt-[60px] flex-wrap">
      <div
        class="w-full lg:w-[384px] aspect-square bg-grey rounded-xl flex items-center justify-center"
      >
        <img :src="product.img" alt="" class="w-[75%] drop-shadow-md" />
      </div>
      <div class="lg:ml-16 mt-8 lg:mt-0 w-full lg:w-auto">
        <h1 class="font-bold text-[20px] uppercase">{{ product.title }}</h1>
        <span class="block mt-4 sm:mt-5">Tác giả: {{ product.singer }}</span>
        <span class="block mt-4 sm:mt-5">Thể loại: {{ product.type }}</span>
        <span class="block mt-4 sm:mt-5"
          >Thời lượng: {{ product.duration }}</span
        >
        <div class="mt-4 sm:mt-5 flex items-center">
          <audio controls :src="product.song" class=""></audio>
        </div>
        <div class="mt-5 flex items-center">
          <span>Số lượng:</span>
          <div class="flex justify-center gap-2 ml-6">
            <img
              @click="decreaseQuantity"
              src="../assets/images/details/minus.svg"
              alt=""
              class="cursor-pointer"
            />
            <input
              v-model="quantity"
              type="number"
              class="w-11 outline-none text-center"
            />
            <img
              @click="increaseQuantity"
              src="../assets/images/details/plus.svg"
              alt=""
              class="cursor-pointer"
            />
          </div>
        </div>
        <span class="block mt-5 font-semibold"
          >Giá: {{ formatCurrency(product.price) }}</span
        >
        <div
          @click="addToCart"
          class="w-[220px] h-[52px] rounded-xl bg-yellow text-center mt-6 sm:mt-5 mx-auto sm:mx-0 flex justify-center items-center font-semibold cursor-pointer hover:bg-yellowHover"
        >
          Thêm vào giỏ hàng
        </div>
      </div>
    </div>
    <div class="mt-[52px]">
      <span class="font-semibold">Mô tả</span>
      <p class="max-w-[850px] mt-3 text-justify sm:text-left">
        {{ product.description || "Không có" }}
      </p>
    </div>
    <div class="mt-[48px] lg:mt-[60px]">
      <span class="font-semibold">Các sản phẩm liên quan</span>
      <div class="relative mt-7 lg:mt-10">
        <div class="swiper-container overflow-x-clip rounded-xl cursor-pointer">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in recommendList"
              :key="index"
              @click="goOtherProduct(item._id)"
            >
              <div
                class="w-full h-[140px] lg:w-[280px] lg:h-[280px] bg-grey rounded-xl py-[10px] lg:pt-4 pl-7 pr-2 lg:px-6 relative flex items-center lg:block"
              >
                <img
                  :src="item.img"
                  alt=""
                  class="w-[100px] lg:w-[160px] lg:mx-auto block drop-shadow-sm"
                />
                <div class="text-[14px] ml-5 lg:ml-0 lg:mt-2">
                  <span class="font-semibold">{{ item.title }}</span>
                  <span class="block text-[12px] mt-1 font-light">{{
                    item.singer
                  }}</span>
                  <div class="flex mt-2">
                    <span>{{ formatCurrency(item.price) }}</span>
                    <span
                      v-if="item.prePrice"
                      class="ml-3 block opacity-60 line-through"
                      >{{ formatCurrency(item.prePrice) }}</span
                    >
                  </div>
                </div>
                <img
                  v-if="item.prePrice"
                  src="../assets/images/products/sale-icon.svg"
                  alt=""
                  class="absolute hidden lg:block -top-7 -right-7 w-[68px] lg:w-[90px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="swiper-pagination flex gap-3 justify-center lg:hidden"
        ></div>
        <div class="swiper-button-prev">
          <img
            src="../assets/images/details/pre-btn.svg"
            alt=""
            class="hidden lg:block"
          />
        </div>
        <div class="swiper-button-next">
          <img
            src="../assets/images/details/next-btn.svg"
            alt=""
            class="hidden lg:block"
          />
        </div>
      </div>
    </div>
  </div>
  <footer-component />
</template>

<script>
import { ref, onMounted, onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import ProductAPI from "@/apis/modules/product";
import getToken from "@/composables/getToken";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
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
    const swiper = ref(null);
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const quantity = ref(1);
    const product = ref({
      title: "",
      singer: "",
      img: "",
      type: "",
      song: "",
      price: "",
      duration: "",
    });

    const recommendList = ref([]);

    function addToCart() {
      const token = getToken();
      if (token) {
        try {
          if (store.state.user.name !== "") {
            store.dispatch("addToCart", {
              userID: store.state.user.id,
              productID: route.params.id,
              quantity: quantity.value,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        router.push("/login");
      }
    }

    function initSwiper() {
      swiper.value = new Swiper(".swiper-container", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 25,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
          },
        },
      });
    }

    function formatCurrency(value) {
      if (value) {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      }
    }

    function increaseQuantity() {
      quantity.value++;
    }

    function decreaseQuantity() {
      if (quantity.value >= 2) {
        quantity.value--;
      }
    }

    function goOtherProduct(productID) {
      router.push({
        path: `/products/${productID}`,
      });
    }

    const getProduct = async () => {
      try {
        const productID = route.params.id;
        const response = await ProductAPI.getProduct(productID);
        product.value = response.data.product;
      } catch (error) {
        console.log(error);
      }
    };

    const getProducts = async () => {
      const response = await ProductAPI.getProductList();
      const list = response.data.products;
      recommendList.value = list.filter(
        (item) =>
          item.type === product.value.type && item.title !== product.value.title
      );
      recommendList.value.slice(0, 5);
    };

    watch(
      () => route.params.id,
      async (newId) => {
        await getProduct(newId);
        await getProducts();
      },
      { immediate: true } // Fetch data immediately on component mount
    );

    onBeforeMount(async () => {
      await getProduct();
      await getProducts();
    }),
      onMounted(() => {
        initSwiper();
      });

    return {
      swiper,
      quantity,
      product,
      recommendList,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      formatCurrency,
      goOtherProduct,
    };
  },
};
</script>

<style scoped>
.swiper-pagination {
  bottom: -34px !important;
}

.swiper-pagination-bullet {
  width: 16px;
  height: 16px;
  background-color: #222222 !important;
  opacity: 0.2;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.swiper-pagination-bullet-active {
  background-color: #222222;
}

.swiper-button-prev {
  width: 90px;
  height: 90px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: -45px;
  transform: translateY(-25%);
  z-index: 10;
  border-radius: 50%;
}

.swiper-button-next {
  width: 90px;
  height: 90px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-25%);
  right: -40px;
  border-radius: 50%;
  z-index: 10;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  display: none;
}

.slide-song {
  -webkit-appearance: none;
  appearance: none;
  width: 250px;
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  height: 2px;
  background: #ccc;
}

.slide-song::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 12px;
  width: 12px;
  background-color: #000;
  border-radius: 50%;
  transition: 0.2s ease-in-out;
}

.slide-song::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.07);
}
.slide-song:active::-webkit-slider-thumb {
  box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1);
}
.slide-song:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1);
}

.slide-song::-moz-range-thumb:hover {
  box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.07);
}
.slide-song:active::-moz-range-thumb {
  box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1);
}
.slide-song:focus::-moz-range-thumb {
  box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1);
}

@media only screen and (max-width: 1024px) {
  .swiper-button-prev {
    display: none;
  }

  .swiper-button-next {
    display: none;
  }
}
</style>
