import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from "@/router";
import store from "@/store";

import axios from 'axios'
//npmjs  vue-axios vue3使用介绍
import VueAxios from 'vue-axios'

const app = createApp(App);
app.use(ElementPlus,{
   locale: zhCn,
 })
   .use(router)
   .use(store)
   .use(VueAxios,axios)
app.provide('axios', app.config.globalProperties.axios)//注入
app.mount('#app');


