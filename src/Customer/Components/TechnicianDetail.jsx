import React from 'react';
import { MapPin, Phone, Mail, Star, Clock, Calendar, Briefcase } from 'lucide-react';

const TechnicianDetail = ({ technician }) => {
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const formatTime = (time) => {
    if (!time) return 'Closed';
    return time.slice(0, 5); // Convert "09:00:00" to "09:00"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920"
              alt={technician.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold">{technician.name}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1">{technician.rating} ({technician.bookings} bookings)</span>
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
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Book Appointment
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">About</h2>
                <p className="text-gray-600">{technician.bio}</p>
              </section>

              {/* Services */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {technician.services.map((service) => (
                    <div key={service.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <h3 className="ml-2 font-semibold">{service.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                {technician.review.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                          {review.customer.profileImage ? (
                            <img
                              src={review.customer.profileImage}
                              alt={review.customer.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white">
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
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill={i < review.rating ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {review.review && <p className="text-gray-600">{review.review}</p>}
                  </div>
                ))}
              </section>
            </div>

            {/* Right Column - Schedule */}
            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  Working Hours
                </h2>
                <div className="space-y-3">
                  {daysOfWeek.map((day) => {
                    const startTime = technician.schedule[`${day}Start`];
                    const endTime = technician.schedule[`${day}End`];
                    
                    return (
                      <div key={day} className="flex items-center justify-between">
                        <span className="capitalize">{day}</span>
                        <span className="text-gray-600">
                          {startTime && endTime ? (
                            `${formatTime(startTime)} - ${formatTime(endTime)}`
                          ) : (
                            'Closed'
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDetail;