import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CardPost = ({ post }) => {
  return (
    <div key={post.id} className="card card-side bg-base-100 shadow-xl mt-5">
      
      <Image
            src={post.image}
            alt={post.title}
            width={256}
            height={171}     
            style={{objectFit: "fill"}}	    
            className='rounded-l-2xl'  
          />
      
      <div className="card-body">
      <Link href={`/blog/${post.id}`} ><h4 className="card-title">{post.title}</h4></Link>        
        <div className='overflow-hidden  truncate w-[52rem]'>{post.content}</div>
        <div className="card-actions justify-end">
          <Link href={`/blog/edit/${post.id}`} className="btn btn-sm btn-outline">Edit</Link>
        </div>
      </div>
    </div>    
  )
}

export default CardPost