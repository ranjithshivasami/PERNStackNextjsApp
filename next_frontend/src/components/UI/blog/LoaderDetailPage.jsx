import React from 'react'

const LoaderDetailPage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="skeleton h-72 w-full"></div>
      <div className="skeleton h-4 w-96"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  )
}

export default LoaderDetailPage