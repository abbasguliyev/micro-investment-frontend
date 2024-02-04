import {useEffect, useState} from 'react'
import {NavLink, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Modal, Pagination} from 'antd'

import {getUserDetailAsync} from '../../../redux/AuthSlice/AuthSlice'
import {getAllInvestmentsAsync, putInvestmentAsync} from '../../../redux/InvestmentSlice/InvestmentSlice'
import {FaCheck} from "react-icons/fa";
import {FaXmark} from "react-icons/fa6";
import {getCompanyBalanceAsync} from '../../../redux/CompanyBalanceSlice/CompanyBalanceSlice'
import {CgSpinner} from 'react-icons/cg'

const PaymentTable = () => {
    let {id} = useParams();
    let [currentPage, setCurrentPage] = useState(1);
    const [amount, setAmount] = useState(0);
    const [investment, setInvestment] = useState(null);
    const [isSendAmountModalOpen, setIsSendAmountModalOpen] = useState(false);

    const dispatch = useDispatch()
    let investments = useSelector((state) => state.investment.investments)
    let isLoading = useSelector((state) => state.investment.isLoading)
    let totalPage = useSelector((state) => state.investment.totalPage)
    let pageLimit = useSelector((state) => state.investment.pageLimit)
    let companyBalance = useSelector((state) => state.companyBalance.companyBalances)

    const showSendAmountModal = (investment) => {
        setIsSendAmountModalOpen(true);
        setInvestment(investment)
        setAmount(investment.amount)
    };

    const handleSendAmountModalOk = () => {
        setIsSendAmountModalOpen(false);
        dispatch(putInvestmentAsync({id: investment.id, is_amount_sended: true}))
            .then(() => {
                let offset = (currentPage - 1) * pageLimit;
                dispatch(
                    getAllInvestmentsAsync({"investor": id, "entrepreneur": "", "offset": offset, "amount_must_send__gt": "0.00"})
                );
                dispatch(getCompanyBalanceAsync())
                dispatch(getUserDetailAsync({"id": id}))
            })
    };

    const handleSendAmountModalCancel = () => {
        setIsSendAmountModalOpen(false);
    };

    const changePage = (e) => {
        setCurrentPage(e);
        let offset = (e - 1) * pageLimit;
        dispatch(getAllInvestmentsAsync({"investor": id, "entrepreneur": "", "offset": offset, "amount_must_send__gt": "0.00"}));
    };

    useEffect(() => {
        dispatch(getUserDetailAsync({"id": id}))

        dispatch(getAllInvestmentsAsync({"investor": id, "entrepreneur": "", "offset": 0, "amount_must_send__gt": "0.00"}))
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
                                <th className="border border-slate-600">Göndərilməli olan məbləğ</th>
                                <th className="border border-slate-600">İnvest tarixi</th>
                                <th className="border border-slate-600">Göndərilmə statusu</th>
                                <th className="border border-slate-600">Admin təsdiqləmə statusu</th>
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
                                        <td className="border border-slate-700">
                                            {investment.amount_must_send}
                                        </td>
                                        <td className="border border-slate-700">{investment.investment_date}</td>
                                        <td className="border border-slate-700 py-2 w-40">
                                            {
                                                investment.is_amount_sended || investment.amount_must_send == 0 ? (
                                                    <FaCheck className='success mx-20'/>
                                                ) : (
                                                    <NavLink onClick={() => showSendAmountModal(investment)}
                                                             className={`inline-block rounded btn-main-bg text-center p-1 text-xs`}>Ödənişi göndər</NavLink>
                                                )
                                            }
                                        </td>
                                        <td className="border border-slate-700 py-2 w-40">
                                            {
                                                investment.is_amount_sended_submitted ? (
                                                    <FaCheck className='success mx-20'/>
                                                ) : (
                                                    <FaXmark className='error mx-20'/>
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
                    title={`Əməliyyatı yerinə yetirmək istədiyinizdən əminsinizmi?`}
                    okType="default"
                    open={isSendAmountModalOpen}
                    onOk={handleSendAmountModalOk}
                    onCancel={handleSendAmountModalCancel}
                >
                </Modal>
            </div>
        </>
    )
}

export default PaymentTable