import axios from "axios";
import { getUser } from "../../utils/localStorage";
import { API_BASE_URL } from "../../components/constants/url";

const RegisterUser = (data) =>{
    const uri = `${API_BASE_URL}/register`;
    return axios.post(uri, data);
}

const LoginUser = (data) =>{
    const uri = `${API_BASE_URL}/login`;
    return axios.post(uri, data);
}

const GetUserDetails = () =>{
    const uri = `${API_BASE_URL}/me`;
    return axios.get(uri, {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token" : getUser()
        }
    });
}

export default {
    LoginUser,
    RegisterUser,
    GetUserDetails
}
