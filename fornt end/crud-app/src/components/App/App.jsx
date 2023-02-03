import React, { Children } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Home/Home';
import MasterLayout from '../MasterLayout/MasterLayout';
import NotFound from '../NotFound/NotFound';
import './App.css';

export default function App() {
  const routers = createBrowserRouter([{
    path:"/",
    element:<MasterLayout/>,
    errorElement:<NotFound/>,
    children:[
      {index:true,element:<Home/>}
    ]
  }])
  return (
    <>
    <RouterProvider router={routers}/> 
   </>
  )
}
