import React, { useEffect, useState } from "react";
import axios from "axios";
import { HomeApi } from "../api";
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Simulate API call
        const response = await axios.get(HomeApi); // Replace with your actual API endpoint
        const reviewsData = response.data?.topFiveReviews || [];

        // Map reviews to include customer details
        const formattedTestimonials = reviewsData.map((review) => ({
          id: review.id,
          name: review.customer?.name || "Anonymous",
          rating: review.rating,
          review: review.review,
        }));

        setTestimonials(formattedTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">{t('testmony')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`border p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 ${
              testimonial.id % 2 === 0 ? "w-84" : "w-80"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">{testimonial.name}</h3>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <span key={index} className="text-yellow-500">★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-600 overflow-hidden">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
