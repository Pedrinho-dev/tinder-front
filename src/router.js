import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import CreateAccount from "./pages/CreateAccount.vue";
import Index from "./pages/index.vue"; 
import Home from "./pages/Home.vue"; 
import Interest from "./pages/Interest.vue";
import Account from "./pages/Account.vue";
import Macthes from "./pages/Matches.vue";
import Likes from "./pages/Likes.vue";

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
        },
        {
            path: "/account",
            component: Account,
        },
        {
            path: "/matches",
            component: Macthes,
        },
        {
            path: "/likes",
            component: Likes,
        }
        
    ]
})

export default router;