import {useEffect,} from 'react'

import {useDispatch, useSelector} from 'react-redux';
import {getCompanyBalanceAsync} from '../../redux/CompanyBalanceSlice/CompanyBalanceSlice';
import {getMeAsync} from '../../redux/AuthSlice/AuthSlice';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';

function Admin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    console.log(path)

    let companyBalance = useSelector((state) => state.companyBalance.companyBalances)

    useEffect(() => {
        dispatch(getMeAsync())
            .then((res) => {
                if (!res.payload.user.is_superuser) {
                    navigate("/");
                }
            })
        dispatch(getCompanyBalanceAsync())
    }, [dispatch])


    return (
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col'>
            <div className='w-full pt-4 mt-5 mr-2 pb-7 rounded drop-shadow-md'>
                <div>
                    <NavLink to={"admin/users"} className={`${path.includes('users') ? "active-btn-main-bg" : "btn-main-bg"} p-2 ml-2 mt-2 rounded`}>İstifadəçilər</NavLink>
                    <NavLink to={"admin/entrepreneurs"} className={`${path.includes('entrepreneurs') ? "active-btn-main-bg" : "btn-main-bg"} p-2 ml-2 mt-2 rounded`}>Lahiyələr</NavLink>
                    <NavLink to={"admin/investments"} className={`${path.includes('investments') ? "active-btn-main-bg" : "btn-main-bg"} p-2 ml-2 mt-2 rounded`}>Pul göndərəcəklər</NavLink>
                    <NavLink to={"admin/investor-payments"} className={`${path.includes('investor-payments') ? "active-btn-main-bg" : "btn-main-bg"} p-2 ml-2 mt-2 rounded`}>Ödəniş Hesabatı</NavLink>
                    <NavLink to={"admin/debt-fund"} className={`${path.includes('debt-fund') ? "active-btn-main-bg" : "btn-main-bg"} p-2 ml-2 mt-2 rounded`}>Fond Hesabatı</NavLink>
                </div>
                {
                    companyBalance ? companyBalance.map((balance) => (
                        <div key={balance.id} className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col text-lg text-xl font-bold'>
                            <p className={`text-sm`}>Fonddakı sədəqə: {balance.charity_fund} AZN</p>
                            <p className={`text-sm`}>Fonddakı borc: {balance.debt_fund} AZN</p>
                            <p className={`text-sm`}>Fondun ümumi balansı: {parseFloat(balance.debt_fund) + parseFloat(balance.charity_fund)} AZN</p>
                            <p className={`text-sm`}>Fonddan ümumi qarşılanan: {balance.total_fund_money} AZN</p>
                        </div>
                    )) : ""
                }
            </div>
        </div>
    )
}

export default Admin