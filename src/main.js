import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/global.css";
import "vue-awesome-paginate/dist/style.css";
import vue3GoogleLogin from "vue3-google-login";

let app;
app = createApp(App);

app.use(router);
app.use(store);
app.use(vue3GoogleLogin, {
  clientId:
    "870661096665-kge6qejkqc4aenddphlleddup3k4u78d.apps.googleusercontent.com",
});

app.mount("#app");
