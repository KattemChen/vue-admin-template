import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import '@/assets/css/common.scss'
import '@/assets/css/theme/element-variables.scss'
Vue.use(ElementUI)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')