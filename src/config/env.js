var baseURL = ''

if (process.env.NODE_ENV === 'development') {
    baseURL = 'development'
} else if (process.VUE_APP_MODE === 'test') {
    baseURL = 'test'
} else {
    baseURL = 'prod'
}
export default baseURL