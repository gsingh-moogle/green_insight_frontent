import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import projectService from "./projectService";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    projectList: null,
    removeProject: null,
    searchProjectList: null,
    projectDetails: null
};

export const projectData = createAsyncThunk(
    "get/project/project-Data",
    async (data, thunkApi) => {
        try {
            let tokenDetails = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("loginDetails")
                    )?.token}`
                },
            };
            return await projectService.getProjectList(data, tokenDetails);
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

export const projectDelete = createAsyncThunk(
    "get/project/project-Delete",
    async (req, thunkApi) => {
        try {
            let tokenDetails = `Bearer ${JSON.parse(
                localStorage.getItem("loginDetails")
            )?.token}`

            const res = await projectService.removeProjectList({ project_id: req?.id }, tokenDetails);
            if (res) {
                thunkApi.dispatch(projectData(req?.data))
            }
            return true
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

export const searchProjectData = createAsyncThunk(
    "get/project/project-search",
    async (thunkApi) => {
        try {
            let tokenDetails = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("loginDetails")
                    )?.token}`
                },
            };
            return await projectService.searchProjectList(tokenDetails);
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

export const getProjectDetails = createAsyncThunk(
    "get/project/detail",
    async (data, thunkApi) => {
        try {
            let tokenDetails = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("loginDetails")
                    )?.token}`
                },
            };
            return await projectService.getProjectDetails(data, tokenDetails);
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

export const projectReducer = createSlice({
    name: "project-Page",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.projectList = null;
            state.removeProject = null;
            state.searchProjectList = null

        },
        clearData: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.projectList = null;
            state.removeProject = null;
            state.searchProjectList = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(projectData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(projectData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.projectList = action.payload;
            })
            .addCase(projectData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(searchProjectData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(searchProjectData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.searchProjectList = action.payload;
            })
            .addCase(searchProjectData.rejected, (state, _) => {
                state.isLoading = true;
                state.searchProjectList = null;
                state.isSuccess = false;
            })

            .addCase(projectDelete.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(projectDelete.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.removeProject = action.payload;
            })
            .addCase(projectDelete.rejected, (state, _) => {
                state.isLoading = true;
                state.removeProject = null;
                state.isSuccess = false;
            })
            .addCase(getProjectDetails.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.projectDetails = null;
            })
            .addCase(getProjectDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.projectDetails = action.payload;
            })
            .addCase(getProjectDetails.rejected, (state, _) => {
                state.isLoading = true;
                state.projectDetails = null;
                state.isSuccess = false;
            })

    },
});

export const { reset, clearData } = projectReducer.actions;
export default projectReducer.reducer;
