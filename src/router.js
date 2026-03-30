import {createRouter, createWebHistory} from "vue-router";
import Home from "./components/Home.vue";
import Services from "./components/Services.vue";
import About from "./components/About.vue";
const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path:'/services',
        component: Services,
    },
    {
        path:'/about',
        component: About,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;