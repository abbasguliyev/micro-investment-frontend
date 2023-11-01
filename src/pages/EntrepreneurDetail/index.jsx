import React, { useEffect } from 'react'
import style from "./style.module.css"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getEntrepreneurDetailAsync } from '../../redux/EntrepreneurSlice/EntrepreneurSlice'
import { getMeAsync } from '../../redux/AuthSlice/AuthSlice'

function EntrepreneurDetail() {
  const dispatch = useDispatch();

  const {id} = useParams()

  let entrepreneur = useSelector((state)=>state.entrepreneur.entrepreneur)
  let me = useSelector((state)=>state.auth.me)

  useEffect(()=>{
    dispatch(getEntrepreneurDetailAsync(id))
  },[])
  

  return (
    <>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 w-full">
            <h1 className='text-6xl text-center mt-10'>{entrepreneur.project_name}</h1>
            <hr className='m-10' />
            <div className='mx-auto flex flex-col md:flex-row lg:flex-row'>
                <div className='h-96 flex flex-row md:flex-col mr-2 order-2 md:order-1 scroll-smooth overflow-y-auto overflow-x-hidden overflow-hidden'>
                    {
                      entrepreneur.images ? (
                        <>
                          {
                            entrepreneur.images.map((image) => (
                              <img key={image.id} className='w-40 mb-2 mr-2 mt-2 md:mt-0 rounded cursor-pointer' src={image.image} alt="" />
                            ))
                          }
                        </>
                      ):""
                    }
                </div>
                <div className='w-full h-96 order-1 md:order-2'>
                  {
                      entrepreneur.images && entrepreneur.images.length > 0 ? (
                        <>
                          {
                            <img className='w-full h-96 object-cover rounded cursor-pointer' src={entrepreneur.images[0].image} alt="" />
                          }
                        </>
                      ):<img className='w-full h-96 object-cover rounded cursor-pointer' src="" alt="" />
                    }
                </div>
            </div>
            <div className='flex flex-col md:flex-row lg:flex-row'>
                <div className='w-full sm:w-full md:w-2/3 lg:w-2/3'>
                    <h4 className='text-3xl mt-10'>Açıqlama: </h4>
                    <hr className='my-5' />
                    <p>
                        {entrepreneur.description}
                    </p>
                </div>
                <div className={`w-full h-fit sm:w-full md:w-1/3 lg:w-1/3 ml-5 mt-10`}>
                    <div className={`w-full flex flex-col justify-between p-4 rounded ${style.entrepreneur_detail}`}>
                        <div>
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Sahibi:</p>
                            <b className=''>{
                              entrepreneur.owner ? <>{entrepreneur.owner.user.first_name} {entrepreneur.owner.user.last_name}</> : ""
                            }</b>
                          </div>
                          
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Başlanğıc tarixi:</p>
                            <b>{entrepreneur.start_date}</b>
                          </div>
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Bitmə tarixi:</p>
                            <b>{entrepreneur.end_date}</b>
                          </div>
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Ümumi investisiya:</p>
                            <b>{entrepreneur.total_investment} AZN</b>
                          </div>
                          {
                              me ?
                              <>
                              {
                                me.user ? 
                                <>
                                  {
                                    me.user.is_staff ? 
                                    <>
                                      <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                        <p className='text-slate-400'>Ümumi gəlir:</p>
                                        <b>{entrepreneur.gross_income} AZN</b>
                                      </div>
                                      <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                        <p className='text-slate-400'>Platforma xərci: ({entrepreneur.platform_cost_percentage}%)</p>
                                        <b>{entrepreneur.platform_cost} AZN</b>
                                      </div>
                                      <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                        <p className='text-slate-400'>Yekun mənfəət:</p>
                                        <b>{entrepreneur.final_profit} AZN</b>
                                      </div>
                                      <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                        <p className='text-slate-400'>İnvestorun payı: ({entrepreneur.investor_share_percentage}%)</p>
                                        <b>{entrepreneur.investor_share} AZN</b>
                                      </div>
                                      <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                        <p className='text-slate-400'>Formaçının payı: ({entrepreneur.entrepreneur_share_percentage}%)</p>
                                        <b>{entrepreneur.entrepreneur_share} AZN</b>
                                      </div>
                                      <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                        <p className='text-slate-400'>Fonda borc: ({entrepreneur.debt_to_the_fund_percentage}%)</p>
                                        <b>{entrepreneur.debt_to_the_fund} AZN</b>
                                      </div>
                                      <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                        <p className='text-slate-400'>Fonda sədəqə: ({entrepreneur.charity_to_the_fund_percentage}%)</p>
                                        <b>{entrepreneur.charity_to_the_fund} AZN</b>
                                      </div>
                                    </> : ""
                                  }
                                </> : ""
                              }
                              </> : ""
                            }
                          
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Mənfəət əmsalı:</p>
                            <b>{entrepreneur.profit_ratio} AZN</b>
                          </div>
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Toplanan məbləğ:</p>
                            <b>{entrepreneur.amount_collected} AZN</b>
                          </div>
                        </div>
                    </div>
                    <form className={`${style.entrepreneur_invest_form} ${style.entrepreneur_detail} mt-3 w-full flex flex-col justify-between p-4 rounded`}>
                        <label htmlFor="invest_amount">Yatırım məbləği:</label>
                        <input id='invest_amount' type="number" step="0.01" min={0}/>
                        <button className='rounded'>Yatırım et</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default EntrepreneurDetail