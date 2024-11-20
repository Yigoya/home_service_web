import React, { useState } from 'react';
import contact from '../../assets/contact.jpg';
import axios from 'axios';
import Dispute from './Dispute';
function ContactUs() {
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));  

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
    <div className={`w-full min-h-screen font-inter  ${user ? 'mt-24' : ''}`}>
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

// import React, { useState } from 'react';
// import axios from 'axios';
// import { FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';
// import contact from '../../assets/contact.jpg';

// function ContactUs() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     message: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required.";
//     } else if (/\d/.test(formData.name)) {
//       newErrors.name = "Name cannot contain numbers.";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required.";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address.";
//     }

//     if (!formData.phoneNumber.trim()) {
//       newErrors.phoneNumber = "Phone number is required.";
//     } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = "Please enter a 10-digit phone number.";
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = "Message is required.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) {
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError(null);
//     setSubmitSuccess(false);

//     try {
//       const response = await axios.post('/api/contact', formData);
//       console.log('Response:', response.data);
//       setSubmitSuccess(true);
//       setFormData({ name: '', email: '', phoneNumber: '', message: '' });
//     } catch (err) {
//       setSubmitError('An error occurred. Please try again.');
//       console.error('Error:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Left part - Form */}
//           <div className="md:w-1/2 p-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                   Name<span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiUser className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
//                     placeholder="Enter your name"
//                   />
//                 </div>
//                 {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email<span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiMail className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
//                     placeholder="Enter your email"
//                   />
//                 </div>
//                 {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
//               </div>

//               <div>
//                 <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
//                   Phone Number<span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiPhone className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="tel"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleInputChange}
//                     className={`block w-full pl-10 pr-3 py-2 border ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
//                     placeholder="Enter your phone number"
//                   />
//                 </div>
//                 {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
//               </div>

//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700">
//                   Message<span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
//                     <FiMessageSquare className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows="4"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     className={`block w-full pl-10 pr-3 py-2 border ${errors.message ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
//                     placeholder="Your message"
//                   ></textarea>
//                 </div>
//                 {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   {isSubmitting ? 'Submitting...' : 'Submit'}
//                 </button>
//               </div>
//             </form>

//             {submitError && (
//               <div className="mt-4 text-sm text-red-600">
//                 {submitError}
//               </div>
//             )}

//             {submitSuccess && (
//               <div className="mt-4 text-sm text-green-600">
//                 Your message has been sent successfully!
//               </div>
//             )}
//           </div>

//           {/* Right side - Image */}
//           <div className="hidden md:block md:w-1/2">
//             <img
//               src={contact}
//               alt="Contact us"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContactUs;