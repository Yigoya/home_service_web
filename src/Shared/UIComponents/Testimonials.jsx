import React, { useEffect, useState } from "react";
import axios from "axios";
import { HomeApi } from "../api";
import { useTranslation } from 'react-i18next';
import { Star, Quote, Loader2, AlertCircle } from 'lucide-react';
import { motion } from "framer-motion";

const Testimonials = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await axios.get(HomeApi);
        const reviewsData = response.data?.topFiveReviews || [];

        const formattedTestimonials = reviewsData.map((review) => ({
          id: review.id,
          name: review.customer?.name || t('anonymous', "Anonymous"),
          rating: review.rating,
          review: review.review,
          date: new Date(review.createdAt).toLocaleDateString(),
        }));

        setTestimonials(formattedTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError(t('errorFetching', "Failed to load testimonials. Please try again later."));
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [t]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('testmony')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('testimonialSubtitle', "Discover what our customers are saying about their experiences")}
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md mx-auto">
            <Quote className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium">
              {t('noReviews', "No Reviews Yet")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">{testimonial.date}</p>
                    </div>
                    <Quote className="w-8 h-8 text-green-500 opacity-20" />
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="relative">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {testimonial.review}
                    </p>
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;