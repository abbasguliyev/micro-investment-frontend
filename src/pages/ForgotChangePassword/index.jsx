import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { postLoginAsync, resetPasswordConfirmAsync, resetPasswordValidateAsync } from '../../redux/AuthSlice/AuthSlice';
import AuthInput from '../../components/InputComponents/AuthInput';
import style from './style.module.css'
import validations from './validation';

function ForgotChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { token } = useParams();

    const formik = useFormik({
        initialValues: {
            new_password: "",
            password2: "",
        },
        onSubmit: (values) => {
            dispatch(resetPasswordValidateAsync({"token": token}))
            .then((res) => {
                dispatch(resetPasswordConfirmAsync({"password": values.new_password, "token": token}))
                .then(() => {
                    navigate("/")
                })
            })
        },
        validationSchema: validations
    })

    const errorMsg = useSelector((state) => state.auth.error);
    const successMsg = useSelector((state) => state.auth.successMsg)

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Şifrənizi daxil edin:
                </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <AuthInput label="Yeni Şifrə" id="new_password" name="new_password" value={formik.values.new_password}  type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} touched={formik.touched.new_password} error={formik.errors.new_password} style={style} />
                    <AuthInput label="Şifrə Təkrarla" id="password2" name="password2" value={formik.values.password2}  type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} touched={formik.touched.password2} error={formik.errors.password2} style={style} />
                    
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Təsdiqlə
                        </button>
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

export default ForgotChangePassword