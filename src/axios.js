import axios from "axios";

const access = localStorage.getItem('access')

export default axios.create({
    // baseURL: "https://api.halalekosistem.org/api/v1/",
    baseURL: "http://localhost:8000/api/v1/",
    headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${access}`
    }
})