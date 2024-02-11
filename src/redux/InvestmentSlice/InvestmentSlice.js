import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getAllInvestmentsAsync = createAsyncThunk('getAllInvestmentsAsync', async (values) => {
    try {
        const res = await axios.get(`investments/?limit=10&offset=${values.offset}&entrepreneur__project_name__icontains=${values.entrepreneur__project_name ? values.entrepreneur__project_name : ""}&entrepreneur__is_finished=${values.entrepreneur__is_finished ? values.entrepreneur__is_finished : ""}&fullname=${values.fullname ? values.fullname : ""}&investor=${values.investor ? values.investor : ""}&entrepreneur=${values.entrepreneur ? values.entrepreneur : ""}&amount_must_send__gt=${values.amount_must_send__gt ? values.amount_must_send__gt : ""}&is_amount_sended=${values.is_amount_sended ? values.is_amount_sended : ""}&is_amount_sended_submitted=${values.is_amount_sended_submitted ? values.is_amount_sended_submitted : ""}&is_from_debt_fund=${values.is_from_debt_fund ? values.is_from_debt_fund : ""}`)
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})

export const getAllInvestmentsAdminAsync = createAsyncThunk('getAllInvestmentsAdminAsync', async (values) => {
    try {
        const res = await axios.get(`investments/admin-investments/?entrepreneur__project_name__icontains=${values.entrepreneur__project_name ? values.entrepreneur__project_name : ""}&fullname=${values.fullname ? values.fullname : ""}&investor=${values.investor ? values.investor : ""}&entrepreneur=${values.entrepreneur ? values.entrepreneur : ""}&amount_must_send__gt=${values.amount_must_send__gt ? values.amount_must_send__gt : ""}&is_amount_sended=${values.is_amount_sended ? values.is_amount_sended : ""}&is_amount_sended_submitted=${values.is_amount_sended_submitted ? values.is_amount_sended_submitted : ""}&is_from_debt_fund=${values.is_from_debt_fund ? values.is_from_debt_fund : ""}`)
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

export const deleteInvestmentAsync = createAsyncThunk('deleteInvestmentAsync', async (values) => {
    try {
        const res = await axios.delete(`investments/${values.id}/`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getAllInvestmentReportsAsync = createAsyncThunk('getAllInvestmentReportsAsync', async (values) => {
    try {
        const res = await axios.get(`investments/report/?limit=10&offset=${values.offset}&investor=${values.investor}&investment=${values.investment}&entrepreneur=${values.entrepreneur}`)
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})

export const postInvestmentReportAsync = createAsyncThunk('postInvestmentReportAsync', async (data) => {
    try {
        const res = await axios.post('investments/report/', data)
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})

export const putInvestmentReportAsync = createAsyncThunk('putInvestmentReportAsync', async (data) => {
    try {
        const res = await axios.put(`investments/report/${data.id}/`, data)
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})




export const InvestmentSlice = createSlice({
    name: 'auth',
    initialState: {
        investments: [],
        investmentReports: [],
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
        // Admin Investments Reducers
        builder.addCase(getAllInvestmentsAdminAsync.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(getAllInvestmentsAdminAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.investments = action.payload;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(getAllInvestmentsAdminAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
            state.successMsg = null;
        })

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
        // Investment Delete Reducers
        builder.addCase(deleteInvestmentAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteInvestmentAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = "Əməliyyat yerinə yetirildi";
        })
        builder.addCase(deleteInvestmentAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
        // InvestmentReports Reducers
        builder.addCase(getAllInvestmentReportsAsync.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(getAllInvestmentReportsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.investmentReports = action.payload.results;
            state.totalPage = action.payload.count;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(getAllInvestmentReportsAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
            state.successMsg = null;
        })
        // InvestmentReports Create Reducers
        builder.addCase(postInvestmentReportAsync.pending, (state, action) => {
            state.isLoading = true;
            state.error =null;
            state.successMsg =null;
        })
        builder.addCase(postInvestmentReportAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
            state.error = null;
        })
        builder.addCase(postInvestmentReportAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
            state.successMsg = null;
        })
        // InvestmentReports Update Reducers
        builder.addCase(putInvestmentReportAsync.pending, (state, action) => {
            state.isLoading = true;
            state.error =null;
            state.successMsg =null;
        })
        builder.addCase(putInvestmentReportAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
            state.error = null;
        })
        builder.addCase(putInvestmentReportAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
            state.successMsg = null;
        })
    }
})

export const { resetInvestmentSlice } = InvestmentSlice.actions;
export default InvestmentSlice.reducer;

