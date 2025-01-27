import React, { useContext, useState } from 'react';
import { logo1 } from '../../Shared/Components/Images';
import { FilterContext } from '../../Shared/Context/FilterContext';
import { API_URL } from '../../Shared/api';
import { useTranslation } from 'react-i18next';

const ProfileContent = ({ jobs }) => {
  const { t } = useTranslation();
  const { filterStatus } = useContext(FilterContext);
  const jobArray = Array.isArray(jobs.content) ? jobs.content : [];

  const [updatedJobs, setJobs] = useState(jobArray);

  const filteredJobs = updatedJobs.filter((job) => {
    if (filterStatus === 'All') return true;
    return job.status === filterStatus;
  });

  return (
    <div>
      <main className="bg-white rounded-2xl lg:h-screen lg:mr-10 mt-3 p-6 lg:p-8">
        <h1 className="text-lg lg:text-xl font-semibold mb-6">
          {filteredJobs.length === 0 ? (
            <p className="flex justify-center items-center">{t('no_booking')}</p>
          ) : (
            <p>{t('track')}</p>
          )}
        </h1>

        <div className="space-y-6 h-96 overflow-y-auto">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-50 px-4 py-8 lg:px-10 lg:py-14 shadow-md rounded-2xl"
            >
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10">
                <img
                  src={`${API_URL}/uploads/${job.technicianProfleImage}`}
                  alt="Provider"
                  className="w-20 h-20 rounded-full mx-auto lg:mx-0"
                />
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex flex-col lg:flex-row lg:space-x-4 mb-3">
                    <h2 className="text-lg lg:text-xl font-semibold">
                      {job.technicianName}
                    </h2>
                    <p
                      className={`inline-block px-5 mt-1 py-1 text-xs font-semibold rounded-lg ${
                        job.status === 'Pending'
                          ? 'bg-[#FFF100] text-yellow-700'
                          : job.status === 'Accepted'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-blue-200 text-blue-700'
                      }`}
                    >
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
                    <i className="far fa-map-marker-alt mr-1"></i>{' '}
                    {job.address?.city ?? 'none'}
                  </span>
                  <p className="font-medium mt-5">{t('job_des')}</p>
                  <p className="my-1 text-sm text-gray-700">{job.description}</p>
                </div>
                <div className="justify-center lg:justify-start">
                  {(job.status === 'Pending' || job.status === 'Accepted') && (
                    <button className="bg-emerald-500 px-4 lg:px-[10px] mt-2 rounded-lg text-white font-bold">
                      {t('edit')}
                    </button>
                  )}
                  {job.status === 'Accepted' && (
                    <select
                      value={job.status}
                      onChange={(e) => {
                        const updatedJobList = updatedJobs.map((j) =>
                          j.id === job.id
                            ? { ...j, status: e.target.value }
                            : j
                        );
                        setJobs(updatedJobList);
                      }}
                      className="mt-2 text-md rounded-lg py-1 px-4 lg:px-10 underline cursor-pointer"
                    >
                      <option value="started">{t('started')}</option>
                      <option value="halted">Halted</option>
                      <option value="Completed">{t('completed')}</option>
                    </select>
                  )}
                </div>
              </div>
              {job.status === 'Completed' && (
                <div className="mt-10">
                  <div className="flex flex-col items-center lg:flex-row lg:items-center">
                    <p className="text-lg font-semibold">{t('review')}</p>
                    <div className="mt-2 lg:ml-4">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${
                            i < job.rating
                              ? 'text-yellow-500'
                              : 'text-gray-300'
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-5">{job.review}</p>
                </div>
              )}
              {(job.status === 'Pending' || job.status === 'Accepted') && (
                <p className="mt-2 text-md text-red-500 underline cursor-pointer">
                  {t('despute')}
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfileContent;
