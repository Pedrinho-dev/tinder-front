import { defineStore } from "pinia";
import api from "../services/api.js";

export const useLikeStore = defineStore("likeStore", {
    state: () => ({
        like: null,
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
                return response.data;
            } catch (err) {
                console.error("Failed like!", err);
                throw err;
            }
        },
    },
});
