import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import { postLoginAsync } from '../../redux/AuthSlice/AuthSlice';
import validations from './validation';
import style from "./style.module.css"
import AuthInput from '../../components/InputComponents/AuthInput';


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      dispatch(postLoginAsync(values))
      .unwrap()
      .then(() => {
        navigate("/");
        window.location.reload();
      })
    },
    validationSchema: validations
  })

  const access = localStorage.getItem("access");

  const errorMsg = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (access != null) {
      navigate("/");
    }
  }, [navigate, access]);


  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {
          errorMsg && (
          <div className="error-div">
            <span>
              {errorMsg}
            </span>
          </div>)
        }
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Hesabınıza daxil olun:
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <AuthInput label="Email address" id="email" name="email" value={formik.values.email} type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} touched={formik.touched.email} error={formik.errors.email} style={style} />
            <AuthInput label="Parol" id="password" name="password" value={formik.values.password}  type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} touched={formik.touched.password} error={formik.errors.password} style={style} />
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Şifrəni unutdun?
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Daxil ol
              </button>
            </div>
          </form>
              
          <p className="mt-10 text-center text-sm text-gray-500">
            Hesabınız yoxdur?{' '}
            <NavLink to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Qeydiyyatdan keç
            </NavLink>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login