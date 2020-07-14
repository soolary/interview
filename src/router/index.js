import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login/login.vue'
import layout from "@/views/layout/layout.vue";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: "/login",
        component: login
    }, {
        path: "/layout",
        component: layout
    }]
})
export default router