import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chartService from "./chartService";
import { toast } from 'react-toastify';

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    graphRegionChart: "",
    regions: "",
    emissionIntensityData: "",
    emissionIntensityDetails: "",
    regionEmission: "",
    regionLevelGlideData: "",
    isLoadingRegionLevelGlidePath: true,
    projectCountData: null,
    isLoadingGraphRegionEmission: false,
    userProfile: null
}

export const graphRegionEmission = createAsyncThunk("get/region-emission-graph", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }

        return await chartService.getGraphRegionEmission(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const regionShow = createAsyncThunk("get/region", async (_, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token
        let tokenDetails = { headers: { Authorization: `Bearer ${tokenDetails1}` } }
        return await chartService.getRegions(tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const companyData = createAsyncThunk("post/companyData", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }

        return await chartService.postCompanyData(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const graphIntensityData = createAsyncThunk("post/graphIntensityData", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await chartService.postEmissionIntenisty(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const graphEmissionIntensity = createAsyncThunk("post/emissionIntensity", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }

        return await chartService.postRegionIntensity(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})


export const emissionRegionDetails = createAsyncThunk("post/emissionRegion/Details", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }

        return await chartService.getRegionEmission(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const getProjectCount = createAsyncThunk("get/project/count", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }

        return await chartService.getProjectCountApi(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const regionLevelGlidePath = createAsyncThunk("post/glideRegionPath/Details", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }

        return await chartService.postRegionLevelGlidePath(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const userDetailsApi = createAsyncThunk("get/userDetailsApi/Details", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }

        return await chartService.userDetailsApi(userData, tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const changePasswordApi = createAsyncThunk("update/changePasswordApi", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }

        const res = await chartService.changePasswordApi(userData, tokenDetails);
        toast.success("Password updated successfully")
        return res
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        toast.error(message)
        return thunkApi.rejectWithValue(message)
    }
})
export const updateProfileApi = createAsyncThunk("update/updateProfileApi", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token
        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        await chartService.updateProfileApi(userData, tokenDetails);
        toast.success("Profile updated successfully")

        thunkApi.dispatch(userDetailsApi())
        return true
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        toast.error(message)

        return thunkApi.rejectWithValue(message)
    }
})

export const uploadProfilePic = createAsyncThunk("update/uploadProfilePic", async (userData, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token

        let tokenDetails = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${tokenDetails1}` }
        }

        await chartService.uploadProfilePicApi(userData, tokenDetails);
        toast.success("Profile image updated successfully")

        thunkApi.dispatch(userDetailsApi())
        return true
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        toast.error(message)
        return thunkApi.rejectWithValue(message)
    }
})

export const graphDetailsReducer = createSlice({
    name: "chart-details",
    initialState,
    reducers: {
        resetGraphDetail: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.graphRegionChart = ""
            state.regions = ""
            state.substainbilityData = ""
            state.emissionIntensityData = ""
            state.emissionIntensityDetails = ""
            state.regionEmission = ""
            state.regionEmissionIsloading = true

            state.regionLevelGlideData = ""
            state.isLoadingRegionLevelGlidePath = true
            state.regionLevelGlideData = "";
            state.projectCountData = null
            state.isLoadingGraphRegionEmission = true
            state.emissionIntensityDetailsIsLoading = true
            state.userProfile = null
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(graphRegionEmission.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isLoadingGraphRegionEmission = true
            })
            .addCase(graphRegionEmission.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.graphRegionChart = action.payload
                state.isLoadingGraphRegionEmission = false;
            })
            .addCase(graphRegionEmission.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.isLoadingGraphRegionEmission = false;

            })
            .addCase(getProjectCount.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.projectCountData = null
            })
            .addCase(getProjectCount.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.projectCountData = action.payload;
            })
            .addCase(getProjectCount.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })


            .addCase(regionShow.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(regionShow.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.regions = action.payload;
            })
            .addCase(regionShow.rejected, (state, _) => {
                state.isLoading = true;
                state.regions = null;
                state.isSuccess = false;
            })
            .addCase(companyData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(companyData.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.substainbilityData = action.payload;
            })
            .addCase(companyData.rejected, (state, _) => {
                state.isLoading = true;
                state.substainbilityData = null;
                state.isSuccess = false;
            })
            .addCase(graphIntensityData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(graphIntensityData.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.emissionIntensityData = action.payload;
            })
            .addCase(graphIntensityData.rejected, (state, _) => {
                state.isLoading = true;
                state.emissionIntensityData = null;
                state.isSuccess = false;
            })
            .addCase(graphEmissionIntensity.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.emissionIntensityDetailsIsLoading = true
            })
            .addCase(graphEmissionIntensity.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.emissionIntensityDetails = action.payload;
                state.emissionIntensityDetailsIsLoading = false
            })
            .addCase(graphEmissionIntensity.rejected, (state, _) => {
                state.isLoading = true;
                state.emissionIntensityDetails =null;
                state.isSuccess = false;
                state.emissionIntensityDetailsIsLoading = false
            })
            .addCase(emissionRegionDetails.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.regionEmissionIsloading = true
            })
            .addCase(emissionRegionDetails.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.regionEmission = action.payload;
                state.regionEmissionIsloading = false

            })
            .addCase(emissionRegionDetails.rejected, (state, _) => {
                state.isLoading = true;
                state.regionEmission = null;
                state.isSuccess = false;
                state.regionEmissionIsloading = false

            })
            .addCase(regionLevelGlidePath.pending, (state) => {
                state.isLoadingRegionLevelGlidePath = true;
                state.isSuccess = false;
                state.regionLevelGlideData = "";
            })
            .addCase(regionLevelGlidePath.fulfilled, (state, action) => {
                state.isLoadingRegionLevelGlidePath = false;
                state.isSuccess = true;
                state.regionLevelGlideData = action.payload;
            })
            .addCase(regionLevelGlidePath.rejected, (state, _) => {
                state.isLoadingRegionLevelGlidePath = false;
                state.regionLevelGlideData = null;
                state.isSuccess = false;
            })
            .addCase(userDetailsApi.pending, (state) => {
                state.isSuccess = false;
                state.userProfile = null;
            })
            .addCase(userDetailsApi.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.userProfile = action.payload;
            })
    }
})


export const { resetGraphDetail } = graphDetailsReducer.actions;
export default graphDetailsReducer.reducer;