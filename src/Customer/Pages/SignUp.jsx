import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import axios from "axios";
import { customerSignUpApi } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import cleanImage from "../../assets/house_clean.png";

const SignUp = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
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

    // Concatenate firstName and lastName into a single name field
    const submitData = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
    };

    try {
      const response = await axios.post(customerSignUpApi, submitData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      message.success("Signup successful! Please check your email to verify your account.");
      setTimeout(() => {
        navigate("/verify-email");
      }, 1000);
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      message.error(err.response?.data?.details?.join(", ") || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-28 pb-10 flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${cleanImage})`,
        backgroundColor: "rgba(255, 255, 255,0)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-emerald-800 mb-8">HuluMoya</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name and Last Name Fields */}
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t("first_name")}
              className="w-full px-4 py-3.5 border border-gray-400 rounded-lg focus:outline-none focus:border-emerald-700 transition-colors"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t("last_name")}
              className="w-full px-4 py-3.5 border border-gray-400 rounded-lg focus:outline-none focus:border-emerald-700 transition-colors"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("email")}
              className="w-full px-4 py-3.5 border border-gray-400 rounded-lg focus:outline-none focus:border-emerald-600 transition-colors"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <select className="h-full px-3 py-3.5 border border-gray-400 rounded-lg bg-white focus:outline-none focus:border-emerald-700">
                <option value="+251">🇪🇹</option>
                
              </select>
            </div>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder={t("phone")}
              className="w-full px-4 py-3.5 border border-gray-400 rounded-lg focus:outline-none focus:border-emerald-600 transition-colors"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t("password")}
              className="w-full px-4 py-3.5 border border-gray-400 rounded-lg focus:outline-none focus:border-emerald-600 transition-colors"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3.5 px-4 ${
              isLoading ? "bg-emerald-700" : "bg-emerald-600 hover:bg-emerald-700"
            } text-white rounded-lg font-medium transition duration-300 ease-in-out`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t("signing_up")}
              </span>
            ) : (
              t("signup")
            )}
          </button>

          {/* Success and Error Messages */}
          {successMessage && <p className="text-emerald-600 text-center">{successMessage}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-200" />
          <span className="px-4 text-gray-500">{t('or')}</span>
          <hr className="flex-grow border-gray-200" />
        </div>

        {/* Social Sign-In Buttons */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-3.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300 ease-in-out">
            <FaGoogle className="mr-3 text-red-500" />
            {t("sign_google")}
          </button>
          <button className="w-full flex items-center justify-center px-4 py-3.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300 ease-in-out">
            <FaFacebook className="mr-3 text-blue-500" />
            {t("sign_facebook")}
          </button>
        </div>

        {/* Login Link */}
        {/* <p className="mt-6 text-center text-gray-600">
          {t("yes_account")}{" "}
          <a href="/login" className="text-emerald-600 hover:text-emerald-700 hover:underline">
            {t("login")}
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default SignUp;