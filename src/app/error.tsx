'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 400 300" 
          className="mx-auto mb-6 w-64 h-64"
        >
          <circle cx="200" cy="150" r="120" fill="#F3F4F6" />
          <path 
            d="M200 50 L180 150 L220 150 Z" 
            fill="#EF4444" 
            stroke="#7F1D1D" 
            strokeWidth="4"
          />
          <path 
            d="M200 200 L180 230 L220 230 Z" 
            fill="#10B981" 
            stroke="#064E3B" 
            strokeWidth="4"
          />
          <text 
            x="200" 
            y="250" 
            textAnchor="middle" 
            fill="#1F2937" 
            fontSize="20"
          >
            Something Went Wrong
          </text>
        </svg>
        <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-700 mb-6">
          We couldn&apos;t load the page you were looking for. 
          Don&apos;t worry, it happens to the best of us.
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={handleGoBack}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Go Back
          </button>
          <button 
            onClick={() => reset()}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
