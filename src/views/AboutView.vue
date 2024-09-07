<template>
  <header-component />
  <back-to-top />
  <div
    class="max-w-[1440px] px-5 sm:px-[60px] xl:px-[120px] mt-16 mx-auto pb-20"
  >
    <h1 class="font-[Anton] text-black text-[36px] sm:text-[44px] text-center">
      VỀ THE BEST RECORDS
    </h1>
    <p
      class="block mt-8 lg:mt-12 w-full lg:w-[80%] text-justify lg:text-center mx-auto"
    >
      The Best Records là một cửa hàng đĩa than nổi bật trong thế giới âm nhạc
      cổ điển, nơi mỗi bản ghi đều được chăm chút tỉ mỉ để mang đến những trải
      nghiệm nghe nhạc đỉnh cao. Với sự chú trọng đến chất lượng âm thanh và chi
      tiết thiết kế, The Best Records cung cấp một bộ sưu tập đa dạng từ các bản
      nhạc kinh điển của các thập kỷ trước cho đến những tác phẩm hiện đại được
      yêu thích. cửa hàng không chỉ nổi bật với các đĩa than được sản xuất với
      công nghệ tiên tiến mà còn với bao bì sang trọng và phong cách cổ điển,
      khiến mỗi đĩa than không chỉ là một tác phẩm âm nhạc mà còn là một món đồ
      sưu tập quý giá. The Best Records cam kết mang đến cho người yêu nhạc
      những trải nghiệm tuyệt vời nhất, nơi chất lượng âm thanh và sự tinh tế
      trong thiết kế hòa quyện hoàn hảo.
    </p>
    <div
      class="flex w-full justify-around items-center xl:w-[60%] mx-auto mt-8 xl:mt-[60px]"
    >
      <div class="text-center">
        <span class="font-[Anton] text-yellow text-[32px] xl:text-[36px]"
          >10N+</span
        >
        <span class="block text-[14px] xl:text-[16px]">Lượt bán</span>
      </div>
      <div class="text-center">
        <span class="font-[Anton] text-yellow text-[32px] xl:text-[36px]"
          >20N+</span
        >
        <span class="block text-[14px] xl:text-[16px]">Lượt tìm kiếm</span>
      </div>
      <div class="text-center">
        <span class="font-[Anton] text-yellow text-[32px] xl:text-[36px]"
          >19N+</span
        >
        <span class="block text-[14px] xl:text-[16px]"
          >Lượt phản hồi tích cực</span
        >
      </div>
    </div>
    <div class="mt-10 xl:mt-20 relative rounded-xl overflow-hidden">
      <img src="../assets/images/abouts/team-img.svg" alt="" />
      <div class="absolute hidden flex-col bottom-12 right-12 gap-7 sm:flex">
        <a href="" target="_blank"
          ><img src="../assets/images/abouts/fb.svg" alt=""
        /></a>
        <a href="" target="_blank">
          <img src="../assets/images/abouts/ig.svg" alt=""
        /></a>
        <a href="" target="_blank">
          <img src="../assets/images/abouts/ytb.svg" alt=""
        /></a>
      </div>
    </div>
    <div class="flex sm:hidden items-center justify-center mt-7 mx-auto gap-10">
      <a href="" target="_blank"
        ><img src="../assets/images/abouts/fb1.svg" alt=""
      /></a>
      <a href="" target="_blank">
        <img src="../assets/images/abouts/ig1.svg" alt=""
      /></a>
      <a href="" target="_blank">
        <img src="../assets/images/abouts/ytb1.svg" alt=""
      /></a>
    </div>
    <div class="flex w-full flex-wrap mt-12 lg:mt-20 items-start">
      <div
        class="text-yellow font-[Anton] text-[36px] text-center lg:text-left mx-auto lg:mx-0 lg:text-[40px] lg:w-[50%]"
      >
        CAM KẾT DỊCH VỤ <br />
        <span class="text-black"> KHI MUA HÀNG</span>
      </div>
      <div class="w-full lg:w-[50%]">
        <p
          class="w-[90%] mx-auto lg:mx-0 mt-2 lg:mt-0 text-center lg:text-left lg:w-full text-[14px] xl:text-[16px]"
        >
          Chúng tôi cam kết dịch vụ tận tâm, hỗ trợ nhanh chóng, và đáp ứng mọi
          nhu cầu của bạn khi mua hàng, đảm bảo sự hài lòng tuyệt đối
        </p>
        <router-link
          to="/products"
          class="hidden lg:block bg-yellow hover:bg-yellowHover text-center w-[180px] rounded-lg font-semibold py-3 cursor-pointer mt-6"
        >
          Đặt hàng ngay
        </router-link>
      </div>
    </div>
    <div
      class="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-6 mt-8 lg:mt-[60px]"
    >
      <div
        class="bg-grey rounded-xl h-[140px] lg:h-[248px] flex lg:flex-wrap items-center justify-center lg:justify-normal px-8 py-7 lg:p-7 lg:pr-12"
      >
        <img
          src="../assets/images/abouts/secure-icon.svg"
          alt=""
          class="w-20"
        />
        <div class="lg:w-full lg:mt-6 ml-6 lg:ml-0">
          <span class="font-semibold">Bảo mật thông tin</span>
          <span class="block font-light text-[14px] lg:mt-1"
            >Đảm bảo an toàn và riêng tư thông tin khách hàng.
          </span>
        </div>
      </div>
      <div
        class="bg-grey rounded-xl h-[140px] lg:h-[248px] flex lg:flex-wrap items-center justify-center lg:justify-normal px-8 py-7 lg:p-7 lg:pr-12"
      >
        <img
          src="../assets/images/abouts/shipping-icon.svg"
          alt=""
          class="w-20"
        />
        <div class="lg:w-full lg:mt-6 ml-6 lg:ml-0">
          <span class="font-semibold">Vận chuyển</span>
          <span class="block font-light text-[14px] lg:mt-1"
            >Đảm bảo giao hàng nhanh chóng và đúng hẹn.
          </span>
        </div>
      </div>
      <div
        class="bg-grey rounded-xl h-[140px] lg:h-[248px] flex lg:flex-wrap items-center justify-center lg:justify-normal px-8 py-7 lg:p-7 lg:pr-12"
      >
        <img
          src="../assets/images/abouts/payment-icon.svg"
          alt=""
          class="w-20"
        />
        <div class="lg:w-full lg:mt-6 ml-6 lg:ml-0">
          <span class="font-semibold">Thanh toán an toàn</span>
          <span class="block font-light text-[14px] lg:mt-1">
            Thanh toán đơn giản, linh hoạt qua nhiều phương thức.
          </span>
        </div>
      </div>
      <div
        class="bg-grey rounded-xl h-[140px] lg:h-[248px] flex lg:flex-wrap items-center justify-center lg:justify-normal px-8 py-7 lg:p-7 lg:pr-12"
      >
        <img
          src="../assets/images/abouts/guarantee-icon.svg"
          alt=""
          class="w-20"
        />
        <div class="lg:w-full lg:mt-6 ml-6 lg:ml-0">
          <span class="font-semibold">Bảo hành</span>
          <span class="block font-light text-[14px] lg:mt-1">
            Bảo hành tận tâm, hỗ trợ nhanh chóng và lâu dài.
          </span>
        </div>
      </div>
    </div>
    <router-link
      to="/products"
      class="block lg:hidden mx-auto bg-yellow hover:bg-yellowHover text-center w-[180px] rounded-lg font-semibold py-4 cursor-pointer mt-9"
    >
      Đặt hàng ngay
    </router-link>
  </div>
  <footer-component />
</template>

<script>
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
    return {};
  },
};
</script>
