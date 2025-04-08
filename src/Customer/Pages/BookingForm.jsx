"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import axios from "axios"
import { API_URL } from "../../Shared/api"
import { useParams, useNavigate } from "react-router-dom"

// Import icons from lucide-react or any other icon library you're using
// If you don't have lucide-react, you can replace these with any other icon components
import { Calendar, Clock, MapPin, Info, ArrowRight, ChevronLeft, Check, X } from "lucide-react"
import { useSelector } from "react-redux"

const BookingForm = () => {
  const { technicianId } = useParams()
  const { serviceId } = useParams()
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    customerId: user?.roleId,
    technicianId: Number.parseInt(technicianId),
    serviceId: Number.parseInt(serviceId),
    description: "",
    scheduledDate: "",
    street: "",
    city: "",
    subcity: "",
    wereda: "",
    state: "Addis Ababa",
    country: "Ethiopia",
    zipCode: "",
    latitude: "",
    longitude: "",
    timeSchedule: "",
  })

  // Available services - in a real app, this would come from an API
  const services = [
    { id: 1, name: "Plumbing Repair", icon: "🔧" },
    { id: 2, name: "Electrical Work", icon: "⚡" },
    { id: 3, name: "Appliance Repair", icon: "🔌" },
    { id: 4, name: "Furniture Assembly", icon: "🪑" },
  ]

  const timeSlots = [
    { id: "morning", label: "Morning", time: "09:00 - 12:00", icon: "☀️" },
    { id: "afternoon", label: "Afternoon", time: "14:00 - 17:00", icon: "🌤️" },
    { id: "evening", label: "Evening", time: "18:00 - 20:00", icon: "🌙" },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    console.log({
      ...formData,
      scheduledDate: `${formData.scheduledDate}T${
        formData.timeSchedule === "Morning"
          ? "09:00:00"
          : formData.timeSchedule === "Afternoon"
            ? "14:30:00"
            : "18:00:00"
      }`,
    })
    try {
      await axios.post(`${API_URL}/booking/request`, {
        ...formData,
        scheduledDate: `${formData.scheduledDate}T${
          formData.timeSchedule === "Morning"
            ? "09:00:00"
            : formData.timeSchedule === "Afternoon"
              ? "14:30:00"
              : "18:00:00"
        }`,
      })

      setSuccessMessage("Booking successful! Redirecting...")
      setTimeout(() => {
        navigate(`/technician-details/${technicianId}/1`)
      }, 2000)
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Failed to create booking. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTimeSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      timeSchedule: value,
    }))
  }

  const handleServiceChange = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      serviceId: Number.parseInt(serviceId),
    }))
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const nextStep = () => setCurrentStep((prev) => prev + 1)
  const prevStep = () => setCurrentStep((prev) => prev - 1)

  const isDateTimeValid = formData.scheduledDate && formData.timeSchedule
  const isDescriptionValid = formData.description.length > 10
  const isLocationValid = formData.street && formData.city && formData.subcity && formData.wereda && formData.zipCode

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-10"></div>
          <h2 className="text-2xl font-bold text-white">Book Your Service</h2>
          <p className="text-teal-50 text-sm mt-1">Complete the form below to schedule your appointment</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-start animate-[fadeIn_0.3s_ease-out]">
              <X className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 flex items-start animate-[fadeIn_0.3s_ease-out]">
              <Check className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{successMessage}</p>
            </div>
          )}

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300
                      ${
                        currentStep === step
                          ? "bg-blue-600 text-white shadow-md shadow-blue-400"
                          : currentStep > step
                            ? "bg-teal-100 text-teal-700"
                            : "bg-gray-100 text-gray-400"
                      }`}
                  >
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  <span className="text-xs mt-1 text-gray-500">
                    {step === 1 ? "Schedule" : step === 2 ? "Details" : "Location"}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full"></div>
              <div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Date and Time */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                  Select Date & Time
                </h3>

                {/* Service Selection
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Service</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceChange(service.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md
                          ${
                            formData.serviceId === service.id
                              ? "border-teal-500 bg-teal-50"
                              : "border-gray-200 hover:border-teal-200"
                          }`}
                      >
                        <span className="text-2xl mb-1">{service.icon}</span>
                        <span className="font-medium text-center text-sm">{service.name}</span>
                      </div>
                    ))}
                  </div>
                </div> */}

                <div>
                  <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    id="scheduledDate"
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleChange}
                    min={format(new Date(), "yyyy-MM-dd")}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Time</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <label
                        key={slot.id}
                        htmlFor={slot.id}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md
                          ${
                            formData.timeSchedule === slot.label
                              ? "border-teal-500 bg-teal-50"
                              : "border-gray-200 hover:border-teal-200"
                          }`}
                      >
                        <input
                          type="radio"
                          id={slot.id}
                          name="timeSchedule"
                          value={slot.label}
                          checked={formData.timeSchedule === slot.label}
                          onChange={() => handleTimeSelect(slot.label)}
                          className="sr-only"
                        />
                        <span className="text-2xl mb-1">{slot.icon}</span>
                        <span className="font-medium">{slot.label}</span>
                        <span className="text-xs text-gray-500">{slot.time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Service Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-teal-500" />
                  Service Details
                </h3>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Describe what you need help with
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Please provide details about the service you need..."
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                    required
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">{formData.description.length} / 500 characters</p>
                    {formData.description.length < 10 && formData.description.length > 0 && (
                      <p className="text-xs text-amber-600">Please provide more details (min 10 characters)</p>
                    )}
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start">
                  <Info className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-amber-800 font-medium">Important</p>
                    <p className="text-xs text-amber-700">
                      Please be as specific as possible about the issue you're experiencing. This helps our technician
                      prepare properly for your appointment.
                    </p>
                  </div>
                </div>

                {/* Selected date/time summary */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Your Selection</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium ml-2">
                        {formData.scheduledDate
                          ? format(new Date(formData.scheduledDate), "MMMM d, yyyy")
                          : "Not selected"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium ml-2">{formData.timeSchedule || "Not selected"}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2 text-gray-500 flex items-center justify-center">🔧</div>
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium ml-2">
                        {services.find((s) => s.id === formData.serviceId)?.name || "Not selected"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location Details */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-teal-500" />
                  Location Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                      Street
                    </label>
                    <input
                      id="street"
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="wereda" className="block text-sm font-medium text-gray-700 mb-1">
                      Wereda
                    </label>
                    <input
                      id="wereda"
                      type="text"
                      name="wereda"
                      value={formData.wereda}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subcity" className="block text-sm font-medium text-gray-700 mb-1">
                      Subcity
                    </label>
                    <input
                      id="subcity"
                      type="text"
                      name="subcity"
                      value={formData.subcity}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code
                    </label>
                    <input
                      id="zipCode"
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Appointment Summary</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium ml-2">
                          {formData.scheduledDate
                            ? format(new Date(formData.scheduledDate), "MMMM d, yyyy")
                            : "Not selected"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium ml-2">{formData.timeSchedule || "Not selected"}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 mr-2 text-gray-500 flex items-center justify-center">🔧</div>
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium ml-2">
                          {services.find((s) => s.id === formData.serviceId)?.name || "Not selected"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="h-px bg-gray-200 my-6"></div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(`/technicians/${technicianId}`)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Cancel
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={(currentStep === 1 && !isDateTimeValid) || (currentStep === 2 && !isDescriptionValid)}
                  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                    (currentStep === 1 && !isDateTimeValid) || (currentStep === 2 && !isDescriptionValid)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !isLocationValid}
                  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                    loading || !isLocationValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Booking...
                    </>
                  ) : (
                    <>
                      Book Appointment
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center text-xs text-gray-500">
          By booking this service, you agree to our{" "}
          <a href="#" className="text-teal-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-teal-600 hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  )
}

export default BookingForm

