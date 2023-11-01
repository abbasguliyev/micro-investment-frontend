import React from 'react'
import { NavLink, useLocation, Routes, Route } from 'react-router-dom'


const Education = () => {
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
          <tr>
            <td className="border border-slate-700">Indiana</td>
            <td className="border border-slate-700">Indianapolis</td>
            <td className="border border-slate-700">Indiana</td>
            <td className="border border-slate-700">Indianapolis</td>
            <td className="border border-slate-700">Indiana</td>
            <td className="border border-slate-700">Indianapolis</td>
            <td className='border-r border-b border-slate-700 flex justify-center'>
              <NavLink to="profile-update" className={`px-2 mx-2`}><img className='w-5 h-10 edit' src='/src/assets/icons/edit-icon.svg' alt="" /></NavLink>
              <NavLink to="profile-update" className={`px-2 mx-2`}><img className='w-5 h-10 delete' src='/src/assets/icons/remove.svg' alt="" /></NavLink>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-700">Ohio</td>
            <td className="border border-slate-700">Columbus</td>
            <td className="border border-slate-700">Indiana</td>
            <td className="border border-slate-700">Indianapolis</td>
            <td className="border border-slate-700">Indiana</td>
            <td className="border border-slate-700">Indianapolis</td>
            <td className='border-r border-b border-slate-700 flex justify-center'>
              <NavLink to="profile-update" className={`px-2 mx-2`}><img className='w-5 h-10' src='/src/assets/icons/edit-icon.svg' alt="" /></NavLink>
              <NavLink to="profile-update" className={`px-2 mx-2`}><img className='w-5 h-10 text-red-600' src='/src/assets/icons/remove.svg' alt="" /></NavLink>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-700">Michigan</td>
            <td className="border border-slate-700">Detroit</td>
            <td className="border border-slate-700">Indiana</td>
            <td className="border border-slate-700">Indianapolis</td>
            <td className="border border-slate-700">Indiana</td>
            <td className="border border-slate-700">Indianapolis</td>
            <td className='border-r border-b border-slate-700 flex justify-center'>
              <NavLink to="profile-update" className={`px-2 mx-2`}><img className='w-5 h-10' src='/src/assets/icons/edit-icon.svg' alt="" /></NavLink>
              <NavLink to="profile-update" className={`px-2 mx-2`}><img className='w-5 h-10 text-red-600' src='/src/assets/icons/remove.svg' alt="" /></NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Education