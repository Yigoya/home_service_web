import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { TechnicianListApi } from '../Api/Api';
import { logo1 } from '../../Shared/Components/Images';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const TechnicianDetail = () => {
  const [item, setItem] = useState([]);
  const {id} = useParams();
   const techBooking = `/book-technician/${id}`
  useEffect(() => {
    axios.get(TechnicianListApi+'/'+id)
    // console.log(TechnicianListApi+'/'+id)
      .then((response) => {
        setItem(response.data);
        console.log(response.data);
      });
  }, []);
  return (
    <div className="bg-gray-100 lg:px-28 min-h-screen">
    <main className="container  p-6">
      <div className='bg-white rounded-2xl pb-5'>
      <div className="px-6 pt-4 rounded-lg  lg:flex max-md:text-center items-center ">
        <div className='lg:mx-16 max-md:mx-10'> 
        <img
          src={item.image}
          alt="Technician"
          className="w-36 h-36 rounded-full mb-4"
        />
        </div>
        <div>
        <h2 className="lg:text-2xl font-semibold">{item.name}</h2>
        <div className="text-gray-600 mt-2">
          <p>{item.customerNo} customers</p>
          <p>{item.servicesNo} Services</p>
          <p>{item.bookingNo} Bookings</p>
        </div>
        </div>
        <Link to={techBooking}className="bg-blue-500 lg:ml-44 text-white rounded-full py-2 px-4 font-semibold hover:bg-blue-600 transition">
        Select and Continue
      </Link>
      </div>
      <div className="mt-8 max-md:mx-5 lg:mx-20">
        <h3 className="text-xl font-bold">Instruction</h3>
        <p className="text-gray-700">
         {item.bio}
        </p>
      </div>

      <div className="mt-4 max-md:mx-5 lg:mx-20">
        <h3 className="lg:text-xl max-md:text-lg font-bold">Other Services given by {item.name}</h3>
        <div className="flex space-x-2 mt-2">
        {Array.isArray(item.services) && item.services.map((service) => {
          return <div className="bg-gray-200 px-4 py-2 rounded-full" key={service}>{service}</div>;
        })}
        </div>
      </div>
      </div>
     <div>
      
     </div>
      <div className='bg-white  rounded-2xl'>
      <div className="mt-8 py-10  max-md:mx-3 lg:mx-20">
        <h3 className="text-xl font-bold">Business Hour</h3>
        <div className="bg-gray-100 lg:w-96 p-4 rounded-lg shadow mt-4">
          <table className="w-full  text-left text-gray-700">
            <tbody>
              <tr><td>sun</td><td className="text-right">closed</td></tr>
              <tr><td>mon</td><td className="text-right">8:30 am - 3:00 pm</td></tr>
              <tr><td>tues</td><td className="text-right">8:30 am - 3:00 pm</td></tr>
              <tr><td>wed</td><td className="text-right">8:30 am - 3:00 pm</td></tr>
              <tr><td>thurs</td><td className="text-right">8:30 am - 3:00 pm</td></tr>
              <tr><td>fri</td><td className="text-right">8:30 am - 4:00 pm</td></tr>
              <tr><td>sat</td><td className="text-right">8:30 am - 4:00 pm</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="lg:mx-20 max-md:mx-5 mt-8 pb-10">
        <h3 className="text-xl font-bold">Ratings for {item.name}</h3>
        <div className="mt-4 space-y-4">
          {Array.isArray(item.reviews) && item.reviews.map((review) => (
            <div key={review} className="bg-white p-4 rounded-lg shadow-lg ">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={logo1}
                    alt="Reviewer"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Reagan W.</p>
                    <div className="flex text-yellow-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">May 24, 2024</p>
              </div>
              <p className="text-gray-700">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </main>
  </div>
  )
}

export default TechnicianDetail