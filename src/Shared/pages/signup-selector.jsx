"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserPlus, Wrench, Building, Briefcase, ArrowRight } from "lucide-react"

export default function SignupSelector() {
  const [queryType, setQueryType] = useState(null)

  useEffect(() => {
    // Parse the URL query parameters
    const urlParams = new URLSearchParams(window.location.search)
    const queryParam = urlParams.get("type")
    setQueryType(queryParam)
  }, [])

  // Define the second card options based on query parameter
  const getSecondCardContent = () => {
    switch (queryType) {
      case "technician":
        return {
          title: "Sign up as a Technician",
          description: "Offer your professional services to businesses",
          icon: <Wrench className="h-8 w-8 text-blue-600" />,
          benefits: [
            "Connect with potential clients",
            "Showcase your skills and experience",
            "Manage your business operations",
          ],
          linkTo: "/signup/technician",
          linkText: "Continue as Technician",
          gradientFrom: "from-blue-700",
          gradientTo: "to-blue-600",
          hoverFrom: "hover:from-blue-800",
          hoverTo: "hover:to-blue-700",
        }
      case "tender":
        return {
          title: "Sign up as a Tender Agent",
          description: "Manage tenders and procurement processes",
          icon: <Briefcase className="h-8 w-8 text-blue-600" />,
          benefits: [
            "Access to tender opportunities",
            "Streamline procurement processes",
            "Connect with qualified vendors",
          ],
          linkTo: "/signup/tender-agent",
          linkText: "Continue as Tender Agent",
          gradientFrom: "from-purple-700",
          gradientTo: "to-purple-600",
          hoverFrom: "hover:from-purple-800",
          hoverTo: "hover:to-purple-700",
        }
      case "company":
        return {
          title: "Register Your Business",
          description: "Create a company profile and manage your business",
          icon: <Building className="h-8 w-8 text-blue-600" />,
          benefits: [
            "Establish your company presence",
            "Manage team members and permissions",
            "Access business-specific features",
          ],
          linkTo: "https://business-dashboard-pi.vercel.app/auth/register",
          linkText: "Register Your Business",
          gradientFrom: "from-green-700",
          gradientTo: "to-green-600",
          hoverFrom: "hover:from-green-800",
          hoverTo: "hover:to-green-700",
        }
      default:
        return null
    }
  }

  const secondCard = getSecondCardContent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
      <div className="max-w-4xl w-full px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join BusinessPro</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {secondCard
              ? "Choose how you want to use our platform."
              : "Sign up as a customer to find services for your business needs."}
          </p>
        </div>

        <div className={`grid ${secondCard ? "md:grid-cols-2" : "md:grid-cols-1 max-w-md mx-auto"} gap-8`}>
          {/* Customer Signup Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                <UserPlus className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-white">Sign up as a Customer</h2>
              <p className="text-blue-100 mt-2">Find professional services for your business needs</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500">✓</div>
                  <p className="ml-3 text-gray-700">Access to verified professionals</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500">✓</div>
                  <p className="ml-3 text-gray-700">Request quotes for your projects</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500">✓</div>
                  <p className="ml-3 text-gray-700">Manage service requests in one place</p>
                </li>
              </ul>
              <Link
                to="/signup/customer"
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue as Customer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Conditional Second Card */}
          {secondCard && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] border border-gray-100">
              <div className={`bg-gradient-to-r ${secondCard.gradientFrom} ${secondCard.gradientTo} p-6`}>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                  {secondCard.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{secondCard.title}</h2>
                <p className="text-blue-100 mt-2">{secondCard.description}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {secondCard.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-500">✓</div>
                      <p className="ml-3 text-gray-700">{benefit}</p>
                    </li>
                  ))}
                </ul>
                <Link
                  to={secondCard.linkTo}
                  className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r ${secondCard.gradientFrom} ${secondCard.gradientTo} ${secondCard.hoverFrom} ${secondCard.hoverTo} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {secondCard.linkText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
