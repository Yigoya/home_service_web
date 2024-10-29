import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { tech } from '../../Shared/Components/Images';

function Registration() {

  const [files, setFiles] = useState({
    cv: null,
    idCard: null,
    profileImage: null,
  });

  const services = [
    { id: 1, name: "Air Cooler Repair" },
    { id: 2, name: "AC Repair" },
    { id: 3, name: "Heating Repair" },
  ];

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
    phone: '',
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
  
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a 10-digit phone number.";
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
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validate()){
      return;
    }
    const formData = new FormData(e.target);
    formData.append('services', JSON.stringify(selectedServices.map(service => service.id)));
    Object.keys(files).forEach(key => {
      if (files[key]) formData.append(key, files[key]);
    });

    // Fetch to the backend
    // fetch('/api/register', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error(error));
  };

  return (
    <div className='w-full min-h-screen'>
      <div className="flex flex-col md:flex-row mx-4 md:mx-44 my-12 rounded-lg shadow-lg shadow-gray-400 px-8 lg:px-0 ">
        {/* Left part*/}
        <div className="md:w-1/2 lg:p-8 py-8 bg-white rounded-xl">
          <h1 className="text-2xl font-bold mb-6">Technician Registration</h1>
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

               {/*  phone part */}

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Phone Number <span className='text-red-500 text-sm'>*</span></label>
                <input type="tel" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}              
              </div>
            </div>
                 
                  {/*  bio part */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio <span className='text-red-500 text-sm'>*</span></label>
              <textarea name="bio" placeholder="Tell us about yourself" value={formData.bio} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none h-20" required></textarea>
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
                <label className="block text-sm font-medium text-gray-700">Sub City <span className='text-red-500 text-sm'>*</span></label>
                <select name="sub_city" className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required>
                  <option value="">Select sub city</option>
                  {subCities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Wereda <span className='text-red-500 text-sm'>*</span></label>
                <select name="wereda" className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required>
                  <option value="">Select wereda</option>
                  {weredas.map(wereda => (
                    <option key={wereda.id} value={wereda.id}>{wereda.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* File part */}

            <div className="flex flex-col gap-4">
                  {['cv', 'idCard', 'profileImage'].map((type) => (
                    <div key={type} className="flex flex-col items-start space-y-2">
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {type === 'cv' ? 'Your CV' : type === 'idCard' ? 'ID Card' : 'Profile Image'}
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
                        <span>Upload File</span>
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
                <label className="block text-sm font-medium text-gray-700">Password <span className='text-red-500 text-sm'>*</span></label>
                <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
              </div>

               {/*  confirm part */}

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Confirm Password <span className='text-red-500 text-sm'>*</span></label>
                <input type="password" name="confirm_password" placeholder="Confirm your password" value={formData.confirm_password} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
                {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}
                </div>
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
            src={tech}
            alt="Guidance"
            className="w-full h-full object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-50"
          />
          <div className="absolute text-center px-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h2 className="text-3xl font-semibold mb-2">Getting Started</h2>
            <h2 className="text-xl font-semibold mb-2">Register</h2>
            <h2 className="text-xl font-semibold mb-2">Verify your registration</h2>
            <h2 className="text-xl font-semibold">Start your Job</h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Registration;
