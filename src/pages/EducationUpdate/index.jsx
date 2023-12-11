import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import validations from "./validation";
import style from "./style.module.css";
import AuthInput from "../../components/InputComponents/AuthInput";
import ResponseMessage from "../../components/ResponseMessage";

import { getEducationDetailsAsync, putEducationAsync, resetEducationSlice } from "../../redux/EducationSlice/EducationSlice";
import Checkbox from "../../components/InputComponents/Checkbox";

function EducationUpdate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

    let education = useSelector((state) => state.education.education);
    const errorMsg = useSelector((state) => state.education.error);
    const successMsg = useSelector((state) => state.education.successMsg);

    const formik = useFormik({
        initialValues: {
            education_place: education ? education.education_place || "": "",
            education_branch: education ? education.education_branch || "": "",
            city: education ? education.city || "": "",
            start_year: education ? education.start_year || 0: 0,
            end_year: education ? education.end_year || 0: 0,
            is_continue: education ? education.is_continue || false : false,
        },
        onSubmit: (values) => {
            if (values.is_continue == true) {
                values.end_year = null;
            }
            values.id = id
            dispatch(putEducationAsync(values))
                .unwrap()
                .then(() => {
                    navigate("/profile");
                });
        },
        validationSchema: validations,
    });

    useEffect(() => {
        dispatch(getEducationDetailsAsync({id}))
    }, [dispatch])

    useEffect(() => {
        if (education) {
            formik.setValues({
                education_place: education ? education.education_place || "": "",
                education_branch: education ? education.education_branch || "": "",
                city: education ? education.city || "": "",
                start_year: education ? education.start_year || 0: 0,
                end_year: education ? education.end_year || 0: 0,
                is_continue: education ? education.is_continue || false: false,
            })
        }
    }, [education])

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {errorMsg && (
                    <ResponseMessage
                        message={errorMsg}
                        type="error"
                        slice={resetEducationSlice()}
                    />
                )}
                {successMsg && (
                    <ResponseMessage
                        message={successMsg}
                        type="success"
                        slice={resetEducationSlice()}
                    />
                )}

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Təhsil yenilə:
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <AuthInput
                            label="Təhsil Müəsisəsi"
                            id="education_place"
                            name="education_place"
                            value={formik.values.education_place}
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.education_place}
                            error={formik.errors.education_place}
                            style={style}
                        />
                        <AuthInput
                            label="Sahə"
                            id="education_branch"
                            name="education_branch"
                            value={formik.values.education_branch}
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.education_branch}
                            error={formik.errors.education_branch}
                            style={style}
                        />
                        <AuthInput
                            label="Şəhər"
                            id="city"
                            name="city"
                            value={formik.values.city}
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.city}
                            error={formik.errors.city}
                            style={style}
                        />
                        <AuthInput
                            label="Başlama tarixi (İl)"
                            id="start_year"
                            name="start_year"
                            value={formik.values.start_year}
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.start_year}
                            error={formik.errors.start_year}
                            style={style}
                        />
                        {
                            formik.values.is_continue == true ? 
                            "" 
                            : 
                            (
                                <AuthInput
                                    label="Bitmə tarixi (İl)"
                                    id="end_year"
                                    name="end_year"
                                    value={formik.values.end_year}
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    touched={formik.touched.end_year}
                                    error={formik.errors.end_year}
                                    style={style}
                                />
                            )
                        }
                        <Checkbox
                            label="Davam edirmi"
                            id="is_continue"
                            name="is_continue"
                            value={formik.values.is_continue}
                            type="checkbox"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.is_continue}
                            error={formik.errors.is_continue}
                            style={style}
                            checked={formik.values.is_continue == true ? "checked": ""}
                        />
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Təsdiqlə
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EducationUpdate;
