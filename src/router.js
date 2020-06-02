import VueRouter from 'vue-router'
import Home from './views/layout/Index.vue'
export default new VueRouter({
    mode: 'hash',
    // 'base': process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
        children: [{
            path: 'index',
            name: '首页',
            hidden: false,
            meta: {
                icon: 'el-icon-s-home'
            },
            component: resolve => require(['@/views/Index.vue'], resolve)
        }, {
            path: 'task',
            name: '作业',
            hidden: false,
            meta: {
                icon: 'el-icon-notebook-1'
            },
            component: resolve => require(['@/views/Task.vue'], resolve),
            children: [{
                path: 'taskDetails',
                name: '作业详情',
                hidden: false,
                meta: {
                    icon: 'el-icon-notebook-2'
                },
                component: resolve => require(['@/views/TaskDetails.vue'], resolve)
            }]
        }, {
            path: 'logDetails',
            name: '日志详情',
            hidden: false,
            meta: {
                icon: 'el-icon-view'
            },
            component: resolve => require(['@/views/LogDetails.vue'], resolve)
        }]
    }, {
        path: '/login',
        name: 'login',
        component: resolve => require(['@/views/Login.vue'], resolve)
    }]
})