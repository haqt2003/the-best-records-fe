import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import AuthAPI from "../apis/modules/auth";
import CartAPI from "../apis/modules/cart";
import UserAPI from "../apis/modules/user";
import setToken from "@/composables/setToken";
import removeToken from "@/composables/removeToken";

export default createStore({
  state: {
    user: {
      id: "",
      name: "",
      phonenumber: "",
      email: "",
      address: {
        province: "",
        district: "",
        ward: "",
        detail: "",
      },
      avatar: "",
      cart: [],
      order: [],
    },
    paylist: [],
    payment: "",
    isOpenTab: false,
  },
  getters: {
    totalCartItems(state) {
      return state.user.cart
        ? state.user.cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.quantity;
          }, 0)
        : 0;
    },
    getUser(state) {
      return state.user;
    },
    getPayList(state) {
      return state.paylist;
    },
    getPayment(state) {
      return state.payment;
    },
    getStatusTab(state) {
      return state.isOpenTab;
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user.id = payload.data._id;
      state.user.name = payload.data.name;
      state.user.email = payload.data.email;
      state.user.phonenumber = payload.data.phonenumber;
      state.user.address = payload.data.address;
      state.user.avatar = payload.data.avatar;
      state.user.cart = payload.data.cart;
      state.user.order = payload.data.order;
    },
    ADD_TO_CART(state, payload) {
      const existingProduct = state.user.cart.find(
        (item) => item.product === payload.product
      );
      if (existingProduct) {
        existingProduct.quantity += payload.quantity;
      } else {
        state.user.cart.push(payload);
      }
    },
    UPDATE_ITEM_FROM_CART(state, payload) {
      const existingProduct = state.user.cart.find(
        (item) => item.product === payload.product
      );

      existingProduct.quantity = payload.quantity;
    },
    DELETE_ITEM_FROM_CART(state, payload) {
      const index = state.user.cart.findIndex(
        (item) => item.product === payload.productID
      );

      if (index !== -1) {
        state.user.cart.splice(index, 1);
      }
    },
    DELETE_CART(state) {
      state.user.cart = [];
    },
    SET_PAY(state, payload) {
      state.paylist = payload.list;
      state.payment = payload.total;
    },
    LOG_OUT(state) {
      state.user.id = "";
      state.user.name = "";
      state.user.email = "";
      state.user.phonenumber = "";
      state.user.avatar = "";
      state.user.address = {
        province: "",
        district: "",
        ward: "",
        detail: "",
      };
      state.user.cart = [];
      state.user.order = [];
    },
    TOGGLE_TAB(state) {
      state.isOpenTab = !state.isOpenTab;
    },
  },
  actions: {
    async addToCart({ commit }, data) {
      try {
        await CartAPI.addToCart(data.userID, data.productID, data.quantity);
        const response = await UserAPI.getUser(data.userID);
        if (!response) return false;
        commit("ADD_TO_CART", {
          product: data.productID,
          quantity: data.quantity,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async updateItemFromCart({ commit }, data) {
      try {
        await CartAPI.updateCartProduct(
          data.userID,
          data.productID,
          data.quantity
        );
        commit("UPDATE_ITEM_FROM_CART", {
          product: data.productID,
          quantity: data.quantity,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItemFromCart({ commit }, data) {
      try {
        await CartAPI.deleteCartProduct(data.userID, data.productID);
        commit("DELETE_ITEM_FROM_CART", {
          productID: data.productID,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCart({ commit }, data) {
      try {
        await CartAPI.deleteCart(data.userID);
        commit("DELETE_CART");
      } catch (error) {
        console.log(error);
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await AuthAPI.login(credentials);
        if (!response) return false;
        commit("SET_USER", {
          data: response.data,
        });
        setToken(response.headers["authorization"], 3);
      } catch (error) {
        console.log(error);
      }
    },
    async register({ commit }, credentials) {
      try {
        const response = await AuthAPI.register(credentials);
        if (!response) return false;
        commit("SET_USER", {
          data: response.data,
        });
        setToken(response.headers["authorization"], 3);
      } catch (error) {
        alert(error.response.data.error.message);
        console.log(error);
      }
    },
    async authGoogle({ commit }, credentials) {
      try {
        const response = await AuthAPI.authGoogle(credentials);
        if (!response) return false;
        commit("SET_USER", {
          data: response.data,
        });
        setToken(response.headers["authorization"], 3);
      } catch (error) {
        console.log(error);
      }
    },
    logout({ commit }) {
      commit("LOG_OUT");
      removeToken();
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
