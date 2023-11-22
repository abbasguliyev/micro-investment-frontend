import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'

import { getMeAsync } from '../../../redux/AuthSlice/AuthSlice'
import { getAllInvestmentsAsync } from '../../../redux/InvestmentSlice/InvestmentSlice'

const Investments = () => {
  let [currentPage, setCurrentPage] = useState(1);
  
  const dispatch = useDispatch()
  
  let me = useSelector((state) => state.auth.me)
  let investments = useSelector((state) => state.investment.investments)
  let totalPage = useSelector((state) => state.investment.totalPage)
  let pageLimit = useSelector((state) => state.investment.pageLimit)
  
  const changePage = (e) => {
    setCurrentPage(e);
    let offset = (e - 1) * pageLimit;
    dispatch(getAllInvestmentsAsync({"investor":me?me.id:"", "entrepreneur": "", "offset": offset}));
  };

  useEffect(() => {
    dispatch(getMeAsync())
    dispatch(getAllInvestmentsAsync({"investor":me?me.id:"", "entrepreneur": "", "offset": 0}))
  }, [dispatch])

  return (
    <>
      <div className='mt-4 mx-4 flex flex-col'>
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
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border border-slate-600">Sifariş</th>
              <th className="border border-slate-600">Məbləğ</th>
              <th className="border border-slate-600">Qazanc</th>
              <th className="border border-slate-600">Yekun</th>
              <th className="border border-slate-600">İnvest tarixi</th>
              <th className="border border-slate-600">Sifarişin başlama tarixi</th>
              <th className="border border-slate-600">Sifarişin planlanan bitmə tarixi</th>
              <th className="border border-slate-600">Sifarişin yekunlaşdığı tarixi</th>
              <th className="border border-slate-600">Təsdiqlənib</th>
              <th className="border border-slate-600">Sifariş bitibmi</th>
            </tr>
          </thead>
          <tbody>
            {
              investments.map((investment) => (
                <tr className='text-center' key={investment.id}>
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
                  <td className="border border-slate-700">{investment.entrepreneur ? investment.entrepreneur.end_date : "-"}</td>
                  <td className="border border-slate-700">{investment.entrepreneur && investment.entrepreneur.finished_date ? investment.entrepreneur.finished_date : "-"}</td>
                  <td className="border border-slate-700">{investment.is_submitted ? <p className='success'>Təsdiqlənib</p> : <p className='error'>Təsdiqlənməyib</p>}</td>
                  <td className="border border-slate-700">{investment.entrepreneur && investment.entrepreneur.is_finished ? <p className='error'>Bitib</p> : <p className='success'>Davam edir</p>}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Investments