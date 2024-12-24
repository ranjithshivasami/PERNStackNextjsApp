import React from 'react'

const LoaderList = () => {
  return (
    <div className='bg-white shadow rounded-lg p-4 mt-4 flex flex-row gap-4'>
        <div>
          <div className="skeleton h-32 w-32"></div>
        </div>
        <div className='w-full mt-5'>
          <div className="skeleton h-4 w-96 mb-5"></div>
          <div className="skeleton h-4 w-full mb-5"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
  )
}

export default LoaderList