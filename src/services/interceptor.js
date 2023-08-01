import axios from "axios";
import { apiVersion, BaseUrl } from "../Utils/Constanturl";
const EndPoint = BaseUrl + apiVersion;

const Api = axios.create({
    timeout: 1000000,
    baseURL: EndPoint
});
Api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
Api.defaults.headers.post["Access-Control-Allow-origin"] = "*";

Api.interceptors.request.use(
    (config) => {

        let token = localStorage.getItem("auth_token");
        config.headers = {
            Authorization: 'Bearer ' + token,
        };
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);


Api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default Api;