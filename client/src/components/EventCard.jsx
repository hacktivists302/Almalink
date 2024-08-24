import React from 'react'

export const EventCard = ({postImg,title}) => {
  return (
    <div className='flex-shrink-0 p-2 mx-2  rounded-2xl shadow-lg w-[20rem] h-[15rem] bg-[#212631]'>
        <img className='rounded-lg w-[301px] h-[161px]' src={postImg}  alt="" />
        <div className='text-gray-200 text-xl font-bold p-3'>
        {title}
        </div>
    </div>
  )
}

