import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EntreprenuerTable from '../../components/Profile/EntreprenuerTable'
import Education from '../../components/Profile/Education'
import Experience from '../../components/Profile/Experience'
import { getMeAsync, resetAuthSlice } from '../../redux/AuthSlice/AuthSlice'
import Investments from '../../components/Profile/Investments'
import ResponseMessage from '../../components/ResponseMessage'
import { resetEducationSlice } from '../../redux/EducationSlice/EducationSlice'
import { resetExperienceSlice } from '../../redux/ExperienceSlice/ExperienceSlice'

function Profile() {
  const [showTab, setShowTab] =useState(<Investments/>);
  const [title, setTitle] =useState("Yatırımlarım");

  const dispatch = useDispatch()
  
  let me = useSelector((state) => state.auth.me)
  let successMsg = useSelector((state) => state.auth.successMsg)
  let errorMsg = useSelector((state) => state.auth.error)
  let educationSuccessMsg = useSelector((state) => state.education.successMsg)
  let educationErrorMsg = useSelector((state) => state.education.error)
  let experienceSuccessMsg = useSelector((state) => state.experience.successMsg)
  let experienceErrorMsg = useSelector((state) => state.experience.error)
  let investmentSuccessMsg = useSelector((state) => state.investment.successMsg)
  let investmentErrorMsg = useSelector((state) => state.investment.error)

  useEffect(() => {
    dispatch(getMeAsync())
  }, [])
  
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 w-full">
      {errorMsg && (<ResponseMessage message={errorMsg} type="error" slice={resetAuthSlice()} />)}
      {successMsg && (<ResponseMessage message={successMsg} type="success" slice={resetAuthSlice()} />)}
      {educationErrorMsg && (<ResponseMessage message={educationErrorMsg} type="error" slice={resetEducationSlice()} />)}
      {educationSuccessMsg && (<ResponseMessage message={educationSuccessMsg} type="success" slice={resetEducationSlice()} />)}
      {experienceErrorMsg && (<ResponseMessage message={experienceErrorMsg} type="error" slice={resetExperienceSlice()} />)}
      {experienceSuccessMsg && (<ResponseMessage message={experienceSuccessMsg} type="success" slice={resetExperienceSlice()} />)}
      {investmentErrorMsg && (<ResponseMessage message={investmentErrorMsg} type="error" slice={resetEducationSlice()} />)}
      {investmentSuccessMsg && (<ResponseMessage message={investmentSuccessMsg} type="success" slice={resetEducationSlice()} />)}
      
      <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row'>
        <div className='w-full sm:w-full md:w-2/5 lg:w-2/5 xl:md:w-2/5 h-96 border mr-2 mb-2 rounded drop-shadow'>
          {
            me ?
            <img src={me.profile_picture} alt="default" className='w-full h-full object-cover rounded' />
            : <img src="/src/assets/images/default_avatar.png" alt="default" className='w-full h-full object-cover rounded' />
          }
        </div>
        <div className='w-full sm:w-full md:w-3/5 lg:w-3/5 xl:md:w-3/5 h-96 mb-2 border rounded drop-shadow-md'>
          <div className='w-full h-20 mb-20 md:mb-20 lg:mb-20 xl:mb-4 flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
            <div>
              <p className='md:text-4xl lg:text-4xl xl:text-5xl m-4'>
                {
                  me ? <>
                    {
                      me.user ? <>
                        {me.user.first_name} {me.user.last_name}
                      </> : ""
                    }
                  </>:""
                }
              </p>
              <p className='md:text-1xl lg:text-1xl xl:text-2xl m-4'>Balans: {me && me.user ? me.user.balance : 0} AZN</p>
            </div>
            <NavLink to="profile-update" className={`rounded btn-main-bg w-50 h-10 p-2 m-4`}>Məlumatları Dəyiş</NavLink>
          </div>
          <div className={`w-full h-72 flex flex-col justify-between p-4 rounded overflow-auto`}>
              <div className='mb-20 md:mb-20 lg:mb-20 xl:mb-4 overflow-auto'>
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Email:</p>
                  <span>
                    {
                      me ? <>
                        {
                          me.user ? <>
                            {me.user.email}
                          </> : ""
                        }
                      </>:"-"
                    }
                  </span>
                </div>
                <hr />
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Telefon nömrəsi:</p>
                  <span>
                    {
                      me ? <>{me.phone_number}</> : "-"
                    }
                  </span>
                </div>
                <hr />
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Doğum tarixi:</p>
                  <span>
                    {
                      me ? <>{me.birthdate}</> : "-"
                    } 
                  </span>
                </div>
                <hr />
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Ünvan:</p>
                  <span>
                    {
                      me ? <>{me.address}</> : "-"
                    }
                  </span>
                </div>
                <hr />
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Evlilik statusu:</p>
                  <span>
                    {
                      me ? <>
                        {
                          me.marital_status === "single" ? "Subay" : "Evli"
                        }
                      </> : "-"
                    }
                  </span>
                </div>
                <hr />
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>İşləmə statusu:</p>
                  <span>
                    {
                      me ? <>
                        {
                          me.employment_status === "working" ? "İşləyir" : "İşləmir"
                        }
                      </> : "-"
                    }
                  </span>
                </div>
                <hr />
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Ev statusu:</p>
                  <span>
                    {
                      me ? <>
                        {
                          me.housing_status === "own home" ? "Şəxsi ev" : "Kirayə"
                        }
                      </> : "-"
                    }
                  </span>
                </div>
                <hr />
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Kredit kartı nömrəsi:</p>
                  <span>
                    {
                      me ? <>{me.credit_cart_number}</> : "-"
                    }
                  </span>
                </div>
                <hr />
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-col'>
                  <p className='text-slate-400'>Haqqında:</p>
                  <span className='place-items-end'>
                    {
                      me ? <>{
                        me.about ? <>{me.about}</> : "-"
                      }</> : "-"
                    }
                  </span>
                </div>
                <hr />
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-col'>
                  <p className='text-slate-400'>Biznes fəaliyytələri:</p>
                  <span className='place-items-end'>
                    {
                      me ? <>{
                        me.business_activities ? <>{me.business_activities}</> : "-"
                      }</> : "-"
                    }
                  </span>
                </div>
                <hr />
              </div>
          </div>
        </div>
      </div>
      <div className='w-full h-96 border pt-4 mt-5 mr-2 pb-7 rounded drop-shadow-md overflow-auto'>
        <div>
            <button onClick={()=>{
              setShowTab(<Investments/>)
              setTitle("Yatırımlarım")
            }} className={`p-2 ml-2 rounded btn-main-bg`}>Yatırımlarım</button>
            <button onClick={()=>{
              setShowTab(<EntreprenuerTable/>)
              setTitle("Lahiyələrim")
            }} className={`p-2 ml-2 rounded btn-main-bg`}>Lahiyələrim</button>
            <button onClick={()=>{
              setShowTab(<Education/>)
              setTitle("Təhsilim")
            }} className={`p-2 ml-2 rounded btn-main-bg`}>Təhsilim</button>
            <button onClick={()=>{
              setShowTab(<Experience/>)
              setTitle("Təcrübələrim")
            }} className={`p-2 ml-2 rounded btn-main-bg`}>Təcrübələrim</button>
        </div>
        <div>
          <h4 className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col text-lg text-xl font-bold'>{title}</h4>

          {
            showTab
          }
        </div>
      </div>
    </div>
  )
}

export default Profile