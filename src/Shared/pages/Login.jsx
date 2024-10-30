import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { customerLoginApi } from '../../Customer/Api/Api';
import axios from 'axios';

const Login = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault(); 
    setError(null); 
    setSuccessMessage(null); 
    try {
      const response = await axios.post(customerLoginApi, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccessMessage('Signup successful!');
      console.log('Response:', response);
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error('Error:', err);
    }
    console.log('Form data:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white max-md:mx-5 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email to login"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password to login"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="lg:flex justify-between lg:space-x-2">
          <button className="flex max-md:mb-3 items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            <FaGoogle className="mr-2 text-red-500" />
            Sign in with Google
          </button>
          <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            <FaFacebook className="mr-2 text-blue-500" />
            Sign in with Facebook
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Don’t you have an account? <a href="/customer-signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
