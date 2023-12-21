import { DatePicker, Form, Modal, Pagination, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllInvestmentReportsAsync,
    getAllInvestmentsAsync,
    postInvestmentAsync,
    putInvestmentAsync,
    resetInvestmentSlice,
} from "../../../redux/InvestmentSlice/InvestmentSlice";
import ResponseMessage from "../../../components/ResponseMessage";
import { NavLink } from "react-router-dom";
import AuthInput from "../../../components/InputComponents/AuthInput";
import { useFormik } from "formik";
import style from "./style.module.css";
import {
    deleteEntrepreneurAsync,
    getAllEntrepreneurAsync,
    putEntrepreneurAsync,
    resetEntrepreneurSlice,
} from "../../../redux/EntrepreneurSlice/EntrepreneurSlice";
import Checkbox from "../../../components/InputComponents/Checkbox";
import RadioInput from "../../../components/InputComponents/RadioInput";
import { getAllUsersAsync } from "../../../redux/AuthSlice/AuthSlice";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function AdminInvestorPayments() {
    let [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [users, setUsers] = useState([]);

    const [isEntrepreneurInvestmentReportModalOpen, setIsEntrepreneurInvestmentReportModalOpen] =useState(false);
    const [entrepreneur, setEntrepreneur] = useState(null);
    const [investment, setInvestment] = useState(null);
    const dispatch = useDispatch();

    let entrepreneurs = useSelector((state) => state.entrepreneur.entrepreneurs);
    let investmentReports = useSelector((state) => state.investment.investmentReports);
    const errorMsg = useSelector((state) => state.entrepreneur.error);
    const successMsg = useSelector((state) => state.entrepreneur.successMsg);
    const investmentErrorMsg = useSelector((state) => state.investment.error);
    const investmentSuccessMsg = useSelector((state) => state.investment.successMsg);
    let totalPage = useSelector((state) => state.entrepreneur.totalPage);
    let investmentReporttotalPage = useSelector((state) => state.investment.totalPage);
    let pageLimit = useSelector((state) => state.entrepreneur.pageLimit);

    // ENTREPRENEUR INVESTMENTS SHOW MODAL
    const showEntrepreneurInvestmentReportModal = (entrepreneur) => {
        setIsEntrepreneurInvestmentReportModalOpen(true);
        setEntrepreneur(entrepreneur)
        dispatch(getAllInvestmentReportsAsync({offset: 0, investor: "", investment: "", entrepreneur: entrepreneur.id}))
    };

    const handleEntrepreneurInvestmentReportModalOk = () => {
        setIsEntrepreneurInvestmentReportModalOpen(false);
    };

    const handleEntrepreneurInvestmentReportModalCancel = () => {
        setIsEntrepreneurInvestmentReportModalOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            amount: "",
            is_submitted: false
        },
        onSubmit: (values) => {
            values.id = investment && investment.id
            dispatch(putInvestmentAsync(values))
        }
    })

    const filterFormik = useFormik({
        initialValues: {
          offset: "",
          owner: "",
          project_name: "",
          is_active: false,
          is_finished: true,
          start_date: "",
          end_date: "",
        },
        onSubmit: (values) => {
          values.start_date = startDate;
          values.end_date = endDate;
          values.owner = "";
          let filteredValues = { ...values };
          dispatch(getAllEntrepreneurAsync(filteredValues));
        },
    })

    useEffect(() => {
        if (investment) {
            formik.setValues({
                amount: investment ? investment.amount || 0 : 0,
                is_submitted: investment ? investment.is_submitted || false : false,
            });
        }
    }, [investment]);

    useEffect(() => {
        dispatch(
            getAllEntrepreneurAsync({
                offset: 0,
                owner: "",
                start_date: "",
                end_date: "",
                is_active: false,
                is_finished: true
            })
        );
    }, [dispatch]);

    const changePage = (e) => {
        setCurrentPage(e);
        let offset = (e - 1) * pageLimit;
        filterFormik.values.offset = offset;
        let filteredValues = { ...filterFormik.values };
        dispatch(getAllEntrepreneurAsync(filteredValues));
    };

    const changeInvestmentReportPage = (e) => {
        setCurrentPage(e);
        let offset = (e - 1) * pageLimit;
        dispatch(getAllInvestmentReportsAsync({offset: offset, investor: "", investment: "", entrepreneur: entrepreneur.id}));
    };

    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col">
            <div className="w-full flex flex-row flex-wrap">
                {errorMsg && (
                    <ResponseMessage
                        message={errorMsg}
                        type="error"
                        slice={resetEntrepreneurSlice()}
                    />
                )}
                {successMsg && (
                    <ResponseMessage
                        message={successMsg}
                        type="success"
                        slice={resetEntrepreneurSlice()}
                    />
                )}
                {investmentErrorMsg && (
                    <ResponseMessage
                        message={investmentErrorMsg}
                        type="error"
                        slice={resetInvestmentSlice()}
                    />
                )}
                {investmentSuccessMsg && (
                    <ResponseMessage
                        message={investmentSuccessMsg}
                        type="success"
                        slice={resetInvestmentSlice()}
                    />
                )}
                <div className="w-full sm:w-full md:w-full lg:w-1/5 pr-3">
                    <b>Filter</b>
                    <form className='rounded h-2/4 mb-5 mt-2 flex flex-col' onSubmit={filterFormik.handleSubmit}>
                        <AuthInput
                            label="Adı"
                            id="project_name"
                            name="project_name"
                            type="text"
                            value={filterFormik.values.project_name}
                            onChange={filterFormik.handleChange}
                            onBlur={filterFormik.handleBlur}
                            touched={filterFormik.touched.project_name}
                            error={filterFormik.errors.project_name}
                            style={"mb-2"}
                        />
                        <DatePicker
                            placeholder="Başlanğıc tarix"
                            className="select-time mb-2"
                            onChange={(e) => (e ? setStartDate(`${e.$y}-${e.$M + 1}-${e.$D}`): setStartDate(""))}
                            format="YYYY-MM-DD"
                        />
                        <DatePicker
                            placeholder="Son tarix"
                            className="select-time mb-2"
                            onChange={(e) => (e ? setEndDate(`${e.$y}-${e.$M + 1}-${e.$D}`): setEndDate(""))}
                            format="YYYY-MM-DD"
                        />
                        <button type='submit' className={`${style.search_btn} btn-main-bg rounded mt-4`}>Axtar</button>
                    </form>
                </div>
                <div className="w-full sm:w-full md:w-full lg:w-4/5 text-sm overflow-y-hidden overflow-x-auto">
                    <table className="table-auto w-full h-fit">
                        <thead>
                            <tr>
                                <th className="border border-slate-600 text-xs">Adı</th>
                                <th className="border border-slate-600 text-xs">
                                    Ümumi investisiya
                                </th>
                                <th className="border border-slate-600 text-xs">Ümumi gəlir</th>
                                <th className="border border-slate-600 text-xs">
                                    Yekun mənfəət
                                </th>
                                <th className="border border-slate-600 text-xs">
                                    Toplanan məbləğ
                                </th>
                                <th className="border border-slate-600 text-xs">
                                    Yekunlaşma tarixi
                                </th>
                                <th className="border border-slate-600 text-xs">
                                    Başlama tarixi
                                </th>
                                <th className="border border-slate-600 text-xs">
                                    Bitmə tarixi
                                </th>
                                <th className="border border-slate-600 text-xs">
                                    Hesabat
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {entrepreneurs.map((entrepreneur) => (
                                <tr key={entrepreneur.id}>
                                    <td className="border border-slate-700 py-1 text-xs">
                                        <NavLink
                                            to={`/entrepreneur-detail/${entrepreneur.id}`}
                                            className="text-blue-700"
                                        >
                                            {entrepreneur.project_name}
                                        </NavLink>
                                    </td>
                                    <td className="border border-slate-700 py-1 text-xs">
                                        {entrepreneur.total_investment}
                                    </td>
                                    <td className="border border-slate-700 py-1 text-xs">
                                        {entrepreneur.gross_income}
                                    </td>
                                    <td className="border border-slate-700 py-1 text-xs">
                                        {entrepreneur.final_profit}
                                    </td>
                                    <td className="border border-slate-700 py-1 text-xs">
                                        {entrepreneur.amount_collected}
                                    </td>
                                    <td className="border border-slate-700 py-1 text-xs">
                                        {entrepreneur.finished_date}
                                    </td>
                                    <td className="border border-slate-700 py-1 text-xs">
                                        {entrepreneur.start_date}
                                    </td>
                                    <td className="border border-slate-700 py-1 text-xs">
                                        {entrepreneur.end_date}
                                    </td>
                                    <td onClick={() => showEntrepreneurInvestmentReportModal(entrepreneur)} className="border border-slate-700 cursor-pointer text-sky-700 py-1">
                                        <p>Bax</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Modal
                    title={`Hesabat`}
                    okType="default"
                    width={1500}
                    open={isEntrepreneurInvestmentReportModalOpen}
                    onOk={handleEntrepreneurInvestmentReportModalOk}
                    onCancel={handleEntrepreneurInvestmentReportModalCancel}
                >
                    {
                        investmentReports ? (
                            <>
                                <div className="overflow-y-hidden overflow-x-auto">                                  
                                    <table className="table-auto w-full">
                                        <thead>
                                            <tr>
                                                <th className="border border-slate-600 text-xs">№</th>
                                                <th className="border border-slate-600 text-xs">İnvestor</th>
                                                <th className="border border-slate-600 text-xs">
                                                    Balansında saxlamaq istədiyi
                                                </th>
                                                <th className="border border-slate-600 text-xs">
                                                    Kartına göndərilməyini istədiyi
                                                </th>
                                                <th className="border border-slate-600 text-xs">
                                                    Sədəqə fonduna göndərilməyini istədiyi
                                                </th>
                                                <th className="border border-slate-600 text-xs">
                                                    Borc fonduna göndərilməyini istədiyi
                                                </th>
                                                <th className="border border-slate-600 text-xs">
                                                    Kart hesabı
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {investmentReports.map((investmentReport, i) => (
                                                <tr key={investmentReport.id}>
                                                    <td className="border border-slate-700">
                                                        {i+1}
                                                    </td>
                                                    <td className="border border-slate-700">
                                                        {
                                                            investmentReport.investor && investmentReport.investor.user && (
                                                                <>
                                                                    {investmentReport.investor.user.first_name} {investmentReport.investor.user.last_name}
                                                                </>
                                                            )
                                                    }
                                                        
                                                    </td>
                                                    <td className="border border-slate-700">
                                                        {investmentReport.amount_want_to_keep_in_the_balance}
                                                    </td>
                                                    <td className="border border-slate-700">
                                                        {investmentReport.amount_want_to_send_to_cart}
                                                    </td>
                                                    <td className="border border-slate-700">
                                                        {investmentReport.amount_want_to_send_to_charity_fund}
                                                    </td>
                                                    <td className="border border-slate-700">
                                                        {investmentReport.amount_want_to_send_to_debt_fund}
                                                    </td>
                                                    <td className="border border-slate-700">
                                                        {investmentReport.investor.credit_cart_number}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* ***************** Pagination ********************* */}
                                <div>
                                    <div className="flex justify-center mt-10">
                                        <Pagination
                                            onChange={(e) => {
                                                changeInvestmentReportPage(e);
                                            }}
                                            className="pagination"
                                            current={currentPage}
                                            total={investmentReporttotalPage}
                                            defaultPageSize={pageLimit}
                                            showSizeChanger={false}
                                        />
                                    </div>
                                </div>
                            </>
                            
                        ) : <p className="text-center">Hesabat Yoxdur</p>
                    }
                </Modal>
               
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

export default AdminInvestorPayments;
