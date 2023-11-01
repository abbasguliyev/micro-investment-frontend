import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import style from "./style.module.css"
import { getAllEntrepreneurAsync } from '../../redux/EntrepreneurSlice/EntrepreneurSlice';
import { getMeAsync } from '../../redux/AuthSlice/AuthSlice';
import { Pagination, DatePicker, Space } from 'antd';
import EntrepreneurDetail from '../EntrepreneurDetail';


function Home() {
  let [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch()
  let entrepreneurs = useSelector((state) => state.entrepreneur.entrepreneurs)
  let totalPage = useSelector((state) => state.entrepreneur.totalPage)
  let pageLimit = useSelector((state) => state.entrepreneur.pageLimit)
  const { RangePicker } = DatePicker;

  const formik = useFormik({
    initialValues: {
      offset: "",
      start_date: "",
      end_date: "",
    },
    onSubmit: (values) => {
      values.start_date = startDate;
      values.end_date = endDate;
      let filteredValues = { ...values };
      dispatch(getAllEntrepreneurAsync(filteredValues));
    },
  })

  useEffect((values) => {
    let filteredValues = { ...formik.values };
    dispatch(getAllEntrepreneurAsync(filteredValues));
    dispatch(getMeAsync());

  }, [dispatch])


  const changePage = (e) => {
      setCurrentPage(e);
      let offset = (e - 1) * pageLimit;
      formik.values.offset = offset;
      let filteredValues = { ...formik.values };
      dispatch(getAllEntrepreneurAsync(filteredValues));
  };
  
  return (
    <>
      <header className="bg-white shadow place-items-start">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">İnvestisiyalar</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col">
          <div className='w-full flex flex-row flex-wrap'>
            <div className="w-full sm:w-full md:w-1/4 lg:w-1/4">
              <form className='rounded h-2/4 mb-5 mt-2 flex flex-col' onSubmit={formik.handleSubmit}>
                <DatePicker
                  placeholder="Başlanğıc tarix"
                  className="select-time mb-2"
                  onChange={(e) => (e ? setStartDate(`${e.$y}-${e.$M + 1}-${e.$D}`): setStartDate(""))}
                  format="YYYY-MM-DD"
                />
                <DatePicker
                  placeholder="Son tarix"
                  className="select-time"
                  onChange={(e) => (e ? setEndDate(`${e.$y}-${e.$M + 1}-${e.$D}`): setEndDate(""))}
                  format="YYYY-MM-DD"
                />
                <button type='submit' className={`${style.search_btn} btn-main-bg rounded mt-4`}>Axtar</button>
              </form>
            </div>

            <div className="w-full sm:w-full md:w-3/4 lg:w-3/4 grid gap-4 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                {
                  entrepreneurs.map((entrepreneur) => (
                    <div key={entrepreneur.id} className="w-100 m-2 shadow rounded flex flex-row">
                      {
                       entrepreneur.images.length > 0 ? entrepreneur.images.slice(0, 1).map((image) => (
                        <img key={image.id} src={image.image} alt="" className='w-1/3 rounded' />
                       )) : <img src="src/assets/images/default.jpg" alt="test" className='w-1/3 rounded' />
                      }
                      <div className='w-full m-2 flex flex-col justify-between'>
                        <div>
                          <p className='font-extrabold'>{entrepreneur.project_name}</p>
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Sahibi:</p>
                            <span className=''>{entrepreneur.owner.user.first_name} {entrepreneur.owner.user.last_name}</span>
                          </div>
                          
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Başlanğıc tarixi:</p>
                            <span>{entrepreneur.start_date}</span>
                          </div>
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Bitmə tarixi:</p>
                            <span>{entrepreneur.end_date}</span>
                          </div>
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Ümumi investisiya:</p>
                            <span>{entrepreneur.total_investment} AZN</span>
                          </div>
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Toplanan məbləğ:</p>
                            <span>{entrepreneur.amount_collected} AZN</span>
                          </div>
                        </div>
                        <NavLink to={`/entrepreneur-detail/${entrepreneur.id}`} className={`${style.entrepreneur_detail_btn} btn-main-bg self-end rounded mt-4`}>
                          Ətraflı
                        </NavLink>
                      </div>
                    </div>
                  ))
                }
            </div>
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
      </main>
    </>
  )
}

export default Home