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
                this.users = response.data.map(user => ({
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

        async getUserById(userId) {
            const token = localStorage.getItem("token");
            try {
                const response = await api.get(`/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data; 
            } catch (err) {
                console.error("Erro ao buscar usuário:", err);
                throw err;
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
        },

        async editProfile(userId, updates) {
            const token = localStorage.getItem("token");
            try {
                const response = await api.put(`/user/${userId}`, updates, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const updatedUser = response.data;
                this.users = this.users.map(user =>
                    user.id === updatedUser._id
                        ? {
                            id: updatedUser._id,
                            name: updatedUser.name,
                            date: updatedUser.date,
                            gender: updatedUser.gender,
                            interest: updatedUser.interest
                        }
                        : user
                );
            } catch (err) {
                console.error("Erro ao atualizar perfil:", err);
                throw err;
            }
        }
    }
})