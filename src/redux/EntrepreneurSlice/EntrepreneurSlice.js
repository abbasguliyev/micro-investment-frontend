import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getAllEntrepreneurAsync = createAsyncThunk('getAllEntrepreneurAsync', async (values) => {
    if (values.project_name == undefined) {
        values.project_name = ""
    }
    try {
        const res = await axios.get(`entrepreneurs/?limit=10&offset=${values.offset}&owner=${values.owner}&project_name__icontains=${values.project_name}&start_date__gte=${values.start_date}&end_date__gte=${values.end_date}&is_active=${values.is_active}&is_finished=${values.is_finished}`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getEntrepreneurDetailAsync = createAsyncThunk('getEntrepreneurDetailAsync', async (id) => {
    try {
        const res = await axios.get(`entrepreneurs/${id}`)
        return res.data
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const postEntrepreneurCreateAsync = createAsyncThunk('postEntrepreneurCreateAsync', async (data) => {
    try {
        const res = await axios.post('entrepreneurs/', data);
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})

export const putEntrepreneurAsync = createAsyncThunk('putEntrepreneurAsync', async (data) => {
    try {
        const res = await axios.put(`entrepreneurs/${data.id}/`, data);
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})

export const postEntrepreneurImageCreateAsync = createAsyncThunk('postEntrepreneurImageCreateAsync', async (data) => {
    try {
        const form = new FormData();
        form.append('entrepreneur', data.entrepreneur)
        form.append('image', data.image)
        const res = await axios.post('entrepreneurs/images/', form, { headers: { 'Content-Type': 'multipart/form-data' }});
        return res.data;
    } catch (error) {
        throw {'message': "Xəta baş verdi"};
    }
})

export const getAllEntrepreneurImageAsync = createAsyncThunk('getAllEntrepreneurImageAsync', async (values) => {
    try {
        const res = await axios.get(`entrepreneurs/images/?entrepreneur=${values.entrepreneur}`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const deleteEntrepreneurAsync = createAsyncThunk('deleteEntrepreneurAsync', async (values) => {
    try {
        const res = await axios.delete(`entrepreneurs/${values.id}/`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})


export const EntrepreneurSlice = createSlice({
    name: 'auth',
    initialState: {
        entrepreneur: {},
        entrepreneurs: [],
        entrepreneur_images: [],
        isLoading: false,
        error: null,
        successMsg: null,
        totalPage: 0,   
        pageLimit: 10
    },
    reducers: {
        resetEntrepreneurSlice: (state) => {
            return { ...state, isLoading: false, error: null, successMsg: null };
        }
    },
    extraReducers: (builder) => {
        // Entrepreneur Reducers
        builder.addCase(getAllEntrepreneurAsync.pending, (state, action) => {
            state.isLoading = true;
            state.successMsg = null;
            state.error = null;
        })
        builder.addCase(getAllEntrepreneurAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.entrepreneurs = action.payload.results;
            state.totalPage = action.payload.count;
            state.successMsg = null;
            state.error = null;
        })
        builder.addCase(getAllEntrepreneurAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
            state.successMsg = null;
        })
        // Entrepreneur Detail Reducers
        builder.addCase(getEntrepreneurDetailAsync.pending, (state, action) => {
            state.isLoading = true;
            state.successMsg = null;
            state.error = null;
        })
        builder.addCase(getEntrepreneurDetailAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.entrepreneur = action.payload;
            state.successMsg = null;
            state.error = null;
        })
        builder.addCase(getEntrepreneurDetailAsync.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false;
            state.successMsg = null;
        })
        // Entrepreneur Create Reducers
        builder.addCase(postEntrepreneurCreateAsync.pending, (state, action) => {
            state.isLoading = true;
            state.successMsg = null;
            state.error = null;
        })
        builder.addCase(postEntrepreneurCreateAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = "Sifariş əlavə edildi";
            state.error = null;
        })
        builder.addCase(postEntrepreneurCreateAsync.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false;
            state.successMsg = null;
        })
        // Entrepreneur Update Reducers
        builder.addCase(putEntrepreneurAsync.pending, (state, action) => {
            state.isLoading = true;
            state.successMsg = null;
            state.error = null;
        })
        builder.addCase(putEntrepreneurAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
            state.error = null;
        })
        builder.addCase(putEntrepreneurAsync.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false;
            state.successMsg = null;
        })
        // Entrepreneur Image Create Reducers
        builder.addCase(postEntrepreneurImageCreateAsync.pending, (state, action) => {
            state.isLoading = true;
            state.successMsg = null;
            state.error = null;
        })
        builder.addCase(postEntrepreneurImageCreateAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
            state.error = null;
        })
        builder.addCase(postEntrepreneurImageCreateAsync.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false;
            state.successMsg = null;
        })
        // Entrepreneur images Reducers
        builder.addCase(getAllEntrepreneurImageAsync.pending, (state, action) => {
            state.isLoading = true;
            state.successMsg = null;
            state.error = null;
        })
        builder.addCase(getAllEntrepreneurImageAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.entrepreneur_images = action.payload.results;
            state.totalPage = action.payload.count;
            state.successMsg = null;
            state.error = null;
        })
        builder.addCase(getAllEntrepreneurImageAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
            state.successMsg = null;
        })
        // Entrepreneur Delete Reducers
        builder.addCase(deleteEntrepreneurAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteEntrepreneurAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = "Əməliyyat yerinə yetirildi";
        })
        builder.addCase(deleteEntrepreneurAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
})

export const { resetEntrepreneurSlice } = EntrepreneurSlice.actions;
export default EntrepreneurSlice.reducer;