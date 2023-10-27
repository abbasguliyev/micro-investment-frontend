import axios from 'axios';

const access = localStorage.getItem('access')

export default axios.create({
    baseURL: "http://188.132.202.88:8000/api/v1/",
    headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${access}`
     }
})