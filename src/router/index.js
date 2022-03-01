import { createRouter, createWebHashHistory } from "vue-router";
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
    }
];
const Router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    // isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
    // routes: globalRoutes.concat(mainRoutes)
    routes:routes
})
export default Router