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
    getAllEntrepreneurAsync,
    putEntrepreneurAsync,
    resetEntrepreneurSlice,
} from "../../../redux/EntrepreneurSlice/EntrepreneurSlice";
import Checkbox from "../../../components/InputComponents/Checkbox";
import RadioInput from "../../../components/InputComponents/RadioInput";
import { getAllUsersAsync } from "../../../redux/AuthSlice/AuthSlice";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";


function AdminEntrepreneurs() {
    let [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [users, setUsers] = useState([]);

    const [isEntrepreneurInvestmentsModalOpen, setIsEntrepreneurInvestmentsModalOpen] =useState(false);
    const [isEntrepreneurInvestmentsReportModalOpen, setIsEntrepreneurInvestmentsReportModalOpen] =useState(false);
    const [isEntrepreneurInvestmentUpdateModalOpen, setIsEntrepreneurInvestmentUpdateModalOpen] =useState(false);
    const [isInvestmentAddNewInvestorModalOpen, setInvestmentAddNewInvestorModalOpen] =useState(false);
    const [isEntrepreneurFinishedModalOpen, setIsEntrepreneurFinishedModalOpen] =useState(false);
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
    let pageLimit = useSelector((state) => state.entrepreneur.pageLimit);

    const searchInvestor = (e) => {
        dispatch(getAllUsersAsync({"offset": 0, "fullname": e.target.value, "birthdate":"", "marital_status":"", "employment_status":"", "housing_status":"", "phone_number":"", "monthly_income":"", "monthly_income__gte": "", "monthly_income__lte": ""}))
        .then((res) => (
            setUsers(res.payload.results)
        ))
    }

    // ENTREPRENEUR INVESTMENTS SHOW MODAL
    const showEntrepreneurInvestmentsModal = (entrepreneur) => {
        setEntrepreneur(entrepreneur);
        setIsEntrepreneurInvestmentsModalOpen(true);
    };

    const handleEntrepreneurInvestmentsModalOk = () => {
        setIsEntrepreneurInvestmentsModalOpen(false);
    };

    const handleEntrepreneurInvestmentsModalCancel = () => {
        setIsEntrepreneurInvestmentsModalOpen(false);
    };

    // INVESTMENT ADD NEW INVESTOR SHOW MODAL
    const showInvestmentAddNewInvestorModal = (entrepreneur) => {
        setInvestmentAddNewInvestorModalOpen(true);
        setEntrepreneur(entrepreneur)
    };

    const handleInvestmentAddNewInvestorModalOk = () => {
        setInvestmentAddNewInvestorModalOpen(false);
        addNewInvestorFormik.values.entrepreneur = entrepreneur.id
        dispatch(postInvestmentAsync(addNewInvestorFormik.values)).then(() => {
            dispatch(
                getAllEntrepreneurAsync({
                    offset: 0,
                    owner: "",
                    start_date: "",
                    end_date: "",
                    is_active: ""
                })
            );
        })
    };

    const handleInvestmentAddNewInvestorModalCancel = () => {
        setInvestmentAddNewInvestorModalOpen(false);
    };

    // ENTREPRENEUR INVESTMENTS REPORT SHOW MODAL
    const showEntrepreneurInvestmentsReportModal = (investment, investor) => {
        setIsEntrepreneurInvestmentsReportModalOpen(true);
        dispatch(getAllInvestmentReportsAsync({offset: 0, investor: investor.id, investment: investment.id}))
    };

    const handleEntrepreneurInvestmentsReportModalOk = () => {
        setIsEntrepreneurInvestmentsReportModalOpen(false);
    };

    const handleEntrepreneurInvestmentsReportModalCancel = () => {
        setIsEntrepreneurInvestmentsReportModalOpen(false);
    };

    // ENTREPRENEUR FINISHED SHOW MODAL
    const showEntrepreneurFinishedModal = (entrepreneur) => {
        setEntrepreneur(entrepreneur);
        setIsEntrepreneurFinishedModalOpen(true);
    };

    const handleEntrepreneurFinishedModalOk = () => {
        setIsEntrepreneurFinishedModalOpen(false);
        dispatch(putEntrepreneurAsync({"id": entrepreneur.id, "is_finished": true}))
        .then(() => {
            let offset = (currentPage - 1) * pageLimit;
            dispatch(
                getAllEntrepreneurAsync({
                    offset: offset,
                    owner: "",
                    start_date: "",
                    end_date: "",
                    is_active: ""
                })
            );
        })
    };

    const handleEntrepreneurFinishedModalCancel = () => {
        setIsEntrepreneurFinishedModalOpen(false);
    };

    // ENTREPRENEUR INVESTMENT UPDATE SHOW MODAL
    const showEntrepreneurInvestmentUpdateModal = (investment) => {
        setIsEntrepreneurInvestmentUpdateModalOpen(true);
        setInvestment(investment)
    };

    const handleEntrepreneurInvestmentUpdateModalOk = () => {
        setIsEntrepreneurInvestmentUpdateModalOpen(false);
        formik.values.id = investment && investment.id
        dispatch(putInvestmentAsync(formik.values))
        .then(() => {
            let offset = (currentPage - 1) * pageLimit;
            dispatch(
                getAllEntrepreneurAsync({
                    offset: offset,
                    owner: "",
                    start_date: "",
                    end_date: "",
                    is_active: ""
                })
            );
            dispatch(
                getAllInvestmentsAsync({
                    offset: 0,
                    investor: investment.investor.id,
                    entrepreneur: entrepreneur.id
                })
            );
        })
    };

    const handleEntrepreneurInvestmentUpdateModalCancel = () => {
        setIsEntrepreneurInvestmentUpdateModalOpen(false);
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
          is_active: "",
          is_finished: "",
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

    const addNewInvestorFormik = useFormik({
        initialValues: {
            entrepreneur: "",
            investor: "",
            amount: ""
        },
        onSubmit: (values) => {
            values.entrepreneur = entrepreneur.id
            dispatch(postInvestmentAsync(values))
            .then(() => {
                dispatch(
                    getAllEntrepreneurAsync({
                        offset: offset,
                        owner: "",
                        start_date: "",
                        end_date: "",
                        is_active: ""
                    })
                );
                dispatch(
                    getAllInvestmentsAsync({
                        offset: 0,
                        investor: investment.investor.id,
                        entrepreneur: entrepreneur.id
                    })
                );
            })
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
                is_active: ""
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

    const changeEntrepreneurActivity = (entrepreneur) => {
        dispatch(putEntrepreneurAsync({"id": entrepreneur.id, "is_active": !entrepreneur.is_active}))
        .then(() => {
            let offset = (currentPage - 1) * pageLimit;
            filterFormik.values.offset = offset;
            let filteredValues = { ...filterFormik.values };
            dispatch(getAllEntrepreneurAsync(filteredValues));
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
                <div className="w-full sm:w-full md:w-full lg:w-1/4 pr-3">
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
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Aktiv/Deaktiv
                            </label>
                            <div className="mt-2">
                                <RadioInput
                                    label="Aktiv"
                                    id="active"
                                    name="is_active"
                                    type="radio"
                                    value={true}
                                    onChange={filterFormik.handleChange}
                                    onBlur={filterFormik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Deaktiv"
                                    id="deactive"
                                    name="is_active"
                                    type="radio"
                                    value={false}
                                    onChange={filterFormik.handleChange}
                                    onBlur={filterFormik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Hər İkisi"
                                    id="both_active"
                                    name="is_active"
                                    type="radio"
                                    value={""}
                                    onChange={filterFormik.handleChange}
                                    onBlur={filterFormik.handleBlur}
                                    style={style}
                                />
                                {
                                    filterFormik.touched.is_active && filterFormik.errors.is_active && (<div className='error'>{filterFormik.errors.is_active}</div>)
                                }
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Bitmə statusu
                            </label>
                            <div className="mt-2">
                                <RadioInput
                                    label="Davam edir"
                                    id="continued"
                                    name="is_finished"
                                    type="radio"
                                    value={false}
                                    onChange={filterFormik.handleChange}
                                    onBlur={filterFormik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Bitib"
                                    id="finished"
                                    name="is_finished"
                                    type="radio"
                                    value={true}
                                    onChange={filterFormik.handleChange}
                                    onBlur={filterFormik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Hər İkisi"
                                    id="both_finished"
                                    name="is_finished"
                                    type="radio"
                                    value={""}
                                    onChange={filterFormik.handleChange}
                                    onBlur={filterFormik.handleBlur}
                                    style={style}
                                />
                                {
                                    filterFormik.touched.is_finished && filterFormik.errors.is_finished && (<div className='error'>{filterFormik.errors.is_finished}</div>)
                                }
                            </div>
                        </div>
                        <button type='submit' className={`${style.search_btn} btn-main-bg rounded mt-4`}>Axtar</button>
                    </form>
                </div>
                <div className="w-full sm:w-full md:w-full lg:w-3/4 grid gap-4 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                    <table className="table-auto w-full h-fit">
                        <thead>
                            <tr>
                                <th className="border border-slate-600">Adı</th>
                                <th className="border border-slate-600">
                                    Ümumi investisiya
                                </th>
                                <th className="border border-slate-600">Ümumi gəlir</th>
                                <th className="border border-slate-600">
                                    Yekun mənfəət
                                </th>
                                <th className="border border-slate-600">
                                    Toplanan məbləğ
                                </th>
                                <th className="border border-slate-600">
                                    Yekunlaşma tarixi
                                </th>
                                <th className="border border-slate-600">
                                    Başlama tarixi
                                </th>
                                <th className="border border-slate-600">
                                    Bitmə tarixi
                                </th>
                                <th className="border border-slate-600">
                                    İnvestisiyalar
                                </th>
                                <th className="border border-slate-600">
                                    Aktiv/Deaktiv
                                </th>
                                <th className="border border-slate-600">
                                    Sifarişi bitir
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {entrepreneurs.map((entrepreneur) => (
                                <tr key={entrepreneur.id}>
                                    <td className="border border-slate-700 py-1">
                                        <NavLink
                                            to={`/entrepreneur-detail/${entrepreneur.id}`}
                                            className="text-blue-700"
                                        >
                                            {entrepreneur.project_name}
                                        </NavLink>
                                    </td>
                                    <td className="border border-slate-700 py-1">
                                        {entrepreneur.total_investment}
                                    </td>
                                    <td className="border border-slate-700 py-1">
                                        {entrepreneur.gross_income}
                                    </td>
                                    <td className="border border-slate-700 py-1">
                                        {entrepreneur.final_profit}
                                    </td>
                                    <td className="border border-slate-700 py-1">
                                        {entrepreneur.amount_collected}
                                    </td>
                                    <td className="border border-slate-700 py-1">
                                        {entrepreneur.finished_date}
                                    </td>
                                    <td className="border border-slate-700 py-1">
                                        {entrepreneur.start_date}
                                    </td>
                                    <td className="border border-slate-700 py-1">
                                        {entrepreneur.end_date}
                                    </td>
                                    <td onClick={() => showEntrepreneurInvestmentsModal(entrepreneur)} className="border border-slate-700 cursor-pointer text-sky-700 py-1">
                                        <p>Bax</p>
                                    </td>
                                    <td className="border border-slate-700 cursor-pointer text-sky-700 px-14 py-1">
                                        {
                                            entrepreneur.is_finished ? (
                                                entrepreneur.is_active ? (
                                                    <div className="ml-auto pointer-events-none h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-indigo-600 ring-black/20">
                                                        <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out translate-x-4"></div>
                                                    </div>
                                                ) : (
                                                    <div className="pointer-events-none h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-slate-900/10 ring-slate-900/5">
                                                        <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out"></div>
                                                    </div>
                                                )
                                            ) : (
                                                entrepreneur.is_active ? (
                                                    <div onClick={() => changeEntrepreneurActivity(entrepreneur)} className="ml-auto pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-indigo-600 ring-black/20">
                                                        <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out translate-x-4"></div>
                                                    </div>
                                                ) : (
                                                    <div onClick={() => changeEntrepreneurActivity(entrepreneur)} className="pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-slate-900/10 ring-slate-900/5">
                                                        <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out"></div>
                                                    </div>
                                                )
                                            )
                                        }
                                    </td>
                                    <td className="border border-slate-700 text-sky-700 py-1">
                                        {
                                            entrepreneur.is_finished ? <p className="error">Artıq bitib</p> : <p onClick={() => showEntrepreneurFinishedModal(entrepreneur)} className="success cursor-pointer">Bitir</p>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <Modal
                    title={`İnvestisiyalar`}
                    okType="default"
                    width={1000}
                    open={isEntrepreneurInvestmentsModalOpen}
                    onOk={handleEntrepreneurInvestmentsModalOk}
                    onCancel={handleEntrepreneurInvestmentsModalCancel}
                >
                    {
                        entrepreneur && entrepreneur.investments ? (
                            <>  
                                {
                                    !entrepreneur.is_finished && <a onClick={() => showInvestmentAddNewInvestorModal(entrepreneur)} className="cursor-pointer inline-block px-3 mb-2 border rounded">Yeni İnvestor</a>
                                }
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-slate-600">Adı Soyadı</th>
                                            <th className="border border-slate-600">Sifariş</th>
                                            <th className="border border-slate-600">Balans</th>
                                            <th className="border border-slate-600">Yatırılan məbləğ</th>
                                            <th className="border border-slate-600">Əmsal</th>
                                            <th className="border border-slate-600">Yekun qazanc</th>
                                            <th className="border border-slate-600">İnvestisiya tarixi</th>
                                            <th className="border border-slate-600">Status</th>
                                            <th className="border border-slate-600"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entrepreneur.investments.map((investment) => (
                                            <tr key={investment.id}>
                                                <td className="border border-slate-700">
                                                    {investment.investor.user.first_name} {investment.investor.user.last_name}
                                                </td>
                                                <td className="border border-slate-700">
                                                    {entrepreneur.project_name}
                                                </td>
                                                <td className="border border-slate-700">
                                                    {investment.investor.user.balance} AZN
                                                </td>
                                                <td className="border border-slate-700">
                                                    {investment.amount}
                                                </td>
                                                <td className="border border-slate-700">
                                                    {investment.profit}
                                                </td>
                                                <td className="border border-slate-700">
                                                    {investment.final_profit}
                                                </td>
                                                <td className="border border-slate-700">
                                                    {investment.investment_date}
                                                </td>
                                                <td className="border border-slate-700">
                                                    {investment.is_submitted ? <FaCheck className='success mx-14' /> : <FaXmark className='error mx-14' />}
                                                </td>
                                                {
                                                    entrepreneur.is_finished ? 
                                                    (
                                                        <td onClick={() => showEntrepreneurInvestmentsReportModal(investment, investment.investor)} className="border border-slate-700 text-center text-sky-700 cursor-pointer">
                                                            Hesabat
                                                        </td>
                                                    ) 
                                                    :
                                                    (
                                                        <td onClick={() => showEntrepreneurInvestmentUpdateModal(investment)} className="border border-slate-700 text-center text-sky-700 cursor-pointer">
                                                            Təsdiqlə
                                                        </td>
                                                    ) 
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : ""
                    }
                </Modal>
                
                <Modal
                    title={`Hesabat`}
                    okType="default"
                    open={isEntrepreneurInvestmentsReportModalOpen}
                    onOk={handleEntrepreneurInvestmentsReportModalOk}
                    onCancel={handleEntrepreneurInvestmentsReportModalCancel}
                >
                    {
                        investmentReports && investmentReports.length > 0 ? (
                            investmentReports.map((report) => (
                                <div key={report.id}>
                                    <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                        <p className='text-slate-400'>Balansında saxlamaq istədiyi məbləğ:</p>
                                        <span>{report.amount_want_to_keep_in_the_balance} AZN</span>
                                    </div>
                                    <hr />
                                    <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                        <p className='text-slate-400'>Kartına göndərilməyini istədiyi məbləğ:</p>
                                        <span>{report.amount_want_to_send_to_cart} AZN</span>
                                    </div>
                                    <hr />
                                    <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                        <p className='text-slate-400'>Sədəqə fonduna göndərilməyini istədiyi məbləğ:</p>
                                        <span>{report.amount_want_to_send_to_charity_fund} AZN</span>
                                    </div>
                                    <hr />
                                    <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                        <p className='text-slate-400'>Borc fonduna göndərilməyini istədiyi məbləğ:</p>
                                        <span>{report.amount_want_to_send_to_debt_fund} AZN</span>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        ) : <p>Hesabat yoxdur</p>
                    }
                </Modal>

                <Modal
                    title={`Yeni İnvestor:`}
                    okType="default"
                    open={isInvestmentAddNewInvestorModalOpen}
                    onOk={handleInvestmentAddNewInvestorModalOk}
                    onCancel={handleInvestmentAddNewInvestorModalCancel}
                >
                    <form onSubmit={addNewInvestorFormik.handleSubmit}>
                        <AuthInput
                            label="Məbləğ"
                            id="amount"
                            name="amount"
                            type="text"
                            onChange={(e)=>(searchInvestor(e))}
                            style={style}
                        />
                        <br />
                        <ul>
                            {
                                users.map((user, i) => (
                                    <li key={user ? user.id : i}>
                                        <RadioInput
                                            label={`${user.user.first_name} ${user.user.last_name} | ${user.user.email} | Balans: ${user.user.balance} AZN`}
                                            id={user.id}
                                            name="user"
                                            type="radio"
                                            value={user.id}
                                            onChange={e => addNewInvestorFormik.setFieldValue("investor", user.id)}
                                            style={style}
                                        />
                                        <hr />
                                    </li>
                                ))
                            }
                        </ul>
                        <br />
                        <AuthInput
                            label="Məbləğ"
                            id="amount"
                            name="amount"
                            type="number"
                            value={addNewInvestorFormik.values.amount}
                            onChange={addNewInvestorFormik.handleChange}
                            onBlur={addNewInvestorFormik.handleBlur}
                            touched={addNewInvestorFormik.touched.amount}
                            error={addNewInvestorFormik.errors.amount}
                            style={style}
                        />
                    </form>
                </Modal>
                
                <Modal
                    title={`İnvestisiyanı təsdiq edin:`}
                    okType="default"
                    open={isEntrepreneurInvestmentUpdateModalOpen}
                    onOk={handleEntrepreneurInvestmentUpdateModalOk}
                    onCancel={handleEntrepreneurInvestmentUpdateModalCancel}
                >
                    {
                        formik.values.is_submitted == true ? (
                            <AuthInput
                                label="Məbləğ"
                                id="amount"
                                name="amount"
                                type="number"
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                touched={formik.touched.amount}
                                error={formik.errors.amount}
                                style={style}
                            />
                        ) : (
                            <AuthInput
                                label="Məbləğ"
                                id="amount"
                                name="amount"
                                type="number"
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                touched={formik.touched.amount}
                                error={formik.errors.amount}
                                style={style}
                                disabled={true}
                            />
                        )
                    }
                    <Checkbox
                        label="Təsdiqlə"
                        id="is_submitted"
                        name="is_submitted"
                        value={formik.values.is_submitted}
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={style}
                        checked={formik.values.is_submitted == true ? "checked": ""}
                    />
                </Modal>
                <Modal
                    title={`Sifarişi bitirmək istədiyinizdən əminzinizmi?`}
                    okType="default"
                    open={isEntrepreneurFinishedModalOpen}
                    onOk={handleEntrepreneurFinishedModalOk}
                    onCancel={handleEntrepreneurFinishedModalCancel}
                >
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

export default AdminEntrepreneurs;
