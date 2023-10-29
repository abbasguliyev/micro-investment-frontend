import React, { useEffect } from 'react'
import style from "./style.module.css"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getEntrepreneurDetailAsync } from '../../redux/EntrepreneurSlice/EntrepreneurSlice'

function EntrepreneurDetail() {
  const dispatch = useDispatch();

  const {id} = useParams()

  let entrepreneur = useSelector((state)=>state.entrepreneur.entrepreneur)

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
                <div className='w-full sm:w-full md:w-3/4 lg:w-3/4'>
                    <h4 className='text-3xl mt-10'>Açıqlama: </h4>
                    <hr className='my-5' />
                    <p>
                        {entrepreneur.description}
                    </p>
                </div>
                <div className={`w-full h-fit sm:w-full md:w-1/4 lg:w-1/4 ml-5 mt-10`}>
                    <div className={`w-full flex flex-col justify-between p-4 rounded ${style.entrepreneur_detail}`}>
                        <div>
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Sahibi:</p>
                            <span className=''>{
                              entrepreneur.owner ? <>{entrepreneur.owner.user.first_name} {entrepreneur.owner.user.last_name}</> : ""
                            }</span>
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
                            <p className='text-slate-400'>Hədəflənən məbləğ:</p>
                            <span>{entrepreneur.target_amount} AZN</span>
                          </div>
                          <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                            <p className='text-slate-400'>Toplanan məbləğ:</p>
                            <span>{entrepreneur.amount_collected} AZN</span>
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