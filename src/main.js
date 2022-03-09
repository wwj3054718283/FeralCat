import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import TreeTable from 'vue-table-with-tree-grid'
import App from './App.vue'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/font/iconfont.css'
import './plugins/element.js'
import router from './router'



// 配置请求根路径
axios.defaults.baseURL='http://101.33.246.107:8088/'
// axios.defaults.baseURL='http://10.10.84.194:8088/'
axios.interceptors.request.use(config=>{
    config.headers.token = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component('tree-table',TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
