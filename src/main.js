import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import './assets/style.scss'


library.add(faPen);
createApp(App).use(store).use(router).mount("#app");
