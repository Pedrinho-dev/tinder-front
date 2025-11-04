import { defineStore } from "pinia";
import api from "@/services/api";

export const useUserStore = defineStore("user", {
    state: ()=>({
        user:null
    }),
    getters: {},
    actions: {
        async createUser(userData){
            try{
                const userCreated = api.post("/user", userData);
                this.user = userCreated.data
            }catch(err){
                console.log(err)
            }
        }
    }
})