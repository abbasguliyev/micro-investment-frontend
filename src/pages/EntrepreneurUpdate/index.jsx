import React, { useEffect } from "react";
import { getEntrepreneurDetailAsync, postEntrepreneurCreateAsync, putEntrepreneurAsync, resetEntrepreneurSlice } from "../../redux/EntrepreneurSlice/EntrepreneurSlice";
import { useFormik } from "formik";
import AuthInput from "../../components/InputComponents/AuthInput";
import TextAreaInput from "../../components/InputComponents/TextAreaInput";
import style from "./style.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ResponseMessage from "../../components/ResponseMessage";
import { getMeAsync } from "../../redux/AuthSlice/AuthSlice";

function EntrepreneurUpdate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    let successMsg = useSelector((state) => state.entrepreneur.successMsg)
    let errorMsg = useSelector((state) => state.entrepreneur.error)
    let entrepreneur = useSelector((state) => state.entrepreneur.entrepreneur);
    let me = useSelector((state) => state.auth.me)


    const formik = useFormik({
        initialValues: {
            project_name: entrepreneur ? entrepreneur.project_name || "" : "",
            start_date: entrepreneur ? entrepreneur.start_date || "" : "",
            end_date: entrepreneur ? entrepreneur.end_date || "" : "",
            description: entrepreneur ? entrepreneur.description || "" : "",
            count: entrepreneur ? entrepreneur.count || 0 : 0,
            purchase_price: entrepreneur ? entrepreneur.purchase_price || 0 : 0,
            sale_price: entrepreneur ? entrepreneur.sale_price || 0 : 0,
            total_investment: entrepreneur ? entrepreneur.total_investment || 0 : 0,
            gross_income: entrepreneur ? entrepreneur.gross_income || 0 : 0,
            platform_cost_percentage: entrepreneur ? entrepreneur.platform_cost_percentage || 0 : 0,
            platform_cost: entrepreneur ? entrepreneur.platform_cost || 0 : 0,
            final_profit: entrepreneur ? entrepreneur.final_profit || 0 : 0,
            investor_share_percentage: entrepreneur ? entrepreneur.investor_share_percentage || 0 : 0,
            investor_share: entrepreneur ? entrepreneur.investor_share || 0 : 0,
            entrepreneur_share_percentage: entrepreneur ? entrepreneur.entrepreneur_share_percentage || 0 : 0,
            entrepreneur_share: entrepreneur ? entrepreneur.entrepreneur_share || 0 : 0,
            debt_to_the_fund_percentage: entrepreneur ? entrepreneur.debt_to_the_fund_percentage || 0 : 0,
            debt_to_the_fund: entrepreneur ? entrepreneur.debt_to_the_fund || 0 : 0,
            charity_to_the_fund_percentage: entrepreneur ? entrepreneur.charity_to_the_fund_percentage || 0 : 0,
            charity_to_the_fund: entrepreneur ? entrepreneur.charity_to_the_fund || 0 : 0,
            profit_ratio: entrepreneur ? entrepreneur.profit_ratio || 0 : 0,
        },
        onSubmit: (values) => {
            values.id = id
            console.log(values);
            dispatch(putEntrepreneurAsync(values))
            .then(() => {
                navigate(`/entrepreneur-detail/${id}`)
            })
        }
    });

    useEffect(() => {
        dispatch(getEntrepreneurDetailAsync(id));
        dispatch(getMeAsync())
    }, [dispatch]);

    useEffect(() => {
        if (entrepreneur) {
            formik.setValues({
                project_name: entrepreneur ? entrepreneur.project_name || "" : "",
                start_date: entrepreneur ? entrepreneur.start_date || "" : "",
                end_date: entrepreneur ? entrepreneur.end_date || "" : "",
                description: entrepreneur ? entrepreneur.description || "" : "",
                count: entrepreneur ? entrepreneur.count || 0 : 0,
                purchase_price: entrepreneur ? entrepreneur.purchase_price || 0 : 0,
                sale_price: entrepreneur ? entrepreneur.sale_price || 0 : 0,
                total_investment: entrepreneur ? entrepreneur.total_investment || 0 : 0,
                gross_income: entrepreneur ? entrepreneur.gross_income || 0 : 0,
                platform_cost_percentage: entrepreneur ? entrepreneur.platform_cost_percentage || 0 : 0,
                platform_cost: entrepreneur ? entrepreneur.platform_cost || 0 : 0,
                final_profit: entrepreneur ? entrepreneur.final_profit || 0 : 0,
                investor_share_percentage: entrepreneur ? entrepreneur.investor_share_percentage || 0 : 0,
                investor_share: entrepreneur ? entrepreneur.investor_share || 0 : 0,
                entrepreneur_share_percentage: entrepreneur ? entrepreneur.entrepreneur_share_percentage || 0 : 0,
                entrepreneur_share: entrepreneur ? entrepreneur.entrepreneur_share || 0 : 0,
                debt_to_the_fund_percentage: entrepreneur ? entrepreneur.debt_to_the_fund_percentage || 0 : 0,
                debt_to_the_fund: entrepreneur ? entrepreneur.debt_to_the_fund || 0 : 0,
                charity_to_the_fund_percentage: entrepreneur ? entrepreneur.charity_to_the_fund_percentage || 0 : 0,
                charity_to_the_fund: entrepreneur ? entrepreneur.charity_to_the_fund || 0 : 0,
                profit_ratio: entrepreneur ? entrepreneur.profit_ratio || 0 : 0,
            });
        }
    }, [entrepreneur]);

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
                            label="Ümumi investisiya"
                            id="total_investment"
                            name="total_investment"
                            type="number"
                            value={formik.values.total_investment}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.total_investment}
                            error={formik.errors.total_investment}
                            style={style}
                        />
                        <AuthInput
                            label="Ümumi gəlir"
                            id="gross_income"
                            name="gross_income"
                            type="number"
                            value={formik.values.gross_income}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.gross_income}
                            error={formik.errors.gross_income}
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
                            label="Platforma xərci"
                            id="platform_cost"
                            name="platform_cost"
                            type="number"
                            value={formik.values.platform_cost}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.platform_cost}
                            error={formik.errors.platform_cost}
                            style={style}
                        />
                        <AuthInput
                            label="Yekun Mənfəət"
                            id="final_profit"
                            name="final_profit"
                            type="number"
                            value={formik.values.final_profit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.final_profit}
                            error={formik.errors.final_profit}
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
                            label="İnvestorun payı"
                            id="investor_share"
                            name="investor_share"
                            type="number"
                            value={formik.values.investor_share}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.investor_share}
                            error={formik.errors.investor_share}
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
                            label="Formaçının payı"
                            id="entrepreneur_share"
                            name="entrepreneur_share"
                            type="number"
                            value={formik.values.entrepreneur_share}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.entrepreneur_share}
                            error={formik.errors.entrepreneur_share}
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
                            label="Fonda borc"
                            id="debt_to_the_fund"
                            name="debt_to_the_fund"
                            type="number"
                            value={formik.values.debt_to_the_fund}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.debt_to_the_fund}
                            error={formik.errors.debt_to_the_fund}
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
                        <AuthInput
                            label="Fonda sədəqə"
                            id="charity_to_the_fund"
                            name="charity_to_the_fund"
                            type="number"
                            value={formik.values.charity_to_the_fund}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.charity_to_the_fund}
                            error={formik.errors.charity_to_the_fund}
                            style={style}
                        />
                        <AuthInput
                            label="Mənfəət əmsalı"
                            id="profit_ratio"
                            name="profit_ratio"
                            type="number"
                            value={formik.values.profit_ratio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.profit_ratio}
                            error={formik.errors.profit_ratio}
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

export default EntrepreneurUpdate;
