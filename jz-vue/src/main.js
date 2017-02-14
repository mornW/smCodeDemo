import Vue from 'vue'
import VueRouter from 'vue-router'
// import routes from './routers'; // 引入路由配置
import homePage from './components/main.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        component: homePage,
        children: [
            {
                path: '/',
                component: function(resolve){require(['./components/modeList.vue'], resolve)}
            },
            {
                path: 'consultation',
                component: function(resolve){require(['./module/consultation/consultation.vue'], resolve)},
                children: [
                    {
                        path: '/',
                        component: function(resolve){require(['./module/consultation/modeList.vue'], resolve)}
                    },
                    {
                        path: '1',
                        component: function(resolve){require(['./module/consultation/add.vue'], resolve)}
                    },
                    {
                        path: '2',
                        component: function(resolve){require(['./module/consultation/list.vue'], resolve)}
                    },
                    {
                        path: '3',
                        component: function(resolve){require(['./module/consultation/user-info.vue'], resolve)}
                    },
                    {
                        path: '4',
                        component: function(resolve){require(['./module/consultation/circulation'], resolve)}
                    }
                ]
            }
        ]
    }
]

// 创建路由实例
const router = new VueRouter({
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
