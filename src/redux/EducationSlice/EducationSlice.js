import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getEducationsAsync = createAsyncThunk('getEducationsAsync', async (values) => {
    try {
        const res = await axios.get(`users/educations/?user=${values.me}`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const EducationSlice = createSlice({
    name: 'auth',
    initialState: {
        educations: [],
        isLoading: false,
        error: null,
        successMsg: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEducationsAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getEducationsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.educations = action.payload.results;
        })
        builder.addCase(getEducationsAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
})

export default EducationSlice.reducer;