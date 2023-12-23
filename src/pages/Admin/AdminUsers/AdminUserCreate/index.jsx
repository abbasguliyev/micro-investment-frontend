import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import style from "./style.module.css"
import validations from "./validation";
import { getAllUsersAsync, postRegisterAsync, resetAuthSlice } from "../../../../redux/AuthSlice/AuthSlice";
import ResponseMessage from "../../../../components/ResponseMessage";
import AuthInput from "../../../../components/InputComponents/AuthInput";
import RadioInput from "../../../../components/InputComponents/RadioInput";
import FileInput from "../../../../components/InputComponents/FileInput";
import MultiSelectDropdown from "../../../../components/InputComponents/MultiSelectDropdown";
import TextAreaInput from "../../../../components/InputComponents/TextAreaInput";
import Checkbox from "../../../../components/InputComponents/Checkbox";
import { CgSpinner } from "react-icons/cg";


function AdminUserCreate() {
    const [userData, setUserData] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate()

    let users = useSelector((state) => state.auth.users)
    let errorMsg = useSelector((state) => state.auth.error)
    const isLoading = useSelector((state) => state.auth.isLoading)


    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            birthdate: "",
            address: "",
            marital_status: "married",
            employment_status: "working",
            housing_status: "own home",
            phone_number: "",
            credit_cart_number: "",
            debt_amount: 0,
            monthly_income: 0,
            about: "",
            business_activities: "",
            profile_picture: "",
            references: [],
            password: "",
        },
        onSubmit: (values) => {
            if (values.profile_picture == "") {
                values.profile_picture = null;
            }
            dispatch(postRegisterAsync(values))
            .then(() => {
                navigate("/admin")
            })
            .catch((err) => {
                navigate("/admin")
            });
        },
        validationSchema: validations
    });

    const searchInvestor = (e) => {
        dispatch(getAllUsersAsync({"offset": 0, "fullname": e.target.value, "birthdate":"", "marital_status":"", "employment_status":"", "housing_status":"", "phone_number":"", "monthly_income":"", "monthly_income__gte": "", "monthly_income__lte": "", "is_active": ""}))
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {errorMsg && (<ResponseMessage message={errorMsg} type="error" slice={resetAuthSlice()} />)}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        İstifadəçi əlavə edin:
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <AuthInput
                            label="Ad"
                            id="first_name"
                            name="first_name"
                            type="text"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.first_name}
                            error={formik.errors.first_name}
                            style={style}
                        />
                        <AuthInput
                            label="Soyad"
                            id="last_name"
                            name="last_name"
                            type="text"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.last_name}
                            error={formik.errors.last_name}
                            style={style}
                        />
                        <AuthInput
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.email}
                            error={formik.errors.email}
                            style={style}
                        />
                        <AuthInput
                            label="Doğum tarixi"
                            id="birthdate"
                            name="birthdate"
                            type="date"
                            value={formik.values.birthdate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.birthdate}
                            error={formik.errors.birthdate}
                            style={style}
                        />
                        <AuthInput
                            label="Ünvan"
                            id="address"
                            name="address"
                            type="text"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.address}
                            error={formik.errors.address}
                            style={style}
                        />

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Ailə statusu
                            </label>
                            <div className="mt-2">
                                <RadioInput
                                    label="Evli"
                                    id="married"
                                    name="marital_status"
                                    type="radio"
                                    value={"married"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                    checked={formik.values.marital_status == "married" ? "checked": ""}
                                />
                                <RadioInput
                                    label="Subay"
                                    id="single"
                                    name="marital_status"
                                    type="radio"
                                    value={"single"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                    checked={formik.values.marital_status == "single" ? "checked": ""}
                                />
                                {
                                    formik.touched.marital_status && formik.errors.marital_status && (<div className='error'>{formik.errors.marital_status}</div>)
                                }
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                İşləmə statusu
                            </label>
                            <div className="mt-2">
                                <RadioInput
                                    label="İşləyirəm"
                                    id="working"
                                    name="employment_status"
                                    type="radio"
                                    value={"working"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                    checked={formik.values.employment_status == "working" ? "checked": ""}
                                />
                                <RadioInput
                                    label="İşsizəm"
                                    id="unemployed"
                                    name="employment_status"
                                    type="radio"
                                    value={"unemployed"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                    checked={formik.values.employment_status == "unemployed" ? "checked": ""}
                                />
                                {
                                    formik.touched.employment_status && formik.errors.employment_status && (<div className='error'>{formik.errors.employment_status}</div>)
                                }
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Ev statusu
                            </label>
                            <div className="mt-2">
                                <RadioInput
                                    label="Şəxsi evim var"
                                    id="own_home"
                                    name="housing_status"
                                    type="radio"
                                    value={"own home"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                    checked={formik.values.housing_status == "own home" ? "checked": ""}
                                />
                                <RadioInput
                                    label="Kirayədə qalıram"
                                    id="renting"
                                    name="housing_status"
                                    type="radio"
                                    value={"renting"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                    checked={formik.values.housing_status == "renting" ? "checked": ""}
                                />
                                {
                                    formik.touched.housing_status && formik.errors.housing_status && (<div className='error'>{formik.errors.housing_status}</div>)
                                }
                            </div>
                        </div>
                        <AuthInput
                            label="Telefon nömrəsi"
                            id="phone_number"
                            name="phone_number"
                            type="phone"
                            value={formik.values.phone_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.phone_number}
                            error={formik.errors.phone_number}
                            style={style}
                        />
                        <AuthInput
                            label="Bank adı - Kart nömrəsi - Kart Sahibinin adı"
                            id="credit_cart_number"
                            name="credit_cart_number"
                            type="text"
                            value={formik.values.credit_cart_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.credit_cart_number}
                            error={formik.errors.credit_cart_number}
                            style={style}
                        />
                        <AuthInput
                            label="Var olan borcunuz"
                            id="debt_amount"
                            name="debt_amount"
                            type="number"
                            value={formik.values.debt_amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.debt_amount}
                            error={formik.errors.debt_amount}
                            style={style}
                        />
                        <AuthInput
                            label="Aylıq gəliriniz"
                            id="monthly_income"
                            name="monthly_income"
                            type="number"
                            value={formik.values.monthly_income}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.monthly_income}
                            error={formik.errors.monthly_income}
                            style={style}
                        />
                        <FileInput
                            label="Profil Şəkli"
                            id="profile_picture"
                            name="profile_picture"
                            type="file"
                            onChange={e=>{formik.setFieldValue("profile_picture", e.target.files[0])}}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.profile_picture}
                            error={formik.errors.profile_picture}
                            style={style}
                        />
                        <AuthInput
                            label="Referanslar"
                            id="references"
                            name="references"
                            type="text"
                            onChange={(e)=>(searchInvestor(e))}
                            style={style}
                        />
                        <br />
                        <ul>
                            {
                                users.map((user, i) => (
                                    <li key={user ? user.id : i}>
                                        <Checkbox
                                            label={
                                                user && user.user ? (`${user.user.first_name} ${user.user.last_name} | ${user.user.email}`) : ""
                                            }
                                            id={user.id}
                                            name="references"
                                            type="checkbox"
                                            value={user.id}
                                            onChange={formik.handleChange}
                                            style={style}
                                        />
                                        <hr />
                                    </li>
                                ))
                            }
                        </ul>
                        {
                            formik.touched.references && formik.errors.references && (<div className='error'>{formik.errors.references}</div>)
                        }
                        <TextAreaInput
                            label="Biznez Fəaliyyətləri"
                            id="business_activities"
                            name="business_activities"
                            value={formik.values.business_activities}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.business_activities}
                            error={formik.errors.business_activities}
                            style={style}
                        />
                        <TextAreaInput
                            label="Qeyd"
                            id="about"
                            name="about"
                            value={formik.values.about}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.about}
                            error={formik.errors.about}
                            style={style}
                        />
                        
                        <AuthInput
                            label="Parol"
                            id="password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.password}
                            error={formik.errors.password}
                            style={style}
                        />
                        <div>

                            {
                                isLoading ? (
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        disabled
                                    >
                                        <CgSpinner className='animate-spin self-center text-lg'/>
                                        Əlavə et
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Əlavə et
                                    </button>
                                )
                            }
                            
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminUserCreate;
