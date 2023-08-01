import axios from "axios";
import { baseURL } from "../auth/authService";

const laneTableDataGet = async (userData, tokenDetails) => {
    try {
        const response = await axios.post(baseURL + "get-lane-table-data-hight-intensity", userData, tokenDetails);
        return response?.data;
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}
const laneGraphData = async (userData, tokenDetails) => {
    try {
        const response = await axios.post(baseURL + `get-lane-emission/pagination`, userData, tokenDetails);
        return response?.data;
    } catch (error) {
        console.err(error);
        throw (error)
    }

}

const regionCarrierComparison = async (userData, tokenDetails) => {
    try {
        const response = await axios.post(baseURL + `get-region-carrier-comparison-data`, userData, tokenDetails);
        return response?.data;
    } catch (error) {
        console.err(error);
        throw (error)
    }

}

const getRegionOverviewDetail = async (userData, tokenDetails) => {
    try {
        const response = await axios.post(baseURL + `get-region-overview-detail`, userData, tokenDetails);
        return response?.data;
    } catch (error) {
        console.err(error);
        throw (error)
    }

}

const getLaneReductionDetailGraph = async (userData, tokenDetails) => {
    try {
        const response = await axios.post(baseURL + `get-lane-reduction-graph`, userData, tokenDetails);
        return response?.data;
    } catch (error) {
        console.err(error);
        throw (error)
    }

}





const lowLaneTableData = async (userData, tokenDetails) => {
    try {
        const response = await axios.post(baseURL + "get-lane-table-data-low-intensity", userData, tokenDetails);
        return response?.data;
    } catch (error) {
        console.err(error);
        throw (error)
    }
}



const getLaneCarrierEmission = async (userData, token) => {
    try {
        const response = await axios.post(
            baseURL + "get-lane-carrier-graph", userData, token
        );
        return response?.data
    }
    catch (error) {

        console.err(error);

        console.err(error);

        throw (error)
    }
}

const getLaneOverDetailsEmissionApi = async (userData, token) => {
    try {
        const response = await axios.post(
            baseURL + "get-lane-overview-details", userData, token
        );
        return response?.data
    }
    catch (error) {

        console.err(error);

        console.err(error);

        throw (error)
    }
}

const laneService = {
    laneTableDataGet,
    laneGraphData,
    lowLaneTableData,
    regionCarrierComparison,
    getRegionOverviewDetail,
    getLaneCarrierEmission,
    getLaneReductionDetailGraph,
    getLaneOverDetailsEmissionApi
}

export default laneService;