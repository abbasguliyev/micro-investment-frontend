import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { postLoginAsync, resetAuthSlice, resetPasswordAsync } from '../../redux/AuthSlice/AuthSlice';
import AuthInput from '../../components/InputComponents/AuthInput';
import style from './style.module.css'
import ResponseMessage from '../../components/ResponseMessage';
import { CgSpinner } from "react-icons/cg";

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: (values) => {
            dispatch(resetPasswordAsync(values))
        },
    })

    const errorMsg = useSelector((state) => state.auth.error);
    const successMsg = useSelector((state) => state.auth.successMsg)
    const isLoading = useSelector((state) => state.auth.isLoading)

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {errorMsg && (<ResponseMessage message={errorMsg} type="error" slice={resetAuthSlice()} />)}
            {successMsg && (<ResponseMessage message={successMsg} type="success" slice={resetAuthSlice()} />)}

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Email adresinizi daxil edin:
                </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <AuthInput label="Email address" id="email" name="email" value={formik.values.email} type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} touched={formik.touched.email} error={formik.errors.email} style={style} />
                    <div>
                        {
                            isLoading ? (
                                <button
                                    type="button"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    disabled
                                >
                                    <CgSpinner className='animate-spin self-center text-lg'/>
                                       
                                    Göndər
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Göndər
                                </button>
                            )
                        }
                    </div>
                </form>
                    
                <p className="mt-10 text-center text-sm text-gray-500">
                    <NavLink to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Login səhifəsinə qayıt
                    </NavLink>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword