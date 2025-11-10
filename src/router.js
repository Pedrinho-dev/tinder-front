import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import CreateAccount from "./pages/CreateAccount.vue";
import Index from "./pages/index.vue"; 
import Home from "./pages/Home.vue"; 
import Interest from "./pages/Interest.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Index,
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/createAccount",
            component: CreateAccount,
        },
        {
            path: "/interest",
            component: Interest,
        },
        {
            path: "/home",
            component: Home,
        }
        
    ]
})

export default router;