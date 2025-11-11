import axios from "axios";

const api = axios.create({
    baseURL: "https://tinder-back-f3ft.onrender.com/",
})

export default api;