import React, { useState, useEffect } from "react";
import axios from "axios";
import TopTechnician from "./TopTechnician";
import { HomeApi } from "../api";
import { useTranslation } from "react-i18next";
import { Loader2 } from 'lucide-react';

const TechnicianCarousel = () => {
  const { t } = useTranslation();
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setLoading(true);
        const response = await axios.get(HomeApi);
        const techniciansData = response.data?.topFiveTechnicians || [];
        const reviewsData = response.data?.topFiveReviews || [];

        const techniciansWithRatings = techniciansData.map((technician) => {
          const technicianReviews = reviewsData.filter(
            (review) => review.technicianId === technician.id
          );

          const averageRating =
            technicianReviews.length > 0
              ? (
                  technicianReviews.reduce((sum, review) => sum + review.rating, 0) /
                  technicianReviews.length
                ).toFixed(1)
              : null;

          return { ...technician, rating: parseFloat(averageRating) };
        });

        const filteredTechnicians = techniciansWithRatings.filter(
          (technician) => technician.rating && technician.rating >= 4.0
        );

        setTechnicians(filteredTechnicians);
      } catch (error) {
        console.error("Error fetching technicians:", error);
        setError(t('errorFetching', { defaultValue: "Error loading technicians. Please try again later." }));
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, [t]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px] bg-gray-50">
        <p className="text-red-500 text-center font-medium">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-8 px-4 md:py-12">
      <div className="max-w-7xl mx-auto">
        {technicians.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500 font-medium text-lg">
              {t('noReviews', { defaultValue: "No Top Technicians Yet" })}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {technicians.map((technician) => (
              <TopTechnician key={technician.id} {...technician} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TechnicianCarousel;
