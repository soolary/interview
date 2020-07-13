import axios from 'axios'
var _fetch = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})
function getRcode(data) {
    return _fetch({
        url: '/sendsms',
        data: data,
        method: 'post'
    })
}
function registerUser(data) {
    return _fetch({
        url: '/register',
        method: 'post',
        data: data
    })
}
export { getRcode, registerUser }
