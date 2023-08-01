import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import facilityService from "./facilityService";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    facilityTableDetails: "",
    facilityGraphDetails: "",
    facilityGraphDetailLoading: true,
    facilityTableDetailLoading: false,
    facilityReductionGraphDto: null,
    facilityReductionGraphLoading: true,
    facilityOverviewDetailLoading: true,
    facilityOverviewDetailDto: null,
    facilityComparisonGraphDto: null,
    facilityComparisonGraphLoading: true,
    facilityGraphDetailsDto: null,
    facilityGraphDetailsLoading: true,
    facilityCarrierComparisonloading: true,
    facilityCarrierComparisonData: null,
    facilityInBoundLoading: true,
    facilityInBoundDto: null,
    // facilityOutBoundLoading: true,
    facilityOutBoundLoading : true,

    facilityOutBoundDto: null
}
export const facilityGraphData = createAsyncThunk("get/facility/Graph", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await facilityService.facilityGraphPost(userData, tokenDetails);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
});
export const facilityTableData = createAsyncThunk("get/facility/table-Data", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await facilityService.facilityTableDataGet(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const facilityReductionGraph = createAsyncThunk("get/facility/Reduction-Data", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await facilityService.facilityReductionGraphPost(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const facilityOverviewDetail = createAsyncThunk("get/facility/Overview-Data", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await facilityService.facilityOverviewDetailPost(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const facilityComparisonGraph = createAsyncThunk("get/facility/Comparison-Data", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await facilityService.facilityComparisonGraphGet(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})


export const facilityCarrierComparison = createAsyncThunk("get/facility/Carrier-Data", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await facilityService.facilityCarrierComparisonPost(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const facilityGraphDetailsGraph = createAsyncThunk("get/facility/facility-emmision-Data", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await facilityService.facilityGraphDetailsGraphPost(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})


export const facilityInBoundGraph = createAsyncThunk("get/facility/in/bound", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await facilityService.facilityInBoundPost(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const facilityOutBoundGraph = createAsyncThunk("get/facility/out/bound", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }  
        return await facilityService.facilityOutBoundPost(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})



export const facilityDetailsReducer = createSlice({
    name: "facility-Page",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.facilityTableDetails = "";
            state.facilityGraphDetails = "";
            state.facilityGraphDetailLoading = true;
            state.facilityTableDetailLoading = true
            state.facilityReductionGraphDto = null
            state.facilityReductionGraphLoading = true;
            state.facilityOverviewDetailLoading = true;
            state.facilityOverviewDetailDto = null;
            state.facilityComparisonGraphLoading = true;
            state.facilityComparisonGraphDto = null;

            state.facilityCarrierComparisonData = null
            state.facilityCarrierComparisonloading = true

            state.facilityGraphDetailsLoading = true
            state.facilityGraphDetailsDto = null

            state.facilityOutBoundDto = null
            state.facilityOutBoundLoading = true

            state.facilityInBoundLoading = true
            state.facilityInBoundDto = null


        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(facilityTableData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.facilityTableDetailLoading = true

            })
            .addCase(facilityTableData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.facilityTableDetails = action.payload;
                state.facilityTableDetailLoading = false
            })
            .addCase(facilityTableData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.facilityTableDetailLoading = false

            }).addCase(facilityGraphData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.facilityGraphDetailLoading = true
            })
            .addCase(facilityGraphData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.facilityGraphDetails = action.payload;
                state.facilityGraphDetailLoading = false
            })
            .addCase(facilityGraphData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.facilityGraphDetailLoading = false

            }).addCase(facilityReductionGraph.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.facilityReductionGraphDto = null;
                state.facilityReductionGraphLoading = true

            })
            .addCase(facilityReductionGraph.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.facilityReductionGraphDto = action.payload;
                state.facilityReductionGraphLoading = false
            })
            .addCase(facilityReductionGraph.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.facilityReductionGraphLoading = false

            })

            .addCase(facilityOverviewDetail.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.facilityOverviewDetailDto = null
                state.facilityOverviewDetailLoading = true

            })
            .addCase(facilityOverviewDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.facilityOverviewDetailDto = action.payload;
                state.facilityOverviewDetailLoading = false
            })
            .addCase(facilityOverviewDetail.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.facilityOverviewDetailLoading = false

            })

            .addCase(facilityComparisonGraph.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.facilityComparisonGraphLoading = true
                state.facilityComparisonGraphDto = null;

            })
            .addCase(facilityComparisonGraph.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.facilityComparisonGraphDto = action.payload;
                state.facilityComparisonGraphLoading = false
            })
            .addCase(facilityComparisonGraph.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.facilityComparisonGraphLoading = false

            })

            .addCase(facilityCarrierComparison.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.facilityCarrierComparisonloading = true
                state.facilityCarrierComparisonData = null;


            })
            .addCase(facilityCarrierComparison.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.facilityCarrierComparisonData = action.payload;
                state.facilityCarrierComparisonloading = false
            })
            .addCase(facilityCarrierComparison.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.facilityCarrierComparisonloading = false

            })

            .addCase(facilityGraphDetailsGraph.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.facilityGraphDetailsLoading = true
                state.facilityGraphDetailsDto = null;


            })
            .addCase(facilityGraphDetailsGraph.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.facilityGraphDetailsDto = action.payload;
                state.facilityGraphDetailsLoading = false
            })
            .addCase(facilityGraphDetailsGraph.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.facilityGraphDetailsLoading = false

            })

            


            .addCase(facilityInBoundGraph.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.facilityInBoundLoading = true
                state.facilityInBoundDto = null;


            })
            .addCase(facilityInBoundGraph.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.facilityInBoundDto = action.payload;
                state.facilityInBoundLoading = false
            })
            .addCase(facilityInBoundGraph.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.facilityInBoundLoading = false

            })

            .addCase(facilityOutBoundGraph.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.facilityOutBoundLoading = true
                state.facilityOutBoundDto = null;


            })
            .addCase(facilityOutBoundGraph.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.facilityOutBoundDto = action.payload;
                state.facilityOutBoundLoading = false
            })
            .addCase(facilityOutBoundGraph.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.facilityOutBoundLoading = false

            })

            



    }
})


export const { reset } = facilityDetailsReducer.actions;
export default facilityDetailsReducer.reducer;