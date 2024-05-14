import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes/routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

document.body.className = "dark-theme";

const app = createApp(App);

app.use(router);
app.use(Antd);
app.mount("#app");
