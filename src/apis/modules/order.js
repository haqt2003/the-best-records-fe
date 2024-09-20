import Api from "../index";

export default {
  newOrder(data) {
    return Api().post("/orders", {
      products: data.products,
      owner: data.owner,
      name: data.name,
      phonenumber: data.phonenumber,
      address: data.address,
      total: data.total,
    });
  },
  getUserOrders(userID) {
    return Api().get(`/orders/${userID}`);
  },
  getOrder(userID, orderID) {
    return Api().get(`/orders/${userID}/${orderID}`);
  },
};
