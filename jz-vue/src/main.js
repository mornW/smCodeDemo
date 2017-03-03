import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'; // 引入路由配置
import axios from 'axios'
// import infiniteScroll from 'vue-infinite-scroll';  // 引入滑动模块
import fastclick from 'fastclick'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../static/css/base.css'
// import Scroller from 'vue-scroller'
// 注册组件
Vue.use(ElementUI,VueRouter,Vuex)
// Vue.use(infiniteScroll);
fastclick.attach(document.body)

//测试TOKEN
var TOKEN = 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4MzpiZTYxNjI3NS02YzZiLTQ2NmQtYjllMS0wYjBlZWQwYmYzYzA6MTQ3OTk2OTYyMTE5OTow';

//开发 [接口域名]
var yxImApi = 'http://121.42.153.1:8080/imservice' ;
    // yxApi = 'http://192.168.1.44:8080/service';
axios.defaults.baseURL = yxImApi;
axios.defaults.headers.common['Authorization'] = TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$http = axios;

//与app建立通信
function YXReady(callback) {
    if (window.JSBridge) {
        callback(JSBridge)
    } else {
        document.addEventListener('YXReady', function() {
            callback(JSBridge)
        }, false)
    }
}

// 创建路由实例
const router = new VueRouter({
    mode: 'hash', // 设置路由模式 可选值: "hash" | "history" | "abstract"，默认"hash"
    routes
})

/* eslint-disable no-new */
new Vue({
  el: '#morn',
  router,
  watch: {
      '$route' (to, from) {
          console.log(to);
          console.log(from);
      }
  }
  // template: '<App/>',
  // components: { App }
})
