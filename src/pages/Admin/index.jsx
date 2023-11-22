import React, { useEffect, useState } from 'react'
import AdminUsers from './AdminUsers';
import AdminInvestments from './AdminInvestments';
import AdminEntrepreneurs from './AdminEntrepreneurs';

function Admin() {
  const [showTab, setShowTab] =useState(<AdminUsers />);
  const [title, setTitle] =useState("İstifadəçilər");


  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col'>
      <div className='w-full pt-4 mt-5 mr-2 pb-7 rounded drop-shadow-md'>
        <div>
            <button onClick={()=>{
              setShowTab(<AdminUsers/>) 
              setTitle("İstifadəçilər")
            }} className={'btn-main-bg p-2 ml-2 rounded'}>İstifadəçilər</button>
            <button onClick={()=>{
              setShowTab(<AdminInvestments/>) 
              setTitle("Yatırımlar")
            }} className={'btn-main-bg p-2 ml-2 rounded'}>Yatırımlar</button>
            <button onClick={()=>{
              setShowTab(<AdminEntrepreneurs/>) 
              setTitle("Lahiyələr")
            }} className={'btn-main-bg p-2 ml-2 rounded'}>Lahiyələr</button>
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
export default Admin