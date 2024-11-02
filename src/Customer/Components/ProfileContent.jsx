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
      <main className="bg-white rounded-2xl h-[530px] lg:mr-10 lg:mt-2 p-8">
        <h1 className="text-xl font-semibold mb-6">Track your activity on this platform</h1>

        
        <div className="space-y-6 h-96 overflow-y-auto">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 bg-gray-50 shadow-md rounded-2xl">
              <div className="flex items-center space-x-10">
              <img
                  src={logo1}
                  alt="Provider"
                  className="w-120 h-20 rounded-full"
                />
                <div>
                  <div className='flex space-x-4 mb-3'>
                    <h2 className="text-xl font-semibold">{job.name}</h2>
                    <p className={`inline-block px-5 mt-1  py-1 text-xs font-semibold rounded-lg ${job.status === 'Pending' ? 'bg-[#FFF100] text-yellow-700' : job.status === 'Accepted' ? 'bg-green-200 text-green-700' : 'bg-blue-200 text-blue-700'}`}>
                      {job.status}
                    </p>
                  </div>
                  <div className='flex-col border-spacing-y-10'>
                    <span className="mr-4 border border-gray-500 px-10 py-1 rounded-md text-sm">
                    <i className="far fa-calendar mr-1"></i> {job.date}
                  </span>
                  <p className='bg-gray-200 border border-black text-center rounded-lg px-2 mt-3 w-[182px]'> Air Cooler Repair</p>
                  </div>
                </div>
                <div>
                <span className="mr-4 border border-gray-500 px-10 py-1 rounded-md text-sm">
                  <i className="far fa-map-marker-alt mr-1"></i> {job.location}
                </span>
                <p className='font-medium'>Job Description</p>
                <p className="mt-2 text-sm text-gray-700">{job.description}</p>
                </div>
              </div>
              </div>
          ))  
          }

          {/* {jobs.map((job) => (
            <div key={job.id} className="p-4 bg-gray-50 shadow-md rounded-2xl">
              <div className="flex items-center space-x-4">
                <img
                  src={logo1}
                  alt="Provider"
                  className="w-12 h-12 rounded-full"
                />
                <div className='flex space-x-7'>
                  <h2 className="text-xl font-semibold">{job.name}</h2>
                  <p className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${job.status === 'Pending' ? 'bg-yellow-200 text-yellow-700' : job.status === 'Accepted' ? 'bg-green-200 text-green-700' : 'bg-blue-200 text-blue-700'}`}>
                    {job.status}
                  </p>
                </div>
                <button className="text-blue-500">Edit</button>
              </div>

              <div className="mt-4 flex items-center text-gray-600">
                <span className="mr-4 text-sm">
                  <i className="far fa-calendar mr-1"></i> {job.date}
                </span>
                <span className="mr-4 text-sm">
                  <i className="far fa-map-marker-alt mr-1"></i> {job.location}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-700">{job.description}</p>

              {job.status === 'Completed' && (
                <div className="mt-4">
                  <p className="text-sm font-semibold">Review</p>
                  <p className="text-sm text-gray-700">{job.review}</p>
                  <div className="flex mt-2 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < job.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      ></i>
                    ))}
                  </div>
                </div>
              )}

              {job.status === 'Pending' && (
                <p className="mt-2 text-sm text-red-500 cursor-pointer">dispute</p>
              )}
            </div>
          ))} */}
        </div>
      </main>
    </div>
  );
}

export default ProfileContent;
