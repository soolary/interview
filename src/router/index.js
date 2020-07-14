import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login/login.vue'
import layout from "@/views/home/layout.vue";
import business from "@/views/home/business/business.vue"
import question from "@/views/home/question/question.vue"
import chart from "@/views/home/chart/chart.vue"
import subject from "@/views/home/subject/subject.vue"
import userlist from "@/views/home/userlist/userlist.vue"

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: "/login",
        component: login
    }, {
        path: "/layout",
        component: layout,
        children: [
            { path: '/business', component: business },
            { path: '/question', component: question },
            { path: '/chart', component: chart },
            { path: '/subject', component: subject },
            { path: '/userlist', component: userlist },
        ]
    }]
})
export default router