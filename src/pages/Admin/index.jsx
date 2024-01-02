import React, { useEffect, useState } from 'react'
import AdminUsers from './AdminUsers';
import AdminInvestments from './AdminInvestments';
import AdminEntrepreneurs from './AdminEntrepreneurs';
import AdminInvestorPayments from './AdminInvestorPayments';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyBalanceAsync } from '../../redux/CompanyBalanceSlice/CompanyBalanceSlice';
import { getMeAsync } from '../../redux/AuthSlice/AuthSlice';
import { useNavigate } from 'react-router-dom';
import AdminDebtFund from './AdminDebtFund';

function Admin() {
  const [showTab, setShowTab] =useState(<AdminUsers />);
  const [title, setTitle] =useState("İstifadəçilər");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let companyBalance = useSelector((state) => state.companyBalance.companyBalances)
  let me = useSelector((state) => state.auth.me)


  useEffect(() => {
    dispatch(getMeAsync())
    .then((res) => {
      if(!res.payload.user.is_superuser) {
        navigate("/");
      }
    })
    dispatch(getCompanyBalanceAsync())
  }, [dispatch])


  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col'>
      <div className='w-full pt-4 mt-5 mr-2 pb-7 rounded drop-shadow-md'>
        <div>
            <button onClick={()=>{
              setShowTab(<AdminUsers/>) 
              setTitle("İstifadəçilər")
            }} className={'btn-main-bg p-2 ml-2 mt-2 rounded'}>İstifadəçilər</button>
            <button onClick={()=>{
              setShowTab(<AdminEntrepreneurs/>) 
              setTitle("Lahiyələr")
            }} className={'btn-main-bg p-2 ml-2 mt-2 rounded'}>Lahiyələr</button>
            <button onClick={()=>{
              setShowTab(<AdminInvestments/>) 
              setTitle("Pul göndərəcəklər")
            }} className={'btn-main-bg p-2 ml-2 mt-2 rounded'}>Pul göndərəcəklər</button>
            <button onClick={()=>{
              setShowTab(<AdminInvestorPayments/>) 
              setTitle("Ödəniş Hesabatı")
            }} className={'btn-main-bg p-2 ml-2 mt-2 rounded'}>Ödəniş Hesabatı</button>
            <button onClick={()=>{
              setShowTab(<AdminDebtFund/>) 
              setTitle("Fond Hesabatı")
            }} className={'btn-main-bg p-2 ml-2 mt-2 rounded'}>Fond Hesabatı</button>
        </div>
        {
          companyBalance ? companyBalance.map((balance) => (
            <div key={balance.id} className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col text-lg text-xl font-bold'>
              <p>Sədəqə fondu: {balance.charity_fund} AZN</p>
              <p>Borc Fondu: {balance.debt_fund} AZN</p> 
              <p>Fondun ümumi balansı: {parseFloat(balance.debt_fund) + parseFloat(balance.charity_fund)} AZN</p> 
            </div>
          )) : ""
        }
        <div>
          <h4 className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col text-lg text-xl font-bold'>{title}</h4>
          <hr className='mb-10'/>
          {
            showTab
          }
        </div>
      </div>
    </div>
  )
}
export default Admin