import { defineStore } from "pinia";
import api from "@/services/api";

export const useUserStore = defineStore("user", {
    state: () => ({
        users: [],
        interest: null
    }),
    getters: {},
    actions: {
        async findUsers() {
            try {
                const response = await api.get("/user")
                console.log("Usuarios", response)
                this.users = response.data;
            } catch (err) {
                console.log(err)
            }
        },

        async addInterest(interest) {
            if (!token) {
                throw new Error("Token not found in localStorage");
            }

            try {
                const token = localStorage.getItem("token");
                const response = await api.put("/user/", { interest }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.interest = response.data
            } catch (err) {
                console.log(err)
            }
        }
    }
})