import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMeAsync } from '../../../redux/AuthSlice/AuthSlice'
import { getEducationsAsync } from '../../../redux/EducationSlice/EducationSlice'

const Education = () => {
  const dispatch = useDispatch()
  
  let me = useSelector((state) => state.auth.me)
  let educations = useSelector((state) => state.education.educations)

  useEffect(() => {
    dispatch(getMeAsync())
    dispatch(getEducationsAsync({"me":me.id}))
  }, [])

  return (
    <div className='mt-4 mx-4 flex flex-col'>
      <NavLink to="profile-update" className={`rounded btn-main-bg text-center w-40 h-10 p-2 mb-2`}>Yeni əlavə et</NavLink>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border border-slate-600">Təhsil aldığı yer</th>
            <th className="border border-slate-600">Sahə</th>
            <th className="border border-slate-600">Şəhər</th>
            <th className="border border-slate-600">Başlama tarixi</th>
            <th className="border border-slate-600">Bitmə tarixi</th>
            <th className="border border-slate-600">Davam edirmi</th>
            <th className="border border-slate-600"></th>
          </tr>
        </thead>
        <tbody>
          {
            educations.map((education) => (
              <tr key={education.id}>
                <td className="border border-slate-700">{education.education_place}</td>
                <td className="border border-slate-700">{education.education_branch}</td>
                <td className="border border-slate-700">{education.city}</td>
                <td className="border border-slate-700">{education.start_year}</td>
                <td className="border border-slate-700">{education.end_year}</td>
                <td className="border border-slate-700">{education.is_continue ? "Bəli" : "Xeyr"}</td>
                <td className='border-r border-b border-slate-700 flex justify-center'>
                  <NavLink to="profile-update" className={`px-2 mx-2`}><img className='w-5 h-10 edit' src='/src/assets/icons/edit-icon.svg' alt="" /></NavLink>
                  <NavLink to="profile-update" className={`px-2 mx-2`}><img className='w-5 h-10 delete' src='/src/assets/icons/remove.svg' alt="" /></NavLink>
                </td>
              </tr>
            ))
          }
          
          
        </tbody>
      </table>
    </div>
  )
}

export default Education