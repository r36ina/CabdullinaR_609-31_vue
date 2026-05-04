import {createRouter, createWebHistory} from "vue-router";
import Home from "./components/Home.vue";
import Services from "./components/Services.vue";
import About from "./components/About.vue";
import Medworkers from "@/components/Medworkers.vue";
import CreateService from "@/components/CreateService.vue";
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
        path:'/medworkers',
        component: Medworkers,
    },
    {
        path:'/about',
        component: About,
    },
    {
        path:'/createService',
        component: CreateService,
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;