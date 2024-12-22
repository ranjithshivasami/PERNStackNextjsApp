import React from 'react';
import Link from 'next/link';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa';

const PaginationButton = ({ totalPages, currentPage, basePath }) => {
  return (
    <div className="flex flex-row justify-between mt-6">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link href={`${basePath}?page=${currentPage - 1}`}>
          <button className="btn">
            <FaAnglesLeft />
          </button>
        </Link>
      ) : (
        <button className="btn" disabled>
          <FaAnglesLeft />
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
            <FaAnglesRight />
          </button>
        </Link>
      ) : (
        <button className="btn" disabled>
          <FaAnglesRight />
        </button>
      )}
    </div>
  );
};

export default PaginationButton;
