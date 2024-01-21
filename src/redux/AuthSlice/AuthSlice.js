import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";

export const postLoginAsync = createAsyncThunk('postLoginAsync', async (data) => {
    try {
        const res = await axios.post('users/login/', data, {headers: {'Authorization': ""}})
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const refreshTokenAsync = createAsyncThunk('refreshTokenAsync', async (data) => {
    try {
        const res = await axios.post('users/refresh/', data, {headers: {'Authorization': ""}})
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': "Məlumatları doğru daxil edin"};
    }
})

export const postRegisterAsync = createAsyncThunk('postRegisterAsync', async (data) => {
    try {
        const form = new FormData();
        form.append("first_name", data.first_name)
        form.append("last_name", data.last_name)
        form.append("email", data.email)
        form.append("birthdate", data.birthdate)
        form.append("address", data.address)
        form.append("marital_status", data.marital_status)
        form.append("employment_status", data.employment_status)
        form.append("housing_status", data.housing_status)
        form.append("phone_number", data.phone_number)
        form.append("credit_cart_number", data.credit_cart_number)
        form.append("debt_amount", data.debt_amount)
        form.append("monthly_income", data.monthly_income)
        form.append("about", data.about)
        form.append("business_activities", data.business_activities)
        if (data.profile_picture != null) {
            form.append("profile_picture", data.profile_picture)
        }
        form.append("references", data.references)
        form.append("password", data.password)

        const res = await axios.post('users/', form, {headers: {'Content-Type': 'multipart/form-data', 'Authorization': ""}})
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})

export const putUserProfileAsync = createAsyncThunk('putUserProfileAsync', async (data) => {
    try {
        const form = new FormData();
        if (data.first_name != null) {
            form.append("first_name", data.first_name)
        }
        if (data.last_name != null) {
            form.append("last_name", data.last_name)
        }
        if (data.email != null) {
            form.append("email", data.email)
        }
        if (data.birthdate != null) {
            form.append("birthdate", data.birthdate)
        }
        if (data.address != null) {
            form.append("address", data.address)
        }
        if (data.marital_status != null) {
            form.append("marital_status", data.marital_status)
        }
        if (data.employment_status != null) {
            form.append("employment_status", data.employment_status)
        }
        if (data.housing_status != null) {
            form.append("housing_status", data.housing_status)
        }
        if (data.phone_number != null) {
            form.append("phone_number", data.phone_number)
        }
        if (data.credit_cart_number != null) {
            form.append("credit_cart_number", data.credit_cart_number)
        }
        if (data.debt_amount != null) {
            form.append("debt_amount", data.debt_amount)
        }
        if (data.monthly_income != null) {
            form.append("monthly_income", data.monthly_income)
        }
        if (data.about != null) {
            form.append("about", data.about)
        }
        if (data.profile_picture != null) {
            form.append("profile_picture", data.profile_picture)
        }
        if (data.is_active != null) {
            form.append("is_active", data.is_active)
        }
        if (data.is_superuser != null) {
            form.append("is_superuser", data.is_superuser)
        }
        if (data.business_activities != null) {
            form.append("business_activities", data.business_activities)
        }
        const res = await axios.put(`users/${data.id}/`, form, {headers: {'Content-Type': 'multipart/form-data'}});
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})

export const getMeAsync = createAsyncThunk('getMeAsync', async () => {
    try {
        const res = await axios.get('users/me/')
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getAllUsersAsync = createAsyncThunk('getAllUsersAsync', async (values) => {
    if (values.fullname == undefined) {
        values.fullname = ""
    }

    try {
        const res = await axios.get(`users/?limit=10&offset=${values.offset}&fullname=${values.fullname}&birthdate=${values.birthdate}&marital_status=${values.marital_status}&employment_status=${values.employment_status}&housing_status=${values.housing_status}&phone_number=${values.phone_number}&monthly_income=${values.monthly_income}&monthly_income__gte=${values.monthly_income__gte}&monthly_income__lte=${values.monthly_income__lte}&is_active=${values.is_active}`, {headers: {'Authorization': ''}})
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getUserDetailAsync = createAsyncThunk('getUserDetailAsync', async (values) => {
    try {
        const res = await axios.get(`users/${values.id}/`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const deleteUserAsync = createAsyncThunk('deleteUserAsync', async (values) => {
    try {
        const res = await axios.delete(`users/${values.id}/`)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const resetPasswordAsync = createAsyncThunk('resetPasswordAsync', async (values) => {
    try {
        const res = await axios.post(`users/password_reset/`, values, {headers: {'Authorization': ''}})
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const resetPasswordValidateAsync = createAsyncThunk('resetPasswordValidateAsync', async (values) => {
    try {
        const res = await axios.post(`users/password_reset/validate_token/`, values, {headers: {'Authorization': ''}})
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const resetPasswordConfirmAsync = createAsyncThunk('resetPasswordConfirmAsync', async (values) => {
    try {
        const res = await axios.post(`users/password_reset/confirm/`, values, {headers: {'Authorization': ''}})
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const changePasswordAsync = createAsyncThunk('changePasswordAsync', async (values) => {
    try {
        const res = await axios.post(`users/change-password/`, values, {headers: {'Authorization': ''}})
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})


export const postDebtFundExpense = createAsyncThunk('postDebtFundExpense', async (data) => {
    try {
        const res = await axios.post('users/debt-fund-expense/', data)
        return res.data;
    } catch (error) {
        throw {'message': error.response.data.detail};
    }
})

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        me: null,
        users: [],
        user: null,
        access: "",
        refresh: "",
        isLoggedIn: false,
        isLoading: false,
        error: null,
        successMsg: null,
        totalPage: 0,
        pageLimit: 10
    },
    reducers: {
        resetAuthSlice: (state) => {
            return {...state, isLoading: false, error: null, successMsg: null};
        }
    },
    extraReducers: (builder) => {
        // Login Reducers
        builder.addCase(postLoginAsync.pending, (state, action) => {
            state.isLoading = true;
            state.isLoggedIn = false;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(postLoginAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            localStorage.setItem("access", action.payload.access)
            localStorage.setItem("refresh", action.payload.refresh)
            state.me = action.payload.user_details;
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isLoggedIn = true;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(postLoginAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            state.isLoading = false;
        })
        // Refresh Reducers
        builder.addCase(refreshTokenAsync.pending, (state, action) => {
            state.isLoading = true;
            state.isLoggedIn = false;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(refreshTokenAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            localStorage.setItem("access", action.payload.access)
            localStorage.setItem("refresh", action.payload.refresh)

            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isLoggedIn = true;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(refreshTokenAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            state.isLoading = false;
        })
        // Register Reducers
        builder.addCase(postRegisterAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postRegisterAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
        })
        builder.addCase(postRegisterAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            state.isLoading = false;
        })
        // User Update Reducers
        builder.addCase(putUserProfileAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(putUserProfileAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
        })
        builder.addCase(putUserProfileAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            state.isLoading = false;
        })
        // Me Reducers
        builder.addCase(getMeAsync.pending, (state, action) => {
            state.isLoading = true;
            state.isLoggedIn = false;
            state.error = null;
            state.successMsg = null;
        })
        builder.addCase(getMeAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.me = action.payload;
        })
        builder.addCase(getMeAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            state.isLoading = false;
            state.successMsg = null;
        })
        // All Users Reducers
        builder.addCase(getAllUsersAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload.results;
            state.totalPage = action.payload.count;
        })
        builder.addCase(getAllUsersAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
        // User Detail Reducers
        builder.addCase(getUserDetailAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getUserDetailAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        })
        builder.addCase(getUserDetailAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
        // User Delete Reducers
        builder.addCase(deleteUserAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = "Əməliyyat yerinə yetirildi";
        })
        builder.addCase(deleteUserAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })

        // Reset Password Reducers
        builder.addCase(resetPasswordAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(resetPasswordAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = "Əməliyyat yerinə yetirildi, zəhmət olmasa emailinizi yoxlayın";
        })
        builder.addCase(resetPasswordAsync.rejected, (state, action) => {
            state.error = "Xəta!!! Emaili doğru yazdığınızdan əmin olun";
            state.isLoading = false;
        })

        // Validate Token Reducers
        builder.addCase(resetPasswordValidateAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(resetPasswordValidateAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = "Əməliyyat yerinə yetirildi";
        })
        builder.addCase(resetPasswordValidateAsync.rejected, (state, action) => {
            state.error = "Xəta!!! Emaili doğru yazdığınızdan əmin olun";
            state.isLoading = false;
        })

        // Reset Password Confirm Reducers
        builder.addCase(resetPasswordConfirmAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(resetPasswordConfirmAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = "Şifrəniz yeniləndi";
        })
        builder.addCase(resetPasswordConfirmAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })

        // Change Password Confirm Reducers
        builder.addCase(changePasswordAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(changePasswordAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = "Şifrə yeniləndi";
        })
        builder.addCase(changePasswordAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })


        // Debt Fund expense Reducers
        builder.addCase(postDebtFundExpense.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postDebtFundExpense.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
        })
        builder.addCase(postDebtFundExpense.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
})

export const {resetAuthSlice} = AuthSlice.actions;
export default AuthSlice.reducer;