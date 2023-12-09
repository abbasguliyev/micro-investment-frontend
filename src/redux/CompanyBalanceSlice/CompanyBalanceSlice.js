import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getCompanyBalanceAsync = createAsyncThunk('getCompanyBalanceAsync', async () => {
    try {
        const res = await axios.get(`users/company-balance/`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})


export const CompanyBalanceSlice = createSlice({
    name: 'auth',
    initialState: {
        companyBalances: [],
        isLoading: false,
        error: null,
        successMsg: null
    },
    reducers: {
        resetCompanyBalanceSlice: (state) => {
            return { ...state, isLoading: false, error: null, successMsg: null };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCompanyBalanceAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getCompanyBalanceAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.companyBalances = action.payload.results;
        })
        builder.addCase(getCompanyBalanceAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
})

export const { resetCompanyBalanceSlice } = CompanyBalanceSlice.actions;
export default CompanyBalanceSlice.reducer;