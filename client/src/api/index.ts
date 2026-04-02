import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.SERVER_URI,
    withCredentials: true,
    timeout: 120000
});

export default apiClient;