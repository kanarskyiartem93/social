import { createRouter, createWebHistory} from "vue-router";
import Container from "./views/layout/Container";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import Dashboard from "./views/pages/Dashboard";
import UserProfile from "./views/pages/UserProfile";

const routes = [
    {
        path: "/",
        name: Container,
        component: Container
    },
    {
        path: "/login",
        name: Login,
        component: Login
    },
    {
        path: "/register",
        name: Register,
        component: Register
    },
    {
        path: "/dashboard",
        name: Dashboard,
        component: Dashboard
    },
    {
        path: "/userprofile",
        name: UserProfile,
        component: UserProfile
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router