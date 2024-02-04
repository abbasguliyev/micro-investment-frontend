import { useEffect, useState } from 'react'
import {NavLink, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'
import { getUserDetailAsync } from '../../../redux/AuthSlice/AuthSlice'
import { getAllEntrepreneurAsync } from '../../../redux/EntrepreneurSlice/EntrepreneurSlice'
import { CgSpinner } from 'react-icons/cg'

const EntreprenuerTable = () => {
  let {id} = useParams();
  let [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch()

  let entrepreneurs = useSelector((state) => state.entrepreneur.entrepreneurs)
  let isLoading = useSelector((state) => state.entrepreneur.isLoading)
  let totalPage = useSelector((state) => state.entrepreneur.totalPage)
  let pageLimit = useSelector((state) => state.entrepreneur.pageLimit)

  const changePage = (e) => {
    setCurrentPage(e);
    let offset = (e - 1) * pageLimit;
    dispatch(getAllEntrepreneurAsync({owner: id, offset: offset, start_date: "", end_date: ""}));
  };

  useEffect(() => {
    dispatch(getUserDetailAsync({"id": id}))
    dispatch(getAllEntrepreneurAsync({owner: id, offset: 0, start_date: "", end_date: ""}))
  }, [])

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
        {
          isLoading ? (
            <div className='w-full flex justify-center'>
                <CgSpinner className='animate-spin text-lg self-center'/>
            </div>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border border-slate-600">Adı</th>
                  <th className="border border-slate-600">Ümumi investisiya</th>
                  <th className="border border-slate-600">Ümumi gəlir</th>
                  <th className="border border-slate-600">Yekun mənfəət</th>
                  <th className="border border-slate-600">Yekunlaşma tarixi</th>
                  <th className="border border-slate-600">Başlama tarixi</th>
                  <th className="border border-slate-600">Bitmə tarixi</th>
                  <th className="border border-slate-600">Aktiv/deaktiv</th>
                  <th className="border border-slate-600">Davam edirmi</th>
                </tr>
              </thead>
              <tbody>
                {
                  entrepreneurs.map((entrepreneur) => (
                    <tr key={entrepreneur.id}>
                      <td className="border border-slate-700">
                        <NavLink to={`/entrepreneur-detail/${entrepreneur.id}`} className="text-blue-700">
                          {entrepreneur.project_name}
                        </NavLink>
                      </td>
                      <td className="border border-slate-700">{entrepreneur.total_investment}</td>
                      <td className="border border-slate-700">{entrepreneur.gross_income}</td>
                      <td className="border border-slate-700">{entrepreneur.final_profit}</td>
                      <td className="border border-slate-700">{entrepreneur.finished_date}</td>
                      <td className="border border-slate-700">{entrepreneur.start_date}</td>
                      <td className="border border-slate-700">{entrepreneur.end_date}</td>
                      <td className="border border-slate-700">{entrepreneur.is_active ? <p className='success'>Aktiv</p> : <p className='error'>Deaktiv</p>}</td>
                      <td className="border border-slate-700">{entrepreneur.is_finished ? <p className='error'>Bitib</p> : <p className='success'>Davam edir</p>}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
    </>
  )
}

export default EntreprenuerTable