import React from 'react';
import { Link } from 'react-router-dom';

const TechVerificationPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          We will contact you soon!
        </h1>
        <p className="text-gray-600 mb-6">
          Thanks for registering our team is reviewing your resume, we will be in touch in a few days!
        </p>
       
        <Link
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          to='/'
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default TechVerificationPage;
