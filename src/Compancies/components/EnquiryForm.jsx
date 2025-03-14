"use client"

import { useState } from "react"
import { enquiryApi } from "../services/api"

function EnquiryForm({ title, businessId }) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    service: "Hair styling",
    message: "I would like to know more about your services.",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.phoneNumber) {
      setSubmitStatus({
        success: false,
        message: "Please fill in all required fields.",
      })
      return
    }

    try {
      setIsSubmitting(true)

      const enquiryData = {
        businessId: businessId || 1, // Default to 1 if not provided
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        message: `Service: ${formData.service}. ${formData.message}`,
      }

      await enquiryApi.create(enquiryData)

      setSubmitStatus({
        success: true,
        message: "Your enquiry has been sent successfully!",
      })

      // Reset form
      setFormData({
        name: "",
        phoneNumber: "",
        service: "Hair styling",
        message: "I would like to know more about your services.",
      })
    } catch (error) {
      console.error("Error submitting enquiry:", error)
      setSubmitStatus({
        success: false,
        message: "Failed to send enquiry. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <h2 className="text-lg font-semibold mb-2">
        {title} <span className="text-blue-500">Beauty Parlours</span>
      </h2>
      <p className="text-sm text-gray-600 mb-4">We'll send you contact details in seconds for free</p>

      {submitStatus && (
        <div
          className={`p-3 mb-4 rounded-md ${submitStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="font-medium mb-2">What service are you interested in?</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="service"
                value="Hair styling"
                className="accent-blue-500"
                checked={formData.service === "Hair styling"}
                onChange={handleChange}
              />
              <span>Hair styling</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="service"
                value="Skin care"
                className="accent-blue-500"
                checked={formData.service === "Skin care"}
                onChange={handleChange}
              />
              <span>Skin care</span>
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Mobile Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-medium ${
              isSubmitting
                ? "bg-blue-400 text-white cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Enquiry ≫"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EnquiryForm

