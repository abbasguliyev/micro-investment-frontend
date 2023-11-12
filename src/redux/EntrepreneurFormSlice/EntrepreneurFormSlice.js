import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getAllEntrepreneurFormAsync = createAsyncThunk('getAllEntrepreneurFormAsync', async (values) => {
    try {
        const res = await axios.get(`entrepreneurs/forms?title=${values.title}&is_active=${values.is_active}`)
        return res.data;
    } catch (error) {
        console.log(error);
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const EntrepreneurFormSlice = createSlice({
    name: 'auth',
    initialState: {
        entrepreneurForm: {},
        entrepreneurForms: [],
        isLoading: false,
        error: null,
        successMsg: null,
        totalPage: 0,   
        pageLimit: 10
    },
    reducers: {},
    extraReducers: (builder) => {
        // GET All Entrepreneur Form Reducers
        builder.addCase(getAllEntrepreneurFormAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllEntrepreneurFormAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.entrepreneurForms = action.payload.results;
            state.totalPage = action.payload.count;
        })
        builder.addCase(getAllEntrepreneurFormAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
})

export default EntrepreneurFormSlice.reducer;