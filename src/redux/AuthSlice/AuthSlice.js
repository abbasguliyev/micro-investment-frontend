import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const postLoginAsync = createAsyncThunk('postLoginAsync', async (data) => {
    try {
        const res = await axios.post('users/login/', data)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const postRegisterAsync = createAsyncThunk('postRegisterAsync', async (data) => {
    try {
        const res = await axios.post('users/', data)
        return res.data;
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getMeAsync = createAsyncThunk('getMeAsync', async () => {
    try {
        const res = await axios.get('users/me/')
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getAllUsersAsync = createAsyncThunk('getAllUsersAsync', async (values) => {
    try {
        const res = await axios.get(`users/?birthdate=${values.birthdate}&marital_status=${values.marital_status}&employment_status=${values.employment_status}&housing_status=${values.housing_status}&phone_number=${values.phone_number}&monthly_income=${values.monthly_income}&monthly_income__gte=${values.monthly_income__gte}&monthly_income__lte=${values.monthly_income__lte}`)
        return res.data;
    } catch (error) {
        console.log(error);
        // If the API call fails, the error will be thrown and caught here.
        // throw {'message': error.response.data.detail};
    }
})

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        me: null,
        users: [],
        access: "",
        refresh: "",
        isLoggedIn: false,
        isLoading: false,
        error: null,
        successMsg: null
    },
    reducers: {},
    extraReducers: (builder) => {
        // Login Reducers
        builder.addCase(postLoginAsync.pending, (state, action) => {
            state.isLoading = true;
            state.isLoggedIn = false;
        })
        builder.addCase(postLoginAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            localStorage.setItem("access", action.payload.access)
            state.me = action.payload.user_details;
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isLoggedIn = true;
        })
        builder.addCase(postLoginAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
        })
        // Register Reducers
        builder.addCase(postRegisterAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postRegisterAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload;
        })
        builder.addCase(postRegisterAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
        })
        // Me Reducers
        builder.addCase(getMeAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getMeAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.me = action.payload;
        })
        builder.addCase(getMeAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
        })
        // All Users Reducers
        builder.addCase(getAllUsersAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        })
        builder.addCase(getAllUsersAsync.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})

export default AuthSlice.reducer;