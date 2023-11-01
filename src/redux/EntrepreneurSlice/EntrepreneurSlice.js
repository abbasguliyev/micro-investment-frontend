import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getAllEntrepreneurAsync = createAsyncThunk('getAllEntrepreneurAsync', async (values) => {
    try {
        const res = await axios.get(`entrepreneurs/?limit=10&offset=${values.offset}&start_date__gte=${values.start_date}&end_date__gte=${values.end_date}&is_active=true`)
        return res.data;
    } catch (error) {
        console.log(error);
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getEntrepreneurDetailAsync = createAsyncThunk('getEntrepreneurDetailAsync', async (id) => {
        try {
            const res = await axios.get(`entrepreneurs/${id}`)
            return res.data
        } catch (error) {
            console.log(error);
            // If the API call fails, the error will be thrown and caught here.
            throw {'message': error.response.data.detail};
        }
    })

export const EntrepreneurSlice = createSlice({
    name: 'auth',
    initialState: {
        entrepreneur: {},
        entrepreneurs: [],
        isLoading: false,
        error: null,
        successMsg: null,
        totalPage: 0,   
        pageLimit: 10
    },
    reducers: {},
    extraReducers: (builder) => {
        // Investments Reducers
        builder.addCase(getAllEntrepreneurAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllEntrepreneurAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.entrepreneurs = action.payload.results;
            state.totalPage = action.payload.count;
        })
        builder.addCase(getAllEntrepreneurAsync.rejected, (state, action) => {
            state.error = action.error.message;
        })
        builder.addCase(getEntrepreneurDetailAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getEntrepreneurDetailAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.entrepreneur = action.payload;
        })
        builder.addCase(getEntrepreneurDetailAsync.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

export default EntrepreneurSlice.reducer;