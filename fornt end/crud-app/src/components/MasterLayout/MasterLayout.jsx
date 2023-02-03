import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
   <>
   <div className="container">
    <div className="row">

   <Outlet/>
    </div>
   </div>
   </>
  )
}
