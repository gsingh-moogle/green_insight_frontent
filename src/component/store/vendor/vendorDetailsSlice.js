import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import vendorService from "./vendorService";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    isLoadingVendorTableDetails: true,
    message: "",
    vendorTableDetails: null,
    vendorGraphDetails: "",
    carrierOverviewDetail: null,
    laneBreakdownDetail: null,
    laneBreakdownDetailLoading: true,
    laneCarrierListName: null,
    laneCarrierListNameLoading: true,
    getLaneCarrierCompaireDto: null,
    getLaneCarrierCompaireDtoLoading: true,
    laneCarrierTableDtoLoading: false,
    laneCarrierTableDto: null
}

export const vendorTableData = createAsyncThunk("get/vendor/table-Data", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = { headers: { Authorization: `Bearer ${tokenDetails1}` } }
        return await vendorService.vendorTableDataGet(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const vendorGraphData = createAsyncThunk("get/vendor/Graph", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = { headers: { Authorization: `Bearer ${tokenDetails1}` } }
        return await vendorService.vendorGraphPost(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const getCarrierOverviewData = createAsyncThunk("get/vendor/Graph/Overview", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = { headers: { Authorization: `Bearer ${tokenDetails1}` } }
        return await vendorService.getCarrierOverview(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const getLaneBreakdown = createAsyncThunk("get/vendor/Graph/detail", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = { headers: { Authorization: `Bearer ${tokenDetails1}` } , cancelToken: userData.source.token }
        return await vendorService.getLaneBreakdown({id:userData.id}, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})


export const getLaneCarrierList = createAsyncThunk("get/carrier/name/detail", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = { headers: { Authorization: `Bearer ${tokenDetails1}` } }
        return await vendorService.getLaneCarrierList(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const getLaneCarrierCompaire = createAsyncThunk("get/carrier/compaire/detail", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = { headers: { Authorization: `Bearer ${tokenDetails1}` } }
        return await vendorService.getLaneCarrierCompaire(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})


export const resertStore = createAsyncThunk("get/carrier/resertStore", async (userData, thunkApi) => {
    try {
        return true;
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const laneCarrierTableData = createAsyncThunk("get/lane/carrier/table-Data", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = { headers: { Authorization: `Bearer ${tokenDetails1}` } }
        return await vendorService.laneCarrierTableDataApi(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})




export const facilityDetailsReducer = createSlice({
    name: "vendor-Page",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isLoadingVendorTableDetails = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.vendorTableDetails = null;
            state.vendorGraphDetails = "";
            state.carrierOverviewDetail = null;
            state.laneBreakdownDetail = null
            state.laneBreakdownDetailLoading = true
            state.laneCarrierListName = null
            state.laneCarrierListNameLoading = true
            state.getLaneCarrierCompaireDto = null
            state.getLaneCarrierCompaireDtoLoading = true
            state.laneCarrierTableDto = null
            state.laneCarrierTableDtoLoading = false

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(vendorTableData.pending, (state) => {
                state.isLoadingVendorTableDetails = true;
                state.isSuccess = false;
                state.vendorTableDetails = null
            })
            .addCase(vendorTableData.fulfilled, (state, action) => {
                state.isLoadingVendorTableDetails = false;
                state.isSuccess = true;
                state.vendorTableDetails = action.payload;
            })
            .addCase(vendorTableData.rejected, (state, action) => {
                state.isLoadingVendorTableDetails = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(vendorGraphData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(vendorGraphData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vendorGraphDetails = action.payload;
            })
            .addCase(vendorGraphData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(getCarrierOverviewData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(getCarrierOverviewData.fulfilled, (state, action) => {
                state.isLoading = true;
                state.carrierOverviewDetail = action.payload;
                state.isSuccess = false;
            })
            .addCase(getCarrierOverviewData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(getLaneBreakdown.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.laneBreakdownDetail = null
                state.laneBreakdownDetailLoading = true
            })
            .addCase(getLaneBreakdown.fulfilled, (state, action) => {
                state.isLoading = true;
                state.laneBreakdownDetail = action.payload;
                state.isSuccess = false;
                state.laneBreakdownDetailLoading = false
            })
            .addCase(getLaneBreakdown.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.laneBreakdownDetailLoading = false

            })

            .addCase(getLaneCarrierList.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.laneCarrierListName = null
                state.getLaneCarrierCompaireDto = null
                state.laneCarrierListNameLoading = true
            })
            .addCase(getLaneCarrierList.fulfilled, (state, action) => {
                state.isLoading = true;
                state.laneCarrierListName = action.payload;
                state.isSuccess = false;
                state.laneCarrierListNameLoading = false
            })
            .addCase(getLaneCarrierList.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.laneCarrierListNameLoading = false

            })

            .addCase(getLaneCarrierCompaire.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.getLaneCarrierCompaireDto = null
                state.getLaneCarrierCompaireDtoLoading = true
            })
            .addCase(getLaneCarrierCompaire.fulfilled, (state, action) => {
                state.isLoading = true;
                state.getLaneCarrierCompaireDto = action.payload;
                state.isSuccess = false;
                state.getLaneCarrierCompaireDtoLoading = false
            })
            .addCase(getLaneCarrierCompaire.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.getLaneCarrierCompaireDtoLoading = false

            })
            .addCase(resertStore.fulfilled, (state, action) => {
                state.getLaneCarrierCompaireDto = null;
                state.vendorTableDetails = null
            })
            .addCase(laneCarrierTableData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.laneCarrierTableDtoLoading = true
                state.getLaneCarrierCompaireDtoLoading = true
            })
            .addCase(laneCarrierTableData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.laneCarrierTableDto = action.payload;
                state.laneCarrierTableDtoLoading = false

            })
            .addCase(laneCarrierTableData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.laneCarrierTableDtoLoading = false

            })


    }
})


export const { reset } = facilityDetailsReducer.actions;
export default facilityDetailsReducer.reducer;