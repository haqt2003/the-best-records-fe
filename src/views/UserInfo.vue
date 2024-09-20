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
          <img
            src="../assets/images/user/edit.svg"
            alt=""
            class="bottom-3 right-3 absolute cursor-pointer"
          />
        </div>
        <div class="mx-auto text-center mt-7">
          <span class="block font-semibold text-[18px]">{{ name }}</span>
          <span class="block font-light mt-1">{{ email }}</span>
        </div>
        <div class="hidden sm:block mt-10">
          <div class="font-medium">
            <div class="rounded-lg px-8 py-4 cursor-pointer active-box">
              Thông tin cá nhân
            </div>
            <div class="h-[0.5px] bg-yellow w-line mx-auto opacity-50"></div>
            <router-link
              to="/history"
              class="px-8 py-4 cursor-pointer rounded-lg block"
            >
              Lịch sử mua hàng
            </router-link>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-[67%]">
        <h1 class="font-[Anton] text-[40px]">THÔNG TIN CÁ NHÂN</h1>
        <form class="mt-9">
          <div class="flex flex-wrap justify-between">
            <div class="w-full flex flex-wrap justify-between">
              <label
                :class="{ active: email }"
                for="email"
                class="bg-grey h-[72px] cursor-pointer w-full mt-5 lg:mt-0 lg:w-[48%] px-5 py-3 rounded-lg border-[1px] border-grey block"
              >
                <span class="text-[14px] opacity-60 block">Họ và tên</span>

                <input
                  v-model="email"
                  @click="clickInput($event)"
                  @blur="blurInput($event)"
                  type="email"
                  id="email"
                  :class="{ activeInput: email }"
                  class="outline-none bg-grey mt-1 font-semibold w-full"
                />
              </label>
              <label
                :class="{ active: password }"
                for="password"
                class="bg-grey h-[72px] cursor-pointer w-full mt-5 lg:mt-0 lg:w-[48%] px-5 py-3 rounded-lg border-[1px] border-grey block"
              >
                <span class="text-[14px] opacity-60 block">Mật khẩu</span>

                <input
                  v-model="password"
                  @click="clickInput($event)"
                  @blur="blurInput($event)"
                  type="password"
                  name=""
                  id="password"
                  :class="{ activeInput: password }"
                  class="outline-none bg-grey mt-1 font-semibold w-full"
                  disabled
                />
              </label>
              <div
                @click="togglePass"
                class="cursor-pointer w-full mt-4 text-right font-semibold"
              >
                Đổi mật khẩu
              </div>
            </div>
            <label
              :class="{ active: name }"
              for="name"
              class="bg-grey h-[72px] cursor-pointer w-full mt-5 lg:mt-8 lg:w-[48%] px-5 py-3 rounded-lg border-[1px] border-grey block"
            >
              <span class="text-[14px] opacity-60 block">Họ và tên</span>

              <input
                v-model="name"
                @click="clickInput($event)"
                @blur="blurInput($event)"
                type="tel"
                name=""
                id="name"
                :class="{ activeInput: name }"
                class="outline-none bg-grey mt-1 font-semibold w-full"
              />
            </label>
            <label
              :class="{ active: phonenumber }"
              for="phonenumber"
              class="bg-grey h-[72px] cursor-pointer w-full mt-5 lg:mt-8 lg:w-[48%] px-5 py-3 rounded-lg border-[1px] border-grey block"
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
            <div class="flex w-full flex-wrap justify-between">
              <div
                @click="toggleList($event)"
                :class="{ active: province }"
                class="bg-grey relative h-[72px] cursor-pointer w-full sm:w-[31%] mt-5 lg:mt-8 px-5 py-3 rounded-lg border-[1px] border-grey block"
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
                  class="absolute top-1/2 -translate-y-1/2 right-5"
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
              <div
                :class="{ active: district }"
                @click="toggleList($event)"
                class="bg-grey relative h-[72px] cursor-pointer w-full sm:w-[31%] mt-5 lg:mt-8 px-5 py-3 rounded-lg border-[1px] border-grey block"
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
                  class="absolute top-1/2 -translate-y-1/2 right-5"
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
                class="bg-grey relative h-[72px] cursor-pointer w-full sm:w-[31%] mt-5 lg:mt-8 px-5 py-3 rounded-lg border-[1px] border-grey block"
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
                  class="absolute top-1/2 -translate-y-1/2 right-5"
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
              class="bg-grey h-[72px] cursor-pointer w-full mt-5 lg:mt-8 px-5 py-3 rounded-lg border-[1px] border-grey block"
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
          </div>
          <button
            class="mx-auto bg-yellow hover:bg-yellowHover w-[180px] h-[60px] rounded-lg font-semibold block mt-9"
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  </div>
  <footer-component />
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import HeaderComponent from "@/components/HeaderComponent.vue";
import BackToTop from "@/components/BackToTop.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import axios from "axios";
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
    const password = ref("******");
    const name = ref(store.state.user.name);
    const phonenumber = ref(store.state.user.phonenumber);
    const province = ref(store.state.user.address.province);
    const district = ref(store.state.user.address.district);
    const ward = ref(store.state.user.address.ward);
    const detail = ref(store.state.user.address.detail);

    const provinces = ref(null);
    const districts = ref(null);
    const wards = ref(null);

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

    function togglePass() {
      const input = document.getElementById("password");
      input.disabled = false;
      input.focus();
    }

    onMounted(async () => {
      await getProvince();
    });
    return {
      avatar,
      email,
      password,
      name,
      phonenumber,
      province,
      district,
      ward,
      detail,
      provinces,
      districts,
      wards,
      clickInput,
      blurInput,
      choseItem,
      toggleList,
      choseProvince,
      choseDistrict,
      choseWard,
      togglePass,
    };
  },
};
</script>

<style scoped>
.active-box {
  background-color: #f6d776;
  color: white;
  border-color: #f6d776;
}

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
