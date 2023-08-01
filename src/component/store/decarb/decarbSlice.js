import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import decarbService from "./decarbService";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    decarbLaneList: null,
    decarbLaneListLoading: true,
    
    decarbLaneDetail: null,
    decarbLaneDetailLoading: true,
    saveProject: null,
    saveProjectRating: null
};

export const decarbLineData = createAsyncThunk(
    "get/decarb/line-Data",
    async (data, thunkApi) => {
        try {
            let tokenDetails = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("loginDetails")
                    )?.token}`
                },
            };
            return await decarbService.decarbDataGet(data, tokenDetails);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.string();
            return thunkApi.rejectWithValue(message);
        }
    }
);

export const decarbLineDetailData = createAsyncThunk(
    "get/decarb/line-detail-Data",
    async (data, thunkApi) => {
        try {
            let tokenDetails1 = JSON.parse(
                localStorage.getItem("loginDetails")
            )?.token;

            let tokenDetails = {
                headers: { Authorization: `Bearer ${tokenDetails1}` },
            };
            return await decarbService.decarbDetailDataGet(data, tokenDetails);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.string();
            return thunkApi.rejectWithValue(message);
        }
    }
);

export const saveProjectDetailData = createAsyncThunk(
    "save/decarb/line-detail-Data",
    async (prodjectDetail, thunkApi) => {
        try {
            let tokenDetails1 = JSON.parse(
                localStorage.getItem("loginDetails")
            )?.token;

            let tokenDetails = {
                headers: { Authorization: `Bearer ${tokenDetails1}` },
            };
            return await decarbService.decarbSaveDetailDataGet(prodjectDetail, tokenDetails);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.string();
            return thunkApi.rejectWithValue(message);
        }
    }
);

export const saveProjectRatingData = createAsyncThunk(
    "save/decarb/save-project-rating",
    async (prodjectRating, thunkApi) => {
        try {
            let tokenDetails1 = JSON.parse(
                localStorage.getItem("loginDetails")
            )?.token;

            let tokenDetails = {
                headers: { Authorization: `Bearer ${tokenDetails1}` },
            };
            return await decarbService.decarbSaveProjectRatingDetailDataGet(prodjectRating, tokenDetails);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.string();
            return thunkApi.rejectWithValue(message);
        }
    }
);

export const decarbDetailsReducer = createSlice({
    name: "decarb-Page",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.decarbLaneList = null;
            state.decarbLaneListLoading = true
            state.decarbLaneDetail = null;
            state.decarbLaneDetailLoading = true;
            state.saveProject = null;
            state.saveProjectRating = null;
        },
        clearData: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.saveProject = null;
            state.saveProjectRating = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(decarbLineData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.decarbLaneListLoading = true
            })
            .addCase(decarbLineData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.decarbLaneListLoading = false
                state.decarbLaneList = action.payload;
            })
            .addCase(decarbLineData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.decarbLaneListLoading = false
                state.decarbLaneList = {
                    code: 404
                }
            })
            .addCase(decarbLineDetailData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.decarbLaneDetailLoading = true
            })
            .addCase(decarbLineDetailData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.decarbLaneDetail = action.payload;
                state.decarbLaneDetailLoading = false
            })
            .addCase(decarbLineDetailData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.decarbLaneDetailLoading = false
            })
            .addCase(saveProjectDetailData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.saveProject = null
            })
            .addCase(saveProjectDetailData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.saveProject = action.payload;
            })
            .addCase(saveProjectDetailData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })

            .addCase(saveProjectRatingData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.saveProjectRating = null
            })
            .addCase(saveProjectRatingData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.saveProjectRating = action.payload;
            })
            .addCase(saveProjectRatingData.rejected, (state, _) => {
                state.isLoading = true;
                state.saveProjectRating = null;
                state.isSuccess = false;
            })

    },
});

export const { reset, clearData } = decarbDetailsReducer.actions;
export default decarbDetailsReducer.reducer;
