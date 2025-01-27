import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiUpload, FiCheck, FiX } from 'react-icons/fi';
import { TechnicianTokenApi, uploadPaymentApi } from '../Api/Api';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const UploadPaymentImage = () => {
  const navigate = useNavigate();
  const [technician, setTechnician] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  useEffect (() => {
    axios.get(`${TechnicianTokenApi}?token=e16b195f-6390-4ab6-8820-608422779fb8`)
    .then((response) => {
        console.log(response.data)
        setTechnician(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
}, [])
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setError(null);
        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setError('Please select an image file');
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select an image to upload');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      console.log(technician.technician.id, "id")
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('technicianId', technician.technician.id);
    
    axios.post(uploadPaymentApi, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((response) => {
        console.log(response)
        if(response.status == 200){
            message.success('Payment verification submitted successfully!');
            navigate('/')
        }
        else{
            
        }

    })
    .catch((error) => {
        console.log(error)
    });
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Handle successful submission
     
    } catch (err) {
        console.error("Error submitting payment verification:", err);
      setError('Failed to submit payment verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Registration Fee Transfer
          </h1>
          <div className="text-lg font-semibold text-emerald-600">
            Amount: 500 Birr
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload screenshot or image of the ticket
            </label>
            
            <div className="relative">
              {previewUrl ? (
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={previewUrl} 
                    alt="Payment screenshot" 
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload image"
                  />
                  <div className="text-center">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <span className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                        Click to upload
                      </span>{' '}
                      <span className="text-sm text-gray-500">
                        or drag and drop
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-md p-3">
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!selectedFile || isSubmitting}
            className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white 
              ${!selectedFile || isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
              } transition-colors`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : selectedFile ? (
              <>
                <FiCheck className="w-5 h-5 mr-2" />
                Submit Verification
              </>
            ) : (
              'Select an image to continue'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPaymentImage;

