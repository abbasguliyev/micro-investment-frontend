import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getExperiencesAsync = createAsyncThunk('getExperiencesAsync', async (values) => {
    try {
        const res = await axios.get(`users/experiences/?user=${values.me}`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const ExperienceSlice = createSlice({
    name: 'auth',
    initialState: {
        experiences: [],
        isLoading: false,
        error: null,
        successMsg: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getExperiencesAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getExperiencesAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.experiences = action.payload.results;
        })
        builder.addCase(getExperiencesAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
})

export default ExperienceSlice.reducer;