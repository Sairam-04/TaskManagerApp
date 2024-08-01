import axios from "axios";
import { API_BASE_URL } from "../components/constants/url";

const API = axios.create({ baseURL: API_BASE_URL });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("user_info")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user_info")).token}`;
    }
    return req;
});

export const signUpGoogle = (accessToken) => {
    console.log("API", accessToken);
    return API.post("/auth/google", {
        googleAccessToken: accessToken
    });
};
