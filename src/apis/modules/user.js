import Api from "../index";

export default {
  getUser(userID) {
    return Api().get(`/users/${userID}`);
  },
  updateUser(userID, data) {
    return Api().patch(`/users/${userID}`, {
      name: data.name,
      phonenumber: data.phonenumber,
      password: data.password,
      address: {
        province: data.address.province,
        district: data.address.district,
        ward: data.address.ward,
        detail: data.address.detail,
      },
    });
  },
  updateAvatar(userID, data) {
    return Api().patch(`users/${userID}/avatar`, {
      avatar: data.avatar,
    });
  },
};
