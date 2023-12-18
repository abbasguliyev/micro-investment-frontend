import React from "react";
import { postEntrepreneurCreateAsync, resetEntrepreneurSlice } from "../../redux/EntrepreneurSlice/EntrepreneurSlice";
import { useFormik } from "formik";
import AuthInput from "../../components/InputComponents/AuthInput";
import TextAreaInput from "../../components/InputComponents/TextAreaInput";
import style from "./style.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResponseMessage from "../../components/ResponseMessage";
import validations from "./validation";

function EntrepreneurCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let successMsg = useSelector((state) => state.entrepreneur.successMsg)
    let errorMsg = useSelector((state) => state.entrepreneur.error)


    const formik = useFormik({
        initialValues: {
            project_name: "",
            start_date: "",
            end_date: "",
            description: "",
            count: 1,
            purchase_price: 1,
            sale_price: 1,
            platform_cost_percentage: 2,
            investor_share_percentage: 30,
            entrepreneur_share_percentage: 65,
            debt_to_the_fund_percentage: 5,
            charity_to_the_fund_percentage: 0,
        },
        onSubmit: (values) => {
            dispatch(postEntrepreneurCreateAsync(values))
            .then(res => {
                navigate("/entrepreneur-image-create", {state: {id: res.payload.id, project_name: res.payload.project_name}});
            });
        },
        validationSchema: validations
    });
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {errorMsg && (<ResponseMessage message={errorMsg} type="error" slice={resetEntrepreneurSlice()} />)}
                {successMsg && (<ResponseMessage message={successMsg} type="success" slice={resetEntrepreneurSlice()} />)}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sifariş:
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <AuthInput
                            label="Ad"
                            id="project_name"
                            name="project_name"
                            type="text"
                            value={formik.values.project_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.project_name}
                            error={formik.errors.project_name}
                            style={style}
                        />
                        <AuthInput
                            label="Başlanğıc tarixi"
                            id="start_date"
                            name="start_date"
                            type="date"
                            value={formik.values.start_date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.start_date}
                            error={formik.errors.start_date}
                            style={style}
                        />
                        <AuthInput
                            label="Bitmə tarixi"
                            id="end_date"
                            name="end_date"
                            type="date"
                            value={formik.values.end_date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.end_date}
                            error={formik.errors.end_date}
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
                            label="Məhsul sayı"
                            id="count"
                            name="count"
                            type="number"
                            value={formik.values.count}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.count}
                            error={formik.errors.count}
                            style={style}
                        />
                        <AuthInput
                            label="Alış qiyməti"
                            id="purchase_price"
                            name="purchase_price"
                            type="number"
                            value={formik.values.purchase_price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.purchase_price}
                            error={formik.errors.purchase_price}
                            style={style}
                        />
                        <AuthInput
                            label="Satış qiyməti"
                            id="sale_price"
                            name="sale_price"
                            type="number"
                            value={formik.values.sale_price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.sale_price}
                            error={formik.errors.sale_price}
                            style={style}
                        />
                        <AuthInput
                            label="Platforma xərci (faizi)"
                            id="platform_cost_percentage"
                            name="platform_cost_percentage"
                            type="number"
                            value={formik.values.platform_cost_percentage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.platform_cost_percentage}
                            error={formik.errors.platform_cost_percentage}
                            style={style}
                        />
                        <AuthInput
                            label="İnvestorun payı (faizi)"
                            id="investor_share_percentage"
                            name="investor_share_percentage"
                            type="number"
                            value={formik.values.investor_share_percentage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.investor_share_percentage}
                            error={formik.errors.investor_share_percentage}
                            style={style}
                        />
                        <AuthInput
                            label="Formaçının payı (faizi)"
                            id="entrepreneur_share_percentage"
                            name="entrepreneur_share_percentage"
                            type="number"
                            value={formik.values.entrepreneur_share_percentage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.entrepreneur_share_percentage}
                            error={formik.errors.entrepreneur_share_percentage}
                            style={style}
                        />
                        <AuthInput
                            label="Fonda borc (faizi)"
                            id="debt_to_the_fund_percentage"
                            name="debt_to_the_fund_percentage"
                            type="number"
                            value={formik.values.debt_to_the_fund_percentage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.debt_to_the_fund_percentage}
                            error={formik.errors.debt_to_the_fund_percentage}
                            style={style}
                        />
                        <AuthInput
                            label="Fonda sədəqə (faizi)"
                            id="charity_to_the_fund_percentage"
                            name="charity_to_the_fund_percentage"
                            type="number"
                            value={formik.values.charity_to_the_fund_percentage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.charity_to_the_fund_percentage}
                            error={formik.errors.charity_to_the_fund_percentage}
                            style={style}
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

export default EntrepreneurCreate;
