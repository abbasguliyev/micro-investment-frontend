import axios from 'axios';

const access = localStorage.getItem('access')

export default axios.create({
    baseURL: "http://188.132.202.212:8000/api/v1/",
    // baseURL: "http://localhost:8000/api/v1/",
    headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${access}`
     }
})