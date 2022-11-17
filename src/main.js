import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueSimpleAlert from "vue3-simple-alert";

createApp(App).use(store).use(router).use(ElementPlus).use(Antd).use(VueSimpleAlert).mount('#app')
