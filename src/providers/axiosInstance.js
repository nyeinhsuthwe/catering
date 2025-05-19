import axios from "axios";
import Cookies from "js-cookie";
const api = axios.create({
    baseURL: 'https://fakestoreapi.com/products/',
    timeout: 10000,
    headers: {
        'Content-Type' : 'application/json'
    }
});


api.interceptors.request.use(
    async(config) => {
        try{
            const token = Cookies.get("authToken");
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        catch(error){
            console.log(error);
        }
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response){
            console.log(error.response)
        }
    }
)

export default api;