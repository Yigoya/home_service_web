"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Wrench, Upload, Mail, Lock, User, Phone, MapPin, FileText, Briefcase } from "lucide-react"
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
]

export default function TechnicianSignup() {
  const navigate = useNavigate()
  const [files, setFiles] = useState({
    profileImage: null ,
    documents: [] ,
    idCardImage: null ,
  })

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

  const handleFileChange = (
    event,
    type,
  ) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        {/* Left side - Features */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-12">
          <div className="max-w-lg">
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
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-md w-full space-y-6">
            <div>
              <div className="flex justify-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <Wrench className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a technician account</h2>
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

            <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-gray-100">
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
              >
                {({ values, errors, touched, handleChange, setFieldValue, isSubmitting }) => (
                  <Form className="space-y-6">
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
                      {errors.name && touched.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
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
                      {errors.email && touched.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
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
                        <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                      )}
                    </div>

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
                      {errors.bio && touched.bio && <p className="mt-2 text-sm text-red-600">{errors.bio}</p>}
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
                        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Services</label>
                      <div className="mt-1 grid grid-cols-1 gap-2">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              id={`service-${service.id}`}
                              name="serviceIds"
                              value={service.id}
                              onChange={(e) => {
                                const serviceIds = e.target.checked
                                  ? [...values.serviceIds, service.id]
                                  : values.serviceIds.filter((id) => id !== service.id)
                                setFieldValue("serviceIds", serviceIds)
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`service-${service.id}`}
                              className="ml-2 block text-sm text-gray-900 w-full cursor-pointer"
                            >
                              {service.name}
                            </label>
                          </div>
                        ))}
                        {errors.serviceIds && touched.serviceIds && (
                          <p className="mt-2 text-sm text-red-600">{errors.serviceIds}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
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
                      </div>
                    </div>

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
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Creating account..." : "Create account"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
