import { DatePicker, Form, Modal, Pagination, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteInvestmentAsync,
    getAllInvestmentReportsAsync,
    getAllInvestmentsAdminAsync,
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
import { CgSpinner } from "react-icons/cg";
import { getCompanyBalanceAsync } from "../../../redux/CompanyBalanceSlice/CompanyBalanceSlice";


function AdminEntrepreneurs() {
    let [currentPage, setCurrentPage] = useState(1);
    let [currentInvestmentPage, setCurrentInvestmentPage] = useState(1);
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
    const [isEntrepreneurDeleteModalOpen, setIsEntrepreneurDeleteModalOpen] = useState(false);
    const [isInvestmentDeleteModalOpen, setIsInvestmentDeleteModalOpen] = useState(false);
    const dispatch = useDispatch();

    let entrepreneurs = useSelector((state) => state.entrepreneur.entrepreneurs);
    let investments = useSelector((state) => state.investment.investments);
    let investmentIsLoading = useSelector((state) => state.investment.isLoading);
    let entrepreneurIsLoading = useSelector((state) => state.entrepreneur.isLoading);
    let investmentReports = useSelector((state) => state.investment.investmentReports);
    const errorMsg = useSelector((state) => state.entrepreneur.error);
    const successMsg = useSelector((state) => state.entrepreneur.successMsg);
    const investmentErrorMsg = useSelector((state) => state.investment.error);
    const investmentSuccessMsg = useSelector((state) => state.investment.successMsg);
    let totalPage = useSelector((state) => state.entrepreneur.totalPage);
    let pageLimit = useSelector((state) => state.entrepreneur.pageLimit);
    let investmentstotalPage = useSelector((state) => state.investment.totalPage);


    const searchInvestor = (e) => {
        dispatch(getAllUsersAsync({"offset": 0, "fullname": e.target.value, "birthdate":"", "marital_status":"", "employment_status":"", "housing_status":"", "phone_number":"", "monthly_income":"", "monthly_income__gte": "", "monthly_income__lte": ""}))
        .then((res) => (
            setUsers(res.payload.results)
        ))
    }

    // Investment DELETE SHOW MODAL
    const showInvestmentDeleteModal = (investment) => {
        setIsInvestmentDeleteModalOpen(true);
        setInvestment(investment)
    };

    const handleInvestmentDeleteModalOk = () => {
        setIsInvestmentDeleteModalOpen(false);
        dispatch(deleteInvestmentAsync({"id": investment.id}))
        .then(() => {
            let offset = (currentPage - 1) * pageLimit;
            let iOffset = (currentInvestmentPage - 1) * pageLimit;
            filterFormik.values.offset = offset;
            dispatch(
                getAllEntrepreneurAsync(filterFormik.values)
            );
            dispatch(
                getAllInvestmentsAdminAsync({
                    investor: "",
                    entrepreneur: investment.entrepreneur.id
                })
            );
            dispatch(
                getCompanyBalanceAsync()
            )
        })
    };

    const handleInvestmentDeleteModalCancel = () => {
        setIsInvestmentDeleteModalOpen(false);
    };

    // ENTREPRENEUR DELETE SHOW MODAL
    const showEntrepreneurModal = (entrepreneur) => {
        setIsEntrepreneurDeleteModalOpen(true);
        setEntrepreneur(entrepreneur)
    };

    const handleEntrepreneurDeleteModalOk = () => {
        setIsEntrepreneurDeleteModalOpen(false);
        dispatch(deleteEntrepreneurAsync({"id": entrepreneur}))
        .then(() => {
            dispatch(
                getAllEntrepreneurAsync(filterFormik.values)
            )
        })
    };

    const handleEntrepreneurDeleteModalCancel = () => {
        setIsEntrepreneurDeleteModalOpen(false);
    };

    // ENTREPRENEUR INVESTMENTS SHOW MODAL
    const showEntrepreneurInvestmentsModal = (entrepreneur) => {
        let offset = (1 - 1) * pageLimit;
        let iOffset = (currentInvestmentPage - 1) * pageLimit;
        setEntrepreneur(entrepreneur);
        setIsEntrepreneurInvestmentsModalOpen(true);
        dispatch(getAllInvestmentsAdminAsync({investor: "", entrepreneur: entrepreneur.id}))
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
            let iOffset = (currentInvestmentPage - 1) * pageLimit;
            dispatch(
                getAllEntrepreneurAsync(filterFormik.values)
            );
            dispatch(getAllInvestmentsAdminAsync({investor: "", entrepreneur: entrepreneur.id}))
            dispatch(
                getCompanyBalanceAsync()
            )
        })
    };

    const handleInvestmentAddNewInvestorModalCancel = () => {
        setInvestmentAddNewInvestorModalOpen(false);
    };

    // ENTREPRENEUR INVESTMENTS REPORT SHOW MODAL
    const showEntrepreneurInvestmentsReportModal = (investment, investor) => {
        setIsEntrepreneurInvestmentsReportModalOpen(true);
        dispatch(getAllInvestmentReportsAsync({offset: 0, investor: investor.id, investment: investment.id, entrepreneur: ""}))
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
                getAllEntrepreneurAsync(filterFormik.values)
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
            let iOffset = (currentInvestmentPage - 1) * pageLimit;
            dispatch(
                getAllEntrepreneurAsync(filterFormik.values)
            );
            dispatch(
                getAllInvestmentsAdminAsync({
                    investor: "",
                    entrepreneur: entrepreneur.id
                })
            );
            dispatch(
                getCompanyBalanceAsync()
            )
        })
    };

    const handleEntrepreneurInvestmentUpdateModalCancel = () => {
        setIsEntrepreneurInvestmentUpdateModalOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            amount: "",
            is_submitted: false,
            is_from_debt_fund: false,
            amount_from_debt_fund: 0
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
            amount: "",
            is_from_debt_fund: false,
            amount_from_debt_fund: 0
        },
        onSubmit: (values) => {
            values.entrepreneur = entrepreneur.id
            dispatch(postInvestmentAsync(values))
            .then(() => {
                dispatch(
                    getAllEntrepreneurAsync(filterFormik.values)
                );
                dispatch(
                    
                    getAllInvestmentsAdminAsync({
                        investor: "",
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
                is_from_debt_fund: investment ? investment.is_from_debt_fund || false : false,
                amount_from_debt_fund: investment ? investment.amount_from_debt_fund || 0 : 0,
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
            let iOffset = (currentInvestmentPage - 1) * pageLimit;
            filterFormik.values.offset = offset;
            let filteredValues = { ...filterFormik.values };
            dispatch(getAllEntrepreneurAsync(filteredValues));
            dispatch(
                getAllInvestmentsAdminAsync({
                    investor: "",
                    entrepreneur: entrepreneur.id
                })
            );
        })
    }

    const changeEntrepreneurFinishStatus = (entrepreneur) => {
        dispatch(putEntrepreneurAsync({"id": entrepreneur.id, "is_finished": !entrepreneur.is_finished}))
        .then(() => {
            let offset = (currentPage - 1) * pageLimit;
            let iOffset = (currentInvestmentPage - 1) * pageLimit;
            filterFormik.values.offset = offset;
            let filteredValues = { ...filterFormik.values };
            dispatch(getAllEntrepreneurAsync(filteredValues));
            dispatch(
                getAllInvestmentsAdminAsync({
                    investor: "",
                    entrepreneur: entrepreneur.id
                })
            );
        })
    }
    
    const changeInvestmentsPage = (e) => {
        setCurrentInvestmentPage(e);
        let iOffset = (e - 1) * pageLimit;
        dispatch(getAllInvestmentsAdminAsync({investor: "", investment: "", entrepreneur: entrepreneur.id}));
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
                <div className="w-full sm:w-full md:w-full lg:w-1/6 pr-3">
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
                {
                    entrepreneurIsLoading ? (
                        <div className='w-full sm:w-full md:w-3/4 lg:w-3/4 flex justify-center'>
                            <CgSpinner className='animate-spin text-lg self-center'/>
                        </div>
                    ) : (
                        <div className="w-full sm:w-full md:w-full lg:w-5/6 text-sm overflow-y-hidden overflow-x-auto">
                            <table className="table-auto w-full h-fit">
                                <thead>
                                    <tr>
                                        <th className="border border-slate-600 text-xs">№</th>
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
                                        {/* <th className="border border-slate-600 text-xs">
                                            Yekunlaşma tarixi
                                        </th> */}
                                        <th className="border border-slate-600 text-xs">
                                            Başlama tarixi
                                        </th>
                                        <th className="border border-slate-600 text-xs">
                                            Bitmə tarixi
                                        </th>
                                        <th className="border border-slate-600 text-xs">
                                            İnvestisiyalar
                                        </th>
                                        <th className="border border-slate-600 text-xs">
                                            Aktiv/Deaktiv
                                        </th>
                                        <th className="border border-slate-600 text-xs">
                                            Sifarişi bitir
                                        </th>
                                        <th className="border border-slate-600 text-xs"></th>

                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {entrepreneurs.map((entrepreneur, i) => (
                                        <tr key={entrepreneur.id}>
                                            <td className="border border-slate-700 py-1 text-xs">
                                                {i+1}
                                            </td>
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
                                            {/* <td className="border border-slate-700 py-1 text-xs">
                                                {entrepreneur.finished_date}
                                            </td> */}
                                            <td className="border border-slate-700 py-1 text-xs">
                                                {entrepreneur.start_date}
                                            </td>
                                            <td className="border border-slate-700 py-1 text-xs">
                                                {entrepreneur.end_date}
                                            </td>
                                            <td onClick={() => showEntrepreneurInvestmentsModal(entrepreneur)} className="border border-slate-700 cursor-pointer text-sky-700 py-1 text-xs">
                                                <p>Bax</p>
                                            </td>
                                            <td className="border border-slate-700 cursor-pointer text-sky-700 px-6 py-1 text-xs">
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
                                            <td className="border border-slate-700 cursor-pointer text-sky-700 px-6 py-1 text-xs">
                                                {
                                                    entrepreneur.is_finished ? (
                                                        <div onClick={() => changeEntrepreneurFinishStatus(entrepreneur)} className="ml-auto pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-indigo-600 ring-black/20">
                                                            <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out translate-x-4"></div>
                                                        </div>
                                                    ) : (
                                                        <div onClick={() => changeEntrepreneurFinishStatus(entrepreneur)} className="pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-slate-900/10 ring-slate-900/5">
                                                            <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out"></div>
                                                        </div>
                                                    )
                                                }
                                            </td>
                                            <td className="border border-slate-700 text-center">
                                                <NavLink
                                                    className={`p-2`}
                                                    onClick={() => showEntrepreneurModal(entrepreneur.id)}
                                                >
                                                    <MdDelete
                                                        className="inline"
                                                        style={{
                                                            color: "#CF4B44",
                                                            fontSize: "20px",
                                                        }}
                                                    />
                                                </NavLink>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
                <Modal
                    title={`Silmək istədiyinizə əminsinizmi?`}
                    okType="default"
                    open={isEntrepreneurDeleteModalOpen}
                    onOk={handleEntrepreneurDeleteModalOk}
                    onCancel={handleEntrepreneurDeleteModalCancel}
                ></Modal>
                
                <Modal
                    title={`İnvestisiyalar`}
                    okType="default"
                    width={1400}
                    open={isEntrepreneurInvestmentsModalOpen}
                    onOk={handleEntrepreneurInvestmentsModalOk}
                    onCancel={handleEntrepreneurInvestmentsModalCancel}
                >
                    {
                        investmentIsLoading ? (
                            <div className='w-full sm:w-full md:w-3/4 lg:w-3/4 flex justify-center'>
                                <CgSpinner className='animate-spin text-lg self-center'/>
                            </div>
                        ) : (
                            <>
                                <div className=" overflow-y-hidden overflow-x-auto">  
                                    {
                                        entrepreneur && !entrepreneur.is_finished && <a onClick={() => showInvestmentAddNewInvestorModal(entrepreneur)} className="cursor-pointer inline-block px-3 mb-2 border rounded">Yeni İnvestor</a>
                                    }
                                    
                                    <table className="table-auto w-full">
                                        <thead>
                                            <tr>
                                                <th className="border border-slate-600 text-xs">№</th>
                                                <th className="border border-slate-600 text-xs">Adı Soyadı</th>
                                                <th className="border border-slate-600 text-xs">Sifariş</th>
                                                <th className="border border-slate-600 text-xs">Balansından gələn</th>
                                                <th className="border border-slate-600 text-xs">Göndərməli olduğu</th>
                                                <th className="border border-slate-600 text-xs">Borc fondundan qarşılanan</th>
                                                <th className="border border-slate-600 text-xs">Yatırılan məbləğ</th>
                                                <th className="border border-slate-600 text-xs">Əmsal</th>
                                                <th className="border border-slate-600 text-xs">Yekun qazanc</th>
                                                <th className="border border-slate-600 text-xs">İnvestisiya tarixi</th>
                                                <th className="border border-slate-600 text-xs">Status</th>
                                                <th className="border border-slate-600 text-xs"></th>
                                                <th className="border border-slate-600 text-xs"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {investments.map((investment, i) => (
                                                <tr key={investment.id}>
                                                    <td className="border border-slate-700">
                                                        {i+1}
                                                    </td>
                                                    <td className="border border-slate-700">
                                                        {investment.investor.user.first_name} {investment.investor.user.last_name}
                                                    </td>
                                                    <td className="border border-slate-700">
                                                        {investment.entrepreneur.project_name}
                                                    </td>
                                                    <td className="border border-slate-700">
                                                        {investment.amount_deducated_from_balance} AZN
                                                    </td>
                                                    <td className="border border-slate-700">
                                                        {investment.amount_must_send} AZN
                                                    </td>
                                                    <td className="border border-slate-700">
                                                        {investment.amount_from_debt_fund} AZN
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
                                                        investment.entrepreneur.is_finished ? 
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
                                                    <td className="border border-slate-700 text-center">
                                                        <NavLink
                                                            className={`p-2`}
                                                            onClick={() => showInvestmentDeleteModal(investment)}
                                                        >
                                                            <MdDelete
                                                                className="inline"
                                                                style={{
                                                                    color: "#CF4B44",
                                                                    fontSize: "20px",
                                                                }}
                                                            />
                                                        </NavLink>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* ***************** Pagination ********************* */}
                                {/*<div>*/}
                                {/*    <div className="flex justify-center mt-10">*/}
                                {/*        <Pagination*/}
                                {/*            onChange={(e) => {*/}
                                {/*                changeInvestmentsPage(e);*/}
                                {/*            }}*/}
                                {/*            className="pagination"*/}
                                {/*            current={currentInvestmentPage}*/}
                                {/*            total={investmentstotalPage}*/}
                                {/*            defaultPageSize={pageLimit}*/}
                                {/*            showSizeChanger={false}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </>
                        )
                    }
                </Modal>

                <Modal
                    title={`Silmək istədiyinizə əminsinizmi?`}
                    okType="default"
                    open={isInvestmentDeleteModalOpen}
                    onOk={handleInvestmentDeleteModalOk}
                    onCancel={handleInvestmentDeleteModalCancel}
                ></Modal>
                
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
                            label="Investor"
                            id="investor"
                            name="investor"
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
                        <hr className="mt-2" />
                        <Checkbox
                            label="Borc fondundan qarşıla"
                            id="is_from_debt_fund"
                            name="is_from_debt_fund"
                            value={addNewInvestorFormik.values.is_from_debt_fund}
                            type="checkbox"
                            onChange={addNewInvestorFormik.handleChange}
                            onBlur={addNewInvestorFormik.handleBlur}
                            style={style}
                            checked={addNewInvestorFormik.values.is_from_debt_fund == true ? "checked": ""}
                        />
                        {
                            addNewInvestorFormik.values.is_from_debt_fund && (
                                <AuthInput
                                    label="Qarşılanmağını istədiyiniz məbləği yazın"
                                    id="amount_from_debt_fund"
                                    name="amount_from_debt_fund"
                                    type="number"
                                    value={addNewInvestorFormik.values.amount_from_debt_fund}
                                    onChange={addNewInvestorFormik.handleChange}
                                    onBlur={addNewInvestorFormik.handleBlur}
                                    touched={addNewInvestorFormik.touched.amount_from_debt_fund}
                                    error={addNewInvestorFormik.errors.amount_from_debt_fund}
                                    style={style}
                                />
                            )
                        }
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
                    <hr className="mt-2" />
                    <Checkbox
                        label="Borc fondundan qarşıla"
                        id="is_from_debt_fund"
                        name="is_from_debt_fund"
                        value={formik.values.is_from_debt_fund}
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={style}
                        checked={formik.values.is_from_debt_fund == true ? "checked": ""}
                    />
                    {
                        formik.values.is_from_debt_fund && (
                            <AuthInput
                                label="Qarşılanmağını istədiyiniz məbləği yazın"
                                id="amount_from_debt_fund"
                                name="amount_from_debt_fund"
                                type="number"
                                value={formik.values.amount_from_debt_fund}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                touched={formik.touched.amount_from_debt_fund}
                                error={formik.errors.amount_from_debt_fund}
                                style={style}
                            />
                        )
                    }
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
