"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    package: "Free",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const validateField = (name, value) => {
    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, [name]: "Please enter a valid corporate email address" }))
        return false
      }
    } else if (name === "password") {
      if (!validatePassword(value)) {
        setErrors((prev) => ({ ...prev, [name]: "Password must be at least 8 characters" }))
        return false
      }
    }

    setErrors((prev) => ({ ...prev, [name]: undefined }))
    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const isEmailValid = validateField("email", formData.email)
    const isPasswordValid = validateField("password", formData.password)

    if (isEmailValid && isPasswordValid) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData)
      // Here you would typically make an API call to create the account
    }

    setIsSubmitting(false)
  }

  const handleNavigateToSignup = () => {
    window.location.href = "/customer-signup?next=/subscription"
  }

  return (
    <div onClick={()=> handleNavigateToSignup()} className="w-full max-w-md mb-auto mt-4 border border-b p-3 bg-white cursor-pointer">
      <div className="text-center border-b  bg-gray-50">
        <h2 className="text-lg font-medium text-gray-700">Create Account</h2>
      </div>

      <div className="flex justify-center mt-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Hulu Moya
          </h1>
          <p className="text-xs uppercase tracking-wider text-gray-500">TENDERS</p>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mb-6">Join to access thousands of business opportunities</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Corporate Email"
            className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-1 focus:ring-blue-500`}
            value={formData.email}
            onChange={handleChange}
            onBlur={(e) => validateField("email", e.target.value)}
            required
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Choose a Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-1 focus:ring-blue-500`}
            value={formData.password}
            onChange={handleChange}
            onBlur={(e) => validateField("password", e.target.value)}
            required
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-1">
            Select a package
          </label>
          <select
            id="package"
            name="package"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.package}
            onChange={handleChange}
          >
            <option value="Free">Free</option>
            <option value="Premium">1 Month</option>
            <option value="Enterprise">3 Month</option>
            <option value="Enterprise">6 Month</option>
            <option value="Enterprise">Year</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3385bb] hover:bg-[#3385bb] text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link to='/subscription' className="text-blue-500 hover:text-[#3385bb] text-sm">
          View Packages
        </Link>
      </div>

      <div className="mt-4 text-xs text-gray-600">
        <p>
          By submitting the form you agree to the{" "}
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Terms & Conditions
          </a>
          . Your information is stored in a secure server and not shared with any third party
        </p>
      </div>
    </div>
  )
}

