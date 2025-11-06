import { defineStore } from "pinia";
import api from "../services/api.js";

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        auth: null
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
                localStorage.setItem("token", this.auth.token);
            } catch (err) {
                console.log("Invalid credencials: ", err)
            }

        }
    }
})