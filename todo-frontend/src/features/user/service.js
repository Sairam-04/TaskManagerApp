import axios from "axios";
import { API_BASE_URL } from "../../constants/url";


const RegisterUser = (data) =>{
    const uri = `${API_BASE_URL}/register`;
    return axios.post(uri, data);
}

const LoginUser = (data) =>{
    const uri = `${API_BASE_URL}/login`;
    return axios.post(uri, data);
}

const GetUserDetails = (data) =>{
    const uri = `${API_BASE_URL}/me`;
    return axios.get(uri, {
        headers: {
            "Content-Type": "application.json",
            "ltree-token" : data
        }
    });
}

export default {
    LoginUser,
    RegisterUser,
    GetUserDetails
}