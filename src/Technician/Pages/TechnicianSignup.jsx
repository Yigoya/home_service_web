"use client"

import { useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import {
  Wrench,
  Upload,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  FileText,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Check,
} from "lucide-react"
import toast from "react-hot-toast"
import api from "../../lib/axios"

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phoneNumber: Yup.string().required("Required"),
  bio: Yup.string().required("Required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Required"),
  city: Yup.string().required("Required"),
  subcity: Yup.string().required("Required"),
  wereda: Yup.string().required("Required"),
  serviceIds: Yup.array().min(1, "Select at least one service").required("Required"),
})

const services = [
  { id: 1, name: "Construction Industry" },
  { id: 2, name: "Construction Design & Consultancy" },
  { id: 3, name: "Electrical Services" },
  { id: 4, name: "Plumbing Services" },
  { id: 5, name: "Interior Design" },
  { id: 6, name: "Landscaping" },
  { id: 7, name: "HVAC Installation & Repair" },
  { id: 8, name: "Roofing Services" },
  { id: 9, name: "Flooring Installation" },
  { id: 10, name: "Painting Services" },
  { id: 11, name: "Carpentry" },
  { id: 12, name: "Masonry" },
  { id: 13, name: "Welding & Metal Work" },
  { id: 14, name: "Window & Door Installation" },
  { id: 15, name: "Solar Panel Installation" },
  { id: 16, name: "Home Automation" },
  { id: 17, name: "Security System Installation" },
  { id: 18, name: "Drywall Installation & Repair" },
  { id: 19, name: "Insulation Installation" },
  { id: 20, name: "Concrete Work" },
]

