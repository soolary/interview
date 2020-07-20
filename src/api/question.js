import _fetch from "@/utils/request.js"

function getQuestionData(params) {
    return _fetch({
        url: "/question/list",
        method: "get",
        params      //data: data   
    })
}
function addQuestionData(data) {
    return _fetch({
        url: "/question/add",
        method: "post",
        data      //data: data   
    })
}
function setQuestionStatus(data) {
    return _fetch({
        url: "/question/status",
        method: "post",
        data      //data: data   
    })
}
function delQuestionData(data) {
    return _fetch({
        url: "/question/remove",
        method: "post",
        data      //data: data   
    })
}
function editQuestionData(data) {
    return _fetch({
        url: "/question/edit",
        method: "post",
        data      //data: data   
    })
}
export { getQuestionData, addQuestionData, setQuestionStatus, delQuestionData, editQuestionData }