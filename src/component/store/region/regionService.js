import axios from "axios";
import { baseURL } from "../auth/authService";

const regionTableDataGet = async (userData, userToken) => {

    try {
        const response = await axios.post(
            baseURL + "get-region-table-data", userData, userToken
        );

        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)

    }
}
const regionGraphPost = async (userData, userToken) => {

    try {
        const response = await axios.post(
            baseURL + "get-region-emission-data", userData, userToken
        );

        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}

const regionQuartelyGet = async (userData, userToken) => {

    try {
        const response = await axios.post(
            baseURL + "get-region-intensity-quarterly", userData, userToken
        );

        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}

const regionFacilityEmissionApi = async (userData, userToken) => {

    try {
        const response = await axios.post(
            baseURL + "get-facilities-emission-data", userData, userToken
        );

        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}

const regionService = {
    regionTableDataGet,
    regionGraphPost,
    regionQuartelyGet,
    regionFacilityEmissionApi
}



export default regionService;