import React, { useEffect, useState } from "react";
import axios from "axios";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("https://67246da2493fac3cf24e2e4f.mockapi.io/testimonials");
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold   mb-8">What the Customer says</h2>
      <div className="lg:grid lg:grid-cols-2 lg:gap-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border p-4 rounded-lg mb-4 shadow-md transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-lg font-bold mb-2">{testimonial.name}</h3>
            <div className="flex items-center mb-2">
              {[...Array(testimonial.rating)].map((_, index) => (
                <span key={index} className="text-yellow-500">★</span>
              ))}
            </div>
            <p className="text-gray-600">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
