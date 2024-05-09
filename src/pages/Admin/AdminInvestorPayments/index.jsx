import { DatePicker, Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllInvestmentReportsAsync,
    getAllInvestmentsAsync,
    putInvestmentAsync,
    putInvestmentReportAsync,
    resetInvestmentSlice,
} from "../../../redux/InvestmentSlice/InvestmentSlice";
import ResponseMessage from "../../../components/ResponseMessage";
import { NavLink } from "react-router-dom";
import AuthInput from "../../../components/InputComponents/AuthInput";
import { useFormik } from "formik";
import style from "./style.module.css";
import {
    getAllEntrepreneurAsync,
    resetEntrepreneurSlice,
} from "../../../redux/EntrepreneurSlice/EntrepreneurSlice";
import { CgSpinner } from "react-icons/cg";

function AdminInvestorPayments() {
    let [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [isEntrepreneurInvestmentReportModalOpen, setIsEntrepreneurInvestmentReportModalOpen] =useState(false);
    const [entrepreneur, setEntrepreneur] = useState(null);
    const [investment, setInvestment] = useState(null);
    const dispatch = useDispatch();

    let entrepreneurs = useSelector((state) => state.entrepreneur.entrepreneurs);
    let entrepreneurIsLoading = useSelector((state) => state.entrepreneur.isLoading);
    let reportIsLoading = useSelector((state) => state.investment.isLoading);
    let investmentReports = useSelector((state) => state.investment.investmentReports);
    let investments = useSelector((state) => state.investment.investments);
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
        dispatch(getAllInvestmentsAsync({"investor": "", "entrepreneur": entrepreneur.id, "offset": ""}))
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

    const changeReportSendedStatus = (report) => {
        dispatch(putInvestmentReportAsync({"id": report.id, "is_amount_sended_to_investor": !report.is_amount_sended_to_investor}))
        .then(() => {
            let offset = (currentPage - 1) * pageLimit;
            filterFormik.values.offset = offset;
            let filteredValues = { ...filterFormik.values };
            dispatch(getAllEntrepreneurAsync(filteredValues));
            dispatch(getAllInvestmentReportsAsync({offset: offset, investor: "", investment: "", entrepreneur: entrepreneur.id}));
        })
    }

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
                {
                    entrepreneurIsLoading ? (
                        <div className='w-full sm:w-full md:w-3/4 lg:w-3/4 flex justify-center'>
                            <CgSpinner className='animate-spin text-lg self-center'/>
                        </div>
                    ) : (
                        <div className="w-full sm:w-full md:w-full lg:w-4/5 text-sm overflow-y-hidden overflow-x-auto">
                            <table className="table-auto w-full h-fit text-xs">
                                <thead>
                                <tr>
                                    <th className="border border-slate-600 text-xs w-20">Adı</th>
                                    <th className="border border-slate-600 text-xs w-20">
                                        Ümumi investisiya
                                    </th>
                                    <th className="border border-slate-600 text-xs w-20">Ümumi gəlir</th>
                                    <th className="border border-slate-600 text-xs w-20">
                                        Yekun mənfəət
                                    </th>
                                    <th className="border border-slate-600 text-xs w-20">
                                        Toplanan məbləğ
                                    </th>
                                    <th className="border border-slate-600 text-xs w-20">
                                        Sədəqələrin Cəmi
                                    </th>
                                    <th className="border border-slate-600 text-xs w-20">
                                        Yekunlaşma tarixi
                                    </th>
                                    <th className="border border-slate-600 text-xs w-20">
                                        Başlama tarixi
                                    </th>
                                    <th className="border border-slate-600 text-xs w-20">
                                        Bitmə tarixi
                                    </th>
                                    <th className="border border-slate-600 text-xs w-20">
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
                                            {entrepreneur.total_investment} AZN
                                        </td>
                                        <td className="border border-slate-700 py-1 text-xs">
                                            {entrepreneur.gross_income} AZN
                                        </td>
                                        <td className="border border-slate-700 py-1 text-xs">
                                            {entrepreneur.final_profit} AZN
                                        </td>
                                        <td className="border border-slate-700 py-1 text-xs">
                                            {entrepreneur.amount_collected} AZN
                                        </td>
                                        <td className="border border-slate-700 py-1 text-xs">
                                            {entrepreneur.total_charity_money ? entrepreneur.total_charity_money : 0} AZN
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
                                        <td onClick={() => showEntrepreneurInvestmentReportModal(entrepreneur)}
                                            className="border border-slate-700 cursor-pointer text-sky-700 py-1">
                                            <p>Bax</p>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
                

                <Modal
                    title={`Hesabat: ${entrepreneur ? `${entrepreneur.project_name}` : "-"}`}
                    okType="default"
                    width={1500}
                    open={isEntrepreneurInvestmentReportModalOpen}
                    onOk={handleEntrepreneurInvestmentReportModalOk}
                    onCancel={handleEntrepreneurInvestmentReportModalCancel}
                >
                    {
                        reportIsLoading ? (
                            <div className='w-full sm:w-full md:w-3/4 lg:w-3/4 flex justify-center'>
                                <CgSpinner className='animate-spin text-lg self-center'/>
                            </div>
                        ) : (
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
                                                    <th className="border border-slate-600 text-xs"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {investmentReports.map((investmentReport, i) => (
                                                    <tr key={investmentReport.id} 
                                                        className={investmentReport.is_amount_sended_to_investor ? "text-green-800" : "text-red-800"}
                                                    >
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
                                                        <td className="border border-slate-700">
                                                        {
                                                            investmentReport.is_amount_sended_to_investor ? (
                                                                <div onClick={() => changeReportSendedStatus(investmentReport)} className="pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-indigo-600 ring-black/20 cursor-pointer">
                                                                    <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out translate-x-4"></div>
                                                                </div>
                                                            ) : (
                                                                <div onClick={() => changeReportSendedStatus(investmentReport)} className="pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-slate-900/10 ring-slate-900/5 cursor-pointer">
                                                                    <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out"></div>
                                                                </div>
                                                            )
                                                        }
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
    
                                        <hr className="mt-8 mb-5"/>
                                        <p className="font-bold">Hesabatı göndərməyənlər:</p>
                                        <ul>
                                            {
                                                investments.map((inv) => (
                                                    inv.investment_report.length == 0 && (
                                                        <li key={inv.id}>
                                                            {inv.investor && `- ${inv.investor.user.first_name} ${inv.investor.user.last_name} | Qazanc - ${inv.final_profit} AZN`}
                                                        </li>
                                                    )
                                                ))
                                            }
                                        </ul>
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
                        )
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
