import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isRegion:false,
    isLane:false,
    isFacility:false,
    isCarrier:false
};

export const changeRegion = createAsyncThunk(
    "get/dash/region",
     (data) => {
        return data
    }
);

export const changeLane = createAsyncThunk(
    "get/dash/lane",
     (data) => {
        return data
    }
);export const changeFacility = createAsyncThunk(
    "get/dash/facility",
     (data) => {
        return data
    }
);export const changeCarrier = createAsyncThunk(
    "get/dash/carrier",
     (data) => {
        return data
    }
);

export const dashReducer = createSlice({
    name: "dashboard-Page",
    initialState,
    reducers: {
        
        clearData: (state) => {
            state.isRegion = false;
            state.isLane = false;
            state.isFacility = false;
            state.isCarrier = false;     
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(changeRegion.fulfilled, (state,action) => {
                state.isRegion = action.payload;
            })
            .addCase(changeLane.fulfilled, (state,action) => {
                state.isLane = action.payload;
            })  
            .addCase(changeFacility.fulfilled, (state,action) => {
                state.isFacility = action.payload;
            })  
            .addCase(changeCarrier.fulfilled, (state,action) => {
                state.isCarrier = action.payload;
            })
    },
});

export const { clearData } = dashReducer.actions;
export default dashReducer.reducer;
