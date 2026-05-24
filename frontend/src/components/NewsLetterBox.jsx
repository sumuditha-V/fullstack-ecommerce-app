import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = () =>{
        event.preventDefault();
    }
  return (
    <div className='text-center' >
        <p className='text-2xl font-medium text-gray-800 ' >Subscribe Our Shop and Get 20% OFF</p>
        <p className='text-gray-400 mt-3' >LOOM LUXE is best choice that you could take ... !</p>
        <form onSubmit={onSubmitHandler} className=' w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 borde pl-3  ' >
            <input className=' w-full sm:flex-1 outline-red-400 p-3 ' type='email' placeholder='Enter Your Email' required  />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4' >SUBSCRIBE</button>
        </form>

    </div>
  )
}

export default NewsLetterBox