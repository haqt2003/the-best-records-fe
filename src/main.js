import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/global.css";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

let app;
app = createApp(App);

app.use(router);
app.use(store);
app.use(VueAwesomePaginate);

app.mount("#app");
