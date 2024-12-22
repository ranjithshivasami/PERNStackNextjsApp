import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaAnglesLeft } from "react-icons/fa6";

const getPost = async (id) =>{
  const API_URL = process.env.API_BASE_URL; // Move API_URL definition here
  const response = await fetch(`${API_URL}blog/post/${id}`);
  const result = await response.json();  
  return result || [];
}
const BlogDetailPage = async ({params}) => {
  const queryParam = await params
  const id = queryParam.id
  const respose = await getPost(id);
  const post =  respose.post
  return (
    <div className="bg-white shadow rounded-lg p-6">
        <Link
          href="/blog"
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaAnglesLeft />
          <span className="ml-2">Back to List</span>
        </Link>

        <div className="flex flex-col">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={350}
            className="w-full sm:w-100 h-96 object-cover rounded-lg"
          />

          <div className="mt-4 sm:mt-0">
            <h2 className='text-2xl/7 font-bold text-gray-900 my-2 sm:truncate sm:text-3xl sm:tracking-tight'>{post.title}</h2>
            <p className="text-gray-600 mb-4">
              {post.content}
            </p>
          </div>
        </div>       
      </div>
  )
}

export default BlogDetailPage