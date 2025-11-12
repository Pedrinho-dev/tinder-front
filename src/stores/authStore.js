import { defineStore } from "pinia";
import api from "../services/api.js";

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        auth: null, 
        user: [],
    }),
    getters: ({}),
    actions: {
        async register(formData) {
            try {
                const response = await api.post("/auth/register", formData);
                this.user = response.data
            } catch (err) {
                console.log(err)
            }

        },
        async login(user) {
            try {
                const response = await api.post("/auth/login", user);
                this.auth = response.data;
                this.user = response.data.user;
                localStorage.setItem("token", this.auth.token);
                localStorage.setItem("userId", this.user._id);
            } catch (err) {
                console.log("Invalid credencials: ", err)
            }

        }
    },
    persist: true,
})