import React, { useContext, useState } from 'react';
import { logo1 } from './Images';
import { FilterContext } from '../Context/FilterContext';
import { API_URL } from '../api';
import axios from 'axios';
const ProfileContent = ({jobs}) => {
  console.log(jobs,"jobs")
  const { filterStatus } = useContext(FilterContext);
  const jobArray = Array.isArray(jobs.content) ? jobs.content : [];

  
  const filteredJobs = jobArray.filter((job) => {
    if (filterStatus === 'All') return true;
    return job.status === filterStatus;
  });
  const updateStatus = async (status, bookingId) => {
    console.log(status, bookingId);
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
        // Update the job status locally
        const jobIndex = jobArray.findIndex(job => job.id === bookingId);
        if (jobIndex !== -1) {
          jobArray[jobIndex].status = status;
          window. location. reload(false); 
        }
        // Optionally, you can trigger a re-render or update the state
      } else {
        console.error('Failed to accept the job');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <main className="bg-white rounded-2xl lg:h-screen lg:mr-10 mt-3  p-6 lg:p-8">
        <h1 className="text-lg lg:text-xl font-semibold mb-6">
         
        {filteredJobs.length === 0 ? <p className='flex justify-center items-center '>No booking yet</p> : <p> Track your activity on this platform</p> }
        </h1>

        <div className="space-y-6 h-96 overflow-y-auto">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-gray-50 px-4 py-8 lg:px-10 lg:py-14 shadow-md rounded-2xl">
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10">
                <img
                  src={`${API_URL}/uploads/${job.technicianProfleImage}`}
                  alt="Provider"
                  className="w-20 h-20 rounded-full mx-auto lg:mx-0"
                />
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex flex-col lg:flex-row lg:space-x-4 mb-3">
                    <h2 className="text-lg lg:text-xl font-semibold">{job.technicianName}</h2>
                    <p className={`inline-block px-5 mt-1 py-1 text-xs font-semibold rounded-lg ${job.status === 'Pending' ? 'bg-[#FFF100] text-yellow-700' : job.status === 'ACCEPTED' ? 'bg-green-200 text-green-700' : 'bg-blue-200 text-blue-700'}`}>
                      {job.status}
                    </p>
                  </div>
                  <div className="flex-col items-center lg:items-start">
                    <span className="mr-0 lg:mr-4 border border-gray-500 px-4 lg:px-10 py-1 rounded-md text-sm">
                      <i className="far fa-calendar mr-1"></i> {job.scheduledDate}
                    </span>
                    <p className="bg-gray-200 border border-black text-center rounded-lg px-2 mt-3 w-full lg:w-[182px]">
                      {job.serviceName}
                    </p>
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <span className="mr-4 border border-gray-500 px-10 py-1 rounded-md text-sm">
                  <i className="far fa-map-marker-alt mr-1"></i> {job.address?.city ?? "none"}

                  </span>
                  <p className="font-medium mt-5">Job Description</p>
                  <p className="my-1 text-sm text-gray-700">{job.description}</p>
                </div>
                <div className=" justify-center lg:justify-start">
                  {job.status === 'PENDING'  && (
                    <>
                      <button
                        className="bg-blue-500 px-4 lg:px-[10px] mt-2 rounded-lg text-white font-bold"
                        onClick={() => updateStatus('ACCEPTED', job.id)}
                      >
                        Accept
                      </button>
                      <button 
                      onClick={() => updateStatus('DENIED', job.id)}
                      className="bg-red-500 px-4 lg:px-[10px] mt-2 rounded-lg text-white font-bold">Decline</button>
                    </>
                  )}
                   {job.status === 'ACCEPTED'  && (
                    <>
                      <button
                        className="bg-blue-500 px-4 lg:px-[10px] mt-2 rounded-lg text-white font-bold"
                        onClick={() => updateStatus('STARTED', job.id)}
                      >
                        Start
                      </button>
                      <button 
                      onClick={() => updateStatus('CANCELLED', job.id)}
                      className="bg-red-500 px-4 lg:px-[10px] mt-2 rounded-lg text-white font-bold">Cancel</button>
                    </>
                  )}
                   {job.status === 'STARTED'  && (
                    <>
                      <button
                        className="bg-blue-500 px-4 lg:px-[10px] mt-2 rounded-lg text-white font-bold"
                        onClick={() => updateStatus('COMPLETED', job.id)}
                      >
                        Complete
                      </button>
                     
                    </>
                  )}
                  {/* {(job.status === 'ACCEPTED') && (
                    <select
                      value={job.status}
                      onChange={(e) => {
                        const updatedJobs = jobs.map((j) =>
                          j.id === job.id ? { ...j, status: e.target.value } : j
                        );
                        setJobs(updatedJobs);
                      }}
                      className="mt-2 text-md rounded-lg py-1 px-4 lg:px-10 underline cursor-pointer"
                    >
                      <option value="started">Started</option>
                      <option value="halted">Halted</option>
                      <option value="Completed">Completed</option>
                    </select>
                  )} */}
                </div>
              </div>
              {job.status === 'COMPLETED' && job.review &&(
                <div className="mt-10">
                  <div className="flex flex-col items-center lg:flex-row lg:items-center">
                    <p className="text-lg font-semibold">Review</p>
                    <div className="mt-2 lg:ml-4">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < job.review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-5">{job.review.review}</p>
                </div>
              )}
              {(job.status === 'PENDING' || job.status === 'ACCEPTED') && (
                <p className="mt-2 text-md text-red-500 underline cursor-pointer">Dispute</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfileContent;
