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
                this.users = response.data.map(user =>({
                    id: user._id,
                    name: user.name,
                    date: user.date,
                    gender: user.gender,
                    interest: user.interest
                }));
            } catch (err) {
                console.log(err)
            }
        },

        async addInterest(interest) {
            const token = localStorage.getItem("token");
            
            if (!token) {
                throw new Error("Token not found in localStorage");
            }

            try {
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