import { Link } from "react-router-dom"
import { UserPlus, Wrench, ArrowRight } from "lucide-react"

export default function SignupSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
      <div className="max-w-4xl w-full px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join BusinessPro</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose how you want to use our platform. Sign up as a customer to find services or as a technician to offer
            your expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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

          {/* Technician Signup Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] border border-gray-100">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-white">Sign up as a Technician</h2>
              <p className="text-blue-100 mt-2">Offer your professional services to businesses</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500">✓</div>
                  <p className="ml-3 text-gray-700">Connect with potential clients</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500">✓</div>
                  <p className="ml-3 text-gray-700">Showcase your skills and experience</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500">✓</div>
                  <p className="ml-3 text-gray-700">Manage your business operations</p>
                </li>
              </ul>
              <Link
                to="/signup/technician"
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue as Technician
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
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

