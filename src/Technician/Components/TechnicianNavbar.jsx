"use client"

import { useState, useEffect, useContext, useRef } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { FaUserCircle, FaBell, FaBars } from "react-icons/fa"
import logo1 from "../../assets/logo.png"
import { Globe, MapPin } from "lucide-react"
import { LocationContext } from "../../Shared/Context/LocationContext"

const TechnicianNavBar = () => {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [technician, setTechnician] = useState(null)
  const user = JSON.parse(localStorage.getItem("user"))
  const { userAddress } = useContext(LocationContext)

  const [hasNotification, setHasNotification] = useState(true)

  useEffect(() => {
    const storedTechnician = localStorage.getItem("technician")

    if (storedTechnician) {
      setTechnician(JSON.parse(storedTechnician))
    }
  }, [])

  console.log("Technician:", technician, user)
  const profileLink = "/"
  const notificationLink = `/notification/${user?.id || ""}`

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    setIsLangMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const langMenuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
              className="text-2xl text-emerald-800 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-full p-1"
              aria-label={t("profile")}
            >
              <FaUserCircle size={32}/>
            </Link>
            <Link
              to={notificationLink}
              className="text-2xl hover:text-emerald-600 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-full p-1 relative"
              aria-label={t("notifications")}
            >
              <FaBell size={32}/>
              {hasNotification && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>
              )}
            </Link>
            <div className="relative " ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-emerald-700 
                           bg-white rounded-full 
                           transition-colors duration-200"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{i18n.language === "en" ? "አማርኛ" : i18n.language === "am" ? "English" : "Afaan Oromoo"}</span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute  mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="block w-full text-left px-4 py-2 text-sm rounded-xl text-emerald-700 hover:bg-emerald-700 hover:text-white"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage("am")}
                    className="block w-full text-left px-4 py-2 text-sm rounded-xl  text-emerald-700 hover:bg-emerald-700 hover:text-white"
                  >
                    አማርኛ
                  </button>
                  <button
                    onClick={() => changeLanguage("om")}
                    className="block w-full text-left px-4 py-2 text-sm rounded-xl t text-emerald-700 hover:bg-emerald-700 hover:text-white"
                  >
                    Afaan Oromoo
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded p-1"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 space-y-3 md:hidden">
            <Link
              to={profileLink}
              onClick={toggleMenu}
              className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              <FaUserCircle className="mr-2 text-xl" />
              <span>{t("profile")}</span>
            </Link>
            <Link
              to={notificationLink}
              onClick={toggleMenu}
              className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              <FaBell className="mr-2 text-xl" />
              <span>{t("notifications")}</span>
              {hasNotification && <span className="ml-2 h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>}
            </Link>
            <button
              onClick={() => changeLanguage("en")}
              className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              <Globe className="mr-2 text-xl" />
              <span>English</span>
            </button>
            <button
              onClick={() => changeLanguage("am")}
              className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              <Globe className="mr-2 text-xl" />
              <span>አማርኛ</span>
            </button>
            <button
              onClick={() => changeLanguage("om")}
              className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              <Globe className="mr-2 text-xl" />
              <span>Afaan Oromoo</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default TechnicianNavBar

