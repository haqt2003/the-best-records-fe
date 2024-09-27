<template>
  <div
    class="bg-[url('@/assets/images/home/landing.svg')] w-full h-[600px] lg:h-[780px] bg-cover bg-right lg:bg-center bg-no-repeat relative"
  >
    <div
      class="max-w-[1440px] px-5 sm:px-[60px] xl:px-[120px] flex justify-between xl:justify-normal xl:grid xl:grid-cols-4 items-center mt-6 xl:mt-2 mx-auto absolute top-0 left-1/2 -translate-x-1/2 w-full"
    >
      <router-link to="/" class="float-left hidden xl:block"
        ><img
          src="../assets/images/home/logo-white.svg"
          alt=""
          class="w-[120px]"
      /></router-link>

      <div
        class="font-bold gap-[60px] hidden xl:flex col-span-2 mx-auto text-white"
      >
        <router-link to="/" class="home-link"> TRANG CHỦ </router-link>
        <router-link to="/about" class="opacity-60 about-link">
          VỀ CHÚNG TÔI
        </router-link>
        <router-link to="/products" class="opacity-60 store-link">
          CỬA HÀNG
        </router-link>
      </div>
      <div class="xl:hidden">
        <img
          @click="openTab"
          src="../assets/images/home/menu-white.svg"
          alt=""
          class="cursor-pointer"
        />
      </div>
      <div class="flex gap-4 sm:gap-5 justify-end">
        <div class="cursor-pointer hidden sm:block">
          <!-- <img
            v-if="!isSearch"
            @click="toggleSearch"
            src="../assets/images/home/search-white.svg"
            alt=""
            class="w-8 sm:w-9"
          />
          <div
            v-if="isSearch"
            class="bg-grey rounded-full h-9 px-5 flex items-center"
          >
            <img
              src="../assets/images/commons/search-mini.svg"
              alt=""
              class="w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search..."
              class="text-[#222] text-[12px] font-light outline-none bg-grey ml-2"
            />
          </div> -->
        </div>
        <router-link to="/cart" class="cursor-pointer relative">
          <img
            src="../assets/images/home/cart-white.svg"
            alt=""
            class="w-8 sm:w-9"
          />
          <div
            v-if="totalCartItems"
            class="absolute top-0 right-0 w-[14px] h-[14px] sm:w-4 sm:h-4 font-semibold bg-white text-black flex items-center justify-center rounded-full text-[10px]"
          >
            {{ totalCartItems }}
          </div>
        </router-link>
        <div @click="toggleMenu" class="cursor-pointer relative">
          <img
            v-if="!avatar"
            src="../assets/images/home/user-white.svg"
            alt=""
            class="w-8 sm:w-9"
          />
          <div
            v-if="avatar"
            class="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden"
          >
            <img :src="avatar" alt="" class="object-cover w-full h-full" />
          </div>
          <div
            v-if="!isUser && isShowMenu"
            class="absolute z-10 bg-white right-0 top-14 p-1 border-[#D5D5D5] border-[0.5px] rounded-lg w-[194px] shadow-[2px_2px_4px_rgba(0,0,0,0.2)]"
          >
            <router-link
              to="/login"
              class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4"
            >
              <img
                src="../assets/images/commons/login-icon.svg"
                alt=""
                class="w-[18px] h-[18px]"
              />
              <span class="block ml-2 font-medium text-[12px]">Đăng nhập</span>
            </router-link>
            <router-link
              to="/signup"
              class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4 mt-1"
            >
              <img
                src="../assets/images/commons/logup-icon.svg"
                alt=""
                class="w-[18px] h-[18px]"
              />
              <span class="block ml-2 font-medium text-[12px]">Đăng ký</span>
            </router-link>
          </div>
          <div
            v-if="isUser && isShowMenu"
            class="absolute z-10 bg-white right-0 top-14 p-1 border-[#D5D5D5] border-[0.5px] rounded-lg w-[194px] shadow-[2px_2px_4px_rgba(0,0,0,0.2)]"
          >
            <router-link
              to="/user-info"
              class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4"
            >
              <img
                src="../assets/images/commons/user2-icon.svg"
                alt=""
                class="w-[18px] h-[18px]"
              />
              <span class="block ml-2 font-medium text-[12px]"
                >Thông tin tài khoản</span
              >
            </router-link>
            <router-link
              to="/history"
              class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4 mt-1"
            >
              <img
                src="../assets/images/commons/order.svg"
                alt=""
                class="w-[18px] h-[18px]"
              />
              <span class="block ml-2 font-medium text-[12px]"
                >Lịch sử đặt hàng</span
              >
            </router-link>
            <div
              class="h-[0.5px] bg-[#D9D9D9] w-full absolute left-0 top-[89px]"
            ></div>
            <router-link
              to="/login"
              @click="logout"
              class="h-[38px] hover:bg-grey rounded-[5px] flex items-center pl-4 mt-[10px]"
            >
              <img
                src="../assets/images/commons/logout-icon.svg"
                alt=""
                class="w-[18px] h-[18px]"
              />
              <span class="block ml-2 font-medium text-[12px]">Đăng xuất</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute top-1/3 left-1/2 -translate-x-1/2 text-center w-full xl:w-auto"
    >
      <h1 class="font-[Anton] text-[40px] xl:text-[60px] text-white">
        THE BEST RECORDS
      </h1>
      <span class="block text-white w-[78%] xl:w-[70%] mx-auto"
        >Khám phá thế giới âm nhạc đầy hoài niệm với đĩa than chất lượng - nơi
        mỗi bản nhạc mang lại cảm xúc chân thật và những kỷ niệm sống động!
      </span>
      <div class="flex gap-10 items-center justify-center mt-4">
        <a href=""><img src="../assets/images/abouts/fb.svg" alt="" /></a>
        <a href=""> <img src="../assets/images/abouts/ig.svg" alt="" /></a>
        <a href=""> <img src="../assets/images/abouts/ytb.svg" alt="" /></a>
      </div>
      <a
        href="#newest"
        class="w-[240px] block text-[14px] hover:bg-[#F4F4F4] cursor-pointer mx-auto rounded-xl mt-10 py-5 font-bold bg-white"
      >
        KHÁM PHÁ NGAY
      </a>
    </div>
  </div>
  <div
    class="max-w-[1440px] px-5 sm:px-[60px] xl:px-[120px] mt-16 mx-auto mb-24"
  >
    <div id="newest">
      <h1
        class="text-black font-[Anton] text-[36px] text-center mx-auto lg:mx-0 lg:text-[40px]"
      >
        ĐĨA NHẠC <span class="text-yellow">MỚI NHẤT</span>
      </h1>
      <p
        class="mx-auto lg:mt-3 text-center w-[90%] xl:w-[30%] text-[14px] xl:text-[16px]"
      >
        Trở về quá khứ cùng với chiếc đĩa than, kết hợp trong nó là những bản
        nhạc hiện đại đầy sôi động
      </p>
      <div class="mt-4 xl:mt-[68px] flex flex-wrap xl:flex-nowrap gap-x-20">
        <div class="w-full xl:w-[25%]">
          <ul class="mt-6 font-medium xl:w-[85%] hidden xl:block">
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
          <div
            class="flex flex-wrap items-center justify-center gap-3 overflow-x-scroll mt-4 hide-scroll text-[14px] xl:hidden"
          >
            <div
              @click="selectType($event)"
              class="h-11 px-6 flex items-center rounded-[10px] text-nowrap font-semibold border-[1px] border-black li active"
              data-type="all"
            >
              Tất cả
            </div>
            <div
              @click="selectType($event)"
              class="h-11 px-6 flex items-center rounded-[10px] text-nowrap font-semibold border-[1px] border-black li"
              data-type="V-Pop"
            >
              V-Pop
            </div>
            <div
              @click="selectType($event)"
              class="h-11 px-6 flex items-center rounded-[10px] text-nowrap font-semibold border-[1px] border-black li"
              data-type="Hip-Hop"
            >
              Hip-Hop
            </div>
            <div
              @click="selectType($event)"
              class="h-11 px-6 flex items-center rounded-[10px] text-nowrap font-semibold border-[1px] border-black li"
              data-type="Bolero"
            >
              Bolero
            </div>
            <div
              @click="selectType($event)"
              class="h-11 px-6 flex items-center rounded-[10px] text-nowrap font-semibold border-[1px] border-black li"
              data-type="Jazz"
            >
              Jazz
            </div>
          </div>
        </div>
        <div
          class="w-full xl:w-[68%] grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10 xl:mt-0"
        >
          <div
            @click="goToDetails(item._id)"
            v-for="item in tempProducts"
            :key="item.title"
            class="h-[162px] sm:h-auto xl:h-[280px] bg-grey rounded-xl w-full px-5 xl:px-8 py-7 gap-6 sm:gap-8 cursor-pointer flex xl:block items-center justify-center"
          >
            <img
              :src="item.img"
              alt=""
              class="w-[43%] sm:w-[30%] xl:w-[50%] xl:mx-auto drop-shadow-sm"
            />
            <div class="mt-2">
              <span class="font-semibold">{{ item.title }}</span>
              <span class="font-light block">{{ item.singer }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-wrap items-center justify-between mt-16 lg:mt-32 lg:flex-row-reverse"
    >
      <div class="w-full lg:w-[45%]">
        <h1
          class="text-yellow font-[Anton] text-[36px] lg:text-[40px] text-center lg:text-right"
        >
          NGHỆ SĨ <span class="text-black">CỦA TUẦN</span>
        </h1>
        <p
          class="text-center lg:text-right w-[90%] lg:w-full mx-auto lg:mx-0 mt-2"
        >
          Taylor Alison Swift (sinh ngày 13 tháng 12 năm 1989) là một nữ ca sĩ
          kiêm nhạc sĩ sáng tác bài hát người Mỹ. Cô thường được mệnh danh là
          "công chúa nhạc đồng quê"
        </p>
      </div>
      <div class="w-full lg:w-1/2 mt-10 lg:mt-0">
        <div
          class="bg-grey w-full max-w-[550px] rounded-3xl h-[180px] lg:h-[244px] relative mx-auto lg:mx-0 sm:mt-20 xl:mt-0"
        >
          <img
            src="../assets/images/home/signature.svg"
            alt=""
            class="absolute mix-blend-multiply bottom-6 right-6 w-[70px]"
          />
          <img
            src="../assets/images/home/singer.svg"
            alt=""
            class="bottom-0 absolute w-[900px]"
          />
        </div>
      </div>
    </div>
    <div class="mt-16 lg:mt-32">
      <h1
        class="text-black font-[Anton] text-[36px] text-center mx-auto lg:mx-0 lg:text-[40px]"
      >
        HÌNH ẢNH <span class="text-yellow">NỔI BẬT</span>
      </h1>
      <p
        class="mx-auto lg:mt-3 text-center w-[90%] xl:w-[33%] text-[14px] xl:text-[16px]"
      >
        Đắm chìm trong từng giai điệu, tạo nên những khoảnh khắc kết nối âm nhạc
        và cảm xúc thật gần gũi.
      </p>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4 xl:mt-[60px]">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="rounded-lg overflow-hidden aspect-square"
        >
          <img
            :src="image"
            alt=""
            loading="lazy"
            class="w-full h-full object-cover hover:scale-105 cursor-pointer transition-all"
          />
        </div>
      </div>
    </div>
  </div>

  <back-to-top />
  <footer-component />
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import getToken from "@/composables/getToken";
import removeToken from "@/composables/removeToken";
import BackToTop from "@/components/BackToTop.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import ProductAPI from "../apis/modules/product";
export default {
  components: {
    BackToTop,
    FooterComponent,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    // const isSearch = ref(false);
    const isUser = getToken();
    const isShowMenu = ref(false);

    const currentType = ref("all");
    const products = ref([]);
    const tempProducts = ref([]);

    const images = [
      require("@/assets/images/home/1.jpg"),
      require("@/assets/images/home/2.jpg"),
      require("@/assets/images/home/3.jpg"),
      require("@/assets/images/home/4.jpg"),
      require("@/assets/images/home/5.jpg"),
      require("@/assets/images/home/6.jpg"),
      require("@/assets/images/home/7.jpg"),
      require("@/assets/images/home/8.jpg"),
      require("@/assets/images/home/9.jpg"),
    ];

    const totalCartItems = computed(() =>
      store.getters.totalCartItems < 100 ? store.getters.totalCartItems : "99+"
    );

    const avatar = store.state.user.avatar;

    function openTab() {
      store.commit("TOGGLE_TAB");
    }

    // function toggleSearch() {
    //   isSearch.value = !isSearch.value;
    // }

    function toggleMenu() {
      isShowMenu.value = !isShowMenu.value;
    }

    function logout() {
      store.dispatch("logout");
      removeToken();
    }

    function selectType(e) {
      currentType.value = e.target.dataset.type;
      const types = document.querySelectorAll("li, .li");
      types.forEach((item) => {
        item.classList.remove("active");
      });
      e.target.classList.add("active");
      if (currentType.value === "all") {
        tempProducts.value = products.value;
        tempProducts.value = tempProducts.value.slice(0, 4);
      } else {
        tempProducts.value = products.value.filter(
          (product) => product.type === currentType.value
        );
        tempProducts.value = tempProducts.value.slice(0, 4);
      }
    }

    const getProducts = async () => {
      const response = await ProductAPI.getProductList();
      products.value = response.data.products;
      tempProducts.value = products.value.slice(0, 4);
    };

    function goToDetails(id) {
      router.push({
        path: `/products/${id}`,
      });
    }

    onMounted(async () => {
      await getProducts();
    });

    return {
      // isSearch,
      isShowMenu,
      isUser,
      avatar,
      totalCartItems,
      products,
      tempProducts,
      images,
      logout,
      toggleMenu,
      // toggleSearch,
      selectType,
      goToDetails,
      openTab,
    };
  },
};
</script>

<style scoped>
.active {
  background-color: #f6d776;
  color: white;
  border-color: #f6d776;
}
</style>
