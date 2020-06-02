const isProd = process.env.NODE_ENV === 'production'//判断是不是生产环境

module.exports = {
    publicPath: './', //项目打包跟目录
    assetsDir: 'static', //静态资源放置目录
    outputDir: process.env.outputDir, // 打包生成目录
    lintOnSave: true, // 关闭eslint检查
    runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: !isProd, // source map
    devServer: {
        port: 8086, // 端口号
        host: 'localhost',
        https: false,
        open: true, //配置自动启动浏览器
        proxy: {
            //代理
            '/api': {
                target: '<url>',
                ws: false,//webscokey
                changeOrigin: true
            }
        },
        overlay: {
            warnings: false,
            errors: false
        }
    },
    // 配置全局scss
    css: {
        loaderOptions: {
            sass: {
                data: '@import "@/assets/css/theme/theme.scss";'
            }
        }
    },
    configureWebpack: {
        externals: {
            vue: 'Vue',
            Axios: 'axios',
            vuex: 'Vuex',
            moment: 'moment',
            'vue-router': 'VueRouter'
        }
    }
}