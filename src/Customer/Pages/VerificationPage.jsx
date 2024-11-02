import React from 'react';
import { Link } from 'react-router-dom';

const VerificationPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          Thanks for signing up! We’ve sent a verification link to your email.
          Please check your inbox and follow the instructions to activate your account.
        </p>
        <p className="text-gray-600 mb-8">
          Didn’t receive the email? Check your spam folder or{' '}
          <a href="#" className="text-blue-500 hover:underline">
            resend verification link
          </a>.
        </p>
        <a
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          href='https://mail.google.com/'
          target="_blank"
        >
          Open Email
        </a>

        <Link
          to='/login'
          className="mt-4 text-blue-600 py-2 px-6  "
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default VerificationPage;
