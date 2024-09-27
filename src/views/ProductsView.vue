<template>
  <header-component />
  <back-to-top />
  <div
    class="max-w-[1440px] px-5 sm:px-[60px] xl:px-[120px] mt-16 mx-auto pb-20"
  >
    <h1 class="font-[Anton] text-black text-[36px] sm:text-[44px] text-center">
      CỬA HÀNG
    </h1>
    <div class="grid grid-cols-4 gap-6 mt-10 sm:mt-32">
      <div class="hidden sm:block col-span-1">
        <span class="font-bold text-[24px]">Chọn thể loại</span>
        <ul class="mt-6 font-medium xl:w-[85%]">
          <li
            @click="selectType($event)"
            class="rounded-lg px-5 py-[14px] cursor-pointer active"
            data-type="all"
          >
            Tất cả
          </li>
          <div class="h-[0.5px] bg-yellow w-line mx-auto opacity-50"></div>
          <li
            @click="selectType($event)"
            class="px-5 py-[14px] cursor-pointer rounded-lg"
            data-type="V-Pop"
          >
            V-Pop
          </li>
          <div class="h-[0.5px] bg-yellow w-line mx-auto opacity-50"></div>
          <li
            @click="selectType($event)"
            class="px-5 py-[14px] cursor-pointer rounded-lg"
            data-type="Hip-Hop"
          >
            Hip-Hop
          </li>
          <div class="h-[0.5px] bg-yellow w-line mx-auto opacity-50"></div>
          <li
            @click="selectType($event)"
            class="px-5 py-[14px] cursor-pointer rounded-lg"
            data-type="Bolero"
          >
            Bolero
          </li>
          <div class="h-[0.5px] bg-yellow w-line mx-auto opacity-50"></div>
          <li
            @click="selectType($event)"
            class="px-5 py-[14px] cursor-pointer rounded-lg"
            data-type="Jazz"
          >
            Jazz
          </li>
        </ul>
        <span class="font-bold text-[24px] mt-8 block">Lọc theo giá</span>
        <span class="mt-4 block"
          >Giá: 500.000đ - {{ formatCurrency(filterPrice) }}</span
        >
        <input
          @input="updateFilterPrice"
          type="range"
          min="500000"
          max="5000000"
          step="500000"
          v-model="filterPrice"
          class="w-[200px] max-w-full mt-5"
        />
      </div>
      <div class="sm:hidden col-span-4">
        <div class="flex justify-between items-center">
          <span class="block font-semibold">Chọn thể loại</span>
          <div class="flex items-center relative">
            <span @click="toggleFilter" class="font-semibold">{{
              sortTitle
            }}</span>
            <img
              @click="toggleFilter"
              src="../assets/images/products/sort-icon.svg"
              alt=""
              class="w-5 h-7 ml-2"
            />
            <div
              v-if="isOpenFilter"
              class="absolute z-10 right-0 top-10 p-1 border-[#D5D5D5] bg-white border-[0.5px] rounded-lg w-[200px] shadow-[2px_2px_4px_rgba(0,0,0,0.2)]"
            >
              <div
                @click="selectFilter($event)"
                data-filter="newest"
                class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4"
              >
                <span
                  data-filter="newest"
                  class="block ml-1 font-medium text-[14px]"
                  >Sắp xếp theo mới nhất</span
                >
              </div>
              <div
                @click="selectFilter($event)"
                data-filter="oldest"
                class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4 mt-1"
              >
                <span
                  data-filter="oldest"
                  class="block ml-1 font-medium text-[14px]"
                  >Sắp xếp theo cũ nhất</span
                >
              </div>
              <div
                class="h-[0.5px] bg-[#D9D9D9] w-full absolute left-0 top-[89px]"
              ></div>
            </div>
          </div>
        </div>
        <div class="flex overflow-x-scroll mt-4 hide-scroll text-[14px]">
          <div
            @click="selectType($event)"
            class="h-11 px-6 flex items-center rounded-[10px] text-nowrap font-semibold border-[1px] border-black li active"
            data-type="all"
          >
            Tất cả
          </div>
          <div
            @click="selectType($event)"
            class="h-11 px-6 flex items-center rounded-[10px] text-nowrap font-semibold border-[1px] border-black ml-3 li"
            data-type="V-Pop"
          >
            V-Pop
          </div>
          <div
            @click="selectType($event)"
            class="h-11 px-6 flex items-center rounded-[10px] text-nowrap font-semibold border-[1px] border-black ml-3 li"
            data-type="Hip-Hop"
          >
            Hip-Hop
          </div>
          <div
            @click="selectType($event)"
            class="h-11 px-6 flex items-center rounded-[10px] text-nowrap font-semibold border-[1px] border-black ml-3 li"
            data-type="Bolero"
          >
            Bolero
          </div>
          <div
            @click="selectType($event)"
            class="h-11 px-6 flex items-center rounded-[10px] text-nowrap font-semibold border-[1px] border-black ml-3 li"
            data-type="Jazz"
          >
            Jazz
          </div>
        </div>
      </div>
      <div class="col-span-4 sm:col-span-3 relative">
        <div class="hidden sm:flex cursor-pointer absolute -top-14 right-0">
          <span @click="toggleFilter" class="font-semibold text-[18px]">{{
            sortTitle
          }}</span>
          <img
            @click="toggleFilter"
            src="../assets/images/products/sort-icon.svg"
            alt=""
            class="w-6 h-7 ml-3"
          />
          <div
            v-if="isOpenFilter"
            class="absolute z-10 right-0 top-10 p-1 border-[#D5D5D5] bg-white border-[0.5px] rounded-lg w-[228px] shadow-[2px_2px_4px_rgba(0,0,0,0.2)]"
          >
            <div
              @click="selectFilter($event)"
              data-filter="newest"
              class="h-[48px] hover:bg-grey rounded-[5px] flex items-center pl-4"
            >
              <span
                data-filter="newest"
                class="block ml-1 font-medium text-[16px]"
                >Sắp xếp theo mới nhất</span
              >
            </div>
            <div
              @click="selectFilter($event)"
              data-filter="oldest"
              class="h-[48px] hover:bg-grey rounded-[5px] flex items-center pl-4 mt-1"
            >
              <span
                data-filter="oldest"
                class="block ml-1 font-medium text-[16px]"
                >Sắp xếp theo cũ nhất</span
              >
            </div>
          </div>
        </div>
        <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-2 sm:mt-0">
          <div
            @click.prevent="goToDetails($event)"
            class="bg-[#EEF2F5] cursor-pointer rounded-xl px-8 h-[140px] flex items-center justify-between sm:block sm:h-[300px] xl:h-[380px] relative"
            v-for="(item, index) in paginateProducts"
            :key="index"
            :data-id="item._id"
          >
            <img
              :src="item.img"
              alt=""
              class="w-[90px] sm:w-[185px] xl:w-[210px] sm:mx-auto sm:mt-3 xl:mt-5 drop-shadow-md"
            />
            <div class="xl:mt-2 text-[14px] sm:text-[16px]">
              <div v-if="!item.prePrice" class="hidden xl:block h-[22px]"></div>
              <h5 class="font-semibold w-[100px] sm:w-[200px] truncate">
                {{ item.title }}
              </h5>
              <span class="text-[14px] font-light block sm:mt-0 xl:mt-1">{{
                item.singer
              }}</span>

              <span class="line-through opacity-40 mt-[15px] hidden xl:block">{{
                formatCurrency(item.prePrice)
              }}</span>

              <div class="sm:flex xl:block items-center">
                <span class="mt-2 sm:mt-3 xl:mt-0 block">{{
                  formatCurrency(item.price)
                }}</span>
                <span
                  class="sm:mt-3 hidden lg:block xl:hidden ml-3 line-through opacity-40"
                  >{{ formatCurrency(item.prePrice) }}</span
                >
              </div>

              <div
                @click.prevent="addToCart($event)"
                class="absolute hidden sm:flex sm:right-6 sm:bottom-6 xl:right-8 xl:bottom-8 cursor-pointer w-[60px] h-[60px] rounded-full bg-white items-center justify-center hover:bg-yellow transition add"
              >
                <img
                  src="../assets/images/products/add-to-cart.svg"
                  alt=""
                  class="add"
                />
              </div>
            </div>
            <div
              @click.prevent="addToCart($event)"
              class="flex sm:hidden cursor-pointer w-[52px] h-[52px] rounded-full bg-white items-center justify-center hover:bg-yellow transition add"
            >
              <img
                src="../assets/images/products/add-to-cart.svg"
                alt=""
                class="w-5 add"
              />
            </div>
            <img
              v-if="item.prePrice"
              src="../assets/images/products/sale-icon.svg"
              alt=""
              class="absolute -top-5 -right-5 sm:-top-8 sm:-right-7 w-[72px] sm:w-auto"
            />
          </div>
        </div>
        <vue-awesome-paginate
          :total-items="tempProducts.length"
          :items-per-page="itemsPerPage"
          :max-pages-shown="2"
          v-model="currentPage"
          @click="onClickHandler"
          paginate-buttons-class="btn-paginate"
          active-page-class="btn-paginate-active"
          back-button-class="back-btn-paginate"
          next-button-class="next-btn-paginate"
        >
          <template #prev-button>
            <button class="w-[20px] mt-[6px]">
              <img src="../assets/images/products/pagination-pre.svg" alt="" />
            </button>
          </template>
          <template #next-button>
            <button class="w-[20px] mt-[6px]">
              <img src="../assets/images/products/pagination-next.svg" alt="" />
            </button>
          </template>
        </vue-awesome-paginate>
      </div>
    </div>
  </div>
  <footer-component />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import HeaderComponent from "@/components/HeaderComponent.vue";
