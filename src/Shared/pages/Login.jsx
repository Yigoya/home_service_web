import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import { loginApi, socialLoginApi } from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { auth, GoogleAuthProvider, signInWithPopup } from '../../firebase';
const Login = () => {
  const FCMToken = localStorage.getItem('FCMToken')
  const { t } = useTranslation();
  const { login } = React.useContext(AuthContext);
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    FCMToken : FCMToken,
    deviceType : "Samsung",
    deviceModel : "M12",
    operatingSystem : "ANDROID"
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const refreshPage = () => {
    window.location.reload(false);
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      // Get user info
      const user = result.user;
      console.log('User Info:', user);

      // Get access token (optional)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const email = user.email;
      const token = await user.getIdToken(true);
      console.log('Access Token:', token);
      // Perform backend token verification or additional logic if needed
      try {
        formData.idToken = token;
        formData.email = email;
        formData.provider = 'GOOGLE';
        const response = await axios.post(socialLoginApi, formData);
        console.log('Response:', response);
        if (response.data.user.status === "INACTIVE") {
          setError("Verify your email first")
        } else {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('customer', JSON.stringify(response.data.customer));
          localStorage.setItem('technician', JSON.stringify(response.data.technician));
          const next = localStorage.getItem('next')
          localStorage.removeItem('next')
          message.success('Login successful!');
          login();
          
          navigate(next ? next : '/')
          refreshPage();
        }
      } catch (err) {
        console.error('Error:', err.response.data.details.join(', '));
        message.error(err.response.data.details.join(', '));
      } finally {
        setIsLoading(false);
      }
      
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await axios.post(loginApi, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Response:', response);
      if (response.data.user.status === "INACTIVE") {
        setError("Verify your email first")
      } else {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('customer', JSON.stringify(response.data.customer));
        localStorage.setItem('technician', JSON.stringify(response.data.technician));
        const next = localStorage.getItem('next')
        localStorage.removeItem('next')
        message.success('Login successful!');
        login();
        
        navigate(next ? next : '/')
        refreshPage();
      }
    } catch (err) {
      console.error('Error:', err.response.data.details.join(', '));
      message.error(err.response.data.details.join(', '));
    } finally {
      setIsLoading(false);
    }
    console.log('Form data:', formData);
  };

  return (
    <div className="flex  items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white lg:mt-20 max-md:mt-16 max-md:mx-5 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">{t('login')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('enter_email')}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('password')}</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('enter_password')}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              t('login')
            )}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="lg:flex justify-between lg:space-x-2">
          <button onClick={handleGoogleSignIn} className="w-full mb-2 lg:mb-0 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FaGoogle className="inline-block mr-2 text-red-500" />
            {t('sign_google')}
          </button>
          <button className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FaFacebook className="inline-block mr-2 text-blue-500" />
            {t('sign_facebook')}
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
         {t('account')} <a href="/customer-signup" className="text-blue-500 hover:underline">{t('signup')}</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

