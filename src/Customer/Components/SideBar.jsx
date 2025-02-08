"use client"

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../Shared/Context/AuthContext"
import { FilterContext } from "../../Shared/Context/FilterContext"
import { useTranslation } from "react-i18next"
import { API_URL } from "../../Shared/api"
import axios from "axios"
import { Camera, LogOut, Check, X, Edit2, Clock, CheckCircle, RotateCcw } from "lucide-react"

export default function SideBar({ customerInfo }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const { setFilterStatus } = useContext(FilterContext)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(customerInfo.name)
  const [phoneNumber, setPhoneNumber] = useState(customerInfo.phoneNumber)
  const [profileImage, setProfileImage] = useState(customerInfo.profileImage)
  const [imagePreview, setImagePreview] = useState(`${API_URL}/uploads/${customerInfo.profileImage}`)
  const [isHovered, setIsHovered] = useState(false)

  const handleLogout = () => {
    logout()
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("customer")
    navigate("/")
  }

  const handleFilter = (status) => {
    setFilterStatus(status)
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = async () => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("phoneNumber", phoneNumber)
    if (profileImage instanceof File) {
      formData.append("profileImage", profileImage)
    }

    try {
      const response = await axios.put(`${API_URL}/customer/update-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.data) {
        setIsEditing(false)
        // Update the customerInfo in the parent component or context if needed
        console.log("Profile updated successfully:", response.data)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const filterButtons = [
    { label: t("pending"), status: "PENDING", icon: Clock },
    { label: t("confirmed"), status: "CONFIRMED", icon: Check },
    { label: t("completed"), status: "COMPLETED", icon: CheckCircle },
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 max-w-sm mx-auto">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-600 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={imagePreview || "/placeholder.svg"}
              alt={`${customerInfo.name}'s profile`}
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <label
                htmlFor="profile-image"
                className={`absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer transition-opacity ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <Camera className="w-8 h-8 text-white" />
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div className="mt-6 w-full">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("name")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  placeholder={t("enter_your_name")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("phone_number")}</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  placeholder={t("enter_phone_number")}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-150 ease-in-out flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {t("save")}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-150 ease-in-out flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  {t("cancel")}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
              <p className="text-gray-600">{customerInfo.email}</p>
              <p className="text-gray-600">{phoneNumber}</p>
              <button
                onClick={handleEditProfile}
                className="mt-4 py-2 px-6 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-150 ease-in-out flex items-center justify-center gap-2 mx-auto"
              >
                <Edit2 className="w-4 h-4" />
                {t("edit_profile")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700 mb-3">{t("filter_by_status")}</h3>
        {filterButtons.map((button) => {
          const Icon = button.icon
          return (
            <button
              key={button.status}
              onClick={() => handleFilter(button.status)}
              className="w-full py-3 px-4 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600 flex items-center gap-3"
            >
              <Icon className="w-5 h-5 text-emerald-600" />
              {button.label}
            </button>
          )
        })}
        <button
          onClick={() => handleFilter("All")}
          className="w-full py-3 px-4 text-left text-emerald-600 hover:bg-gray-50 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600 flex items-center gap-3"
        >
          <RotateCcw className="w-5 h-5" />
          {t("reset")}
        </button>
      </div>

      {/* Logout Button */}
      <button
        className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 flex items-center justify-center gap-2"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        {t("logout")}
      </button>
    </div>
  )
}

