import Api from "../index";

export default {
  login(data) {
    return Api().post("users/signin", {
      email: data.email,
      password: data.password,
    });
  },
  register(data) {
    return Api().post("users/signup", {
      name: data.name,
      email: data.email,
      password: data.password,
    });
  },
  authGoogle(data) {
    return Api().post("users/auth/google", {
      access_token: data,
    });
  },
  forgotPassword(email) {
    return Api().post("users/forgot-password", {
      email: email,
    });
  },
  confirmCode(data) {
    return Api().post("users/confirm-code", {
      email: data.email,
      code: data.code,
    });
  },
  newPassword(data) {
    return Api().post("users/new-password", {
      email: data.email,
      password: data.password,
    });
  },
};
