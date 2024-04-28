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


function AdminInvestments() {
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
            entrepreneur__project_name: "",
            is_amount_sended: "",
            is_amount_sended_submitted: "",
            amount_must_send__gt: "0.00"
        },
        onSubmit: (values) => {
            let offset = (currentPage - 1) * pageLimit;
            values.offset = offset;
            dispatch(getAllInvestmentsAsync(values));
        },
        validationSchema: validations
    });

    useEffect(() => {
        dispatch(getAllInvestmentsAsync({offset: 0,investor: "",entrepreneur: "", amount_must_send__gt: "0.00"}));
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
                            label="Sifariş nömrəsi"
                            id="entrepreneur__project_name"
                            name="entrepreneur__project_name"
                            type="text"
                            value={formik.values.entrepreneur__project_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.entrepreneur__project_name}
                            error={formik.errors.entrepreneur__project_name}
                            style={"mb-2"}
                        />
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
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Göndərib/Göndərməyib
                            </label>
                            <div className="mt-2">
                                <RadioInput
                                    label="Göndərib"
                                    id="sended"
                                    name="is_amount_sended"
                                    type="radio"
                                    value={true}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Göndərməyib"
                                    id="non_sended"
                                    name="is_amount_sended"
                                    type="radio"
                                    value={false}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Hər İkisi"
                                    id="both_sended"
                                    name="is_amount_sended"
                                    type="radio"
                                    value={""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                {
                                    formik.touched.is_amount_sended && formik.errors.is_amount_sended && (<div className='error'>{formik.errors.is_amount_sended}</div>)
                                }
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Təsdiq edilib/Təsdiq edilməyib
                            </label>
                            <div className="mt-2">
                                <RadioInput
                                    label="Təsdiq edilib"
                                    id="submitted"
                                    name="is_amount_sended_submitted"
                                    type="radio"
                                    value={true}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Təsdiq edilməyib"
                                    id="non_submitted"
                                    name="is_amount_sended_submitted"
                                    type="radio"
                                    value={false}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Hər İkisi"
                                    id="both_submitted"
                                    name="is_amount_sended_submitted"
                                    type="radio"
                                    value={""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                {
                                    formik.touched.is_amount_sended_submitted && formik.errors.is_amount_sended_submitted && (<div className='error'>{formik.errors.is_amount_sended_submitted}</div>)
                                }
                            </div>
                        </div>
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
                                        <th className="border border-slate-600 w-20 text-xs">Adı Soyadı</th>
                                        <th className="border border-slate-600 w-20 text-xs">Sifariş</th>
                                        <th className="border border-slate-600 w-20 text-xs">İnvestisiya tarixi</th>
                                        <th className="border border-slate-600 w-20 text-xs">Göndərməli olduğu</th>
                                        <th className="border border-slate-600 w-20 text-xs">Aktiv/Deaktiv</th>
                                        <th className="border border-slate-600 w-10 text-xs">Göndərilmə statusu</th>
                                        <th className="border border-slate-600 w-10 text-xs">Admin təsdiqləmə statusu?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {investments.map((investment) => (
                                        <tr key={investment.id}>
                                            <td className="border border-slate-700 text-xs text-center">
                                                {investment.investor.user.first_name} {investment.investor.user.last_name}
                                            </td>
                                            <td className="border border-slate-700 text-xs text-center">
                                                {investment.entrepreneur.project_name}
                                            </td>
                                            <td className="border border-slate-700 text-xs text-center">
                                                {investment.investment_date}
                                            </td>
                                            <td className="border border-slate-700 text-xs text-center">
                                                {investment.amount_must_send}
                                            </td>
                                            <td className="border border-slate-700 text-xs text-center">
                                                {investment.is_submitted ? (<p className="success">Aktiv</p>) : (<p className="error">Deaktiv</p>)}
                                            </td>
                                            <td className="border border-slate-700 text-xs text-center py-2 w-40">
                                                {
                                                    investment.is_amount_sended ? (
                                                    <FaCheck className='success mx-20' />
                                                    ) : (
                                                    <FaXmark className='error mx-20' />
                                                    )
                                                }
                                            </td>
                                            <td className="border border-slate-700 cursor-pointer text-sky-700 px-6 py-1 text-xs w-40">
                                                {
                                                    investment.is_amount_sended_submitted ? (
                                                        <div onClick={() => changeAmountSumbitStatus(investment)} className="pointer-events-auto  mx-20 h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-indigo-600 ring-black/20">
                                                            <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out translate-x-4"></div>
                                                        </div>
                                                    ) : (
                                                        <div onClick={() => changeAmountSumbitStatus(investment)} className="pointer-events-auto  mx-20 h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-slate-900/10 ring-slate-900/5">
                                                            <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out"></div>
                                                        </div>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
                
            </div>
            {/* <Modal
                title={`Silmək istədiyinizə əminsinizmi?`}
                okType="default"
                open={isInvestmentDeleteModalOpen}
                onOk={handleInvestmentDeleteModalOk}
                onCancel={handleInvestmentDeleteModalCancel}
            ></Modal> */}
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

export default AdminInvestments;
