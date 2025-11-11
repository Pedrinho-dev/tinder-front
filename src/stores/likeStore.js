import { defineStore } from "pinia";
import api from "../services/api.js";

export const useLikeStore = defineStore("likeStore", {
    state: () => ({
        like: null,
        receivedLike: null,
        matches: null
    }),
    actions: {
        async sendLike(likedId) {
            try {
                const token = localStorage.getItem("token");
                console.log(likedId)
                const response = await api.post("/like/likes", likedId, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.like = response.data;

                if (response.data.match) {
                    alert("It's a MATCH!!!");
                }
                return response.data;
            } catch (err) {
                console.error("Failed like!", err);
                throw err;
            }
        },

        async receivedLike(userId) {
            const token = localStorage.getItem("token");
            try {
                const response = await api.get(`/like/received/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data;
            } catch (err) {
                console.error("Error find received likes:", err);
                throw err;
            }
        },

        async matches(userId) {
            const token = localStorage.getItem("token");
            try {
                const response = await api.get(`/like/matches/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data;
            } catch (err) {
                console.error("Error find received likes:", err);
                throw err;
            }
        },
    },
});
