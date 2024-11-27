import React, { useState, useEffect } from "react";
import TopTechnician from "./TopTechnician";
import axios from "axios";

const TechnicianCarousel = () => {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get("https://6724624b493fac3cf24e0ff0.mockapi.io/technicians");
        const fetchedTechnicians = response.data;

        const filteredTechnicians = fetchedTechnicians.filter(
          (technician) => technician.rating >= 4.0
        );

        setTechnicians(filteredTechnicians);
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };

    fetchTechnicians();
  }, []);

  return (
    <div className="flex justify-center bg-gray-100 lg:mx-52">
      <div className="max-w-5xl w-full overflow-x-auto flex space-x-4 py-4">
        <div className="flex w-[calc(18rem*6)]">
          {technicians.map((technician) => (
            <TopTechnician key={technician.id} {...technician} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicianCarousel;
