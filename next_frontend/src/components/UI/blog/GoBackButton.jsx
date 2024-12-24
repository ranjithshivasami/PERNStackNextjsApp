// components/UI/blog/GoBackButton.jsx
'use client';  // Mark this component as a client-side component

import { FaAnglesLeft } from "react-icons/fa6";
import { useRouter } from 'next/navigation'; // Use next/navigation for client components

const GoBackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();  // Navigate back to the previous page
  };

  return (
    <button
      onClick={handleBack}  // Trigger the handleBack function when clicked
      className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
    >
      <FaAnglesLeft />
      <span className="ml-2">Back to List</span>
    </button>
  );
};

export default GoBackButton;
