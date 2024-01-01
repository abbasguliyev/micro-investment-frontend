import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvestmentsAsync, putInvestmentAsync, resetInvestmentSlice } from "../../../redux/InvestmentSlice/InvestmentSlice";
import ResponseMessage from "../../../components/ResponseMessage";
import { useFormik } from "formik";
import validations from "./validation";
import AuthInput from "../../../components/InputComponents/AuthInput";
import RadioInput from "../../../components/InputComponents/RadioInput";
import style from './style.module.css'
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";


function AdminDebtFund() {
    let [currentPage, setCurrentPage] = useState(1);
    const [investmentId, setInvestmentId] = useState(null);
    const dispatch = useDispatch();

    let investments = useSelector((state) => state.investment.investments);
    let isLoading = useSelector((state) => state.investment.isLoading);

    const errorMsg = useSelector((state) => state.investment.error);
    const successMsg = useSelector((state) => state.investment.successMsg);
    let totalPage = useSelector((state) => state.investment.totalPage);
    let pageLimit = useSelector((state) => state.investment.pageLimit);

    const formik = useFormik({
        initialValues: {
            fullname: "",
        },
        onSubmit: (values) => {
            let offset = (currentPage - 1) * pageLimit;
            values.offset = offset;
            values.is_from_debt_fund = true
            dispatch(getAllInvestmentsAsync(values));
        },
        validationSchema: validations
    });

    useEffect(() => {
        dispatch(getAllInvestmentsAsync({offset: 0, investor: "",entrepreneur: "", is_from_debt_fund: true}));
    }, [dispatch]);

    const changePage = (e) => {
        setCurrentPage(e);
        let offset = (e - 1) * pageLimit;
        formik.values.offset = offset;
        let filteredValues = { ...formik.values };
        dispatch(getAllInvestmentsAsync(filteredValues));
    };

    const changeAmountSumbitStatus = (investment) => {
        dispatch(putInvestmentAsync({id: investment.id, is_amount_sended_submitted: !investment.is_amount_sended_submitted}))
        .then(() => {
            let offset = (currentPage - 1) * pageLimit;
            formik.values.offset = offset;
            let filteredValues = { ...formik.values };
            dispatch(
                getAllInvestmentsAsync(filteredValues)
            );
        })
    }

    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col">
            <div className="w-full flex flex-row flex-wrap">
                {errorMsg && (
                    <ResponseMessage
                        message={errorMsg}
                        type="error"
                        slice={resetInvestmentSlice()}
                    />
                )}
                {successMsg && (
                    <ResponseMessage
                        message={successMsg}
                        type="success"
                        slice={resetInvestmentSlice()}
                    />
                )}
                <div className="w-full sm:w-full md:w-full lg:w-1/6 pr-3">
                    <b>Filter</b>
                    <form className='rounded h-2/4 mb-5 mt-2 flex flex-col' onSubmit={formik.handleSubmit}>
                        <AuthInput
                            label="İstifadəçi adı"
                            id="fullname"
                            name="fullname"
                            type="text"
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.fullname}
                            error={formik.errors.fullname}
                            style={"mb-2"}
                        />
                        <button type='submit' className={`${style.search_btn} btn-main-bg rounded mt-4`}>Axtar</button>
                    </form>
                </div>
                {
                    isLoading ? (
                        <div className='w-full sm:w-full md:w-3/4 lg:w-3/4 flex justify-center'>
                            <CgSpinner className='animate-spin text-lg self-center'/>
                        </div>
                    ) : (
                        <div className="w-full sm:w-full md:w-full lg:w-5/6 text-sm overflow-y-hidden overflow-x-auto">
                            <table className="table-auto w-full h-fit">
                                <thead>
                                    <tr>
                                        <th className="border border-slate-600">Adı Soyadı</th>
                                        <th className="border border-slate-600">Sifariş</th>
                                        <th className="border border-slate-600">İnvestisiya tarixi</th>
                                        <th className="border border-slate-600">Ümumi gəlir</th>
                                        <th className="border border-slate-600">Fonddan qarşılanan</th>
                                        <th className="border border-slate-600">Aktiv/Deaktiv</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {investments.map((investment) => (
                                        <tr key={investment.id}>
                                            <td className="border border-slate-700">
                                                {investment.investor.user.first_name} {investment.investor.user.last_name}
                                            </td>
                                            <td className="border border-slate-700">
                                                {investment.entrepreneur.project_name}
                                            </td>
                                            <td className="border border-slate-700">
                                                {investment.investment_date}
                                            </td>
                                            <td className="border border-slate-700">
                                                {investment.final_profit}
                                            </td>
                                            <td className="border border-slate-700">
                                                {investment.amount_from_debt_fund}
                                            </td>
                                            <td className="border border-slate-700">
                                                {investment.is_submitted ? (<p className="success">Aktiv</p>) : (<p className="error">Deaktiv</p>)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
            {/* ***************** Pagination ********************* */}
            <div>
                <div className="flex justify-center mt-10">
                    <Pagination
                        onChange={(e) => {
                            changePage(e);
                        }}
                        className="pagination"
                        current={currentPage}
                        total={totalPage}
                        defaultPageSize={pageLimit}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminDebtFund;
