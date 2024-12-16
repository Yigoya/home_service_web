import React, { useState } from 'react';
import axios from 'axios';
import { FiAlertCircle, FiMessageSquare } from 'react-icons/fi';
import dispute from '../../assets/dispute.jpg';
import { useTranslation } from 'react-i18next';

function Dispute() {
   const { t } = useTranslation();
  const [formData, setFormData] = useState({
    reason: '',
    state: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required.";
    } else if (/\d/.test(formData.reason)) {
      newErrors.reason = "Reason cannot contain numbers.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Dispute statement is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await axios.post('/api/dispute', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      setSubmitSuccess(true);
      setFormData({ reason: '', state: '' });
    } catch (err) {
      setSubmitError('An error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left part - Form */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">{t('yr_despute')}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                {t('reason')}<span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiAlertCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.reason ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter your reason"
                  />
                </div>
                {errors.reason && <p className="mt-2 text-sm text-red-600">{errors.reason}</p>}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                {t('yr_despute')}<span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                    <FiMessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="state"
                    name="state"
                    rows="4"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.state ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Describe your dispute"
                  ></textarea>
                </div>
                {errors.state && <p className="mt-2 text-sm text-red-600">{errors.state}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>

            {submitError && (
              <div className="mt-4 text-sm text-red-600">
                {submitError}
              </div>
            )}

            {submitSuccess && (
              <div className="mt-4 text-sm text-green-600">
                {t('sec_despute')}
              </div>
            )}
          </div>

          {/* Right side - Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src={dispute}
              alt="Dispute resolution"
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dispute;