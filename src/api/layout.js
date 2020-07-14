import _fetch from './requset.js'
// import { getLocal } from '@/utils/local.js'
function getUserInfo() {
    return _fetch({
        url: '/info',
        // headers: { token: getLocal() }
    })
}
function logout() {
    return _fetch({
        url: "/logout"
    })
}
export { getUserInfo, logout }