import axios from "axios";
import { baseURL } from "../auth/authService";

const getProjectList = async (data, userToken) => {
    try {
        const response = await axios.post(
            baseURL + "get-project-list", data,
            userToken
        );

        return response?.data;
    } catch (error) {
        console.err(error);
        throw error;
    }
};

const removeProjectList = async (data, userToken) => {
    try {
        const response = await axios.delete(
            baseURL + "delete-project", {
            headers: {
                Authorization: userToken
            },
            data
        }
        );

        return response?.data;
    } catch (error) {
        console.err(error);
        throw error;
    }
};

const searchProjectList = async (userToken) => {
    try {
        const response = await axios.get(
            baseURL + "get-project-search-list",
            userToken
        );

        return response?.data;
    } catch (error) {
        console.err(error);
        throw error;
    }
};

const getProjectDetails = async (data,userToken) => {
    try {       
        const response = await axios.get(
            baseURL + `get-project-detail/${data.id}`,
            userToken
        );
        return response?.data;
    } catch (error) {   
        console.err(error);     
        throw error;
    }
};


const projectService = {
    getProjectList,
    removeProjectList,
    searchProjectList,
    getProjectDetails
};

export default projectService;
