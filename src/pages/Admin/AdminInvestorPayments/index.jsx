import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvestmentsAsync, resetInvestmentSlice } from "../../../redux/InvestmentSlice/InvestmentSlice";
import ResponseMessage from "../../../components/ResponseMessage";
import { useFormik } from "formik";
import validations from "./validation";

function AdminInvestorPayments() {
    let [currentPage, setCurrentPage] = useState(1);
    const [isInvestmentDeleteModalOpen, setIsInvestmentDeleteModalOpen] = useState(false);
    const [isInvestmentCreateModalOpen, setIsInvestmentCreateModalOpen] = useState(false);
    const [investmentId, setInvestmentId] = useState(null);
    const dispatch = useDispatch();
    
    let investments = useSelector((state) => state.investment.investments);
    const errorMsg = useSelector((state) => state.investment.error);
    const successMsg = useSelector((state) => state.investment.successMsg);
    let totalPage = useSelector((state) => state.investment.totalPage);
    let pageLimit = useSelector((state) => state.investment.pageLimit);


    useEffect(() => {
        dispatch(getAllInvestmentsAsync({offset: 0,investor: "",entrepreneur: ""}));
    }, [dispatch]);

    const changePage = (e) => {
        setCurrentPage(e);
        let offset = (e - 1) * pageLimit;
        dispatch(getAllInvestmentsAsync({offset: offset,investor: "",entrepreneur: ""}));
    };
    return (
        // <div className="mt-4 mx-4 flex flex-col">
        //     {errorMsg && (
        //         <ResponseMessage
        //             message={errorMsg}
        //             type="error"
        //             slice={resetInvestmentSlice()}
        //         />
        //     )}
        //     {successMsg && (
        //         <ResponseMessage
        //             message={successMsg}
        //             type="success"
        //             slice={resetInvestmentSlice()}
        //         />
        //     )}
        //     <table className="table-auto w-full text-center">
        //         <thead>
        //             <tr>
        //                 <th className="border border-slate-600">Adı Soyadı</th>
        //                 <th className="border border-slate-600">Sifariş</th>
        //                 <th className="border border-slate-600">Yatırılan məbləğ</th>
        //                 <th className="border border-slate-600">Əmsal</th>
        //                 <th className="border border-slate-600">Yekun qazanc</th>
        //                 <th className="border border-slate-600">İnvestisiya tarixi</th>
        //                 <th className="border border-slate-600">Aktiv/Deaktiv</th>
        //                 {/* <th className="border border-slate-600"></th> */}
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {investments.map((investment) => (
        //                 <tr key={investment.id}>
        //                     <td className="border border-slate-700">
        //                         {investment.investor.user.first_name} {investment.investor.user.last_name}
        //                     </td>
        //                     <td className="border border-slate-700">
        //                         {investment.entrepreneur.project_name}
        //                     </td>
        //                     <td className="border border-slate-700">
        //                         {investment.amount}
        //                     </td>
        //                     <td className="border border-slate-700">
        //                         {investment.profit}
        //                     </td>
        //                     <td className="border border-slate-700">
        //                         {investment.final_profit}
        //                     </td>
        //                     <td className="border border-slate-700">
        //                         {investment.investment_date}
        //                     </td>
        //                     <td className="border border-slate-700">
        //                         {investment.is_submitted ? (<p className="success">Aktiv</p>) : (<p className="error">Deaktiv</p>)}
        //                     </td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        //     {/* ***************** Pagination ********************* */}
        //     <div>
        //         <div className="flex justify-center mt-10">
        //             <Pagination
        //                 onChange={(e) => {
        //                     changePage(e);
        //                 }}
        //                 className="pagination"
        //                 current={currentPage}
        //                 total={totalPage}
        //                 defaultPageSize={pageLimit}
        //                 showSizeChanger={false}
        //             />
        //         </div>
        //     </div>
        // </div>
        <div>
            <p className="text-center font-bold">Yaxında gələcək</p>
        </div>
    );
}

export default AdminInvestorPayments;
