import React, { useState } from "react";
import { API_URL } from "../api";

const CommonServiceDescription = ({ title, description = [] }) => {
    //  const [services, setServices] = useState([]);
    //   const [selectedService, setSelectedService] = useState(null);
    //   const fetchServices = async () => {
    //     try {
    //       setLoading(true);
    //       const response = await axios.get(`${API_URL}/admin/services`);
    //       if (response.data) {
    //         setServices(response.data);
    //         setLoading(false);
    //         console.log(response.data);
    //         setSelectedService(response.data[0]);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching services:", error);
    //     }
    //   };
    //   const filteredServices = servicesArray.filter(service => {
    //     const serviceName = service.name || ""; // Use an empty string if name is undefined
    //     return serviceName.toLowerCase().includes(searchText.toLowerCase());
    //   });

     
  return (
    <div className="flex flex-col md:flex-row items-center  py-6 mt-6 ">
      
      
      {/* Text Section */}
      <div className="lg:absolute md:w-96 lg:bg-white p-12 lg:ml-4 rounded-md lg:shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {description.map((item, index) =>
            item.trim() ? (
              <li key={index} className="text-sm">
                {item.trim()}.
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
};

export default CommonServiceDescription;