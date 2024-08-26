import Api from "../index";

export default {
  getProductList() {
    return Api().get("/products");
  },
  getProduct(productID) {
    return Api().get(`/products/${productID}`);
  },
};
