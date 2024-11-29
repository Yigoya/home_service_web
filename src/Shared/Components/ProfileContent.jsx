import React, { useContext, useState } from 'react';
import { FilterContext } from '../Context/FilterContext';
import { API_URL } from '../api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { message, Modal, Input, Rate } from 'antd';
export default function ProfileContent({ jobs }) {
  const technician = JSON.parse(localStorage.getItem('technician'));
  const customer = JSON.parse(localStorage.getItem('customer'));
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  console.log(technician);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [currentJobId, setCurrentJobId] = useState(null);
  const [disputeTitle, setDisputeTitle] = useState('');
  const [disputeMessage, setDisputeMessage] = useState('');

  // State for handling dispute modals per job
  const [showDisputeModal, setShowDisputeModal] = useState({});

  const { filterStatus } = useContext(FilterContext);
  const jobArray = Array.isArray(jobs.content) ? jobs.content : [];
  console.log("jobArray", jobArray);

  const filteredJobs = jobArray.filter((job) => {
    if (filterStatus === 'All') return true;
    return job.status === filterStatus;
  });

  const handleReviewSubmit = async () => {
    try {
      await axios.post(`${API_URL}/review`, {
        bookingId: currentJobId,
        rating: reviewRating,
        review: reviewMessage,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      message.success('Review submitted successfully');
      setShowReviewModal(false);
      setReviewRating(0);
      setReviewMessage('');
    } catch (error) {
      console.error('Error submitting review:', error);
      message.error('Failed to submit the review. Please try again.');
    }
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
      message.success('dispute sent succesfully successful!');
      // Close modal after submission
      setShowDisputeModal((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    } catch (error) {
      console.error('Error:', error);
    }
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
      if (response.status === 200 && status !== "COMPLETED") {
        window.location.reload();
      } else {
        console.error('Failed to update job status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`bg-white h-screen lg:mr-16 lg:h-screen rounded-lg shadow-lg p-6 ${customer ? 'mt-16' : ''}`}>
      <h1 className="text-2xl max-md:ml-6 max-md:text-xl font-semibold mb-6 text-gray-800">
        Welcome {user.name}👋
      </h1>
      <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-gray-100 px-6 py-4 transition-transform transform hover:-translate-y-1 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="lg:flex items-center mb-4 md:mb-0">
                <div className='flex'>
                  <img
                    src={customer ? `${API_URL}/uploads/${job.technicianProfleImage}` : `${API_URL}/uploads/${job.ProfleImage}`}
                    alt={customer ? `${job.technicianName}'s profile` : `${job.customerName}'s profile`}
                    className="w-16 h-16 rounded-full max-md:mr-8 object-cover mr-4"
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
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="lg:ml-60 lg:mr-10 border border-gray-300 px-4 py-1 rounded-md text-sm text-gray-600">
                    <i className="far fa-calendar mr-1"></i> {new Date(job.scheduledDate).toISOString().split('T')[0]}
                  </span>
                  <div>
                    <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
                      {job.serviceName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='lg:flex justify-between'>
              <div className="mt-4 lg:mr-20">
                <p className="text-gray-600"><i className="far fa-map-marker-alt mr-1"></i> {`${job.address?.city ?? ""} ${job.address?.subcity ?? ""} ${job.address.wereda}`}</p>
                <div className='bg-gray-200 p-4 rounded-xl'>
                  <p className="font-bold mt-2 text-gray-800">Job Description</p>
                  <p className="text-gray-600">{job.description}</p>
                </div>
              </div>
              {job.status === 'COMPLETED' && job.review && (
                <div className="mt-4 bg-gray-200 p-2 lg:p-4 rounded-lg">
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
                  onClick={() => updateStatus('CANCELED', job.id)}
                >
                  Cancel
                </button>
              </div>
            )}
            {job.status === 'STARTED' && (
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-yellow-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-yellow-600 transition duration-150 ease-in-out"
                  onClick={() => updateStatus('COMPLETED', job.id)}
                >
                  Complete
                </button>
              </div>
            )}
            <div className="mt-4 flex justify-end space-x-2">
            {job.status === 'COMPLETED' && (
              <div className="mt-4">
                <button
                  className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-150 ease-in-out"
                  onClick={() => {
                    setCurrentJobId(job.id);
                    setShowReviewModal(true);
                  }}
                >
                  Leave a Review
                </button>
              </div>
              
            )}
            <Modal
        title="Submit Your Review"
        visible={showReviewModal}
        onCancel={() => setShowReviewModal(false)}
        onOk={handleReviewSubmit}
        okText="Submit"
      >
        <div className="space-y-4">
          <Rate
            allowHalf
            value={reviewRating}
            onChange={(value) => setReviewRating(value)}
          />
          <Input.TextArea
            rows={4}
            placeholder="Write your review..."
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
          />
        </div>
      </Modal>
              {job.status !== 'COMPLETED' && (
                <button
                  className="text-red-600 underline"
                  onClick={() => setShowDisputeModal((prevState) => ({
                    ...prevState,
                    [job.id]: true,
                  }))}
                >
                  Add Dispute
                </button>
              )}
            </div>
            {showDisputeModal[job.id] && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Submit a Dispute</h2>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                    placeholder="Title"
                    value={disputeTitle}
                    onChange={(e) => setDisputeTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                    placeholder="Describe your issue"
                    value={disputeMessage}
                    onChange={(e) => setDisputeMessage(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded-lg text-gray-700 font-bold hover:bg-gray-400 transition duration-150 ease-in-out"
                      onClick={() => setShowDisputeModal((prevState) => ({
                        ...prevState,
                        [job.id]: false,
                      }))}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-600 transition duration-150 ease-in-out"
                      onClick={() => handleDisputeSubmit(job.id)}
                    >
                      Submit
                    </button>
                    
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
