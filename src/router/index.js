import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from '@/components/NotFound.vue'
const routes = [
    {
        path: "/",
        name: "Index",
        component:  () => import('@/view/test1.vue'),
    },
    {
        path: "/table",
        name: "table",
        component:  () => import('@/components/Table.vue'),
    },
    {
        path: "/testtable",
        name: "table",
        component:  () => import('@/view/testtable1122.vue'),
    },
    {
        path: "/test2",
        name: "test2",
        component:  () => import('@/view/test2.vue'),
    },
    {
        path: "/test3",
        name: "test3",
        component:  () => import('@/view/test3.vue'),
    },
    {
        path: "/testVirtualList2",
        name: "testVirtualList2",
        component:  () => import('@/view/testVirtualList2.vue'),
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
    // { path: '*', name: 'not-found', component: NotFound },  //报错   提示必须用正则表达式定义
];
const Router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    // isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
    // routes: globalRoutes.concat(mainRoutes)
    routes:routes
})
export default Router