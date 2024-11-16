import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { logo1 } from '../../Shared/Components/Images';
import { API_URL } from '../../Shared/api';

const TechnicianDetail = () => {
  const [technician, setTechnician] = useState({});
  const { id } = useParams();
  const techBooking = `/book-technician/${id}/`;

  const fetchTechnician = async () => {
    try {
      const response = await axios.get(`${API_URL}/technicians/${id}`);
      setTechnician(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchTechnician();
  }, []);

  const formatTime = (time) => {
    if (!time) return "closed";
    const [hour, minute] = time.split(':');
    const period = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    return `${formattedHour}:${minute} ${period}`;
  };

  const daysOfWeek = [
    { day: 'sun', start: technician.schedule?.sundayStart, end: technician.schedule?.sundayEnd },
    { day: 'mon', start: technician.schedule?.mondayStart, end: technician.schedule?.mondayEnd },
    { day: 'tues', start: technician.schedule?.tuesdayStart, end: technician.schedule?.tuesdayEnd },
    { day: 'wed', start: technician.schedule?.wednesdayStart, end: technician.schedule?.wednesdayEnd },
    { day: 'thurs', start: technician.schedule?.thursdayStart, end: technician.schedule?.thursdayEnd },
    { day: 'fri', start: technician.schedule?.fridayStart, end: technician.schedule?.fridayEnd },
    { day: 'sat', start: technician.schedule?.saturdayStart, end: technician.schedule?.saturdayEnd },
  ];

  return (
    <div className="bg-gray-100 lg:px-28 min-h-screen">
      <main className="container p-6">
        <div className="bg-white rounded-2xl pb-5">
          <div className="px-6 pt-4 rounded-lg lg:flex max-md:text-center items-center">
            <div className="lg:mx-16 max-md:mx-10">
              <img
                src={`${API_URL}/uploads/${technician.profileImage}`}
                alt="Technician"
                className="w-36 h-36 rounded-full mb-4"
              />
            </div>
            <div>
              <h2 className="lg:text-2xl font-semibold">{technician.name}</h2>
              <div className="text-gray-600 mt-2">
                <p>{technician.rating} Rating</p>
                <p>{technician.services ? technician.services.length : 0} Services</p>
                <p>{technician.bookings} Bookings</p>
              </div>
            </div>
            <Link
              to={techBooking}
              className="bg-blue-500 lg:ml-44 text-white rounded-full py-2 px-4 font-semibold hover:bg-blue-600 transition"
            >
              Select and Continue
            </Link>
          </div>
          <div className="mt-8 max-md:mx-5 lg:mx-20">
            <h3 className="text-xl font-bold">Instruction</h3>
            <p className="text-gray-700">{technician.bio}</p>
          </div>

          <div className="mt-4 max-md:mx-5 lg:mx-20">
            <h3 className="lg:text-xl max-md:text-lg font-bold">
              Other Services given by {technician.name}
            </h3>
            <div className="flex space-x-2 mt-2">
              {Array.isArray(technician.services) &&
                technician.services.map((service) => (
                  <div className="bg-gray-200 px-4 py-2 rounded-full" key={service.id || service.name}>
                    {service.name}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl">
          <div className="mt-8 py-10 max-md:mx-3 lg:mx-20">
            <h3 className="text-xl font-bold">Business Hours</h3>
            <div className="bg-gray-100 lg:w-96 p-4 rounded-lg shadow mt-4">
              <table className="w-full text-left text-gray-700">
                <tbody>
                  {daysOfWeek.map(({ day, start, end }) => (
                    <tr key={day}>
                      <td className="capitalize">{day}</td>
                      <td className="text-right">
                        {start && end ? `${formatTime(start)} - ${formatTime(end)}` : "closed"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:mx-20 max-md:mx-5 mt-8 pb-10">
            <h3 className="text-xl font-bold">Ratings for {technician.name}</h3>
            <div className="mt-4 space-y-4">
              {Array.isArray(technician.review) && technician.review.length > 0 ? (
                technician.review.map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={logo1}
                          alt="Reviewer"
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{review.customer.name}</p>
                          <div className="flex text-yellow-500">
                            {[...Array(review.rating)].map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">May 24, 2024</p>
                    </div>
                    <p className="text-gray-700">{review.review}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TechnicianDetail;
