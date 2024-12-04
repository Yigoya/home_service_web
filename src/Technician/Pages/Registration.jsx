import React, { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import  logo1  from '../../assets/tech.jpg';
import { technicianSignUpApi } from '../Api/Api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Shared/api';
import { useTranslation } from 'react-i18next';

function Registration() {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [files, setFiles] = useState({
    documents: null,
    idCardImage: null,
    profileImage: null,
  });
  const [services, setService] = useState([]);



  const subCities = [
    { id: 1, name: "Bole" },
    { id: 2, name: "Kality" },
    { id: 3, name: "Kirkos" },
  ];

  const weredas = [
    { id: 1, name: "Wereda 1" },
    { id: 2, name: "Wereda 2" },
    { id: 3, name: "Wereda 3" },
  ];

  const navigate = useNavigate();

  // srevice part
  const [selectedServices, setSelectedServices] = useState([]);
  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    const isAlreadySelected = selectedServices.some(service => service.id === parseInt(selectedValue));

    if (!isAlreadySelected && selectedValue) {
      const selectedService = services.find(service => service.id === parseInt(selectedValue));
      setSelectedServices([...selectedServices, selectedService]);
    }
  };

  const handleRemove = (id) => {
    setSelectedServices(selectedServices.filter(service => service.id !== id));
  };
 
     // uploaded file part

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [type]: file }));
      console.log("Selected file:", file.name);
    }
  };
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
    bio: '',
    password: '',
    confirm_password: '',
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
      newErrors.bio = "Bio is required.";
    }
  
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match.";
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
      navigate('/tech-verification-waiting');
    } catch (err) {
      setError(err.response.data.details.join('\n'));

      err.response != undefined ? console.error('Error:', err.response.data) : console.error('Error:', err);
    }

  };

  const fetch = async ()=>{
    try {
      const res =await axios.get(`${API_URL}/services`);
      console.log(res.data)
      setService(res.data)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetch()
  }
  , []);

  return (
    <div className='w-full mt-24 min-h-screen'>
      <div className="flex flex-col md:flex-row mx-4 md:mx-44 my-12 rounded-lg shadow-lg shadow-gray-400 px-8 lg:px-0 ">
        {/* Left part*/}
        <div className="md:w-1/2 lg:p-8 py-8 bg-white rounded-xl">
          <h1 className="text-2xl font-bold mb-6">{t('tech_regi')}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/*  name part */}

            <div>
              <label className="block text-sm font-medium text-gray-700">{t('name')}<span className='text-red-500 text-sm'>*</span></label>
              <input type="text" name="name" placeholder={t('enter_name')} value={formData.name} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}         
            </div>

             {/*  email part */}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">{t('email')} <span className='text-red-500 text-sm'>*</span></label>
                <input type="email" name="email" placeholder={t('enter_email')} value={formData.email} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

               {/*  phoneNumber part */}

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">{t('phone')} <span className='text-red-500 text-sm'>*</span></label>
                <input type="tel" name="phoneNumber" placeholder={t('enter_phone')} value={formData.phoneNumber} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}              
              </div>
            </div>
                 
                  {/*  bio part */}
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('bio')} <span className='text-red-500 text-sm'>*</span></label>
              <textarea name="bio" placeholder={t('bio')} value={formData.bio} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none h-20" required></textarea>
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
            </div>

            {/* Service part */}

            <div>
              <label className="block text-sm font-medium text-gray-700">Services <span className='text-red-500 text-sm'>*</span></label>
              <select onChange={handleSelect} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none">
                <option value="">Select a service</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-3 p-2 rounded-md">
                {selectedServices.map(service => (
                  <div key={service.id} className="flex items-center px-3 py-1 text-gray-700 rounded-full bg-gray-200">
                    <span>{service.name}</span>
                    <button onClick={() => handleRemove(service.id)} type="button" className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none">&times;</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Address part */}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">{t('subcity')} <span className='text-red-500 text-sm'>*</span></label>
                <select name="subcity" className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required>
                  <option value="">{t('select_subcity')}</option>
                  {subCities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">{t('woreda')} <span className='text-red-500 text-sm'>*</span></label>
                <select name="wereda" className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required>
                  <option value="">{t('select_woreda')}</option>
                  {weredas.map(wereda => (
                    <option key={wereda.id} value={wereda.id}>{wereda.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* File part */}

            <div className="flex flex-col gap-4">
                  {['documents', 'idCardImage', 'profileImage'].map((type) => (
                    <div key={type} className="flex flex-col items-start space-y-2">
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {type === 'documents' ? t('cv') : type === 'idCardImage' ? t('id_card') : t('profile')}
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, type)}
                        className="hidden"
                        id={type}
                      />
                      <label
                        htmlFor={type}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 cursor-pointer"
                      >
                        <FaUpload className="mr-2 text-gray-600" />
                        <span>{t('upload')}</span>
                      </label>
                      {files[type] && (
                        <span className="text-gray-600 text-sm">
                          Selected file: {files[type].name}
                        </span>
                      )}
                    </div>
                  ))}
            </div>

            {/* Password part */}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">{t('password')} <span className='text-red-500 text-sm'>*</span></label>
                <input type="password" name="password" placeholder={t('enter_password')} value={formData.password} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
              </div>

               {/*  confirm part */}

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">{t('confirm_password')} <span className='text-red-500 text-sm'>*</span></label>
                <input type="password" name="confirm_password" placeholder={t('confirm_password')} value={formData.confirm_password} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
                {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}
                </div>
            </div>

            {/* Submit Button part */}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 mt-6 rounded-md hover:bg-blue-600 focus:outline-none">
            {t('regis')}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>

        {/* Right side */}
        <div className="hidden md:flex md:w-1/2 bg-black rounded-lg relative items-center justify-center">
          <img
            src={logo1}
            alt="Guidance"
            className="w-full h-full object-cover opacity-30 transition-opacity duration-300"
          />
          <div className="absolute top-0 mt-32 text-center px-8 text-white">
            <h2 className="text-6xl font-semibold mb-8">{t('get_start')}</h2>
            <h2 className="text-xl font-semibold mb-2">{t('reg')}</h2>
            <h2 className="text-xl font-semibold mb-2">{t('verfy_reg')}</h2>
            <h2 className="text-xl font-semibold">{t('Start_now')}</h2>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Registration;
