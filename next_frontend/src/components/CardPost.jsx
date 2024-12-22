import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CardPost = ({post}) => {
  return (
    <div key={post.id}
        className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <Image
            src={post.image}
            alt={post.title}
            width={400}
            height={250}
            className="w-full sm:w-32 sm:h-32 mb-3 sm:mb-0 object-cover rounded-lg"
          />
          <div className="space-y-1">
            <Link href={`blog/${post.id}`} ><h4 className="text-lg font-semibold">{post.title}</h4></Link>
            <p className="text-sm text-gray-600">            
              {post.content}
            </p>
          </div>
        </div>        
      </div>
  )
}

export default CardPost