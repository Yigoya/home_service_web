import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import { customerSignUpApi } from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import {message} from 'antd';

const SignUp = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    console.log(customerSignUpApi);

    try {
      const response = await axios.post(customerSignUpApi, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      message.success('Signup successful! Please check your email to verify your account.');
      setTimeout(() => {
        navigate('/verify-email');
      }, 1000);
      console.log('Response:', response.data);
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      // setError(err.response?.data?.details?.join(', ') || 'An unexpected error occurred. Please try again.');
      message.error(err.response?.data?.details?.join(', ') || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mt-12 items-center lg:pt-10 justify-center min-h-screen bg-gray-100">
      <div className="bg-white max-md:mx-5 shadow-md rounded-lg p-5 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 ${
              isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-md transition duration-300 ease-in-out`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing Up...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>

          {successMessage && (
            <p className="text-green-500 text-center mt-2">{successMessage}</p>
          )}
          {error && (
            <p className="text-red-500 text-center mt-2">{error}</p>
          )}
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="lg:flex justify-between lg:space-x-2">
          <button className="flex max-md:mb-3 items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out">
            <FaGoogle className="mr-2 text-red-500" />
            Sign up with Google
          </button>
          <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out">
            <FaFacebook className="mr-2 text-blue-500" />
            Sign up with Facebook
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

