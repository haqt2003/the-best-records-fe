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
};
