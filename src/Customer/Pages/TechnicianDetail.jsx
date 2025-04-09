import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Star, Calendar, Briefcase, Loader2, Clock } from 'lucide-react';
import axios from 'axios';
import { API_URL, API_URL_FILE } from '../../Shared/api';
import { useSelector } from 'react-redux';

const TechnicianDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [technician, setTechnician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    fetchTechnicianDetails();
  }, [id]);

  const fetchTechnicianDetails = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/technicians/${id}`);
      setTechnician(data);
    } catch (err) {
      setError(err.response?.data?.message || t('failed_to_fetch', 'Failed to fetch technician details'));
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    if (!user) {
      navigate(`/login?return-url=/book-technician/${technician.id}/1`);
      return;
    }
    navigate(`/book-technician/${technician.id}/1`);
  };

  const formatTime = (time) => {
    if (!time) return t('closed');
    return time.slice(0, 5); // Convert "09:00:00" to "09:00"
  };
  
  // Get translated day name
  const getDayTranslation = (day) => {
    const dayTranslations = {
      'monday': t('monday'),
      'tuesday': t('tuesday'),
      'wednesday': t('wednesday'),
      'thursday': t('thursday'),
      'friday': t('friday'),
      'saturday': t('saturday'),
      'sunday': t('sunday')
    };
    return dayTranslations[day] || day;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-2 text-gray-600">{t('loading', 'Loading...')}</p>
        </div>
      </div>
    );
  }

  if (error || !technician) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">{t('error')}: {error || t('technician_not_found', 'Technician not found')}</p>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {t('back')}
          </button>
        </div>
      </div>
    );
  }

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="bg-white shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-64 sm:h-80">
          <img
            src={technician.profileImage ? `${API_URL_FILE}${technician.profileImage}` : "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920"}
            alt={technician.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold">{technician.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="ml-1">{technician.rating} ({technician.bookings} {t('booking')})</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5" />
                <span className="ml-1">{technician.city}, {technician.subcity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="ml-2">{technician.phoneNumber}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="ml-2">{technician.email}</span>
            </div>
            <button
              onClick={handleBooking}
              className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
            >
              {t('book')}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('info')}</h2>
              <p className="text-gray-600">{technician.bio}</p>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('serv')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {technician.services.map((service) => (
                  <div key={service.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      {service.icon ? (
                        <img src={`${API_URL_FILE}${service.icon}`} alt={service.name} className="w-8 h-8 mr-2" />
                      ) : (
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      )}
                      <h3 className="font-semibold">{service.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('review')}</h2>
              {technician.review && technician.review.length > 0 ? (
                technician.review.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full overflow-hidden">
                          {review.customer.profileImage ? (
                            <img
                              src={`/${review.customer.profileImage}`}
                              alt={review.customer.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white">
                              {review.customer.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-semibold">{review.customer.name}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill={i < review.rating ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {review.review && <p className="text-gray-600">{review.review}</p>}
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-500">{t('noreviw')}</p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Schedule */}
          {technician.schedule && (
            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  {t('business')}
                </h2>
                <div className="space-y-3">
                  {daysOfWeek.map((day) => {
                    const startTime = technician.schedule[`${day}Start`];
                    const endTime = technician.schedule[`${day}End`];

                    return (
                      <div key={day} className="flex items-center justify-between">
                        <span className="capitalize">{getDayTranslation(day)}</span>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">
                            {startTime && endTime ? (
                              `${formatTime(startTime)} - ${formatTime(endTime)}`
                            ) : (
                              t('closed')
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianDetail;