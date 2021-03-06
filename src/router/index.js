import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import Users from "../components/user/Users.vue";
import Teach from "../components/teach/Teach.vue";
import Cat from "../components/folderCat/cat.vue";
import Adopt from "../components/folderCat/adopt.vue";
import Announcement from "../components/folderCat/announcement.vue";
import Life from "../components/life/Life.vue"
import Message from "../components/message/Message.vue"
import Organization from "../components/organization/organization.vue"
import Rescue from "../components/organization/rescue.vue"
import Oneself from "../components/oneself/Oneself.vue"
import FeralCat from '../views/FeralCat.vue'
Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/feralcat",
            component: FeralCat,
        },
        {
            path: "/home",
            component: Home,
            redirect: "/welcome",
            children: [
                {
                    path: "/welcome",
                    component: Welcome,
                },
                {
                    path: "/users",
                    component: Users,
                },
                {
                    path: "/Teach",
                    component: Teach,
                },
                {
                    path: "/Cat",
                    component: Cat,
                },
                {
                    path: "/Adopt",
                    component: Adopt,
                },
                {
                    path: "/Announcement",
                    component: Announcement,
                },
                {
                    path: "/Life",
                    component: Life,
                },
                {
                    path: "/Message",
                    component: Message,
                },
                {
                    path: "/Organization",
                    component: Organization,
                },
                {
                    path: "/Rescue",
                    component: Rescue,
                },
                {
                    path: "/Oneself",
                    component: Oneself,
                },
            ],
        },
    ],
});

// ????????????????????????
router.beforeEach((to, from, next) => {
    // to       ??????????????????
    // form     ???????????????????????????
    // next     ????????????
    // next()   ??????    next('/login')  ????????????
    if (to.path == "/login") return next();
    // ??????token
    const tokenStr = window.sessionStorage.getItem("token");
    if (!tokenStr) return next("/login");
    next();
});

export default router;
