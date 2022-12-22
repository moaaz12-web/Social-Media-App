import React from 'react'
import {ThreeDots} from 'react-loader-spinner'
const Spinner = (props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
        <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />


        <p className='text-lg text-center px-2'>{props.message}</p>
    </div>
  )
}

export default Spinner