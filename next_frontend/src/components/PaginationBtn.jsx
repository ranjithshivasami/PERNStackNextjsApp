import React from 'react'
import Link from 'next/link';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa';


const PaginationBtn = ({ totalPages, currentPage, basePath }) => {
  console.log('totalPages', totalPages);
  console.log('currentPage', currentPage);
  console.log('basePath', basePath);
  return (
    <div className="flex flex-row justify-between mt-6">
    {/* Previous Button */}
    {currentPage > 1 ? (
      <Link href={`${basePath}?page=${currentPage - 1}`}>
        <button className="btn">
          Prev
        </button>
      </Link>
    ) : (
      <button className="btn" disabled>
      Prev
      </button>
    )}

    {/* Page Info */}
    <div className="text-center font-medium text-gray-700">
      Page {currentPage} of {totalPages}
    </div>

    {/* Next Button */}
    {currentPage < totalPages ? (
      <Link href={`${basePath}?page=${currentPage + 1}`}>
        <button className="btn">
          Next
        </button>
      </Link>
    ) : (
      <button className="btn" disabled>
        Next
      </button>
    )}
  </div>
  )
}

export default PaginationBtn