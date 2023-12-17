import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getAllNotificationsAsync = createAsyncThunk('getAllNotificationsAsync', async (values) => {
    try {
        const res = await axios.get(`notifications/?limit=10&offset=${values.offset}}`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const NotificationSlice = createSlice({
    name: 'auth',
    initialState: {
        notifications: [],
        isLoading: false,
        error: null,
        successMsg: null,
        totalPage: 0,   
        pageLimit: 10
    },
    reducers: {
        resetNotificationSlice: (state) => {
            return { ...state, isLoading: false, error: null, successMsg: null };
        }
    },
    extraReducers: (builder) => {
        // All Notification Reducers
        builder.addCase(getAllNotificationsAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllNotificationsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notifications = action.payload.results;
            state.totalPage = action.payload.count;
        })
        builder.addCase(getAllNotificationsAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
})

export const { resetNotificationSlice } = NotificationSlice.actions;
export default NotificationSlice.reducer;