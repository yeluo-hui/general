/*
 * @Author: your name
 * @Date: 2022-03-24 18:17:05
 * @LastEditTime: 2022-03-24 19:54:09
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \rdgeneral\src\main.js
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// vue-easytabl 中文包
import { VeLocale } from "vue-easytable";
// 引入英文语言包
import zhCN from "vue-easytable/libs/locale/lang/zh-CN.js";
VeLocale.use(zhCN);

// 上传
import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
Vue.use(VueFileAgent);
// 接口
import axios from 'axios'
// 日期格式
import moment from 'moment'

//开关mock
require('../src/mock')

// 把bus挂载到了Vue的原型上, 保证所有的组件都能通过 this.$bus访问到事件总线

Vue.prototype.$axios = axios
Vue.prototype.$moment = moment

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

