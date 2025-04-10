"use client"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { LogIn, Mail, Lock, Building2, Briefcase } from "lucide-react"
import toast from "react-hot-toast"
import api from "../../lib/axios"
import { setCredentials } from "../../store/slices/authSlice"

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
})

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search)
  const returnUrl = queryParams.get("return-url") || queryParams.get("returnUrl")

  // Check if we have a planId in the returnUrl
  const getSelectedPlanFromReturnUrl = () => {
    if (!returnUrl) return null

    try {
      // If returnUrl contains subscription-plans?planId=X
      const returnUrlObj = new URL(returnUrl, window.location.origin)
      const planId = returnUrlObj.searchParams.get("planId")
      return planId
    } catch (e) {
      // If returnUrl is just a path like /subscription-plans?planId=X
      const urlObj = new URL(returnUrl, window.location.origin)
      return urlObj.searchParams.get("planId")
    }
  }

  const selectedPlanId = getSelectedPlanFromReturnUrl()

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const deviceInfo = {
        FCMToken: "sample-token",
        deviceType: navigator.platform,
        deviceModel: navigator.userAgent,
        operatingSystem: navigator.platform,
      }

      const response = await api.post("/auth/login", {
        ...values,
        ...deviceInfo,
      })

      let roleId = null
      if (response.data.user.role === "CUSTOMER") {
        roleId = response.data.customer.id
      } else if (response.data.user.role === "TECHNICIAN") {
        roleId = response.data.technician.id
      }

      response.data.user.roleId = roleId
      dispatch(setCredentials(response.data))
      toast.success("Login successful!")

      // Handle navigation based on user role and return URL
      if (response.data.user.role === "TECHNICIAN") {
        navigate("/technician/dashboard")
      } else {
        if (returnUrl) {
          // If returning to subscription plans with a selected plan
          if (selectedPlanId && returnUrl.includes("subscription")) {
            // Navigate to subscription plans with the plan ID
            navigate(`/subscription?planId=${selectedPlanId}`)
          } else {
            // Navigate to the regular return URL
            navigate(returnUrl)
          }
        } else {
          navigate("/")
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="flex justify-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <LogIn className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome back</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup/customer" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Sign up now
                </Link>
              </p>

              {/* Show message if coming from subscription plans */}
              {selectedPlanId && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-sm text-blue-700 text-center">Please log in to select your subscription plan</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-gray-100">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, touched, handleChange, isSubmitting }) => (
                    <Form className="space-y-6">
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
                            autoComplete="current-password"
                            value={values.password}
                            onChange={handleChange}
                            className={`appearance-none block w-full pl-10 px-3 py-2 border ${
                              errors.password && touched.password ? "border-red-300" : "border-gray-300"
                            } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                            placeholder="Enter your password"
                          />
                        </div>
                        {errors.password && touched.password && (
                          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                          </label>
                        </div>

                        <div className="text-sm">
                          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Forgot your password?
                          </a>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Signing in..." : "Sign in"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Features */}
        <div
          className="hidden lg:flex flex-1 items-center justify-center bg-cover bg-center relative"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gray-900/75 opacity-20"></div> {/* Blue overlay */}
          <div className="max-w-lg bg-gradient-to-br from-blue-600 to-blue-800 bg-opacity-50 p-12 rounded-lg shadow-lg relative z-10">
            <h2 className="text-4xl font-bold text-white mb-8">Transform Your Business with BusinessPro</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Professional Services</h3>
                  <p className="mt-2 text-blue-100">
                    Access a network of verified professionals for all your business needs
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Business Solutions</h3>
                  <p className="mt-2 text-blue-100">
                    Streamline your operations with our comprehensive business solutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
