import { defineStore } from "pinia";
import api from "@/services/api";

export const useUserStore = defineStore("user", {
    state: ()=>({
        user: null
    }),
    getters: {},
    actions: {
        async createUser(formData){
            try{
                const response = await api.post("/user", formData);
                this.user = response.data
            }catch(err){
                console.log(err)
            }
        }
    }
})