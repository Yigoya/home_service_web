import React, { useContext, useState } from 'react';
import { FilterContext } from '../Context/FilterContext';
import { API_URL } from '../api';
import axios from 'axios';

export default function ProfileContent({ jobs }) {
  const technician = JSON.parse(localStorage.getItem('technician'));
  const customer = JSON.parse(localStorage.getItem('customer'));
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [disputeTitle, setDisputeTitle] = useState('');
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeMessage, setDisputeMessage] = useState('');
  const { filterStatus } = useContext(FilterContext);
  const jobArray = Array.isArray(jobs.content) ? jobs.content : [];
 console.log("jobArray", jobArray)
  const filteredJobs = jobArray.filter((job) => {
    if (filterStatus === 'All') return true;
    return job.status === filterStatus;
  });
  const handleReviewSubmit = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/review`, {
        bookingId: id,
        rating: reviewRating,
        review: reviewMessage,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      alert('Review submitted successfully');
      window.location.reload();
     
    } catch (error) {
      console.error('Error:', error);
    }
    setShowReviewModal(false)
  };

  const handleDisputeSubmit = async (id) => {

    try {
      const response = await axios.post(`${API_URL}/dispute`, {
        bookingId: id,
        description: disputeMessage,
        title: disputeTitle,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      alert('Dispute submitted successfully');
     
    } catch (error) {
      console.error('Error:', error);
    }
    setShowDisputeModal(false);
  };

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
      if (response.status === 200 && status != "COMPLETED") {
        window.location.reload();
      } else {
        console.error('Failed to update job status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white lg:mr-20 lg:mt-16 lg:h-screen  rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        {filteredJobs.length === 0 ? 'No bookings yet' : 'Track your activity on this platform'}
      </h1>

      <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-gray-100  px-6 py-4 transition-transform transform hover:-translate-y-1 rounded-lg shadow-md">
            {/* <div className="transition-transform transform hover:-translate-y-1"> */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  src={customer ? `${API_URL}/uploads/${job.technicianProfleImage}`: `${API_URL}/uploads/${job.ProfleImage}`}
                  alt={customer ? `${job.technicianName}'s profile` : `${job.customerName}'s profile`}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                <h2 className="text-xl font-semibold text-gray-800">
                    {customer ? job.technicianName : job.customerName}
                  </h2>
                  <p className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    job.status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' :
                    job.status === 'ACCEPTED' ? 'bg-green-200 text-green-800' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {job.status}
                  </p>
                  <span className="mb-2  lg:ml-60 border border-gray-300 px-4 py-1 rounded-md text-sm text-gray-600">
                  <i className="far fa-calendar mr-1"></i> {new Date(job.scheduledDate).toISOString().split('T')[0]}
                </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
                  {job.serviceName}
                </span>
              </div>
            </div>
            <div className='flex justify-between'>
            <div className="mt-4">
              <p className="text-gray-600"><i className="far fa-map-marker-alt mr-1"></i> {`${job.address?.city ?? ""} ${job.address?.subcity ?? ""} ${job.address.wereda}`}</p>
              <p className="font-bold mt-2 text-gray-800">Job Description</p>
              <p className="text-gray-600">{job.description}</p>
            </div>
            {job.status === 'COMPLETED' && job.review && (
              <div className="mt-4  p-4 rounded-lg">
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
            {customer && job.status === 'PENDING' && (
              <div className="mt-10">
                <button 
                  className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-600 transition duration-150 ease-in-out"
                  onClick={() => updateStatus('CANCELED', job.id)}
                >
                  Cancel
                </button>
              </div>
            )}

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
             
              {customer && (
                <button
                  className="bg-green-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-150 ease-in-out"
                  onClick={() => { setShowReviewModal(true); updateStatus('COMPLETED', job.id); }}
                >
                  Complete
                </button>
              )}

              {showReviewModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <h2 className="text-xl font-semibold mb-4">Add Review</h2>
                    <div className="flex items-center mb-4">
                      <label className="block text-gray-700 font-semibold mb-2 mr-2">Rating:</label>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star cursor-pointer ${i < reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                            onClick={() => setReviewRating(i + 1)}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                      rows="4"
                      placeholder="Enter your review"
                      value={reviewMessage}
                      onChange={(e) => setReviewMessage(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end space-x-2">
                      <button
                        className="bg-gray-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-gray-600 transition duration-150 ease-in-out"
                        onClick={() => setShowReviewModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-150 ease-in-out"
                        onClick={() => handleReviewSubmit(job.id)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
              </div>
            )}

         
           

            {/* {(job.status === 'PENDING' || job.status === 'ACCEPTED') && (
              <p className="mt-4 text-red-500 underline cursor-pointer hover:text-red-600">Dispute</p>
            )} */}
          {(job.status !== 'COMPLETED' ) && (
            <>
            { <p
                className="mt-4 text-red-500 underline cursor-pointer hover:text-red-600"
                onClick={() => setShowDisputeModal(true)}
              >
                Dispute
              </p>}
              {showDisputeModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <h2 className="text-xl font-semibold mb-4">Dispute</h2>
                    <div className="mt-4"></div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2" htmlFor="disputeTitle">
                        Title
                      </label>
                      <input
                        type="text"
                        id="disputeTitle"
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        placeholder="Enter the title"
                        value={disputeTitle}
                        onChange={(e) => setDisputeTitle(e.target.value)}
                      />
                    </div>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                      rows="4"
                      placeholder="Enter your message"
                      value={disputeMessage}
                      onChange={(e) => setDisputeMessage(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end space-x-2">
                      <button
                        className="bg-gray-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-gray-600 transition duration-150 ease-in-out"
                        onClick={() => setShowDisputeModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-150 ease-in-out"
                        onClick={() => handleDisputeSubmit(job.id)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
           
            </>
          )}
          </div>
        ))}
      </div>
    </div>
  );
}