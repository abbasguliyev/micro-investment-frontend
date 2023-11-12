import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMeAsync } from '../../../redux/AuthSlice/AuthSlice'
import { getExperiencesAsync } from '../../../redux/ExperienceSlice/ExperienceSlice'
import { Tooltip } from 'antd'

const Experience = () => {
  const dispatch = useDispatch()
  
  let me = useSelector((state) => state.auth.me)
  let experiences = useSelector((state) => state.experience.experiences)

  useEffect(() => {
    dispatch(getMeAsync())
    dispatch(getExperiencesAsync({"me":me.id}))
  }, [])

  return (
    <div className='mt-4 mx-4 flex flex-col'>
      <NavLink to="profile-update" className={`rounded btn-main-bg text-center w-40 h-10 p-2 mb-2`}>Yeni əlavə et</NavLink>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border border-slate-600">Müəsisə</th>
            <th className="border border-slate-600">Vəzifə</th>
            <th className="border border-slate-600">Açıqlama</th>
            <th className="border border-slate-600">Şəhər</th>
            <th className="border border-slate-600">Başlama tarixi</th>
            <th className="border border-slate-600">Bitmə tarixi</th>
            <th className="border border-slate-600">Davam edirmi</th>
            <th className="border border-slate-600"></th>
          </tr>
        </thead>
        <tbody>
          {
            experiences.map((experience) => (
              <tr key={experience.id}>
                <td className="border border-slate-700">{experience.experience_place}</td>
                <td className="border border-slate-700">{experience.position}</td>
                <Tooltip title={experience.description}>
                  <td className="border border-slate-700">{experience.description.length > 5 ?  `${experience.description.substring(0, 5)}...` : experience.description}</td>
                </Tooltip>
                <td className="border border-slate-700">{experience.city}</td>
                <td className="border border-slate-700">{experience.start_year}</td>
                <td className="border border-slate-700">{experience.end_year}</td>
                <td className="border border-slate-700">{experience.is_continue ? "Bəli" : "Xeyr"}</td>
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

export default Experience