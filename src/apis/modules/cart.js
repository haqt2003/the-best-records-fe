import Api from "../index";
import getToken from "@/composables/getToken";

export default {
  getCartList(userID) {
    const token = getToken();
    return Api().get(
      `users/${userID}/cart`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  deleteCart(userID) {
    const token = getToken();
    return Api().delete(
      `users/${userID}/cart`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  addToCart(userID, productID, quantity) {
    const token = getToken();
    return Api().post(
      `users/${userID}/cart/${productID}?quantity=${quantity}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  updateCartProduct(userID, productID, quantity) {
    const token = getToken();
    return Api().patch(
      `users/${userID}/cart/${productID}?quantity=${quantity}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  deleteCartProduct(userID, productID) {
    const token = getToken();
    return Api().delete(
      `users/${userID}/cart/${productID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
