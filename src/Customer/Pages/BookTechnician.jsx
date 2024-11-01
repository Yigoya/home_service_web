import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TechnicianListApi,  } from '../Api/Api';

const BookTechnician = () => {
  const [item, setItem] = useState({});
  const [schedule, setSchedule] = useState('');
  const [subCity, setSubCity] = useState('');
  const [wereda, setWereda] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${TechnicianListApi}/${id}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching technician details:", error);
        setError("Failed to load technician details.");
      });
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const bookingData = {
      technicianId: id,
      schedule,
      subCity,
      wereda,
      jobDescription,
    };

    axios.post("#", bookingData)
      .then((response) => {
        setSuccess(true);
        console.log("Booking successful:", response.data);
      })
      .catch((error) => {
        console.error("Error booking service:", error);
        setError("Failed to book the service. Please try again.");
      });
  };

  return (
    <div>
      <div className="max-w-md mt-10 max-md:mx-5 mx-auto bg-gray-50 rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src={item.image || 'https://via.placeholder.com/150'}
            alt="Profile"
          />
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <span className="mt-2 px-3 py-1 text-gray-700 bg-gray-200 rounded-full">{item.specialty || "Service Type"}</span>
        </div>

        <form onSubmit={handleBooking} className="mt-6">
          <label className="block text-gray-700 mb-2">Schedule</label>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <input
              type="date"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="flex-grow outline-none text-gray-600"
              required
            />
            <span className="ml-2 text-gray-500">📅</span>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <div className="flex space-x-2">
              <div className="flex items-center border border-gray-300 rounded-md p-2 flex-grow">
                <select
                  value={subCity}
                  onChange={(e) => setSubCity(e.target.value)}
                  className="flex-grow outline-none text-gray-600"
                  required
                >
                  <option value="">Select sub city</option>
                  <option value="Akaki Kality">Akaki Kality</option>
                  <option value="Bole">Bole</option>
                  <option value="Lideta">Lideta</option>
                </select>
                <span className="ml-2 text-gray-500">🏠</span>
              </div>
              <div className="flex items-center border border-gray-300 rounded-md p-2 flex-grow">
                <select
                  value={wereda}
                  onChange={(e) => setWereda(e.target.value)}
                  className="flex-grow outline-none text-gray-600"
                  required
                >
                  <option value="">Select wereda</option>
                  <option value="Wereda 1">Wereda 1</option>
                  <option value="Wereda 2">Wereda 2</option>
                  <option value="Wereda 3">Wereda 3</option>
                  <option value="Wereda 4">Wereda 4</option>
                  <option value="Wereda 5">Wereda 5</option>
                  <option value="Wereda 6">Wereda 6</option>
                  <option value="Wereda 7">Wereda 7</option>
                </select>
                <span className="ml-2 text-gray-500">🏠</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Describe the job</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Explain the job task in simple language"
              className="w-full border border-gray-300 rounded-md p-3 outline-none resize-none text-gray-600"
              rows="4"
              required
            />
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">Booking successful!</p>}

          <button type="submit" className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600">
            Book the service
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTechnician;
