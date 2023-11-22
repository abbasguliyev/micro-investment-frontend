import { Form, Modal, Pagination, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllInvestmentsAsync,
    postInvestmentAsync,
    putInvestmentAsync,
    resetInvestmentSlice,
} from "../../../redux/InvestmentSlice/InvestmentSlice";
import ResponseMessage from "../../../components/ResponseMessage";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import AuthInput from "../../../components/InputComponents/AuthInput";
import { setIn, useFormik } from "formik";
import validations from "./validation";
import style from "./style.module.css";
import {
    getAllEntrepreneurAsync,
    putEntrepreneurAsync,
    resetEntrepreneurSlice,
} from "../../../redux/EntrepreneurSlice/EntrepreneurSlice";
import Checkbox from "../../../components/InputComponents/Checkbox";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

function AdminEntrepreneurs() {
    let [currentPage, setCurrentPage] = useState(1);
    const [isEntrepreneurInvestmentsModalOpen, setIsEntrepreneurInvestmentsModalOpen] =useState(false);
    const [isEntrepreneurInvestmentUpdateModalOpen, setIsEntrepreneurInvestmentUpdateModalOpen] =useState(false);
    const [isEntrepreneurFinishedModalOpen, setIsEntrepreneurFinishedModalOpen] =useState(false);
    const [entrepreneurId, setEntrepreneurId] = useState(null);
    const [entrepreneur, setEntrepreneur] = useState(null);
    const [investment, setInvestment] = useState(null);
    const dispatch = useDispatch();

    let entrepreneurs = useSelector((state) => state.entrepreneur.entrepreneurs);
    const errorMsg = useSelector((state) => state.entrepreneur.error);
    const successMsg = useSelector((state) => state.entrepreneur.successMsg);
    const investmentErrorMsg = useSelector((state) => state.investment.error);
    const investmentSuccessMsg = useSelector((state) => state.investment.successMsg);
    let totalPage = useSelector((state) => state.entrepreneur.totalPage);
    let pageLimit = useSelector((state) => state.entrepreneur.pageLimit);

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

    const showEntrepreneurInvestmentUpdateModal = (investment) => {
        setIsEntrepreneurInvestmentUpdateModalOpen(true);
        setInvestment(investment)
    };

    const handleEntrepreneurInvestmentUpdateModalOk = () => {
        console.log(investment);
        console.log(entrepreneur);
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
        dispatch(
            getAllEntrepreneurAsync({
                offset: offset,
                owner: "",
                start_date: "",
                end_date: "",
                is_active: ""
            })
        );
    };

    const changeEntrepreneurActivity = (entrepreneur) => {
        dispatch(putEntrepreneurAsync({"id": entrepreneur.id, "is_active": !entrepreneur.is_active}))
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
    }
    return (
        <div className="mt-4 mx-4 flex flex-col">
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
            <table className="table-auto w-full">
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
                                Bax
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
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="border border-slate-600">Adı Soyadı</th>
                                    <th className="border border-slate-600">Sifariş</th>
                                    <th className="border border-slate-600">Yatırılan məbləğ</th>
                                    <th className="border border-slate-600">Əmsal</th>
                                    <th className="border border-slate-600">Yekun qazanc</th>
                                    <th className="border border-slate-600">İnvestisiya tarixi</th>
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
                                        <td onClick={() => showEntrepreneurInvestmentUpdateModal(investment)} className="border border-slate-700 text-center text-sky-700 cursor-pointer">
                                            Təsdiqlə
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : ""
                }
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
