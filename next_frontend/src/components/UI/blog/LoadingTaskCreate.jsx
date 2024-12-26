import React from 'react'

const LoadingTaskCreate = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-12 rounded-xl w-full"></div>
        <div className="skeleton h-24 rounded-xl w-full"></div>
        <div className="skeleton h-12 rounded-xl w-full"></div>
        <div className="skeleton h-12 rounded-xl w-full"></div>
      </div>
    </div>
  )
}

export default LoadingTaskCreate