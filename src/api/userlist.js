import _fetch from "@/utils/request.js"
function getUserList(params) {
    return _fetch({
        url: '/user/list',
        params
    })
}
function addUser(data) {
    return _fetch({
        url: "/user/add",
        method: "post",
        data
    })
}
function editUser(data) {
    return _fetch({
        url: "/user/edit",
        method: "post",
        data
    })
}
function setUserStatus(data) {
    return _fetch({
        method: 'post',
        url: '/user/status',
        data
    })
}
function deleteUser(data) {
    return _fetch({
        url: '/user/remove',
        method: 'post',
        data
    })
}
export { getUserList, setUserStatus, deleteUser, addUser, editUser }