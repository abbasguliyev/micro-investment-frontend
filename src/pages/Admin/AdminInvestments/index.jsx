import { Modal, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvestmentsAsync, resetInvestmentSlice } from "../../../redux/InvestmentSlice/InvestmentSlice";
import ResponseMessage from "../../../components/ResponseMessage";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import AuthInput from "../../../components/InputComponents/AuthInput";
import { useFormik } from "formik";
import validations from "./validation";
import style from './style.module.css'

function AdminInvestments() {
    let [currentPage, setCurrentPage] = useState(1);
    const [isInvestmentDeleteModalOpen, setIsInvestmentDeleteModalOpen] = useState(false);
    const [isInvestmentCreateModalOpen, setIsInvestmentCreateModalOpen] = useState(false);
    const [investmentId, setInvestmentId] = useState(null);
    const dispatch = useDispatch();

    const showInvestmentDeleteModal = (id) => {
        setIsInvestmentDeleteModalOpen(true);
        setInvestmentId(id);
    };

    const handleInvestmentDeleteModalOk = () => {
        setIsInvestmentDeleteModalOpen(false);
    };

    const handleInvestmentDeleteModalCancel = () => {
        setIsInvestmentDeleteModalOpen(false);
    };

    const showInvestmentCreateModal = () => {
        setIsInvestmentCreateModalOpen(true);
    };

    const handleInvestmentCreateModalOk = () => {
        setIsInvestmentCreateModalOpen(false);
    };

    const handleInvestmentCreateModalCancel = () => {
        setIsInvestmentCreateModalOpen(false);
    };

    let investments = useSelector((state) => state.investment.investments);
    const errorMsg = useSelector((state) => state.investment.error);
    const successMsg = useSelector((state) => state.investment.successMsg);
    let totalPage = useSelector((state) => state.investment.totalPage);
    let pageLimit = useSelector((state) => state.investment.pageLimit);

    const formik = useFormik({
        initialValues: {
            investor: "",
            entrepreneur: "",
            amount: ""
        },
        onSubmit: (values) => {
            console.log(values);
            if (values.profile_picture == "") {
                values.profile_picture = null;
            }
            let refr = [];
            values.references.map((r) => {
                refr.push(r.value)
            })
            values.references = refr
            dispatch(postRegisterAsync(values))
            .then(() => {
                navigate("/admin")
            })
            .catch((err) => {
                navigate("/admin")
            });
        },
        validationSchema: validations
    });

    useEffect(() => {
        dispatch(getAllInvestmentsAsync({offset: 0,investor: "",entrepreneur: ""}));
    }, [dispatch]);

    const changePage = (e) => {
        setCurrentPage(e);
        let offset = (e - 1) * pageLimit;
        dispatch(getAllInvestmentsAsync({offset: offset,investor: "",entrepreneur: ""}));
    };
    return (
        <div className="mt-4 mx-4 flex flex-col">
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
            <NavLink
                onClick={showInvestmentCreateModal}
                className={`rounded btn-main-bg text-center w-40 h-10 p-2 mb-2`}
            >
                Yeni əlavə et
            </NavLink>
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
                    {investments.map((investment) => (
                        <tr key={investment.id}>
                            <td className="border border-slate-700">
                                {investment.investor.user.first_name} {investment.investor.user.last_name}
                            </td>
                            <td className="border border-slate-700">
                                {investment.entrepreneur.project_name}
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
                            <td className="border border-slate-700 text-center">
                                <NavLink
                                    className={`p-2`}
                                    onClick={() => showInvestmentDeleteModal(investment.id)}
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

            <Modal
                title={`Silmək istədiyinizə əminsinizmi?`}
                okType="default"
                open={isInvestmentDeleteModalOpen}
                onOk={handleInvestmentDeleteModalOk}
                onCancel={handleInvestmentDeleteModalCancel}
            ></Modal>
            <Modal
                title={`Investisiya əlavə edin`}
                okType="default"
                open={isInvestmentCreateModalOpen}
                onOk={handleInvestmentCreateModalOk}
                onCancel={handleInvestmentCreateModalCancel}
            >
                <AuthInput
                    label="Investisiya məbləği"
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

export default AdminInvestments;
