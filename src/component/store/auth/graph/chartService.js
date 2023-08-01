import axios from "axios";
import { baseURL } from "../authService";

export const headerDetails = () => {
    let tokenDetails = JSON.parse(localStorage.getItem("loginDetails"))?.token

    return {
        headers: { Authorization: `Bearer ${tokenDetails}` }
    }
}
const getGraphRegionEmission = async (userData, token) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-emission-monthly", userData, token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}
const getRegions = async (token) => {

    try {
        const response = await axios.get(
            baseURL + "get-regions", token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}
const postCompanyData = async (userData, token) => {
    try {
        const response = await axios.post(
            baseURL + "get-company-data", userData, token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}
const postEmissionIntenisty = async (userData, token) => {

    try {
        const response = await axios.post(
            baseURL + "get-region-intensity", userData, token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}
const postRegionIntensity = async (userData, token) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-intensity-yearly", userData, token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}

const getRegionEmission = async (userData, token) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-emission-reduction", userData, token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}

const postRegionLevelGlidePath = async (userData, token) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-reduction", userData, token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}

const getProjectCountApi = async (userData, token) => {
    try {
        const response = await axios.post(
            baseURL + "get-project-count", userData, token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}
const userDetailsApi = async (_, token) => {
    try {
        const response = await axios.get(
            baseURL + "user/profile", token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}
const changePasswordApi = async (data, token) => {
    try {
        const response = await axios.patch(
            baseURL + "user/profile/update/password", data, token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}
const updateProfileApi = async (data, token) => {
    try {
        const response = await axios.put(
            baseURL + "user/profile/update", data, token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}

const uploadProfilePicApi = async (data, token) => {
    try {
        const response = await axios.post(
            baseURL + "user/profile/image", data, token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}

const chartService = {
    getGraphRegionEmission,
    getRegions,
    postCompanyData,
    postEmissionIntenisty,
    postRegionIntensity,
    getRegionEmission,
    postRegionLevelGlidePath,
    getProjectCountApi,
    userDetailsApi,
    changePasswordApi,
    updateProfileApi,
    uploadProfilePicApi

}



export default chartService;