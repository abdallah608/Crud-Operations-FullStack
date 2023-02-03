import React from 'react'

import { Helmet } from 'react-helmet'
import IMAGES from'../../imgs/error.png'
export default function NotFound() {
  return (
    
    
    <>
      <Helmet>
         <meta charSet="utf-8" />
        <title>NotFound</title>
      
      </Helmet>

      <div className='text-center'>
        <img className='w-100' src={IMAGES} alt="" />
      </div>  
      
    </>

  )
}
