import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Calendar, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/axios';


export default function TechnicianProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/profile/technician/${id}`);
      setProfile(response.data);
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="mt-2 text-sm font-medium text-gray-900">Profile not found</h3>
        </div>
      </div>
    );
  }

  const formatTime = () => {
    if (!time) return 'Closed';
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Header */}
          <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
            <div className="flex items-center">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-medium text-gray-500">
                    {profile.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <div className="flex items-center mt-1">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">
                    {profile.rating.toFixed(1)} ({profile.completedJobs || 0} jobs completed)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">{profile.phoneNumber}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">{profile.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">
                  {profile.address[0]?.subcity}, {profile.address[0]?.city}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">About</h3>
            <p className="mt-2 text-sm text-gray-600">{profile.bio}</p>
          </div>

          {/* Services */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Services</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profile.services.map((service) => (
                <div
                  key={service.id}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
                >
                  <div className="flex-shrink-0">
                    <img src={service.icon} alt={service.name} className="h-10 w-10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Working Hours</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { day: 'Monday', start: profile.weeklySchedule.mondayStart, end: profile.weeklySchedule.mondayEnd },
                { day: 'Tuesday', start: profile.weeklySchedule.tuesdayStart, end: profile.weeklySchedule.tuesdayEnd },
                { day: 'Wednesday', start: profile.weeklySchedule.wednesdayStart, end: profile.weeklySchedule.wednesdayEnd },
                { day: 'Thursday', start: profile.weeklySchedule.thursdayStart, end: profile.weeklySchedule.thursdayEnd },
                { day: 'Friday', start: profile.weeklySchedule.fridayStart, end: profile.weeklySchedule.fridayEnd },
                { day: 'Saturday', start: profile.weeklySchedule.saturdayStart, end: profile.weeklySchedule.saturdayEnd },
                { day: 'Sunday', start: profile.weeklySchedule.sundayStart, end: profile.weeklySchedule.sundayEnd },
              ].map((schedule) => (
                <div
                  key={schedule.day}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-900">{schedule.day}</span>
                  <span className="text-sm text-gray-600">
                    {schedule.start ? `${formatTime(schedule.start)} - ${formatTime(schedule.end)}` : 'Closed'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Book Now Button */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <button
              type="button"
              className="w-full sm:w-auto flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}