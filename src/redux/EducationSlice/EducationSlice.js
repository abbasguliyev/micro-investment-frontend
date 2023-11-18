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

export const getEducationDetailsAsync = createAsyncThunk('getEducationDetailsAsync', async ({id}) => {
    try {
        const res = await axios.get(`users/educations/${id}`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const postEducationAsync = createAsyncThunk('postEducationAsync', async (data) => {
    try {
        const res = await axios.post(`users/educations/`, data)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const putEducationAsync = createAsyncThunk('putEducationAsync', async (data) => {
    try {
        const res = await axios.put(`users/educations/${data.id}/`, data)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const deleteEducationAsync = createAsyncThunk('deleteEducationAsync', async ({id}) => {
    try {
        const res = await axios.delete(`users/educations/${id}/`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': "Xəta baş verdi"};
    }
})

export const EducationSlice = createSlice({
    name: 'auth',
    initialState: {
        educations: [],
        education: {},
        isLoading: false,
        error: null,
        successMsg: null
    },
    reducers: {
        resetEducationSlice: (state) => {
            return { ...state, isLoading: false, error: null, successMsg: null };
        }
    },
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
        // Get education detail
        builder.addCase(getEducationDetailsAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getEducationDetailsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.education = action.payload;
        })
        builder.addCase(getEducationDetailsAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        }) 
        // Post Education
        builder.addCase(postEducationAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postEducationAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
        })
        builder.addCase(postEducationAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
        // Put Education
        builder.addCase(putEducationAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(putEducationAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
        })
        builder.addCase(putEducationAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
        // Delete Education
        builder.addCase(deleteEducationAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteEducationAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = "Əməliyyat yerinə yetirildi";
        })
        builder.addCase(deleteEducationAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
})

export const { resetEducationSlice } = EducationSlice.actions;
export default EducationSlice.reducer;