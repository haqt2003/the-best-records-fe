<template>
  <header-component />
  <back-to-top />
  <div
    class="max-w-[1440px] px-5 sm:px-[60px] xl:px-[120px] mt-16 mx-auto pb-20"
  >
    <h1
      class="font-[Anton] text-black text-[36px] sm:text-[44px] text-center xl:text-left"
    >
      CHI TIẾT ĐƠN HÀNG
    </h1>
    <div class="flex justify-between mt-10 lg:mt-[52px] flex-wrap">
      <div class="w-full lg:w-[65%]">
        <div class="flex flex-wrap justify-between">
          <label
            :class="{ active: name }"
            for="name"
            class="bg-grey h-[76px] cursor-pointer w-full mt-5 lg:mt-0 lg:w-[48%] px-5 py-3 rounded-lg border-[1px] border-grey block"
          >
            <span class="text-[14px] opacity-60 block">Họ và tên</span>

            <input
              v-model="name"
              @click="clickInput($event)"
              @blur="blurInput($event)"
              type="text"
              name=""
              id="name"
              :class="{ activeInput: name }"
              class="outline-none bg-grey mt-1 font-semibold w-full"
            />
          </label>
          <label
            :class="{ active: phonenumber }"
            for="phonenumber"
            class="bg-grey h-[76px] cursor-pointer w-full mt-5 lg:mt-0 lg:w-[48%] px-5 py-3 rounded-lg border-[1px] border-grey block"
          >
            <span class="text-[14px] opacity-60 block">Số điện thoại</span>

            <input
              v-model="phonenumber"
              @click="clickInput($event)"
              @blur="blurInput($event)"
              type="tel"
              name=""
              id="phonenumber"
              :class="{ activeInput: phonenumber }"
              class="outline-none bg-grey mt-1 font-semibold w-full"
            />
          </label>
          <div
            @click="toggleList($event)"
            :class="{ active: province }"
            class="bg-grey relative h-[76px] cursor-pointer w-full mt-5 lg:mt-8 px-5 py-3 rounded-lg border-[1px] border-grey block"
          >
            <span class="text-[14px] opacity-60 block">Tỉnh/Thành phố</span>
            <h1
              :class="{ fullOp: province }"
              class="mt-1 block font-semibold opacity-60"
            >
              {{ province || "Chọn Tỉnh/Thành phố" }}
            </h1>
            <img
              src="../assets/images/commons/arrow-footer.svg"
              alt=""
              class="absolute top-1/2 -translate-y-1/2 right-7"
            />
            <ul
              class="absolute -bottom-[215px] bg-white z-30 w-full left-0 rounded-lg border-[1px] border-[#DBDBDB] h-[200px] overflow-y-scroll hidden"
            >
              <li
                v-for="province in provinces"
                :key="province.code"
                @click="
                  choseItem($event);
                  choseProvince($event);
                "
                :data-code="province.code"
                class="px-5 py-3 border-b hover:bg-grey"
              >
                {{ province.name }}
              </li>
            </ul>
          </div>
          <div class="flex w-full flex-wrap justify-between">
            <div
              :class="{ active: district }"
              @click="toggleList($event)"
              class="bg-grey relative h-[76px] cursor-pointer w-full lg:w-[48%] mt-5 lg:mt-8 px-5 py-3 rounded-lg border-[1px] border-grey block"
            >
              <span class="text-[14px] opacity-60 block">Quận/Huyện</span>
              <h1
                :class="{ fullOp: district }"
                class="mt-1 block font-semibold opacity-60 district"
              >
                {{ district || "Chọn Quận/Huyện" }}
              </h1>
              <img
                src="../assets/images/commons/arrow-footer.svg"
                alt=""
                class="absolute top-1/2 -translate-y-1/2 right-7"
              />
              <ul
                class="absolute -bottom-[215px] bg-white z-20 w-full left-0 rounded-lg border-[1px] border-[#DBDBDB] h-[200px] overflow-y-scroll hidden"
              >
                <li
                  v-for="district in districts"
                  :key="district.code"
                  @click="
                    choseItem($event);
                    choseDistrict($event);
                  "
                  :data-code="district.code"
                  class="px-5 py-3 border-b hover:bg-grey"
                >
                  {{ district.name }}
                </li>
              </ul>
            </div>
            <div
              :class="{ active: ward }"
              @click="toggleList($event)"
              class="bg-grey relative h-[76px] cursor-pointer w-full lg:w-[48%] mt-5 lg:mt-8 px-5 py-3 rounded-lg border-[1px] border-grey block"
            >
              <span class="text-[14px] opacity-60 block">Phường/Xã</span>
              <h1
                :class="{ fullOp: ward }"
                class="mt-1 block font-semibold opacity-60 ward"
              >
                {{ ward || "Chọn Phường/Xã" }}
              </h1>
              <img
                src="../assets/images/commons/arrow-footer.svg"
                alt=""
                class="absolute top-1/2 -translate-y-1/2 right-7"
              />
              <ul
                class="absolute -bottom-[215px] bg-white z-10 w-full left-0 rounded-lg border-[1px] border-[#DBDBDB] h-[200px] overflow-y-scroll hidden"
              >
                <li
                  v-for="ward in wards"
                  :key="ward.code"
                  @click="
                    choseItem($event);
                    choseWard($event);
                  "
                  class="px-5 py-3 border-b hover:bg-grey"
                >
                  {{ ward.name }}
                </li>
              </ul>
            </div>
          </div>
          <label
            :class="{ active: detail }"
            for="addr"
            class="bg-grey h-[76px] cursor-pointer w-full mt-5 lg:mt-8 px-5 py-3 rounded-lg border-[1px] border-grey block"
          >
            <span class="text-[14px] opacity-60 block">Địa chỉ cụ thể</span>

            <input
              v-model="detail"
              @click="clickInput($event)"
              @blur="blurInput($event)"
              type="text"
              name=""
              id="addr"
              placeholder="VD: 140 Trần Phú, Quận Hà Đông, Hà Nội"
              :class="{ activeInput: detail }"
              class="outline-none bg-grey mt-1 font-semibold w-full"
            />
          </label>
          <label
            for="note"
            class="bg-grey cursor-pointer w-full mt-5 lg:mt-8 px-5 py-3 rounded-lg border-[1px] border-grey block"
          >
            <span class="text-[14px] opacity-60 block">Ghi chú</span>
            <textarea
              @click="clickInput($event)"
              @blur="blurInput($event)"
              name=""
              id="note"
              rows="6"
              class="w-full mt-1 outline-none bg-grey"
            ></textarea>
          </label>
        </div>
      </div>
      <div class="w-full lg:w-[30%]">
        <div class="rounded-xl bg-grey mt-10 lg:mt-0 px-9 py-8">
          <h1 class="font-semibold">Sản phẩm</h1>
          <div class="mt-2">
            <div
              v-for="item in payList"
              :key="item.product.id"
              class="flex justify-between items-center mt-3"
            >
              <div class="">
                <span class="opacity-60">{{ item.product.title }}</span>
                <span class="ml-2">x{{ item.quantity }}</span>
              </div>
              <span class="block font-light">{{
                formatCurrency(item.product.price)
              }}</span>
            </div>
            <div class="flex justify-between items-center mt-4">
              <span class="block">Tổng thanh toán</span>

              <span class="block font-light">{{
                formatCurrency(payment)
              }}</span>
            </div>
            <div class="w-full h-[1px] bg-[#D9D9D9] my-8"></div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-black rounded-full"></div>
              <span class="block ml-3 font-medium"
                >Thanh toán khi nhận hàng</span
              >
            </div>
            <p class="font-light text-justify mt-5">
              Dữ liệu cá nhân của bạn sẽ được bảo mật và sử dụng trong quá trình
              sử dụng trang web, để xem thông tin chi tiết, hãy xem chính sách
              pháp lý của chúng tôi
            </p>
            <div
              @click="submitOrder"
              class="mt-6 bg-yellow w-[70%] mx-auto cursor-pointer hover:bg-yellowHover font-semibold rounded-lg text-center py-4"
            >
              Đặt hàng
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="isOpenModal"
    class="fixed top-0 left-0 w-full h-full px-5 bg-[rgba(0,0,0,0.4)] z-50"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[70%] max-w-[400px] bg-white rounded-xl py-9"
    >
      <img
        src="../assets/images/commons/close.svg"
        alt=""
        class="w-8 absolute top-5 right-5 cursor-pointer"
        @click="toggleModal"
      />
      <div v-if="!isOk" class="text-center mt-10">
        <span class="block">Vui lòng điền đầy đủ thông tin</span>
        <button
          @click="toggleModal"
          class="bg-yellow hover:bg-yellowHover rounded-lg px-5 py-3 mt-6 font-semibold"
        >
          OK
        </button>
      </div>
      <div v-if="isOk" class="text-center mt-10">
        <span class="block">Xác nhận đặt hàng?</span>
        <div class="flex justify-center items-center gap-5 mt-8">
          <span
            @click="toggleModal"
            class="px-8 cursor-pointer block rounded-lg"
            >Hủy</span
          >
          <button
            @click="submit"
            class="bg-yellow hover:bg-yellowHover rounded-lg px-8 py-3"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="isSuccess !== null"
    class="fixed top-0 left-0 w-full h-full px-5 bg-[rgba(0,0,0,0.4)] z-50"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[70%] max-w-[400px] bg-white rounded-xl py-9"
    >
      <img
        src="../assets/images/commons/close.svg"
        alt=""
        class="w-8 absolute top-5 right-5 cursor-pointer"
        @click="toggleSuccess"
      />
      <div v-if="isSuccess" class="text-center mt-10">
        <span class="block">Đặt hàng thành công!</span>
        <button
          @click="toggleSuccess"
          class="bg-yellow hover:bg-yellowHover rounded-lg px-5 py-3 mt-6 font-semibold"
        >
          OK
        </button>
      </div>
      <div v-if="isSuccess === false" class="text-center mt-10">
        <span class="block">Đặt hàng thất bại!</span>
        <button
          @click="toggleSuccess"
          class="bg-yellow hover:bg-yellowHover rounded-lg px-5 py-3 mt-6 font-semibold"
        >
          OK
        </button>
      </div>
    </div>
  </div>
  <footer-component />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import HeaderComponent from "@/components/HeaderComponent.vue";
