import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaClock, FaMapMarkerAlt, FaBriefcase, FaUsers, FaCalendar } from 'react-icons/fa';
import {  SingleTech, techDetailApi } from '../Api/Api';
import { API_URL } from '../../Shared/api';
import { logo1 } from '../../Shared/Components/Images';
import LoadingPage from '../../Shared/Components/LoadingPage';
import { useTranslation } from 'react-i18next';

const TechnicianDetailOld = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [technician, setTechnician] = useState({});
  const { id, Id } = useParams();
  console.log(Id)
  const techBooking = `/book-technician/${id}/${Id}`;


  useEffect(() => {
    const fetchTechnician = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${SingleTech}/${id}`);
        console.log(response.data)
        setTechnician(response.data);
        setLoading(false);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchTechnician();
  } , []);
  console.log(technician)
  console.log(`${SingleTech}/${id}`)

  const formatTime = (time) => {
    if (!time) return "closed";
    const [hour, minute] = time.split(':');
    const period = parseInt(hour) >= 12 ? 'PM' : 'AM';
    const formattedHour = parseInt(hour) % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
  };

  const daysOfWeek = [
    t('sunday'), t('monday'), t('tuesday'), t('wednesday'), t('thursday'),t('friday'), t('saturday')
  ];

  if (loading) {
    return <div><LoadingPage /></div>;
  }

  return (
    <div className="bg-gray-100 mt-14 lg:px-14 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 lg:w-1/4">
              <img
                className="h-64 w-full object-cover md:h-full"
                src={`${API_URL}/uploads/${technician.profileImage}` || "data:image/jpeg;base64,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"}
                alt={technician.name || "Technician"}
              />
              
            </div>
            
            <div className="p-6 md:w-2/3 lg:w-3/4">
            <div className='lg:flex justify-between '>
              <div>
              <div className="uppercase max-md:hidden tracking-wide text-sm text-emerald-500 font-semibold">
                {t('protech')}
              </div>
              <h1 className="mt-2 text-2xl md:text-xl lg:text-2xl leading-8 font-extrabold tracking-tight text-gray-900">
                {technician.name || "N/A"}
              </h1>
              </div>
            <div>
                <Link
                  to={techBooking}
                  className="inline-flex max-md:hidden rounded-2xl items-center px-16 py-1 border border-transparent text-base font-medium shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  {t('book')}
                </Link>
              </div>
            </div>
            
              <div className="mt-2 flex flex-wrap items-center text-gray-500">
                <div className="flex items-center mr-4 mb-2">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{technician.rating ? technician.rating.toFixed(1) : 0.0} {t('rating')}</span>
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <FaBriefcase className="mr-1" />
                  <span>{technician.services ? technician.services.length : 0} {t('service')}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaUsers className="mr-1" />
                  <span>{technician.bookings || 0}{t('booking')}</span>
                </div>
                <div>
                <Link
                  to={techBooking}
                  className="inline-flex md:hidden items-center px-16 py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  {t('book')}
                </Link>
              </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">{technician.bio || "No bio available."}</p>
              <h3 className="font-bold leading-6  text-gray-900 mt-2">{t('service')}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {technician.services && technician.services.length > 0 ? (
                  technician.services.map((service) => (
                    <span key={service.id} className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                      {service.name}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No services available.</p>
                )}
              </div>

            </div>
          </div>
        </div>

        <div className="">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{t('business')}</h3>
              <div className="mt-4">
                <dl className="space-y-2">
                  {daysOfWeek.map((day) => {
                    const lowercaseDay = day.toLowerCase();
                    const schedule = technician.schedule && technician.schedule[lowercaseDay];
                    return (
                      <div key={day} className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">{day}</dt>
                        <dd className="text-sm text-gray-900">
                          {schedule ? `${formatTime(schedule.start)} - ${formatTime(schedule.end)}` : t('closed')}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{t('testmony')}</h3>
            <div className="mt-6 space-y-6">
              {technician.review && technician.review.length > 0 ? (
                technician.review.map((review) => (
                  <div key={review.id} className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="flex-shrink-0 mb-4 sm:mb-0">
                      <img className="h-12 w-12 rounded-full" src={`${API_URL}/uploads/default-avatar.png`} alt="" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold">{review.customer.name}</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{review.review}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">{t('noreviw')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDetailOld;

