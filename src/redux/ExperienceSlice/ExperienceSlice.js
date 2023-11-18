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

export const getExperienceDetailsAsync = createAsyncThunk('getExperienceDetailsAsync', async ({id}) => {
    try {
        const res = await axios.get(`users/experiences/${id}`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const postExperiencesAsync = createAsyncThunk('postExperiencesAsync', async (data) => {
    try {
        const res = await axios.post(`users/experiences/`, data)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const putExperiencesAsync = createAsyncThunk('putExperiencesAsync', async (data) => {
    try {
        const res = await axios.put(`users/experiences/${data.id}/`, data)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const deleteExperienceAsync = createAsyncThunk('deleteExperienceAsync', async ({id}) => {
    try {
        const res = await axios.delete(`users/experiences/${id}/`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': "Xəta baş verdi"};
    }
})

export const ExperienceSlice = createSlice({
    name: 'auth',
    initialState: {
        experiences: [],
        experience: {},
        isLoading: false,
        error: null,
        successMsg: null
    },
    reducers: {
        resetExperienceSlice: (state) => {
            return { ...state, isLoading: false, error: null, successMsg: null };
        }
    },
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
        // Get detail experience
        builder.addCase(getExperienceDetailsAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getExperienceDetailsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.experience = action.payload;
        })
        builder.addCase(getExperienceDetailsAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
        // Post Experience
        builder.addCase(postExperiencesAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postExperiencesAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
        })
        builder.addCase(postExperiencesAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
        // Put Experience
        builder.addCase(putExperiencesAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(putExperiencesAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
        })
        builder.addCase(putExperiencesAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
        // Delete Experience
        builder.addCase(deleteExperienceAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteExperienceAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = "Əməliyyat yerinə yetirildi";;
        })
        builder.addCase(deleteExperienceAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
})

export const { resetExperienceSlice } = ExperienceSlice.actions;
export default ExperienceSlice.reducer;