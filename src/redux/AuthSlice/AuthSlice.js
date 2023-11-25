import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const postLoginAsync = createAsyncThunk('postLoginAsync', async (data) => {
    try {
        const res = await axios.post('users/login/', data, { headers: { 'Authorization': "" }})
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const postRegisterAsync = createAsyncThunk('postRegisterAsync', async (data) => {
    try {
        const form = new FormData();
        form.append("first_name", data.first_name)
        form.append("last_name", data.last_name)
        form.append("email", data.email)
        form.append("birthdate", data.birthdate)
        form.append("address", data.address)
        form.append("marital_status", data.marital_status)
        form.append("employment_status", data.employment_status)
        form.append("housing_status", data.housing_status)
        form.append("phone_number", data.phone_number)
        form.append("credit_cart_number", data.credit_cart_number)
        form.append("debt_amount", data.debt_amount)
        form.append("monthly_income", data.monthly_income)
        form.append("about", data.about)
        form.append("business_activities", data.business_activities)
        if (data.profile_picture != null) {
            form.append("profile_picture", data.profile_picture)
        }
        form.append("references", data.references)
        form.append("password", data.password)
        
        const res = await axios.post('users/', form, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': "" }})
        return res.data;
    } catch (error) {
        console.log(error);
        throw {'message': error.response.data.detail};
    }
})

export const putUserProfileAsync = createAsyncThunk('putUserProfileAsync', async (data) => {
    try {
        const form = new FormData();
        form.append("first_name", data.first_name)
        form.append("last_name", data.last_name)
        form.append("email", data.email)
        form.append("birthdate", data.birthdate)
        form.append("address", data.address)
        form.append("marital_status", data.marital_status)
        form.append("employment_status", data.employment_status)
        form.append("housing_status", data.housing_status)
        form.append("phone_number", data.phone_number)
        form.append("credit_cart_number", data.credit_cart_number)
        form.append("debt_amount", data.debt_amount)
        form.append("monthly_income", data.monthly_income)
        form.append("about", data.about)
        if (data.profile_picture != null) {
            form.append("profile_picture", data.profile_picture)
        }
        form.append("business_activities", data.business_activities)
        console.log(form);
        const res = await axios.put(`users/${data.id}/`, form, { headers: { 'Content-Type': 'multipart/form-data' }});
        return res.data;
    } catch (error) {
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
        const res = await axios.get(`users/?limit=10&offset=${values.offset}&birthdate=${values.birthdate}&marital_status=${values.marital_status}&employment_status=${values.employment_status}&housing_status=${values.housing_status}&phone_number=${values.phone_number}&monthly_income=${values.monthly_income}&monthly_income__gte=${values.monthly_income__gte}&monthly_income__lte=${values.monthly_income__lte}`, { headers: { 'Authorization': '' }})
        return res.data;
    } catch (error) {
        console.log(error);
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
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
        successMsg: null,
        totalPage: 0,   
        pageLimit: 10
    },
    reducers: {
        resetAuthSlice: (state) => {
            return { ...state, isLoading: false, error: null, successMsg: null };
        }
    },
    extraReducers: (builder) => {
        // Login Reducers
        builder.addCase(postLoginAsync.pending, (state, action) => {
            state.isLoading = true;
            state.isLoggedIn = false;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(postLoginAsync.fulfilled, (state, action) => {
            console.log(action);
            state.isLoading = false;
            localStorage.setItem("access", action.payload.access)
            state.me = action.payload.user_details;
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isLoggedIn = true;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(postLoginAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            state.isLoading = false;

            state.error = null;
            state.successMsg = null;
        })
        // Register Reducers
        builder.addCase(postRegisterAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postRegisterAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
        })
        builder.addCase(postRegisterAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            state.isLoading = false;
        })
        // User Update Reducers
        builder.addCase(putUserProfileAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(putUserProfileAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
        })
        builder.addCase(putUserProfileAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            state.isLoading = false;
        })
        // Me Reducers
        builder.addCase(getMeAsync.pending, (state, action) => {
            state.isLoading = true;
            state.isLoggedIn = false;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(getMeAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.me = action.payload;
        })
        builder.addCase(getMeAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            state.isLoading = false;
            state.successMsg = null;
        })
        // All Users Reducers
        builder.addCase(getAllUsersAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload.results;
            state.totalPage = action.payload.count;
        })
        builder.addCase(getAllUsersAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
})

export const { resetAuthSlice } = AuthSlice.actions;
export default AuthSlice.reducer;