import BackToTop from "@/components/BackToTop.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import OrderAPI from "../apis/modules/order";
export default {
  components: {
    HeaderComponent,
    BackToTop,
    FooterComponent,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const name = ref(store.state.user.name);
    const phonenumber = ref(store.state.user.phonenumber);
    const province = ref(store.state.user.address.province);
    const district = ref(store.state.user.address.district);
    const ward = ref(store.state.user.address.ward);
    const detail = ref(store.state.user.address.detail);

    const payList = computed(() => store.getters.getPayList);
    const payment = computed(() => store.getters.getPayment);

    const provinces = ref(null);
    const districts = ref(null);
    const wards = ref(null);

    const isOpenModal = ref(false);
    const isOk = ref(false);
    const isSuccess = ref(null);

    function toggleModal() {
      isOpenModal.value = !isOpenModal.value;
    }

    function toggleSuccess() {
      isSuccess.value = null;
      router.push("/products");
    }

    async function getProvince() {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api?depth=3"
        );
        provinces.value = response.data;
      } catch (error) {
        console.log(error);
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

    function choseProvince(e) {
      province.value = e.target.innerText;
      districts.value = provinces.value.find(
        (province) => Number(province.code) === Number(e.target.dataset.code)
      ).districts;
    }

    function choseDistrict(e) {
      district.value = e.target.innerText;
      wards.value = districts.value.find(
        (district) => Number(district.code) === Number(e.target.dataset.code)
      ).wards;
    }

    function choseWard(e) {
      ward.value = e.target.innerText;
    }

    function clickInput(e) {
      if (!e.target.value) {
        e.target.closest("label").classList.add("active");
        e.target.classList.add("activeInput");
      }
    }

    function blurInput(e) {
      if (!e.target.value) {
        e.target.closest("label").classList.remove("active");
        e.target.classList.remove("activeInput");
      }
    }

    function toggleList(e) {
      if (
        e.target.closest("div").querySelector("ul").classList.contains("hidden")
      ) {
        document.querySelectorAll("ul").forEach((item) => {
          item.classList.add("hidden");
        });
        e.target.closest("div").querySelector("ul").classList.remove("hidden");
      } else
        e.target.closest("div").querySelector("ul").classList.add("hidden");
    }

    function choseItem(e) {
      const text = e.target.closest("div").querySelector("h1");
      text.innerText = e.target.innerText;
      text.classList.remove("opacity-60");
      e.target.closest("div").classList.add("active");
    }

    function submitOrder() {
      if (
        name.value &&
        phonenumber.value &&
        province.value &&
        district.value &&
        ward.value &&
        detail.value
      ) {
        isOk.value = true;
      } else {
        isOk.value = false;
      }
      toggleModal();
    }

    async function submit() {
      try {
        const response = await OrderAPI.newOrder({
          products: payList.value,
          owner: store.state.user.id,
          name: name.value,
          phonenumber: phonenumber.value,
          address: {
            province: province.value,
            district: district.value,
            ward: ward.value,
            detail: detail.value,
          },
          total: payment.value,
        });
        payList.value.forEach((item) => {
          store.dispatch("deleteItemFromCart", {
            userID: store.state.user.id,
            productID: item.product._id,
          });
        });
        if (response.data.success === "true") {
          isSuccess.value = true;
        }
      } catch (error) {
        isSuccess.value = false;
      }
      toggleModal();
    }

    onMounted(async () => {
      await getProvince();
    });

    return {
      name,
      phonenumber,
      province,
      district,
      ward,
      detail,
      provinces,
      districts,
      wards,
      payList,
      payment,
      isOpenModal,
      isOk,
      isSuccess,
      clickInput,
      blurInput,
      toggleList,
      choseItem,
      choseProvince,
      choseDistrict,
      choseWard,
      formatCurrency,
      toggleModal,
      submitOrder,
      submit,
      toggleSuccess,
    };
  },
};
</script>

<style scoped>
.active {
  background-color: #fff !important;
  border-width: 1px;
  border-color: #dbdbdb;
}
.activeInput {
  background-color: #fff;
}

.fullOp {
  opacity: 1 !important;
}
</style>
