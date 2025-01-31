'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

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
          <text
            x="200"
            y="100"
            textAnchor="middle"
            fontSize="80"
            fontWeight="bold"
            fill="#EF4444"
          >
            404
          </text>
          <path
            d="M160 180 L240 180"
            stroke="#1F2937"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <text
            x="200"
            y="250"
            textAnchor="middle"
            fill="#1F2937"
            fontSize="20"
          >
            Page Not Found
          </text>
        </svg>
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-700 mb-6">
          The page you are looking for might have been removed,
          had its name changed, or is temporarily unavailable.
        </p>
        <button
          type="button"
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
