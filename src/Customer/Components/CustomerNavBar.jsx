

import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { FaUserCircle, FaBell, FaBars, FaTimes } from "react-icons/fa"
import logo1 from "../../assets/logo.png"
import { Globe } from "lucide-react"
import { LocationContext } from "../../Shared/Context/LocationContext"

export default function CustomerNavBar() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const Customer = JSON.parse(localStorage.getItem("customer") || "{}")
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const profileLink = `/customer-profile/${Customer?.id || ""}`
  const notificationLink = `/notification/${user?.id || ""}`
  const { userAddress } = useContext(LocationContext)
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "am" : "en"
    i18n.changeLanguage(newLang)
  }

  // Add this state to control the visibility of the notification symbol
  const [hasNotification, setHasNotification] = useState(true)

  return (
    <nav className="text-black bg-white  fixed top-0 left-0 right-0 z-50 py-2">
      <div className="max-w-7xl mx-4 px-4 sm:px-6  lg:px-8">
        <div className="flex h-16 justify-between ">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo1 || "/placeholder.svg"} alt="Logo" className="h-12" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={profileLink}
              className="text-2xl text-emerald-800 hover:text-emerald-600 transition duration-150 ease-in-out px-4"
              aria-label="Profile"
            >
              <FaUserCircle size={32} />
            </Link>
            <Link
              to={notificationLink}
              className="text-2xl text-emerald-800 hover:text-emerald-600 transition duration-150 ease-in-out relative"
              aria-label="Notifications"
            >
              <FaBell size={32} />
              {hasNotification && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>
              )}
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-emerald-700 
                           bg-white rounded-full 
                           transition-colors duration-200"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{i18n.language === "en" ? "አማርኛ" : i18n.language === "am" ? "English" : "Afaan Oromoo"}</span>
              </button>
              {isOpen && (
                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10 ml-16">
                  <button
                    onClick={() => {
                      i18n.changeLanguage("en")
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm rounded-xl text-emerald-700 hover:bg-emerald-700 hover:text-white"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      i18n.changeLanguage("am")
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm rounded-xl  text-emerald-700 hover:bg-emerald-700 hover:text-white"
                  >
                    አማርኛ
                  </button>
                  <button
                    onClick={() => {
                      i18n.changeLanguage("om")
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm rounded-xl t text-emerald-700 hover:bg-emerald-700 hover:text-white"
                  >
                    Afaan Oromoo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-emerald-600 focus:outline-none">
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Link
              to={profileLink}
              className="block text-emerald-700 px-3 py-2 rounded-md text-base font-medium hover:text-emerald-800 transition duration-150 ease-in-out"
            >
              {t("yrprofike")}
            </Link>
            <Link
              to={notificationLink}
              className="block text-emerald-700 px-3 py-2 rounded-md text-base font-medium hover:text-emerald-800 transition duration-150 ease-in-out"
            >
              {t("notification")}
            </Link>
            {/* Language Options in Mobile Menu */}
            <button
              onClick={() => toggleLanguage("en")}
              className="block w-full px-4 py-2 text-sm text-start rounded-xl text-emerald-700 hover:bg-emerald-700 hover:text-white"
            >
              English
            </button>
            <button
              onClick={() => toggleLanguage("am")}
              className="block w-full px-4 py-2 text-sm text-start rounded-xl text-emerald-700 hover:bg-emerald-700 hover:text-white"
            >
              አማርኛ
            </button>
            <button
              onClick={() => toggleLanguage("om")}
              className="block w-full px-4 py-2 text-sm text-start rounded-xl text-emerald-700 hover:bg-emerald-700 hover:text-white"
            >
              Afaan Oromoo
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

