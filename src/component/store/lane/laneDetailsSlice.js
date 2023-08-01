import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import laneService from "./laneService";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    laneTableDetails: "",
    laneGraphDetails: "",    
    lowLaneTableDetail: "",
    laneGraphDetailsLoading: true,
    regionCarrierComparisonData: "",    
    getRegionOverviewDetailData: "",
    regionCarrierComparisonLoading: true,
    laneCarrierEmission: null,
    laneCarrierEmissionIsloading: true,
    laneReductionDetailGraphLoading: true,
    laneReductionDetailGraphData: null,
    getLaneOverDetailsEmissionData: null,
    getLaneOverDetailsEmissionLoading: true

}
export const laneGraphData = createAsyncThunk('get/lane/graph', async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await laneService.laneGraphData(userData, tokenDetails)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
})

export const regionCarrierComparison = createAsyncThunk('get/region/carrier/comparison', async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await laneService.regionCarrierComparison(userData, tokenDetails)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
})


export const getRegionOverviewDetail = createAsyncThunk('get/region/carrier/comparison/detail', async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await laneService.getRegionOverviewDetail(userData, tokenDetails)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
})




export const laneTableData = createAsyncThunk("get/lane/table-Data", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await laneService.laneTableDataGet(userData, tokenDetails);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

//low intensity data filling in table
export const lowLaneTableData = createAsyncThunk("get/low/lane/table-Data", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await laneService.lowLaneTableData(userData, tokenDetails);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const laneCarrierEmissionReductionGlide = createAsyncThunk("post/emission/reduction/glide", async (userData, thunkApi) => {
    try {

        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token
        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }

        return await laneService.getLaneReductionDetailGraph(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const laneReductionDetailGraph = createAsyncThunk('get/region/carrier/Reduction/comparison', async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await laneService.getLaneCarrierEmission(userData, tokenDetails)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
})

export const getLaneOverDetailsEmission = createAsyncThunk('get/region/carrier/overview/detail', async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await laneService.getLaneOverDetailsEmissionApi(userData, tokenDetails)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
})



export const laneDetailsReducer = createSlice({
    name: "lane-Page",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.laneTableDetails = "";
            state.laneGraphDetails = "";
            state.lowLaneTableDetail = "";
            state.laneGraphDetailsLoading = true
            state.regionCarrierComparisonLoading = true
            state.regionCarrierComparisonData = "";
            state.getRegionOverviewDetailData = "";
            state.getRegionOverviewDetailLoading = true
            state.laneCarrierEmission = null;
            state.laneCarrierEmissionIsloading = true;
            state.laneReductionDetailGraphLoading = true;
            state.laneReductionDetailGraphData= null;
            state.getLaneOverDetailsEmissionData = null;
            state.getLaneOverDetailsEmissionLoading = true
        
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(laneTableData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(laneTableData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.laneTableDetails = action.payload;
            })
            .addCase(laneTableData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            }).addCase(laneGraphData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.laneGraphDetailsLoading = true
                state.laneGraphDetails = null
            })
            .addCase(laneGraphData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.laneGraphDetails = action.payload;
                state.laneGraphDetailsLoading = false
            })
            .addCase(laneGraphData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.laneGraphDetailsLoading = false

            }).addCase(lowLaneTableData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(lowLaneTableData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.lowLaneTableDetail = action.payload;
            })
            .addCase(lowLaneTableData.rejected, (state, _) => {
                state.isLoading = true;
                state.lowLaneTableDetail = null;
                state.isSuccess = false;
            })
            .addCase(regionCarrierComparison.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.regionCarrierComparisonLoading = true
                state.regionCarrierComparisonData = null
            })
            .addCase(regionCarrierComparison.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.regionCarrierComparisonData = action.payload;
                state.regionCarrierComparisonLoading = false
            })
            .addCase(regionCarrierComparison.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.regionCarrierComparisonLoading = false

            }).addCase(getRegionOverviewDetail.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.getRegionOverviewDetailLoading = true
                state.getRegionOverviewDetailData = null
            })
            .addCase(getRegionOverviewDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.getRegionOverviewDetailData = action.payload;
                state.getRegionOverviewDetailLoading = false
            })
            .addCase(getRegionOverviewDetail.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.getRegionOverviewDetailLoading = false

            }).addCase(laneCarrierEmissionReductionGlide.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.laneCarrierEmissionIsloading = true
            })
            .addCase(laneCarrierEmissionReductionGlide.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.laneCarrierEmission = action.payload;
                state.laneCarrierEmissionIsloading = false

            })
            .addCase(laneCarrierEmissionReductionGlide.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.laneCarrierEmissionIsloading = false

            })
            .addCase(laneReductionDetailGraph.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.laneReductionDetailGraphLoading = true
                state.laneReductionDetailGraphData = null
            })
            .addCase(laneReductionDetailGraph.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.laneReductionDetailGraphData = action.payload;
                state.laneReductionDetailGraphLoading = false
            })
            .addCase(laneReductionDetailGraph.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.laneReductionDetailGraphLoading = false

            })
            .addCase(getLaneOverDetailsEmission.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.getLaneOverDetailsEmissionLoading = true
                state.getLaneOverDetailsEmissionData = null
            })
            .addCase(getLaneOverDetailsEmission.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.getLaneOverDetailsEmissionData = action.payload;
                state.getLaneOverDetailsEmissionLoading = false
            })
            .addCase(getLaneOverDetailsEmission.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.getLaneOverDetailsEmissionLoading = false

            })

            




    }
})


export const { reset } = laneDetailsReducer.actions;
export default laneDetailsReducer.reducer;