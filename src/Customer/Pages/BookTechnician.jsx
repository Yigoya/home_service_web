import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleService, SingleTech, TechnicianBooking  } from '../Api/Api';
import { API_URL } from '../../Shared/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const BookTechnician = () => {
   const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [Technicain, setTechnicain] = useState({});
  const [service, setService] = useState('');
  const [scheduledDate, setscheduledDate] = useState('');
  const [subcity, setsubcity] = useState('');
  const [wereda, setwereda] = useState('');
  const [description, setdescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { id, serviceId } = useParams();
  const customer = JSON.parse(localStorage.getItem('customer'));

  useEffect(() => {
    axios.get(`${SingleTech}/${id}`)
      .then((response) => {
        setTechnicain(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching technician details:", error);
        setError("Failed to load technician details.");
      });
  }, [id]);
  useEffect(() => {
    axios.get(`${SingleService}/${serviceId}`)
      .then((response) => {
        setService(response.data.service.name);
        console.log(response.data.service.name)
      })
      .catch((error) => {
        console.error("Error fetching technician details:", error);
        setError(error.response.data.details);
      });
  }, [id]);
console.log(`${SingleService}/${serviceId}`)
  const handleBooking = (e) => {
    e.preventDefault();
    setloading(true);
    setError(null);
    setSuccess(false);

    const bookingData = {
      customerId: customer?.id,
      technicianId: id,
      serviceId: serviceId,
      scheduledDate: `${scheduledDate}T00:00:00`,
      subcity,
      wereda,
      description,
    };

    axios.post(TechnicianBooking, bookingData)
      .then((response) => {
        setloading(false);
        toast("Booking successful!");
        console.log("Booking successful:", response.data);
        navigate('/checkout');
        // navigate(`/customer-profile/${customer?.id}`);
      })
      .catch((error) => {
        console.error("Error booking service:", error);
        toast(String(error.response.data.details || "An error occurred"));

      });
   
  };

  return (
    <div>
      <div className="max-w-md lg:mt-24 max-md:mt-24 max-md:mx-5 mx-auto bg-gray-50 rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src={`${API_URL}/uploads/${Technicain.profileImage}` || 'https://via.placeholder.com/150'}
            alt="Profile"
          />
          <h2 className="text-lg font-semibold">{Technicain.name}</h2>
          <span className="mt-2 px-3 py-1 text-gray-700 bg-gray-200 rounded-full">{service || t('service')}</span>
        </div>

        <form onSubmit={handleBooking} className="mt-6">
          <label className="block text-gray-700 mb-2">{t('scheduled_date')}</label>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setscheduledDate(e.target.value)}
              className="flex-grow outline-none text-gray-600"
              required
            />
            {/* <span className="ml-2 text-gray-500">📅</span> */}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">{t('address')}</label>
            <div className="flex space-x-2">
              <div className="flex items-center border border-gray-300 rounded-md p-2 flex-grow">
                <select
                  value={subcity}
                  onChange={(e) => setsubcity(e.target.value)}
                  className="flex-grow outline-none text-gray-600"
                  required
                >
                  <option value="">{t('select_subcity')}</option>
                  <option value="Akaki Kality">Akaki Kality</option>
                  <option value="Bole">Bole</option>
                  <option value="Lideta">Lideta</option>
                </select>
                {/* <span className="ml-2 text-gray-500">🏠</span> */}
              </div>
              <div className="flex items-center border border-gray-300 rounded-md p-2 flex-grow">
                <select
                  value={wereda}
                  onChange={(e) => setwereda(e.target.value)}
                  className="flex-grow outline-none text-gray-600"
                  required
                >
                  <option value="">{t('select_woreda')}</option>
                  <option value="wereda 1">wereda 1</option>
                  <option value="wereda 2">wereda 2</option>
                  <option value="wereda 3">wereda 3</option>
                  <option value="wereda 4">wereda 4</option>
                  <option value="wereda 5">wereda 5</option>
                  <option value="wereda 6">wereda 6</option>
                  <option value="wereda 7">wereda 7</option>
                </select>
                {/* <span className="ml-2 text-gray-500">🏠</span> */}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">{t('des_job')}</label>
            <textarea
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              placeholder={t('des_job')}
              className="w-full border border-gray-300 rounded-md p-3 outline-none resize-none text-gray-600"
              rows="4"
              required
            />
          </div>

          <button type="submit" 
          className="w-full mt-6 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800"
          disabled={loading}
          >
            {loading ? t('boooking') : t('book-technician')}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default BookTechnician;
