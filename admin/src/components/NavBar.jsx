import React from 'react'
import {assets} from '../assets/assets'

const NavBar = ({setToken}) => {
  return (
    <div className='flex mx-5 items-center py-2 px[4%] justify-between' >
        <img className='w-[max(10%,80px)] '  alt='' src={assets.logo} />
        <button onClick={()=>setToken('')} className='bg-gray-300 text-black  px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm ' >Logout</button>
    </div>
  )
}

export default NavBar