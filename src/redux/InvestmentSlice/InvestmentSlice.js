import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getAllInvestmentsAsync = createAsyncThunk('getAllInvestmentsAsync', async (values) => {
    try {
        const res = await axios.get(`investments/?limit=10&offset=${values.offset}&investor=${values.investor}&entrepreneur=${values.entrepreneur}`)
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})

export const postInvestmentAsync = createAsyncThunk('postInvestmentAsync', async (data) => {
    try {
        const res = await axios.post('investments/', data)
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})

export const putInvestmentAsync = createAsyncThunk('putInvestmentAsync', async (data) => {
    try {
        const res = await axios.put(`investments/${data.id}/`, data)
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})


export const InvestmentSlice = createSlice({
    name: 'auth',
    initialState: {
        investments: [],
        isLoading: false,
        error: null,
        successMsg: null,
        totalPage: 0,   
        pageLimit: 10
    },
    reducers: {
        resetInvestmentSlice: (state) => {
            return { ...state, isLoading: false, error: null, successMsg: null };
        }
    },
    extraReducers: (builder) => {
        // Investments Reducers
        builder.addCase(getAllInvestmentsAsync.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(getAllInvestmentsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.investments = action.payload.results;
            state.totalPage = action.payload.count;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(getAllInvestmentsAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
            state.successMsg = null;
        })
        // Investments Create Reducers
        builder.addCase(postInvestmentAsync.pending, (state, action) => {
            state.isLoading = true;
            state.error =null;
            state.successMsg =null;
        })
        builder.addCase(postInvestmentAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
            state.error = null;
        })
        builder.addCase(postInvestmentAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
            state.successMsg = null;
        })
        // Investments Update Reducers
        builder.addCase(putInvestmentAsync.pending, (state, action) => {
            state.isLoading = true;
            state.error =null;
            state.successMsg =null;
        })
        builder.addCase(putInvestmentAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
            state.error = null;
        })
        builder.addCase(putInvestmentAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
            state.successMsg = null;
        })
    }
})

export const { resetInvestmentSlice } = InvestmentSlice.actions;
export default InvestmentSlice.reducer;

