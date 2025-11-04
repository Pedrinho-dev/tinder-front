import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import CreateAccount from "./pages/CreateAccount.vue";
import Index from "./pages/index.vue"; 

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
        }
    ]
})

export default router;