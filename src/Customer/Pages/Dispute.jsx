import React, { useState } from 'react';

import dispute from '../../assets/dispute.jpg';


import axios from 'axios';

function Dispute() {
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    // validating the input data

  const [formData, setFormData] = useState({
    reason: '',
    state: '',
    
  });


  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
  
    // Check for empty fields
    if (!formData.name.trim()) {
      newErrors.name = "Reason is required.";
    } else if (/\d/.test(formData.name)) {  
      newErrors.name = "Reason cannot contain numbers.";
    }
  
  
    if (!formData.bio.trim()) {
      newErrors.bio = "Meassge is required.";
    }
    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!validate()){
      return;
    }
    const formDatas = new FormData();
    console.log(formData);
    console.log(files);
    Object.keys(formData).forEach(key => {
      formDatas.append(key, formData[key]);
    });
    selectedServices.forEach(service => {
      formDatas.append('serviceIds', service.id);
    });
    Object.keys(files).forEach(key => {
      if (files[key]) formDatas.append(key, files[key]);
    });

    try {
      const response = await axios.post(technicianSignUpApi, formDatas, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      
      console.log('Response:', response.data);
    } catch (err) {
      setError(' Please try again.');

      err.response != undefined ? console.error('Error:', err.response.data) : console.error('Error:', err);
    }

  };

  return (
    <div className='w-full min-h-screen font-inter'>
      <div className="flex flex-col md:flex-row mx-4 md:mx-44 my-12 rounded-lg shadow-lg shadow-gray-400 px-8 lg:px-0 ">
        {/* Left part*/}
        <div className="md:w-1/2 lg:p-8 py-8 bg-white rounded-xl">
          <h1 className="text-4xl text-center font-semibold mb-6">Your Dispute</h1>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/*  name part */}

            <div>
              <label className="block text-sm font-medium text-gray-700">Reason<span className='text-red-500 text-sm'>*</span></label>
              <input type="text" name="reason" placeholder="Enter your reason" value={formData.name} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
              {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}         
            </div>
                 
                  {/*  message part */}
            <div>
              <label className="block text-sm font-medium text-gray-700">State your Dispute <span className='text-red-500 text-sm'>*</span></label>
              <textarea name="state" placeholder="your message" value={formData.state} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none h-40" required></textarea>
              {errors.state && <p className="text-red-500 text-sm">{errors.bio}</p>}
            </div>

            {/* Submit Button part */}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 mt-6 rounded-md hover:bg-blue-600 focus:outline-none">
              Submit
            </button>
          </form>
        </div>

        {/* Right side */}
        <div className="hidden md:flex md:w-1/2  bg-gray-300 rounded-lg relative items-center justify-center group">
          <img
            src={dispute}
            alt="Guidance"
            className="w-full h-full object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-50"
          />
        </div>

      </div>
    </div>
  );
}

export default Dispute;
