import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import regionService from "./regionService";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    regionTableDetails: "",
    regionGraphDetails:"",
    regionGraphDetailsLoading: true
}

export const regionTableData = createAsyncThunk("get/region/table-Data", async (userData, thunkApi) => {
    try {
        let tokenDetails1=JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails={
            headers:{Authorization:`Bearer ${tokenDetails1}`}
        }
        return await regionService.regionTableDataGet(userData,tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const regionGraphData = createAsyncThunk("get/region/Graph", async (userData, thunkApi) => {
    try {
        let tokenDetails1=JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails={headers:{Authorization:`Bearer ${tokenDetails1}`}}
        return await regionService.regionGraphPost(userData,tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const regionDetailsReducer = createSlice({
    name: "region-Page",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.regionTableDetails = ""
            state.regionGraphDetails=""
            state.regionGraphDetailsLoading = true
        },
    },
    extraReducers: (builder) => {
        builder.addCase(regionTableData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(regionTableData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.regionTableDetails = action.payload;
            })
            .addCase(regionTableData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(regionGraphData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.regionGraphDetailsLoading = true

            })
            .addCase(regionGraphData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.regionGraphDetails = action.payload;
                state.regionGraphDetailsLoading = false
            })
            .addCase(regionGraphData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.regionGraphDetailsLoading = false

            })
    }
})


export const { reset } = regionDetailsReducer.actions;
export default regionDetailsReducer.reducer;