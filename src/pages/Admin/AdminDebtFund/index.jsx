import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvestmentsAsync, putInvestmentAsync, resetInvestmentSlice } from "../../../redux/InvestmentSlice/InvestmentSlice";
import ResponseMessage from "../../../components/ResponseMessage";
import { useFormik } from "formik";
import validations from "./validation";
import AuthInput from "../../../components/InputComponents/AuthInput";
import style from './style.module.css'
import { CgSpinner } from "react-icons/cg";
import RadioInput from "../../../components/InputComponents/RadioInput.jsx";


function AdminDebtFund() {
    let [currentPage, setCurrentPage] = useState(1);
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
            entrepreneur__is_finished: ""
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
        formik.values.is_from_debt_fund = true
        let filteredValues = { ...formik.values };
        dispatch(getAllInvestmentsAsync(filteredValues));
    };

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
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Sifariş bitibmi?
                            </label>
                            <div className="mt-2">
                                <RadioInput
                                    label="Davam edir"
                                    id="is_continue"
                                    name="entrepreneur__is_finished"
                                    type="radio"
                                    value={false}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Bitib"
                                    id="is_finished"
                                    name="entrepreneur__is_finished"
                                    type="radio"
                                    value={true}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Hər İkisi"
                                    id="both"
                                    name="entrepreneur__is_finished"
                                    type="radio"
                                    value={""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                {
                                    formik.touched.entrepreneur__is_finished && formik.errors.entrepreneur__is_finished && (<div className='error'>{formik.errors.entrepreneur__is_finished}</div>)
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
                                    <th className="border border-slate-600 w-20 text-xs">Ümumi gəlir</th>
                                    <th className="border border-slate-600 w-20 text-xs">Fonddan qarşılanan</th>
                                    <th className="border border-slate-600 w-20 text-xs">İnvestisiya təsdiq statusu</th>
                                    <th className="border border-slate-600 w-20 text-xs">Sifariş bitmə statusu</th>
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
                                            {investment.final_profit} AZN
                                        </td>
                                        <td className="border border-slate-700 text-xs text-center">
                                            {investment.amount_from_debt_fund} AZN
                                        </td>
                                        <td className="border border-slate-700 text-xs text-center">
                                            {investment.is_submitted ? (<p className="success">Təsdiqlənib</p>) : (<p className="error">Təsdiqlənməyib</p>)}
                                        </td>
                                        <td className="border border-slate-700 text-xs text-center">
                                            {investment.entrepreneur && investment.entrepreneur.is_finished ? (<p className="error">Bitib</p>) : (<p className="success">Davam edir</p>)}
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
