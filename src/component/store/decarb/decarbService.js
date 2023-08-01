import axios from "axios";
import { baseURL } from "../auth/authService";

const decarbDataGet = async (data, userToken) => {
    try {
        const response = await axios.post(
            baseURL + "get-recommended-levers", data,
            userToken
        );

        return response?.data;
    } catch (error) {
        console.err(error);
        throw error;
    }
};

const decarbDetailDataGet = async (data, userToken) => {
    try {
        const response = await axios.post(
            baseURL + "get-customize-levers", data,
            userToken
        );

        return response?.data;
    } catch (error) {
        console.err(error);
        throw error;
    }
};

const decarbSaveDetailDataGet = async (data, userToken) => {
    try {
        const response = await axios.post(
            baseURL + "save-project",
            data,
            userToken
        );

        return response.data;
    } catch (error) {
        console.err(error);
        throw error;
    }

};

const decarbSaveProjectRatingDetailDataGet = async (data, userToken) => {
    try {
        const response = await axios.post(
            baseURL + "save-project-rating",
            data,
            userToken
        );

        return response.data;
    } catch (error) {
        console.err(error);
        throw error;
    }
};


const decarbService = {
    decarbDataGet,
    decarbDetailDataGet,
    decarbSaveDetailDataGet,
    decarbSaveProjectRatingDetailDataGet
};

export default decarbService;
