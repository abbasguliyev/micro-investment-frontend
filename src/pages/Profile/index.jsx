import React from 'react'
import { NavLink, useLocation, Routes, Route } from 'react-router-dom'
import EntrepreneurDetail from '../EntrepreneurDetail'

function Profile() {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 w-full">
      <div className='flex flex-row'>
        <div className='w-2/5 h-96 border mr-2 rounded drop-shadow'>
          <img src="/src/assets/images/default_avatar.png" alt="default" className='w-full h-full object-cover rounded' />
        </div>
        <div className='w-3/5 h-96 border rounded drop-shadow-md'>
          <div className='w-full h-20 flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
            <p className='text-5xl m-4'>Abbas Guliyev</p>
            <NavLink className={`rounded btn-main-bg w-50 h-10 p-2 m-4`}>Məlumatları Dəyiş</NavLink>
          </div>
          <div className={`w-full h-72 flex flex-col justify-between p-4 rounded overflow-auto`}>
              <div>
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Email:</p>
                  <span>abbasgdev@gmail.com</span>
                </div>
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Telefon nömrəsi:</p>
                  <span>+994555555555</span>
                </div>
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Doğum tarixi:</p>
                  <span>02-04-1998</span>
                </div>
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Ünvan:</p>
                  <span>Azerbaijan, Sumgait</span>
                </div>
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Evlilik statusu:</p>
                  <span>Subay</span>
                </div>
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>İşləmə statusu:</p>
                  <span>İşləyir</span>
                </div>
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Ev statusu:</p>
                  <span>Şəxsi ev</span>
                </div>
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                  <p className='text-slate-400'>Kredit kartı nömrəsi:</p>
                  <span>123456678</span>
                </div>
                <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-col'>
                  <p className='text-slate-400'>Haqqında:</p>
                  <span className='place-items-end'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis ipsa harum non deserunt nesciunt nulla eos ex! Quas, recusandae aut.</span>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className='w-full h-96 border pt-4 mt-5 mr-2 rounded drop-shadow-md'>
        <div>
        <NavLink to="entrepreneur-table" className={`p-2 ml-2 rounded btn-main-bg`}>Yatırımlarım</NavLink>
        <NavLink to="" className={`p-2 ml-2 rounded btn-main-bg`}>Sifarişlərim</NavLink>
        <NavLink to="" className={`p-2 ml-2 rounded btn-main-bg`}>Təhsilim</NavLink>
        <NavLink to="" className={`p-2 ml-2 rounded btn-main-bg`}>Təcrübələrim</NavLink>
        </div>
        <div>
            <Routes>
            </Routes>
        </div>
      </div>
    </div>
  )
}

export default Profile