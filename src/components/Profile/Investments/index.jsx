import {useEffect, useState} from 'react'
import {NavLink, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Modal, Pagination} from 'antd'

import style from "./style.module.css"

import {getUserDetailAsync} from '../../../redux/AuthSlice/AuthSlice'
import {
    getAllInvestmentReportsAsync,
    getAllInvestmentsAsync,
    postInvestmentReportAsync,
    putInvestmentAsync,
} from '../../../redux/InvestmentSlice/InvestmentSlice'
import {FaCheck} from "react-icons/fa";
import {FaXmark} from "react-icons/fa6";
import {useFormik} from 'formik'
import AuthInput from '../../InputComponents/AuthInput'
import TextAreaInput from '../../InputComponents/TextAreaInput'
import {getCompanyBalanceAsync} from '../../../redux/CompanyBalanceSlice/CompanyBalanceSlice'
import {CgSpinner} from 'react-icons/cg'

const Investments = () => {
    let {id} = useParams();
    let [currentPage, setCurrentPage] = useState(1);
    const [isInvestorInvestmentFinishModalOpen, setIsInvestorInvestmentFinishModalOpen] = useState(false);
    const [isInvestorInvestmentReportEditModalOpen, setIsInvestorInvestmentReportEditModalOpen] = useState(false);
    const [isInvestorInvestmentEditModalOpen, setIsInvestorInvestmentEditModalOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [investment, setInvestment] = useState(null);

    const dispatch = useDispatch()
    let investments = useSelector((state) => state.investment.investments)
    let isLoading = useSelector((state) => state.investment.isLoading)
    let investmentReports = useSelector((state) => state.investment.investmentReports)
    let totalPage = useSelector((state) => state.investment.totalPage)
    let pageLimit = useSelector((state) => state.investment.pageLimit)
    let companyBalance = useSelector((state) => state.companyBalance.companyBalances)

    // Investment Finish Modal
    const showInvestorInvestmentFinishModal = (investment) => {
        setIsInvestorInvestmentFinishModalOpen(true);
        setInvestment(investment)
        setAmount(investment.amount)
    };

    const handleIsInvestorInvestmentFinishModalOk = () => {
        setIsInvestorInvestmentFinishModalOpen(false);
        formik.values.investor = id
        formik.values.investment = investment && investment.id
        dispatch(postInvestmentReportAsync(formik.values))
            .then(() => {
                let offset = (currentPage - 1) * pageLimit;
                dispatch(
                    getAllInvestmentsAsync({"investor": id, "entrepreneur": "", "offset": offset})
                );
                dispatch(getCompanyBalanceAsync())
            })
    };

    const handleIsInvestorInvestmentFinishModalCancel = () => {
        setIsInvestorInvestmentFinishModalOpen(false);
    };

    // Investment Report Modal
    const showInvestorInvestmentReportEditModal = (investment) => {
        setIsInvestorInvestmentReportEditModalOpen(true);
        setInvestment(investment)
        dispatch(getAllInvestmentReportsAsync({offset: 0, investor: investment.investor.id, investment: investment.id, entrepreneur: investment.entrepreneur.id}))
            .then((res) => {
                res.payload.results.map((reports) => {
                    editReportFormik.setValues({
                        investor: reports ? reports.investor.id || "" : "",
                        investment: reports ? reports.investment || "" : "",
                        amount_want_to_send_to_cart: reports ? reports.amount_want_to_send_to_cart || 0 : 0,
                        amount_want_to_keep_in_the_balance: reports ? reports.amount_want_to_keep_in_the_balance || 0 : 0,
                        amount_want_to_send_to_charity_fund: reports ? reports.amount_want_to_send_to_charity_fund || 0 : 0,
                        amount_want_to_send_to_debt_fund: reports ? reports.amount_want_to_send_to_debt_fund || 0 : 0,
                        note: reports ? reports.note || "" : ""
                    })
                })
            })
    };

    const handleIsInvestorInvestmentReportEditModalOk = () => {
        setIsInvestorInvestmentReportEditModalOpen(false);
        dispatch(postInvestmentReportAsync(editReportFormik.values))
            .then(() => {
                let offset = (currentPage - 1) * pageLimit;
                dispatch(
                    getAllInvestmentsAsync({"investor": id, "entrepreneur": "", "offset": offset})
                );
                dispatch(getCompanyBalanceAsync())
            })
    };

    const handleIsInvestorInvestmentReportEditModalCancel = () => {
        setIsInvestorInvestmentReportEditModalOpen(false);
    };

    // Investment Edit Modal
    const showInvestorInvestmentEditModal = (investment) => {
        setIsInvestorInvestmentEditModalOpen(true);
        setInvestment(investment)
        setAmount(investment.amount)
    };

    const handleIsInvestorInvestmentEditModalOk = () => {
        setIsInvestorInvestmentEditModalOpen(false);
        let data = {"id": investment.id, "amount": amount}
        dispatch(putInvestmentAsync(data))
            .then(() => {
                let offset = (currentPage - 1) * pageLimit;
                dispatch(
                    getAllInvestmentsAsync({"investor": id, "entrepreneur": "", "offset": offset})
                );
                dispatch(getCompanyBalanceAsync())
            })
    };

    const handleIsInvestorInvestmentEditModalCancel = () => {
        setIsInvestorInvestmentEditModalOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            investor: "",
            investment: "",
            amount_want_to_send_to_cart: 0,
            amount_want_to_keep_in_the_balance: 0,
            amount_want_to_send_to_charity_fund: 0,
            amount_want_to_send_to_debt_fund: 0,
            note: ""
        },
        onSubmit: (values) => {
            values.id = investment && investment.id
            dispatch(postInvestmentReportAsync(values))
        }
    })

    const editReportFormik = useFormik({
        initialValues: {
            investor: "",
            investment: "",
            amount_want_to_send_to_cart: 0,
            amount_want_to_keep_in_the_balance: 0,
            amount_want_to_send_to_charity_fund: 0,
            amount_want_to_send_to_debt_fund: 0,
            note: ""
        }
    })

    const changePage = (e) => {
        setCurrentPage(e);
        let offset = (e - 1) * pageLimit;
        dispatch(getAllInvestmentsAsync({"investor": id, "entrepreneur": "", "offset": offset}));
    };

    useEffect(() => {
        dispatch(getUserDetailAsync({"id": id}))

        dispatch(getAllInvestmentsAsync({"investor": id, "entrepreneur": "", "offset": 0}))
        dispatch(getCompanyBalanceAsync())
    }, [dispatch])

    return (
        <>
            <div className='mt-4 mx-4 flex flex-col'>
                <div>
                    {
                        companyBalance ? companyBalance.map((balance) => (
                            <p key={balance.id}>Sədəqə fondu: {balance.charity_fund} </p>
                        )) : ""
                    }
                </div>
                <div>
                    <div className="justify-start mb-5">
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
                {
                    isLoading ? (
                        <div className='w-full flex justify-center'>
                            <CgSpinner className='animate-spin text-lg self-center'/>
                        </div>
                    ) : (
                        <table className="table-auto w-full">
                            <thead>
                            <tr>
                                <th className="border border-slate-600">#</th>
                                <th className="border border-slate-600">Sifariş</th>
                                <th className="border border-slate-600">Sərmayə</th>
                                <th className="border border-slate-600">Qazanc</th>
                                <th className="border border-slate-600">Yekun</th>
                                <th className="border border-slate-600">İnvest tarixi</th>
                                <th className="border border-slate-600">Sifarişin başlama tarixi</th>
                                <th className="border border-slate-600">Sifarişin yekunlaşdığı tarixi</th>
                                <th className="border border-slate-600">Təsdiqlənib</th>
                                <th className="border border-slate-600">Sifariş statusu</th>
                                <th className="border border-slate-600">Hesabat</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                investments.map((investment, i) => (
                                    <tr className='text-center' key={investment.id}>
                                        <td className="border border-slate-700">{i + 1}</td>

                                        <td className="border border-slate-700">
                                            <NavLink to={`/entrepreneur-detail/${investment.entrepreneur.id}`} className="text-blue-700">
                                                {investment.entrepreneur ? investment.entrepreneur.project_name : "-"}
                                            </NavLink>
                                        </td>
                                        <td className="border border-slate-700">{investment.amount}</td>
                                        <td className="border border-slate-700">{investment.profit}</td>
                                        <td className="border border-slate-700">{investment.final_profit}</td>
                                        <td className="border border-slate-700">{investment.investment_date}</td>
                                        <td className="border border-slate-700">{investment.entrepreneur ? investment.entrepreneur.start_date : "-"}</td>
                                        <td className="border border-slate-700">{investment.entrepreneur && investment.entrepreneur.finished_date ? investment.entrepreneur.finished_date : "-"}</td>
                                        <td className="border border-slate-700">{investment.is_submitted ? <FaCheck className='success mx-14'/> :
                                            <FaXmark className='error mx-14'/>}</td>
                                        <td className="border border-slate-700">{investment.entrepreneur && investment.entrepreneur.is_finished ?
                                            <p className='error'>Bitib</p> : <p className='success'>Davam edir</p>}</td>
                                        <td className="border border-slate-700 text-sky-700 py-1">
                                            {
                                                investment.entrepreneur && investment.entrepreneur.is_finished ? (
                                                    investment.investment_report && investment.investment_report.length > 0 ?
                                                        <NavLink onClick={() => showInvestorInvestmentReportEditModal(investment)}
                                                                 className={`block rounded btn-main-bg text-center p-1 text-xs`}>Hesabatı Redaktə Et</NavLink>
                                                        :
                                                        <NavLink onClick={() => showInvestorInvestmentFinishModal(investment)}
                                                                 className={`rounded btn-main-bg text-center p-1 text-xs`}>Daxil ol</NavLink>
                                                ) : (
                                                    !investment.is_submitted ? (
                                                        <NavLink onClick={() => showInvestorInvestmentEditModal(investment)}
                                                                 className={`rounded btn-main-bg text-center p-1 text-xs`}>Redaktə</NavLink>
                                                    ) : (<p className='error'>-</p>)
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    )
                }

                <Modal
                    title={`Hesabat:`}
                    okType="default"
                    open={isInvestorInvestmentFinishModalOpen}
                    onOk={handleIsInvestorInvestmentFinishModalOk}
                    onCancel={handleIsInvestorInvestmentFinishModalCancel}
                >
                    <p className='font-bold'>Yekun məbləğ: {investment && investment.final_profit}</p>
                    <hr/>
                    <AuthInput
                        label="Kartınıza göndərilməsini istədiyiniz məbləğ:"
                        id="amount_want_to_send_to_cart"
                        name="amount_want_to_send_to_cart"
                        type="number"
                        value={formik.values.amount_want_to_send_to_cart}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.amount_want_to_send_to_cart}
                        error={formik.errors.amount_want_to_send_to_cart}
                        style={style}
                    />
                    <AuthInput
                        label="Növbəti sifarişlər üçün balansınızda qalmasını istədiyiniz məbləğ:"
                        id="amount_want_to_keep_in_the_balance"
                        name="amount_want_to_keep_in_the_balance"
                        type="number"
                        value={formik.values.amount_want_to_keep_in_the_balance}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.amount_want_to_keep_in_the_balance}
                        error={formik.errors.amount_want_to_keep_in_the_balance}
                        style={style}
                    />
                    <AuthInput
                        label="Sədəqə fonduna göndərmək istədiyiniz məbləğ:"
                        id="amount_want_to_send_to_charity_fund"
                        name="amount_want_to_send_to_charity_fund"
                        type="number"
                        value={formik.values.amount_want_to_send_to_charity_fund}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.amount_want_to_send_to_charity_fund}
                        error={formik.errors.amount_want_to_send_to_charity_fund}
                        style={style}
                    />
                    {
                        investment && investment.is_from_debt_fund ? (
                                <>
                                    <AuthInput
                                        label="Borc fonduna göndərmək istədiyiniz məbləğ:"
                                        id="amount_want_to_send_to_debt_fund"
                                        name="amount_want_to_send_to_debt_fund"
                                        type="number"
                                        value={investment.amount_from_debt_fund}
                                        onChange={() => formik.setFieldValue("amount_want_to_send_to_debt_fund", investment.amount_from_debt_fund)}
                                        onBlur={formik.handleBlur}
                                        touched={formik.touched.amount_want_to_send_to_debt_fund}
                                        error={formik.errors.amount_want_to_send_to_debt_fund}
                                        style={style}
                                        disabled={true}
                                    />
                                </>

                            )
                            :
                            (
                                <>
                                    <AuthInput
                                        label="Borc fonduna göndərmək istədiyiniz məbləğ:"
                                        id="amount_want_to_send_to_debt_fund"
                                        name="amount_want_to_send_to_debt_fund"
                                        type="number"
                                        value={formik.values.amount_want_to_send_to_debt_fund}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        touched={formik.touched.amount_want_to_send_to_debt_fund}
                                        error={formik.errors.amount_want_to_send_to_debt_fund}
                                        style={style}
                                    />
                                </>
                            )
                    }
                    <TextAreaInput
                        label="Qeyd:"
                        id="note"
                        name="note"
                        value={formik.values.note}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.note}
                        error={formik.errors.note}
                        style={style}
                    />
                </Modal>
                <Modal
                    title={`Hesabat Redaktə:`}
                    okType="default"
                    open={isInvestorInvestmentReportEditModalOpen}
                    onOk={handleIsInvestorInvestmentReportEditModalOk}
                    onCancel={handleIsInvestorInvestmentReportEditModalCancel}
                >
                    <p className='font-bold'>Yekun məbləğ: {investment && investment.final_profit}</p>
                    <hr/>
                    <AuthInput
                        label="Kartınıza göndərilməsini istədiyiniz məbləğ:"
                        id="amount_want_to_send_to_cart"
                        name="amount_want_to_send_to_cart"
                        type="number"
                        value={editReportFormik.values.amount_want_to_send_to_cart}
                        onChange={editReportFormik.handleChange}
                        onBlur={editReportFormik.handleBlur}
                        touched={editReportFormik.touched.amount_want_to_send_to_cart}
                        error={editReportFormik.errors.amount_want_to_send_to_cart}
                        style={style}
                    />
                    <AuthInput
                        label="Növbəti sifarişlər üçün balansınızda qalmasını istədiyiniz məbləğ:"
                        id="amount_want_to_keep_in_the_balance"
                        name="amount_want_to_keep_in_the_balance"
                        type="number"
                        value={editReportFormik.values.amount_want_to_keep_in_the_balance}
                        onChange={editReportFormik.handleChange}
                        onBlur={editReportFormik.handleBlur}
                        touched={editReportFormik.touched.amount_want_to_keep_in_the_balance}
                        error={editReportFormik.errors.amount_want_to_keep_in_the_balance}
                        style={style}
                    />
                    <AuthInput
                        label="Sədəqə fonduna göndərmək istədiyiniz məbləğ:"
                        id="amount_want_to_send_to_charity_fund"
                        name="amount_want_to_send_to_charity_fund"
                        type="number"
                        value={editReportFormik.values.amount_want_to_send_to_charity_fund}
                        onChange={editReportFormik.handleChange}
                        onBlur={editReportFormik.handleBlur}
                        touched={editReportFormik.touched.amount_want_to_send_to_charity_fund}
                        error={editReportFormik.errors.amount_want_to_send_to_charity_fund}
                        style={style}
                    />
                    {
                        investment && investment.is_from_debt_fund ? (
                                <>
                                    <AuthInput
                                        label="Borc fonduna göndərmək istədiyiniz məbləğ:"
                                        id="amount_want_to_send_to_debt_fund"
                                        name="amount_want_to_send_to_debt_fund"
                                        type="number"
                                        value={investment.amount_from_debt_fund}
                                        // onChange={() => formik.setFieldValue("amount_want_to_send_to_debt_fund", investment.amount_from_debt_fund)}
                                        onBlur={editReportFormik.handleBlur}
                                        touched={editReportFormik.touched.amount_want_to_send_to_debt_fund}
                                        error={editReportFormik.errors.amount_want_to_send_to_debt_fund}
                                        style={style}
                                        disabled={true}
                                    />
                                </>
                            )
                            :
                            (
                                <>
                                    <AuthInput
                                        label="Borc fonduna göndərmək istədiyiniz məbləğ:"
                                        id="amount_want_to_send_to_debt_fund"
                                        name="amount_want_to_send_to_debt_fund"
                                        type="number"
                                        value={editReportFormik.values.amount_want_to_send_to_debt_fund}
                                        onChange={editReportFormik.handleChange}
                                        onBlur={editReportFormik.handleBlur}
                                        touched={editReportFormik.touched.amount_want_to_send_to_debt_fund}
                                        error={editReportFormik.errors.amount_want_to_send_to_debt_fund}
                                        style={style}
                                    />
                                </>
                            )
                    }
                    <TextAreaInput
                        label="Qeyd:"
                        id="note"
                        name="note"
                        value={editReportFormik.values.note}
                        onChange={editReportFormik.handleChange}
                        onBlur={editReportFormik.handleBlur}
                        touched={editReportFormik.touched.note}
                        error={editReportFormik.errors.note}
                        style={style}
                    />
                </Modal>
                <Modal
                    title={`Redaktə et:`}
                    okType="default"
                    open={isInvestorInvestmentEditModalOpen}
                    onOk={handleIsInvestorInvestmentEditModalOk}
                    onCancel={handleIsInvestorInvestmentEditModalCancel}
                >
                    <AuthInput
                        label="Məbləği daxil edin:"
                        id="amount_want_to_send_to_cart"
                        name="amount_want_to_send_to_cart"
                        type="number"
                        value={amount}
                        onChange={(e) => {
                            e.preventDefault()
                            setAmount(e.target.value)
                        }}
                    />
                </Modal>
            </div>
        </>
    )
}

export default Investments