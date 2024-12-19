import React, { useState, useEffect } from "react";
import axios from "axios";
import TopTechnician from "./TopTechnician";
import { HomeApi } from "../api";
import { useTranslation } from "react-i18next";

const TechnicianCarousel = () => {
  const { t } = useTranslation();
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get(HomeApi);
        const techniciansData = response.data?.topFiveTechnicians || [];
        const reviewsData = response.data?.topFiveReviews || [];
        console.log(techniciansData, "techniciansData");
        console.log(reviewsData, "reviewsData");

        // Calculate ratings for each technician
        const techniciansWithRatings = techniciansData.map((technician) => {
          const technicianReviews = reviewsData.filter(
            (review) => review.technicianId === technician.id
          );

          // Calculate average rating
          const averageRating =
            technicianReviews.length > 0
              ? (
                  technicianReviews.reduce((sum, review) => sum + review.rating, 0) /
                  technicianReviews.length
                ).toFixed(1)
              : null;

          return { ...technician, rating: parseFloat(averageRating) };
        });

        // Filter technicians with a rating of 4 or higher
        const filteredTechnicians = techniciansWithRatings.filter(
          (technician) => technician.rating && technician.rating >= 4.0
        );

        setTechnicians(filteredTechnicians);
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };

    fetchTechnicians();
  }, []);

  return (
    <div className="flex justify-center bg-gray-50 py-2">
      <div className="max-w-5xl w-full overflow-x-auto lg:flex space-x-4 py-4 scrollbar-hi">
        {technicians.length === 0 ? (
          <p className="text-gray-500 text-center lg:ml-96 font-bold text-xl p-8">
            {t('noReviews', { defaultValue: "No Top Technicians Yet" })}
          </p>
        ) : (
          technicians.map((technician) => (
            <TopTechnician key={technician.id} {...technician} />
          ))
        )}
      </div>
    </div>
  );
};

export default TechnicianCarousel;
