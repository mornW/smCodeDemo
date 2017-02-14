/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * name ： 路由的名字
 * component : 路由的组件路径
 */
// const routers = [
//     {
//         path: '/',
//         name: 'one',
//         component(resolve) {
//             require.ensure(['./module/consultation/header.vue'], () => {
//               resolve(require('./module/consultation/header.vue'));
//             });
//         },
//     },
//     {
//         path: '/two',
//         name: 'two',
//         component(resolve) {
//             require.ensure(['./module/consultation/two.vue'], () => {
//               resolve(require('./module/consultation/two.vue'));
//             });
//         },
//     }
// ]

// export default routers;