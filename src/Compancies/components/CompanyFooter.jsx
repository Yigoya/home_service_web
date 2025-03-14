import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "react-feather"

function CompanyFooter() {
  return (
    <footer className="bg-gray-100 pt-10 pb-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">JustCall</h3>
            <p className="text-gray-600 mb-4">
              India's No. 1 local search engine that provides information and connects consumers with businesses across
              the country.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 hover:text-blue-600">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/beauty-subcategories" className="text-gray-600 hover:text-blue-600">
                  Beauty & Spa
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Home Services
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Education
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Health & Medical
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  JustCall Ltd, 501, 5th Floor, Palm Court, Linking Road, Mumbai - 400050
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-blue-600 mr-2 flex-shrink-0" />
                <a href="tel:+918888888888" className="text-gray-600 hover:text-blue-600">
                  +91 8888 888 888
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-blue-600 mr-2 flex-shrink-0" />
                <a href="mailto:support@JustCall.com" className="text-gray-600 hover:text-blue-600">
                  support@JustCall.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} JustCall Ltd. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-600 hover:text-blue-600 text-sm">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600 text-sm">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default CompanyFooter