import BackToTop from "@/components/BackToTop.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { VueAwesomePaginate } from "vue-awesome-paginate";
import ProductAPI from "../apis/modules/product";
import { useRouter } from "vue-router";
import getToken from "@/composables/getToken";
export default {
  components: {
    HeaderComponent,
    FooterComponent,
    BackToTop,
    VueAwesomePaginate,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const sortTitle = ref("Sắp xếp theo cũ nhất");
    const currentType = ref("all");
    const filterPrice = ref(5000000);
    const currentPage = ref(1);
    const itemsPerPage = ref(9);
    const products = ref([]);
    const tempProducts = ref([]);
    const paginateProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return tempProducts.value.length
        ? tempProducts.value.slice(start, end)
        : tempProducts.value;
    });

    const isOpenFilter = ref(false);

    function addToCart(e) {
      const token = getToken();
      if (token) {
        try {
          if (store.state.user.name !== "") {
            store.dispatch("addToCart", {
              userID: store.state.user.id,
              productID: e.target.closest("[data-id]").dataset.id,
              quantity: 1,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        router.push("/login");
      }
    }

    function goToDetails(e) {
      if (!e.target.classList.contains("add"))
        router.push({
          path: `/products/${e.target.closest("[data-id]").dataset.id}`,
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

    const getProducts = async () => {
      const response = await ProductAPI.getProductList();
      products.value = response.data.products;
      tempProducts.value = products.value;
    };

    function selectType(e) {
      currentPage.value = 1;
      currentType.value = e.target.dataset.type;
      const types = document.querySelectorAll("li, .li");
      types.forEach((item) => {
        item.classList.remove("active");
      });
      e.target.classList.add("active");
      if (currentType.value === "all") {
        tempProducts.value = products.value.filter(
          (product) => Number(product.price) <= filterPrice.value
        );
      } else {
        tempProducts.value = products.value.filter(
          (product) =>
            product.type === currentType.value &&
            Number(product.price) <= filterPrice.value
        );
      }
    }

    function selectFilter(e) {
      if (e.target.dataset.filter === "newest") {
        sortTitle.value = "Sắp xếp theo mới nhất";
        tempProducts.value = tempProducts.value.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      } else if (e.target.dataset.filter === "oldest") {
        sortTitle.value = "Sắp xếp theo cũ nhất";
        tempProducts.value = tempProducts.value.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      }
      toggleFilter();
    }

    function toggleFilter() {
      isOpenFilter.value = !isOpenFilter.value;
    }

    function onClickHandler() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function updateFilterPrice() {
      if (currentType.value === "all") {
        tempProducts.value = products.value.filter(
          (product) => Number(product.price) <= filterPrice.value
        );
      } else {
        tempProducts.value = products.value.filter(
          (product) =>
            product.type === currentType.value &&
            Number(product.price) <= filterPrice.value
        );
      }
    }

    function updateItemsPerPage() {
      if (window.innerWidth <= 1024) {
        itemsPerPage.value = 4;
      } else {
        itemsPerPage.value = 9;
      }
    }

    onMounted(async () => {
      await getProducts();
      updateItemsPerPage();
    });

    return {
      sortTitle,
      products,
      tempProducts,
      currentPage,
      currentType,
      filterPrice,
      itemsPerPage,
      paginateProducts,
      isOpenFilter,
      addToCart,
      goToDetails,
      formatCurrency,
      getProducts,
      selectFilter,
      selectType,
      toggleFilter,
      updateFilterPrice,
      onClickHandler,
    };
  },
};
</script>

<style scoped>
.w-line {
  width: calc(100% - 16px);
}
/* Tùy chỉnh cho phân trang */
#componentContainer {
  display: flex;
  justify-content: center;
  justify-items: center;
}

.pagination-container {
  margin-top: 44px;
  font-family: "Nunito";
  font-size: 16px;
}

.active {
  background-color: #f6d776;
  color: white;
  border-color: #f6d776;
}

@media only screen and (max-width: 1279px) {
  .pagination-container {
    margin-top: 36px;
    font-family: "Nunito";
    font-size: 16px;
  }
}

input[type="range"] {
  /* removing default appearance */
  -webkit-appearance: none;
  appearance: none;
  /* creating a custom design */
  cursor: pointer;
  outline: none;
  /*  slider progress trick  */
  overflow: hidden;
  border-radius: 16px;
}

/* Track: webkit browsers */
input[type="range"]::-webkit-slider-runnable-track {
  height: 15px;
  background: #ccc;
  border-radius: 16px;
}

/* Track: Mozilla Firefox */
input[type="range"]::-moz-range-track {
  height: 15px;
  background: #ccc;
  border-radius: 16px;
}

/* Thumb: webkit */
input[type="range"]::-webkit-slider-thumb {
  /* removing default appearance */
  -webkit-appearance: none;
  appearance: none;
  /* creating a custom design */
  height: 15px;
  width: 15px;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #f6d776;
  /*  slider progress trick  */
  box-shadow: -407px 0 0 400px #f6d776;
}

/* Thumb: Firefox */
input[type="range"]::-moz-range-thumb {
  height: 15px;
  width: 15px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #f6d776;
  /*  slider progress trick  */
  box-shadow: -407px 0 0 400px #f6d776;
}
</style>
