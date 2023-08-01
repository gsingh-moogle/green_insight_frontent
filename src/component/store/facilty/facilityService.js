import axios from "axios";
import { baseURL } from "../auth/authService";

const facilityTableDataGet = async (userData, userToken) => {

    try {
        const response = await axios.post(
            baseURL + "get-facilities-table-data", userData, userToken
        );

        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}
const facilityGraphPost = async (userData, userToken) => {
    try {
        const response = await axios.post(baseURL + "get-facilities-emission-data", userData, userToken)
        return response?.data;
    } catch (error) {
        console.err(error);
        throw error
    }
}

const facilityReductionGraphPost = async (userData, userToken) => {
    try {
        const response = await axios.post(baseURL + "get-facilities-reduction-graph", userData, userToken)
        return response?.data;
    } catch (error) {
        console.err(error);
        throw error
    }
}

const facilityOverviewDetailPost = async (userData, userToken) => {
    try {
        const response = await axios.post(baseURL + "get-facilities-overview-detail", userData, userToken)
        return response?.data;
    } catch (error) {
        console.err(error);
        throw error
    }
}

const facilityComparisonGraphGet = async (userData, userToken) => {
    try {
        const response = await axios.get(baseURL + `get-facilities-comparison/${userData?.facility_id}`, userToken)
        return response?.data;
    } catch (error) {
        console.err(error);
        throw error
    }
}

const facilityCarrierComparisonPost = async (userData, userToken) => {
    try {
        const response = await axios.post(baseURL + "get-facilities-carrier-graph", userData, userToken)
        return response?.data;
    } catch (error) {
        console.err(error);
        throw error
    }
}

const facilityGraphDetailsGraphPost = async (userData, userToken) => {
    try {
        const response = await axios.post(baseURL + "get-facilities-lane-graph", userData, userToken)
        return response?.data;
    } catch (error) {
        console.err(error);
        throw error
    }
}


const facilityOutBoundPost = async (userData, userToken) => {
    try {
        const response = await axios.post(baseURL + "get-facilities-outbound-lane-graph", userData, userToken)
        return response?.data;
    } catch (error) {
        console.err(error);
        throw error
    }
}

const facilityInBoundPost = async (userData, userToken) => {
    try {
        const response = await axios.post(baseURL + "get-facilities-inbound-lane-graph", userData, userToken)
        return response?.data;
    } catch (error) {
        console.err(error);
        throw error
    }
}


const facilityService = {
    facilityTableDataGet,
    facilityGraphPost,
    facilityReductionGraphPost,
    facilityOverviewDetailPost,
    facilityComparisonGraphGet,
    facilityCarrierComparisonPost,
    facilityGraphDetailsGraphPost,
    facilityOutBoundPost,
    facilityInBoundPost
}



export default facilityService;