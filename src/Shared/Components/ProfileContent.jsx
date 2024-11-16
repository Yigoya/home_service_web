import React, { useContext } from 'react';
import { FilterContext } from '../Context/FilterContext';
import { API_URL } from '../api';
import axios from 'axios';

export default function ProfileContent({ jobs }) {
  const technician = JSON.parse(localStorage.getItem('technician'));
  const { filterStatus } = useContext(FilterContext);
  const jobArray = Array.isArray(jobs.content) ? jobs.content : [];
 console.log("jobArray", jobArray)
  const filteredJobs = jobArray.filter((job) => {
    if (filterStatus === 'All') return true;
    return job.status === filterStatus;
  });

  const updateStatus = async (status, bookingId) => {
    try {
      const response = await axios.put(`${API_URL}/booking/update-status`, {
        status,
        bookingId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error('Failed to update job status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        {filteredJobs.length === 0 ? 'No bookings yet' : 'Track your activity on this platform'}
      </h1>

      <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  src={`${API_URL}/uploads/${job.technicianProfleImage}`}
                  alt={`${job.technicianName}'s profile`}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{job.technicianName}</h2>
                  <p className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    job.status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' :
                    job.status === 'ACCEPTED' ? 'bg-green-200 text-green-800' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {job.status}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="mb-2 border border-gray-300 px-4 py-1 rounded-md text-sm text-gray-600">
                  <i className="far fa-calendar mr-1"></i> {job.scheduledDate}
                </span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
                  {job.serviceName}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-600"><i className="far fa-map-marker-alt mr-1"></i> {`${job.address?.city ?? ""} ${job.address?.subcity ?? ""} ${job.address.wereda}`}</p>
              <p className="font-medium mt-2 text-gray-800">Job Description</p>
              <p className="text-gray-600">{job.description}</p>
            </div>

            {technician && job.status === 'PENDING' && (
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-green-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-green-600 transition duration-150 ease-in-out"
                  onClick={() => updateStatus('ACCEPTED', job.id)}
                >
                  Accept
                </button>
                <button 
                  className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-600 transition duration-150 ease-in-out"
                  onClick={() => updateStatus('DENIED', job.id)}
                >
                  Decline
                </button>
              </div>
            )}

            {job.status === 'ACCEPTED' && (
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-150 ease-in-out"
                  onClick={() => updateStatus('STARTED', job.id)}
                >
                  Start
                </button>
                <button 
                  className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-600 transition duration-150 ease-in-out"
                  onClick={() => updateStatus('CANCELLED', job.id)}
                >
                  Cancel
                </button>
              </div>
            )}

            {job.status === 'STARTED' && (
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-green-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-green-600 transition duration-150 ease-in-out"
                  onClick={() => updateStatus('COMPLETED', job.id)}
                >
                  Complete
                </button>
              </div>
            )}

            {job.status === 'COMPLETED' && job.review && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <p className="text-lg font-semibold text-gray-800 mr-2">Review</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < job.review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      ></i>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{job.review.review}</p>
              </div>
            )}

            {(job.status === 'PENDING' || job.status === 'ACCEPTED') && (
              <p className="mt-4 text-red-500 underline cursor-pointer hover:text-red-600">Dispute</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}