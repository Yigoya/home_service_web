import React, { useState } from 'react';

import contact from '../../assets/contact.jpg';


import axios from 'axios';
import Dispute from './Dispute';

function ContactUs() {
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
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
   
  });


  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
  
    // Check for empty fields
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (/\d/.test(formData.name)) {  
      newErrors.name = "Name cannot contain numbers.";
    }
  
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
  
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "PhoneNumber number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a 10-digit phoneNumber number.";
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
          <h1 className="text-4xl text-center font-semibold mb-6">Contact Us</h1>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/*  name part */}

            <div>
              <label className="block text-sm font-medium text-gray-700">Name<span className='text-red-500 text-sm'>*</span></label>
              <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}         
            </div>

             {/*  email part */}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Email <span className='text-red-500 text-sm'>*</span></label>
                <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

               {/*  phoneNumber part */}

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Phone Number <span className='text-red-500 text-sm'>*</span></label>
                <input type="tel" name="phoneNumber" placeholder="Enter your phone number" value={formData.phoneNumber} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}              
              </div>
            </div>
                 
                  {/*  message part */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Message <span className='text-red-500 text-sm'>*</span></label>
              <textarea name="bio" placeholder="your message" value={formData.bio} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none h-40" required></textarea>
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
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
            src={contact}
            alt="Guidance"
            className="w-full h-full object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-50"
          />
        </div>
       
      </div>
    </div>
  );
}

export default ContactUs;
