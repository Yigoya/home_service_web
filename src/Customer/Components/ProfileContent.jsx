import React, { useState } from 'react';
import { logo1 } from '../../Shared/Components/Images';

const ProfileContent = () => {
  const [statusFilter, setStatusFilter] = useState('Pending');  

  const jobs = [
    {
      id: 1,
      name: "John Joe",
      status: "Pending",
      date: "23 April 2024",
      service: "Air Cooler Repair",
      location: "Akaki wereda 08",
      description: "this text shows all the description of the job",
    },
    {
      id: 2,
      name: "John Joe",
      status: "Accepted",
      date: "23 April 2024",
      service: "Air Cooler Repair",
      location: "Akaki wereda 08",
      description: "this text shows all the description of the job",
    },
    {
      id: 3,
      name: "John Joe",
      status: "Completed",
      date: "23 April 2024",
      service: "Air Cooler Repair",
      location: "Akaki wereda 08",
      description: "this text shows all the description of the job",
      review: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      rating: 5
    },
  ];


  return (
    <div>
      <main className="bg-white rounded-2xl lg:mr-10 lg:mt-2 p-6 lg:p-8">
        <h1 className="text-lg lg:text-xl font-semibold mb-6">
          Track your activity on this platform
        </h1>

        <div className="space-y-6 h-96 overflow-y-auto">
          {jobs.map((job) => (
            <div key={job.id} className="bg-gray-50 px-4 py-8 lg:px-10 lg:py-14 shadow-md rounded-2xl">
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10">
                <img
                  src={logo1}
                  alt="Provider"
                  className="w-20 h-20 rounded-full mx-auto lg:mx-0"
                />
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex flex-col lg:flex-row lg:space-x-4 mb-3">
                    <h2 className="text-lg lg:text-xl font-semibold">{job.name}</h2>
                    <p className={`inline-block px-5 mt-1 py-1 text-xs font-semibold rounded-lg ${job.status === 'Pending' ? 'bg-[#FFF100] text-yellow-700' : job.status === 'Accepted' ? 'bg-green-200 text-green-700' : 'bg-blue-200 text-blue-700'}`}>
                      {job.status}
                    </p>
                  </div>
                  <div className="flex-col items-center lg:items-start">
                    <span className="mr-0 lg:mr-4 border border-gray-500 px-4 lg:px-10 py-1 rounded-md text-sm">
                      <i className="far fa-calendar mr-1"></i> {job.date}
                    </span>
                    <p className="bg-gray-200 border border-black text-center rounded-lg px-2 mt-3 w-full lg:w-[182px]">
                      {job.service}
                    </p>
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <span className="mr-4 border border-gray-500 px-10 py-1 rounded-md text-sm">
                    <i className="far fa-map-marker-alt mr-1"></i> {job.location}
                  </span>
                  <p className="font-medium mt-5">Job Description</p>
                  <p className="my-1 text-sm text-gray-700">{job.description}</p>
                </div>
                <div className=" justify-center lg:justify-start">
                  {(job.status === 'Pending' || job.status === 'Accepted') && (
                    <button className="bg-blue-500 px-4 lg:px-[10px] mt-2 rounded-lg text-white font-bold">Edit</button>
                  )}
                  {(job.status === 'Accepted') && (
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
                  )}
                </div>
              </div>
              {job.status === 'Completed' && (
                <div className="mt-10">
                  <div className="flex flex-col items-center lg:flex-row lg:items-center">
                    <p className="text-lg font-semibold">Review</p>
                    <div className="mt-2 lg:ml-4">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < job.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-5">{job.review}</p>
                </div>
              )}
              {(job.status === 'Pending' || job.status === 'Accepted') && (
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
