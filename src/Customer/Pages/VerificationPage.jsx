import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VerificationPage = () => {
  const [resendStatus, setResendStatus] = useState('');

  const handleResendVerification = async () => {
    setResendStatus('sending');
    // Simulating an API call to resend verification email
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResendStatus('success');
    } catch (error) {
      setResendStatus('error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          Thanks for signing up! We've sent a verification link to your email.
          Please check your inbox and follow the instructions to activate your account.
        </p>
        <p className="text-gray-600 mb-8">
          Didn't receive the email? Check your spam folder or{' '}
          <button 
            onClick={handleResendVerification} 
            className="text-blue-500 hover:underline focus:outline-none"
            disabled={resendStatus === 'sending'}
          >
            resend verification link
          </button>
          {resendStatus === 'sending' && <span className="ml-2 text-yellow-500">Sending...</span>}
          {resendStatus === 'success' && <span className="ml-2 text-green-500">Sent successfully!</span>}
          {resendStatus === 'error' && <span className="ml-2 text-red-500">Failed to send. Please try again.</span>}
        </p>
        <div className="space-y-4">
          <a
            className="block w-full bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            href='https://mail.google.com/'
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Gmail
          </a>
          <Link
            to='/login'
            className="block w-full bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;

