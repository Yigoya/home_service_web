import React, { useEffect, useState } from "react"
import axios from "axios"
import { HomeApi } from "../api"
import { useTranslation } from "react-i18next"
import { Star, Quote, Loader2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

const Testimonials = () => {
  const { t } = useTranslation()
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const response = await axios.get(HomeApi)
        const reviewsData = response.data?.topFiveReviews || []

        const formattedTestimonials = reviewsData.map((review) => ({
          id: review.id,
          name: review.customer?.name || t("anonymous", "Anonymous"),
          rating: review.rating,
          review: review.review,
          category: review.category || "General Services", // Added category
          date: new Date(review.createdAt).toLocaleDateString(),
        }))

        setTestimonials(formattedTestimonials)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        setError(t("errorFetching", "Failed to load testimonials. Please try again later."))
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [t])

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {testimonials.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md mx-auto">
            <Quote className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium">{t("noReviews", "No Reviews Yet")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-950 text-lg leading-relaxed">{testimonial.review}</p>

                  <div className="pt-4">
                    <span className="text-lg font-medium text-emerald-600">{testimonial.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials

