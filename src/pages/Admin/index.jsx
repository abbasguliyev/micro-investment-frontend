import React, { useState } from 'react'
import AdminUsers from './AdminUsers';
import AdminInvestments from './AdminInvestments';

function Admin() {
  const [showTab, setShowTab] =useState(<AdminUsers />);

  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col'>
      <div className='w-full h-96 pt-4 mt-5 mr-2 pb-7 rounded drop-shadow-md'>
        <div>
            <button onClick={()=>{setShowTab(<AdminUsers/>)}}  className={`p-2 ml-2 rounded btn-main-bg`}>Istifadəçilər</button>
            <button onClick={()=>{setShowTab(<AdminInvestments/>)}} className={`p-2 ml-2 rounded btn-main-bg`}>Yatırımlar</button>
            <button className={`p-2 ml-2 rounded btn-main-bg`}>Sifarişlər</button>
            <button className={`p-2 ml-2 rounded btn-main-bg`}>Əməliyyatlar</button>
        </div>
        <div>
          {
            showTab
          }
        </div>
      </div>
    </div>
  )
}
export default Admin