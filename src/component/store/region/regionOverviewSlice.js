import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chartService from "../auth/graph/chartService";
import regionService from "./regionService";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    regionEmissionIntensityDetails: "",
    regionEmissionIntensityDetailsIsLoading: true,
    totalEmissionOverallDetails:"",
    regionFacilityEmissionDto: null,
    regionFacilityEmissionIsLoading: true
}

export const regionEmissionIntensityOverall = createAsyncThunk("get/region-overall/emission-intensity", async (userData, thunkApi) => {
    try {
        let tokenDetails1=JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails={
            headers:{Authorization:`Bearer ${tokenDetails1}`}
        }
        return await chartService.postRegionIntensity(userData,tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const totalEmissionOverall = createAsyncThunk("get/region-overall/totalEmission", async (userData, thunkApi) => {
    try {
        let tokenDetails1=JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails={headers:{Authorization:`Bearer ${tokenDetails1}`}}
        return await regionService.regionQuartelyGet(userData,tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const regionFacilityEmissions = createAsyncThunk("get/region-facility/emissions", async (userData, thunkApi) => {
    try {
        let tokenDetails1=JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails={headers:{Authorization:`Bearer ${tokenDetails1}`}}
        return await regionService.regionFacilityEmissionApi(userData,tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})


export const regionOverviewReducer = createSlice({
    name: "region-Page",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.regionEmissionIntensityDetails = ""
            state.regionEmissionIntensityDetailsIsLoading = true
            state.totalEmissionOverallDetails=""
            state.regionFacilityEmissionDto= null
            state.regionFacilityEmissionIsLoading = true
        },
    },
    extraReducers: (builder) => {
        builder.addCase(totalEmissionOverall.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(totalEmissionOverall.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.totalEmissionOverallDetails = action.payload;
            })
            .addCase(totalEmissionOverall.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(regionEmissionIntensityOverall.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.regionEmissionIntensityDetails = null
                state.regionEmissionIntensityDetailsIsLoading = true
            })
            .addCase(regionEmissionIntensityOverall.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.regionEmissionIntensityDetails = action.payload;
                state.regionEmissionIntensityDetailsIsLoading = false
            })
            .addCase(regionEmissionIntensityOverall.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.regionEmissionIntensityDetailsIsLoading = false
            })

            .addCase(regionFacilityEmissions.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.regionFacilityEmissionDto = null
                state.regionFacilityEmissionIsLoading = true
            })
            .addCase(regionFacilityEmissions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.regionFacilityEmissionDto = action.payload;
                state.regionFacilityEmissionIsLoading = false
            })
            .addCase(regionFacilityEmissions.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.regionFacilityEmissionIsLoading = false
            })

            
    }
})


export const { reset } = regionOverviewReducer.actions;
export default regionOverviewReducer.reducer;