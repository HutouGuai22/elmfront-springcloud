import { createApp } from 'vue'
import {createPinia} from "pinia";
import App from './App.vue'
import router from './router'
import axios from "axios"
import qs from "qs";
import './assets/css/main.css'
import piniaPluginPersist from "pinia-plugin-persist";
const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersist);
app.use(pinia);
app.use(router);
app.provide("$axios",axios);
app.provide("$qs",qs);
app.mount('#app');
// 禁用 Vue Devtools
if (import.meta.env.PROD) {
    app.config.devtools = false
}


