import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import theme from './modules/theme.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        theme
    },
    getters
})