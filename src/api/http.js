import axios from 'Axios'
import Vue from 'vue'
import store from '../store.js'
import router from '../router.js'
import Api from './api.js'
import { baseUrl } from '@/config/env.js'
axios.defaults.baseURL = baseUrl
axios.defaults.timeout = 15000

// 隐藏提示信息
const hideMessageApi = []

// request拦截器，携带token
axios.interceptors.request.use(
    config => {
        if (store.getters.getUser.accessToken) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.accessToken = store.getters.getUser.accessToken
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.status === 401) {
            store.dispatch('delUser')
            router.push({
                path: '/login'
            })
        } else if (response.data.status === 403) {
            router.push({
                path: '/error/403'
            })
        } else if (response.status === 500) {
            router.push({
                path: '/error/500'
            })
        }
        if (response.status !== 200 || response.data.status !== 200) {
            // 登录接口弹窗
            if (response.config.url.includes('api/web/user/login')) {
                Vue.prototype.$alert(
                    response.data.errorMsg ? response.data.errorMsg : response.statusText,
                    '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    }
                )
            } else if (!hideMessageApi.some(item => response.config.url.includes(item))) {
                Vue.prototype.$message({
                    type: 'error',
                    message: response.data.errorMsg ?
                        response.data.errorMsg : response.statusText
                })
            }
        }
        return response
    },
    error => {
        return Promise.reject(error) // 返回接口返回的错误信息
    }
)

//   包含所有请求方法的构造函数
function _Http() {}

// 封装使用
export default (function () {
    function http(url = Api) {
        var _httpob = new _Http()

        url.map(item => {
            let name = http.getName(item.url)

            _httpob[name + 'Status'] = 1
            _httpob[name] = function (val = {}) {
                return _httpob.sendMsg(item.url, val, item.method)
            }
        })
        return _httpob
    }

    // axios请求(防止重复请求)
    _Http.prototype.sendMsg = function (url, value = {}, method = 'post') {
        let name = http.getName(url)
        var status = {
            get: () => {
                return axios
                    .get(url, {
                        params: value
                    })
                    .then(res => {
                        this[name + 'Status'] = 1
                        return res
                    })
                    .catch(() => {
                        this[name + 'Status'] = 1
                        Vue.prototype.$message.warning('网络出现问题，请稍后重试')
                    })
            },
            post: () => {
                return axios
                    .post(url, value)
                    .then(res => {
                        this[name + 'Status'] = 1
                        return res
                    })
                    .catch(() => {
                        this[name + 'Status'] = 1
                        Vue.prototype.$message.warning('网络出现问题，请稍后重试')
                    })
            }
        }

        if (this[name + 'Status']) {
            this[name + 'Status'] = 0
            return status[method]()
        }
        return new Promise(reject => {
            reject({
                status: 40001
            })
        })

    }

    // 获取接口名字
    http.getName = function (url) {
        let list = url.split('/')

        return list[list.length - 1]
    }
    return http
})()