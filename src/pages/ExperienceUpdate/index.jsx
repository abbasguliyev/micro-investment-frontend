import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import validations from "./validation";
import style from "./style.module.css";
import AuthInput from "../../components/InputComponents/AuthInput";
import ResponseMessage from "../../components/ResponseMessage";
import {
    getExperienceDetailsAsync,
    putExperiencesAsync,
    resetExperienceSlice,
} from "../../redux/ExperienceSlice/ExperienceSlice";
import TextAreaInput from "../../components/InputComponents/TextAreaInput";
import Checkbox from "../../components/InputComponents/Checkbox";
import { getMeAsync } from "../../redux/AuthSlice/AuthSlice";

function ExperienceUpdate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

    let experience = useSelector((state) => state.experience.experience);
    const errorMsg = useSelector((state) => state.experience.error);
    const successMsg = useSelector((state) => state.experience.successMsg);
    let me = useSelector(state => state.auth.me)

    const formik = useFormik({
        initialValues: {
            experience_place: experience ? experience.experience_place || "": "",
            position: experience ? experience.position || "": "",
            description: experience ? experience.description || "": "",
            city: experience ? experience.city || "": "",
            start_year: experience ? experience.start_year || 0: 0,
            end_year: experience ? experience.end_year || 0: 0,
            is_continue: experience ? experience.is_continue || false: false,
        },
        onSubmit: (values) => {
            if (values.is_continue == true) {
                values.end_year = null;
            }
            values.id = id
            dispatch(putExperiencesAsync(values))
                .unwrap()
                .then(() => {
                    navigate(`/profile/${me && me.id}`);
                });
        },
        validationSchema: validations,
    });

    useEffect(() => {
        dispatch(getExperienceDetailsAsync({id}))
        dispatch(getMeAsync())
    }, [dispatch])

    useEffect(() => {
        if (experience) {
            formik.setValues({
                experience_place: experience ? experience.experience_place || "": "",
                position: experience ? experience.position || "": "",
                description: experience ? experience.description || "": "",
                city: experience ? experience.city || "": "",
                start_year: experience ? experience.start_year || 0: 0,
                end_year: experience ? experience.end_year || 0: 0,
                is_continue: experience ? experience.is_continue || false: false,
            })
        }
    }, [experience])

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {errorMsg && (
                    <ResponseMessage
                        message={errorMsg}
                        type="error"
                        slice={resetExperienceSlice()}
                    />
                )}
                {successMsg && (
                    <ResponseMessage
                        message={successMsg}
                        type="success"
                        slice={resetExperienceSlice()}
                    />
                )}

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Təcrübə yenilə:
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <AuthInput
                            label="Müəsisə"
                            id="experience_place"
                            name="experience_place"
                            value={formik.values.experience_place}
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.experience_place}
                            error={formik.errors.experience_place}
                            style={style}
                        />
                        <AuthInput
                            label="Vəzifə"
                            id="position"
                            name="position"
                            value={formik.values.position}
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.position}
                            error={formik.errors.position}
                            style={style}
                        />
                        <TextAreaInput
                            label="Açıqlama"
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.description}
                            error={formik.errors.description}
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

export default ExperienceUpdate;
