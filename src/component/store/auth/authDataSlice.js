import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { userDetailsApi } from "../auth/graph/graphDetailsSlice"

import authService from "./authService";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    loginDetails: "",
    OtpDetails: "",
    otpSuccess: false,
    otpError: false,
    sideBarStatus: true,
    headerName: null
}

export const loginPost = createAsyncThunk("post/login", async (userData, thunkApi) => {
    try {
        const res = await authService.authLoginPost(userData);
        if (res) {
            thunkApi.dispatch(getFiltersDate())
            thunkApi.dispatch(userDetailsApi())

        }
        return res
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        toast.error("Invalid Email or Password")
        return thunkApi.rejectWithValue(message)
    }
})
export const logoutPost = createAsyncThunk("post/logout", async (_, thunkApi) => {
    try {

        return await authService.authLogoutPost();
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const otpPost = createAsyncThunk("post/otp", async (useData, thunkApi) => {
    try {

        const res = await authService.authPostOtp(useData);
        if (res) {
            thunkApi.dispatch(getFiltersDate())
            thunkApi.dispatch(userDetailsApi())

        }
        return res
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const sideBarToggleStatus = createAsyncThunk("Toggle", async (status) => {
    return status
})

export const setHeaderName = createAsyncThunk("HeaderName", async (name) => {
    return name
})

export const getFiltersDate = createAsyncThunk("graph/filters/dates", async (_, thunkApi) => {
    try {
        let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token
        let tokenDetails = {
            headers: { Authorization: `Bearer ${tokenDetails1}` }
        }
        return await authService.getFiltersDate(tokenDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})



export const authDataReducer = createSlice({
    name: "auth-login",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.loginDetails = ""
            state.OtpDetails = ""
            state.otpError = false
            state.otpSuccess = false;
            state.sideBarStatus = true;
            state.emissionDates = null
            state.headerName = null

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPost.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(loginPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loginDetails = action.payload;
            })
            .addCase(loginPost.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(logoutPost.fulfilled, (state) => {
                state.loginDetails = null;
                reset()
            })
            .addCase(otpPost.pending, (state) => {
                state.isLoading = true;
                state.otpSuccess = false;
                state.otpError = null
            })
            .addCase(otpPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.otpSuccess = true;
                state.OtpDetails = action.payload;
            })
            .addCase(otpPost.rejected, (state, action) => {
                state.isLoading = true;
                state.otpError = action.payload;
                state.otpSuccess = false;
            })
            .addCase(sideBarToggleStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.sideBarStatus = action.payload;
            })
            .addCase(getFiltersDate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.emissionDates = action.payload;
            })
            .addCase(getFiltersDate.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.emissionDates = null
            })
            .addCase(setHeaderName.fulfilled, (state, action) => {
                state.isLoading = false;
                state.headerName = action.payload;
            })



    }
})


export const { reset } = authDataReducer.actions;
export default authDataReducer.reducer;