import Api from "../index";

export default {
  getUser(userID) {
    return Api().get(`users/${userID}`);
  },
};
