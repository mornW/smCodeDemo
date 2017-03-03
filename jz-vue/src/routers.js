/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * name ： 路由的名字
 * component : 路由的组件路径
 */
import homePage from './components/main.vue'
import toWhere from './components/where.vue'
const routes = [
    { path: '/' ,component: toWhere},
    {
        path: '/phone',
        component: homePage,
        children: [
            {
                path: 'list',
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
    },
    {
        path: '/login',
        component: function(resolve){require(['./module/admin/login.vue'], resolve)}
    },
    {path: '/adminIndex',component: function(resolve){require(['./module/admin/index.vue'], resolve)},
        children: [
            {path: 'users',component: function(resolve){require(['./module/admin/users.vue'], resolve)}}
        ]
    }
    // {path: '/logout', component: logout}
]

export default routes;