export default function TechnicianSignup() {
  const navigate = useNavigate()
  const [files, setFiles] = useState({
    profileImage: null,
    documents: [],
    idCardImage: null,
  })
  const [step, setStep] = useState(1)
  const totalSteps = 3
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [tempSelectedServices, setTempSelectedServices] = useState([])
  const formikRef = useRef(null)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData()

      // Append text fields
      Object.keys(values).forEach((key) => {
        if (key === "serviceIds") {
          values[key].forEach((id) => {
            formData.append("serviceIds", id.toString())
          })
        } else {
          formData.append(key, values[key])
        }
      })

      // Append files
      if (files.profileImage) {
        formData.append("profileImage", files.profileImage)
      }
      if (files.idCardImage) {
        formData.append("idCardImage", files.idCardImage)
      }
      files.documents.forEach((doc) => {
        formData.append("documents", doc)
      })

      await api.post("/auth/technician/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      toast.success("Registration successful! Please login.")
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed")
    } finally {
      setSubmitting(false)
    }
  }

  const handleFileChange = (event, type) => {
    const fileList = event.target.files
    if (!fileList) return

    if (type === "documents") {
      setFiles((prev) => ({
        ...prev,
        documents: Array.from(fileList),
      }))
    } else {
      setFiles((prev) => ({
        ...prev,
        [type]: fileList[0],
      }))
    }
  }

  const nextStep = () => {
    setStep(Math.min(step + 1, totalSteps))
  }

  const prevStep = () => {
    setStep(Math.max(step - 1, 1))
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stepNumber === step
                  ? "bg-blue-600 text-white"
                  : stepNumber < step
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {stepNumber < step ? "✓" : stepNumber}
            </div>
            {stepNumber < 3 && <div className={`w-12 h-1 ${stepNumber < step ? "bg-green-500" : "bg-gray-200"}`}></div>}
          </div>
        ))}
      </div>
    )
  }

  const openServiceModal = (currentServiceIds) => {
    setTempSelectedServices(currentServiceIds)
    setShowServiceModal(true)
  }

  const handleServiceSelection = (serviceId) => {
    setTempSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId)
      } else {
        return [...prev, serviceId]
      }
    })
  }

  const applyServiceSelection = () => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("serviceIds", tempSelectedServices)
    }
    setShowServiceModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        {/* Left side - Features */}
        <div
          className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-12 relative"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
          <div className="max-w-lg bg-gradient-to-br from-blue-600 to-blue-800 bg-opacity-50 p-12 rounded-2xl shadow-lg relative z-10">
            <h2 className="text-4xl font-bold text-white mb-8">Join as a Professional</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Grow Your Business</h3>
                  <p className="mt-2 text-blue-100">Connect with customers looking for your expertise and services</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Simple Management</h3>
                  <p className="mt-2 text-blue-100">Easily manage your projects, clients, and payments in one place</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Local Opportunities</h3>
                  <p className="mt-2 text-blue-100">Find clients in your area looking for your specific skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-md w-full">
            <div>
              <div className="flex justify-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <Wrench className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
              </div>
              <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Create a technician account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link to="/signup/customer" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  sign up as a customer
                </Link>{" "}
                |{" "}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  sign in to your account
                </Link>
              </p>
            </div>

            {renderStepIndicator()}

            <div className="bg-white py-6 px-4 shadow-2xl sm:rounded-lg sm:px-8 border border-gray-100">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phoneNumber: "",
                  bio: "",
                  password: "",
                  city: "",
                  subcity: "",
                  wereda: "",
                  serviceIds: [],
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                innerRef={formikRef}
              >
                {({ values, errors, touched, handleChange, setFieldValue, isSubmitting, validateForm }) => (
                  <Form className="space-y-4">
                    {step === 1 && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              autoComplete="name"
                              value={values.name}
                              onChange={handleChange}
                              className={`appearance-none block w-full pl-10 px-3 py-2 border ${
                                errors.name && touched.name ? "border-red-300" : "border-gray-300"
                              } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                              placeholder="Enter your full name"
                            />
                          </div>
                          {errors.name && touched.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                          </label>
                          <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              value={values.email}
                              onChange={handleChange}
                              className={`appearance-none block w-full pl-10 px-3 py-2 border ${
                                errors.email && touched.email ? "border-red-300" : "border-gray-300"
                              } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                              placeholder="Enter your email"
                            />
                          </div>
                          {errors.email && touched.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="phoneNumber"
                              name="phoneNumber"
                              type="tel"
                              autoComplete="tel"
                              value={values.phoneNumber}
                              onChange={handleChange}
                              className={`appearance-none block w-full pl-10 px-3 py-2 border ${
                                errors.phoneNumber && touched.phoneNumber ? "border-red-300" : "border-gray-300"
                              } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                              placeholder="Enter your phone number"
                            />
                          </div>
                          {errors.phoneNumber && touched.phoneNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="new-password"
                              value={values.password}
                              onChange={handleChange}
                              className={`appearance-none block w-full pl-10 px-3 py-2 border ${
                                errors.password && touched.password ? "border-red-300" : "border-gray-300"
                              } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                              placeholder="Create a password"
                            />
                          </div>
                          {errors.password && touched.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                            Bio
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="bio"
                              name="bio"
                              rows={3}
                              value={values.bio}
                              onChange={handleChange}
                              className={`appearance-none block w-full px-3 py-2 border ${
                                errors.bio && touched.bio ? "border-red-300" : "border-gray-300"
                              } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                              placeholder="Tell us about your experience and expertise"
                            />
                          </div>
                          {errors.bio && touched.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                              City
                            </label>
                            <div className="mt-1">
                              <input
                                id="city"
                                name="city"
                                type="text"
                                value={values.city}
                                onChange={handleChange}
                                className={`appearance-none block w-full px-3 py-2 border ${
                                  errors.city && touched.city ? "border-red-300" : "border-gray-300"
                                } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                placeholder="City"
                              />
                            </div>
                            {errors.city && touched.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                          </div>

                          <div>
                            <label htmlFor="subcity" className="block text-sm font-medium text-gray-700">
                              Subcity
                            </label>
                            <div className="mt-1">
                              <input
                                id="subcity"
                                name="subcity"
                                type="text"
                                value={values.subcity}
                                onChange={handleChange}
                                className={`appearance-none block w-full px-3 py-2 border ${
                                  errors.subcity && touched.subcity ? "border-red-300" : "border-gray-300"
                                } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                placeholder="Subcity"
                              />
                            </div>
                            {errors.subcity && touched.subcity && (
                              <p className="mt-1 text-sm text-red-600">{errors.subcity}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="wereda" className="block text-sm font-medium text-gray-700">
                              Wereda
                            </label>
                            <div className="mt-1">
                              <input
                                id="wereda"
                                name="wereda"
                                type="text"
                                value={values.wereda}
                                onChange={handleChange}
                                className={`appearance-none block w-full px-3 py-2 border ${
                                  errors.wereda && touched.wereda ? "border-red-300" : "border-gray-300"
                                } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                placeholder="Wereda"
                              />
                            </div>
                            {errors.wereda && touched.wereda && (
                              <p className="mt-1 text-sm text-red-600">{errors.wereda}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Services</label>
                          <div className="mt-1">
                            <button
                              type="button"
                              onClick={() => openServiceModal(values.serviceIds)}
                              className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                              <span>
                                {values.serviceIds.length
                                  ? `${values.serviceIds.length} service${values.serviceIds.length > 1 ? "s" : ""} selected`
                                  : "Select services"}
                              </span>
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                          {values.serviceIds.length > 0 && (
                            <div className="mt-2">
                              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                                {values.serviceIds.map((id) => {
                                  const service = services.find((s) => s.id === id)
                                  return service ? (
                                    <div
                                      key={id}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                    >
                                      {service.name}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setFieldValue(
                                            "serviceIds",
                                            values.serviceIds.filter((sId) => sId !== id),
                                          )
                                        }}
                                        className="ml-1 inline-flex items-center"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </div>
                                  ) : null
                                })}
                              </div>
                            </div>
                          )}
                          {errors.serviceIds && touched.serviceIds && (
                            <p className="mt-1 text-sm text-red-600">{errors.serviceIds}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, "profileImage")}
                              className="sr-only"
                              id="profile-image"
                            />
                            <label
                              htmlFor="profile-image"
                              className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full"
                            >
                              <Upload className="h-5 w-5 mr-2 text-blue-500" />
                              {files.profileImage ? files.profileImage.name : "Upload Profile Image"}
                            </label>
                          </div>
                          {files.profileImage && (
                            <div className="mt-2 flex items-center">
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                <img
                                  src={URL.createObjectURL(files.profileImage) || "/placeholder.svg"}
                                  alt="Profile preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="ml-2 text-sm text-gray-600">Preview</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">ID Card Image</label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, "idCardImage")}
                              className="sr-only"
                              id="id-card-image"
                            />
                            <label
                              htmlFor="id-card-image"
                              className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full"
                            >
                              <Upload className="h-5 w-5 mr-2 text-blue-500" />
                              {files.idCardImage ? files.idCardImage.name : "Upload ID Card Image"}
                            </label>
                          </div>
                          {files.idCardImage && (
                            <div className="mt-2 flex items-center">
                              <div className="w-16 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                                <img
                                  src={URL.createObjectURL(files.idCardImage) || "/placeholder.svg"}
                                  alt="ID Card preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="ml-2 text-sm text-gray-600">Preview</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Documents</label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              multiple
                              onChange={(e) => handleFileChange(e, "documents")}
                              className="sr-only"
                              id="documents"
                            />
                            <label
                              htmlFor="documents"
                              className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full"
                            >
                              <Upload className="h-5 w-5 mr-2 text-blue-500" />
                              {files.documents.length ? `${files.documents.length} files selected` : "Upload Documents"}
                            </label>
                          </div>
                          {files.documents.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Selected documents:</p>
                              <ul className="mt-1 text-sm text-gray-500 list-disc pl-5 max-h-20 overflow-y-auto">
                                {files.documents.map((doc, index) => (
                                  <li key={index}>{doc.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </button>
                      ) : (
                        <div></div>
                      )}

                      {step < totalSteps ? (
                        <button
                          type="button"
                          onClick={() => {
                            validateForm().then((errors) => {
                              // Check if current step fields have errors
                              const currentStepFields = {
                                1: ["name", "email", "phoneNumber", "password"],
                                2: ["bio", "city", "subcity", "wereda", "serviceIds"],
                              }[step]

                              const hasErrors = currentStepFields.some((field) => errors[field])

                              if (!hasErrors) {
                                nextStep()
                              } else {
                                // Touch the fields with errors to show validation messages
                                currentStepFields.forEach((field) => {
                                  if (errors[field]) {
                                    setFieldValue(field, values[field], true)
                                  }
                                })
                              }
                            })
                          }}
                          className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Creating account..." : "Create account"}
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      {/* Service Selection Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowServiceModal(false)}
            ></div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Select Services</h3>
                    <div className="mt-4">
                      <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Search services..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {services
                          .filter((service) => service.name.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((service) => (
                            <div
                              key={service.id}
                              className="flex items-center justify-between px-3 py-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleServiceSelection(service.id)}
                            >
                              <div className="flex items-center">
                                <div
                                  className={`w-5 h-5 mr-3 flex items-center justify-center rounded border ${
                                    tempSelectedServices.includes(service.id)
                                      ? "bg-blue-600 border-blue-600"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {tempSelectedServices.includes(service.id) && (
                                    <Check className="h-4 w-4 text-white" />
                                  )}
                                </div>
                                <span>{service.name}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={applyServiceSelection}
                >
                  Done
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setTempSelectedServices([])}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
