import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/router";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "./style.css";

document.body.className = "dark-theme";

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Antd);
app.mount("#app");
