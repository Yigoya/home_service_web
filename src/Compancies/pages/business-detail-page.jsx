"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Star,
  CheckCircle,
  Award,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Share2,
  Edit2,
  Heart,
  Calendar,
  ChevronDown,
  Camera,
  Video,
  ExternalLink,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Send,
  ThumbsUp,
  User,
} from "lucide-react"

// Sample reviews data
const fallbackReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    createdAt: "2023-09-15T10:30:00Z",
    comment:
      "Absolutely loved my experience at Shreyosi Family Salon! The staff was professional and friendly. My hair looks amazing and the ambiance was so relaxing. Highly recommend their bridal makeup services!",
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
  },
  {
    id: 2,
    name: "Priya Sharma",
    rating: 4,
    createdAt: "2023-08-22T14:15:00Z",
    comment:
      "Great service and reasonable prices. The facial was very refreshing and the staff was knowledgeable about skincare. Will definitely come back for more services.",
    images: [],
  },
  {
    id: 3,
    name: "Anika Patel",
    rating: 5,
    createdAt: "2023-07-10T16:45:00Z",
    comment:
      "I had my bridal makeup done here and it was perfect! They understood exactly what I wanted and executed it flawlessly. The makeup lasted all day through the ceremony and reception.",
    images: ["/placeholder.svg?height=300&width=300"],
  },
]

// Fallback data if API fails
const fallbackBusiness = {
  id: 1,
  name: "Shreyosi Family Salon",
  rating: 4.7,
  totalRatings: 449,
  isTrusted: true,
  isVerified: true,
  isClaimed: true,
  location: {
    street: "West Apcar Garden, Apcar Garden",
    city: "Asansol",
    state: "West Bengal",
    postalCode: "713301",
    country: "India",
    name: "Apcar Garden",
  },
  phoneNumber: "08401207036",
  openingHours: {
    mondayOpen: "10:00",
    mondayClose: "20:00",
    tuesdayOpen: "10:00",
    tuesdayClose: "20:00",
    wednesdayOpen: "10:00",
    wednesdayClose: "20:00",
    thursdayOpen: "10:00",
    thursdayClose: "20:00",
    fridayOpen: "10:00",
    fridayClose: "20:00",
    saturdayOpen: "10:00",
    saturdayClose: "20:00",
    sundayOpen: "10:00",
    sundayClose: "18:00",
  },
  description:
    "Women beauty parlour offering expert bridal makeup, hair styling, and nail art services. We specialize in providing personalized beauty treatments with the highest quality products and experienced professionals.",
  yearEstablished: "2003",
  serviceDetails: [
    {
      category: { name: "Hair Care", id: 1 },
      services: [
        { name: "Hair Washing", price: "₹250" },
        { name: "Keratin Treatment", price: "₹3500" },
        { name: "Hair Coloring", price: "₹1200" },
        { name: "Hair Styling", price: "₹800" },
        { name: "Hair Spa", price: "₹1500" },
      ],
    },
    {
      category: { name: "Skin Care", id: 2 },
      services: [
        { name: "Dermabrasion", price: "₹1800" },
        { name: "Facial", price: "₹1000" },
        { name: "Clean Up", price: "₹600" },
        { name: "Skin Brightening", price: "₹2500" },
        { name: "Anti-Aging Treatment", price: "₹3000" },
      ],
    },
    {
      category: { name: "Makeup", id: 3 },
      services: [
        { name: "Engagement Makeup", price: "₹3500" },
        { name: "Bridal Makeup", price: "₹8000" },
        { name: "Party Makeup", price: "₹2500" },
        { name: "Nail Art", price: "₹800" },
        { name: "Eye Makeup", price: "₹1200" },
      ],
    },
    {
      category: { name: "Hair Removal", id: 4 },
      services: [
        { name: "Threading", price: "₹100" },
        { name: "Full Body Wax", price: "₹2000" },
        { name: "Bikini Wax", price: "₹800" },
        { name: "Laser Hair Removal", price: "₹5000" },
        { name: "Underarm Waxing", price: "₹200" },
      ],
    },
  ],
  photos: {
    all: 427,
    video: 30,
    exterior: 1,
  },
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  socialMedia: {
    facebook: "facebook.com/shreyosisalon",
    instagram: "instagram.com/shreyosisalon",
    twitter: "twitter.com/shreyosisalon",
  },
  website: "https://shreyosisalon.com",
  email: "contact@shreyosisalon.com",
}

// This would come from your API in a real app
const businessApi = {
  getById: async (id) => {
    return { data: fallbackBusiness }
  },
  getServices: async (id) => {
    return { data: { content: fallbackBusiness.serviceDetails } }
  },
  getReviews: async (id, params) => {
    return { data: { content: fallbackReviews } }
  },
}

// Helper function to format opening hours
function formatOpeningHours(hours) {
  const today = new Date().getDay()
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const todayName = days[today]

  const openKey = `${todayName}Open`
  const closeKey = `${todayName}Close`

  if (hours[openKey] && hours[closeKey]) {
    return `${hours[openKey]} - ${hours[closeKey]}`
  }
  return "Hours not available"
}

// Helper function to get day name
function getDayName(day) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return days[day]
}

// Helper function to check if business is open now
function isBusinessOpenNow(hours) {
  const now = new Date()
  const today = now.getDay()
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const todayName = days[today]

  const openKey = `${todayName}Open`
  const closeKey = `${todayName}Close`

  if (!hours[openKey] || !hours[closeKey]) return false

  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTime = currentHour * 60 + currentMinute

  const [openHour, openMinute] = hours[openKey].split(":").map(Number)
  const [closeHour, closeMinute] = hours[closeKey].split(":").map(Number)

  const openTime = openHour * 60 + openMinute
  const closeTime = closeHour * 60 + closeMinute

  return currentTime >= openTime && currentTime <= closeTime
}

// Modal component
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-blue-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

// Tab component
function Tabs({ children, activeTab, onChange }) {
  return (
    <div className="mb-6">
      <div className="flex overflow-x-auto border-b border-gray-200">
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            isActive: activeTab === child.props.value,
            onClick: () => onChange(child.props.value),
          })
        })}
      </div>
    </div>
  )
}

function Tab({ value, label, isActive, onClick }) {
  return (
    <button
      className={`px-4 py-2 font-medium whitespace-nowrap ${
        isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

function TabPanel({ value, activeTab, children }) {
  if (value !== activeTab) return null
  return <div>{children}</div>
}

// Badge component
function Badge({ children, color = "blue", variant = "filled" }) {
  const colorMap = {
    blue: {
      filled: "bg-blue-600 text-white",
      outline: "bg-blue-50 text-blue-600 border border-blue-200",
    },
    green: {
      filled: "bg-green-600 text-white",
      outline: "bg-green-50 text-green-600 border border-green-200",
    },
    amber: {
      filled: "bg-amber-500 text-white",
      outline: "bg-amber-50 text-amber-500 border border-amber-200",
    },
    red: {
      filled: "bg-red-500 text-white",
      outline: "bg-red-50 text-red-500 border border-red-200",
    },
  }

  const classes = colorMap[color][variant]

  return <span className={`inline-flex items-center px-2 py-1 rounded-md text-sm ${classes}`}>{children}</span>
}

// Button component
function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
}) {
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    link: "bg-transparent hover:underline text-blue-600",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  }

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      type={type}
      className={`rounded-md font-medium flex items-center justify-center transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}

// Card component
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

function CardHeader({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

function CardTitle({ children, className = "" }) {
  return <h3 className={`text-lg font-bold text-blue-800 ${className}`}>{children}</h3>
}

function CardDescription({ children, className = "" }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
}

function CardContent({ children, className = "" }) {
  return <div className={`p-4 pt-0 ${className}`}>{children}</div>
}

function CardFooter({ children, className = "" }) {
  return <div className={`p-4 border-t border-gray-100 ${className}`}>{children}</div>
}

// Avatar component
function Avatar({ src, alt, initials, size = "md" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center bg-blue-100 text-blue-600 font-medium border border-blue-200`}
    >
      {src ? (
        <img src={src || "/placeholder.svg"} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

// Separator component
function Separator() {
  return <div className="h-px bg-gray-200 my-4"></div>
}

export default function BusinessDetailPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activePhotoTab, setActivePhotoTab] = useState("all")
  const [business, setBusiness] = useState(null)
  const [services, setServices] = useState([])
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAllHours, setShowAllHours] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)

  // Mock ID for demo purposes
  const { id } = useParams() || { id: "1" }

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        setIsLoading(true)
        const [businessResponse, servicesResponse, reviewsResponse] = await Promise.all([
          businessApi.getById(id),
          businessApi.getServices(id),
          businessApi.getReviews(id, { page: 0, size: 5 }),
        ])

        setBusiness(businessResponse.data)
        setServices(servicesResponse.data.content)
        setReviews(reviewsResponse.data.content)
      } catch (error) {
        console.error("Error fetching business data:", error)
        // Use fallback data if API fails
        setBusiness(fallbackBusiness)
        setServices(fallbackBusiness.serviceDetails)
        setReviews(fallbackReviews)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessData()
  }, [id])

  const openImageModal = (image) => {
    setSelectedImage(image)
    setShowImageModal(true)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="col-span-2 row-span-2 h-80 bg-gray-200 rounded-lg"></div>
            <div className="h-40 bg-gray-200 rounded-lg"></div>
            <div className="h-40 bg-gray-200 rounded-lg"></div>
            <div className="h-40 bg-gray-200 rounded-lg"></div>
            <div className="h-40 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex gap-2 mb-6">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">Business Not Found</h1>
        <p className="mb-4">The business you're looking for doesn't exist or has been removed.</p>
        <a href="/" className="text-blue-600 hover:underline">
          Return to Home
        </a>
      </div>
    )
  }

  // Format address
  const formattedAddress = business.location.street
    ? `${business.location.street}, ${business.location.city} - ${business.location.postalCode}`
    : `${business.location.name}, ${business.location.city}`

  // Check if business is open now
  const isOpen = isBusinessOpenNow(business.openingHours)

  return (
    <div className="bg-blue-50 min-h-screen pb-12">
      {/* Hero section with gallery */}
      <div className="relative bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          {/* Photo Gallery */}
          <div className="grid grid-cols-4 gap-2 mb-6 rounded-xl overflow-hidden shadow-lg">
            <div className="col-span-2 row-span-2 relative h-[400px]">
              <img
                src={business.images[0] || "/placeholder.svg"}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute bottom-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                onClick={() => openImageModal(business.images[0])}
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <div className="relative h-[200px]">
              <img
                src={business.images[1] || business.images[0]}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute bottom-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                onClick={() => openImageModal(business.images[1] || business.images[0])}
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <div className="relative h-[200px]">
              <img
                src={business.images[2] || business.images[0]}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute bottom-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                onClick={() => openImageModal(business.images[2] || business.images[0])}
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <div className="relative h-[200px]">
              <img
                src={business.images[3] || business.images[0]}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute bottom-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                onClick={() => openImageModal(business.images[3] || business.images[0])}
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <div className="relative h-[200px]">
              <img
                src={business.images[4] || business.images[0]}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
                onClick={() => setActiveTab("photos")}
              >
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">+{business.photos?.all || 427}</div>
                  <div className="flex items-center justify-center gap-1">
                    <Camera className="h-4 w-4" />
                    <span>View All</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-2 mb-2">
                <Badge color="blue">
                  <Star className="h-3 w-3 mr-1" />
                  FEATURED
                </Badge>
                <h1 className="text-3xl font-bold text-blue-800">{business.name}</h1>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center">
                  <Badge color="green">
                    {business.rating} <Star className="h-3 w-3 ml-1" />
                  </Badge>
                  <span className="ml-2 text-gray-600">{business.totalRatings} Ratings</span>
                </div>

                {business.isTrusted && (
                  <Badge color="amber" variant="outline">
                    <Award className="h-3 w-3 mr-1" /> Trusted
                  </Badge>
                )}

                {business.isVerified && (
                  <Badge color="blue" variant="outline">
                    <CheckCircle className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}

                {business.isClaimed && (
                  <Badge color="green" variant="outline">
                    <CheckCircle className="h-3 w-3 mr-1" /> Claimed
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 mb-2 text-gray-700">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{formattedAddress}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className={isOpen ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                  {isOpen ? "Open Now" : "Closed"} • {formatOpeningHours(business.openingHours)}
                </span>
                <button className="p-0 h-auto text-blue-600" onClick={() => setShowAllHours(!showAllHours)}>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAllHours ? "rotate-180" : ""}`} />
                </button>
              </div>

              {showAllHours && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4 p-3 bg-blue-50 rounded-md">
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                    const dayName = getDayName(day).toLowerCase()
                    const openKey = `${dayName}Open`
                    const closeKey = `${dayName}Close`
                    const isToday = day === new Date().getDay()

                    return (
                      <div key={day} className={`flex justify-between ${isToday ? "font-medium" : ""}`}>
                        <span>
                          {getDayName(day)}
                          {isToday && " (Today)"}
                        </span>
                        <span>
                          {business.openingHours[openKey]} - {business.openingHours[closeKey]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant="outline"
                  className="bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                  onClick={() => window.open(`tel:${business.phoneNumber}`, "_self")}
                  icon={<Phone className="h-4 w-4 text-green-600" />}
                >
                  {business.phoneNumber}
                </Button>

                <Button
                  variant="primary"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowEnquiryForm(true)}
                  icon={<Mail className="h-4 w-4" />}
                >
                  Enquire Now
                  <span className="ml-2 bg-blue-700 text-white text-xs px-1 py-0.5 rounded">Fast Response</span>
                </Button>

                <Button
                  variant="success"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" />
                      <path d="M20.52 3.449C12.831-3.984.106 1.407.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c9.756 0 17.664-7.89 17.667-17.647.001-4.708-1.83-9.13-5.198-12.45zm-5.19 27.151h-.005c-2.634-.001-5.213-.713-7.47-2.068l-.537-.319-5.558 1.448 1.457-5.325-.352-.563c-1.482-2.35-2.272-5.06-2.269-7.88.006-8.126 6.635-14.737 14.775-14.737 3.94.001 7.639 1.541 10.428 4.324 2.788 2.783 4.32 6.476 4.32 10.413-.002 8.126-6.635 14.738-14.788 14.738z" />
                    </svg>
                  }
                >
                  WhatsApp
                </Button>

                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white border-gray-200 hover:bg-gray-50 text-gray-700 p-2"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: business.name,
                          text: `Check out ${business.name}`,
                          url: window.location.href,
                        })
                      }
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className={`p-2 ${isLiked ? "bg-red-50 text-red-500 border-red-200" : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"}`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white border-gray-200 hover:bg-gray-50 text-gray-700 p-2"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3 mt-6 md:mt-0">
              <Card className="bg-white shadow-sm border-gray-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Rate this business</CardTitle>
                  <CardDescription>Share your experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-2xl text-gray-300 hover:text-amber-500 transition-colors p-1">
                        <Star className={`h-8 w-8 ${star <= 3 ? "hover:fill-amber-500" : ""}`} />
                        <span className="sr-only">Rate {star} stars</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs */}
          <Tabs activeTab={activeTab} onChange={setActiveTab}>
            <Tab value="overview" label="Overview" />
            <Tab value="serviceMenu" label="Service Menu" />
            <Tab value="quickInfo" label="Quick Info" />
            <Tab value="services" label="Services" />
            <Tab value="photos" label="Photos" />
            <Tab value="reviews" label="Reviews" />
          </Tabs>

          {/* Tab Content */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <TabPanel value="serviceMenu" activeTab={activeTab}>
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle>Service Menu</CardTitle>
                    <CardDescription>Our complete service offerings and pricing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-[600px] w-full rounded-md overflow-hidden">
                      <img
                        src={business.images[0] || "/placeholder.svg"}
                        alt="Service Menu"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Download Menu</Button>
                    <Button variant="primary">Book Appointment</Button>
                  </CardFooter>
                </Card>
              </TabPanel>

              <TabPanel value="quickInfo" activeTab={activeTab}>
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle>Quick Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-gray-600 mb-2 font-medium">Business Summary</h3>
                      <p className="text-gray-700">{business.description}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-600 mb-2 font-medium">Year of Establishment</h3>
                      <p className="text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {business.yearEstablished} (
                        {new Date().getFullYear() - Number.parseInt(business.yearEstablished)} years in business)
                      </p>
                    </div>

                    <div>
                      <h3 className="text-gray-600 mb-2 font-medium">Contact Information</h3>
                      <div className="space-y-2">
                        <p className="text-gray-700 flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          {business.phoneNumber}
                        </p>
                        <p className="text-gray-700 flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          {business.email}
                        </p>
                        {business.website && (
                          <p className="text-gray-700 flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <a
                              href={business.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {business.website.replace(/^https?:\/\//, "")}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-gray-600 mb-2 font-medium">Social Media</h3>
                      <div className="flex gap-2">
                        {business.socialMedia.facebook && (
                          <a
                            href={`https://${business.socialMedia.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                          </a>
                        )}
                        {business.socialMedia.instagram && (
                          <a
                            href={`https://${business.socialMedia.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors"
                          >
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                          </a>
                        )}
                        {business.socialMedia.twitter && (
                          <a
                            href={`https://${business.socialMedia.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-sky-50 text-sky-600 rounded-full hover:bg-sky-100 transition-colors"
                          >
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabPanel>

              <TabPanel value="photos" activeTab={activeTab}>
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle>Photos & Videos</CardTitle>
                    <CardDescription>Browse all media from {business.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex overflow-x-auto bg-gray-50 rounded-md">
                        <button
                          className={`px-4 py-2 ${activePhotoTab === "all" ? "bg-blue-100 text-blue-700" : ""}`}
                          onClick={() => setActivePhotoTab("all")}
                        >
                          All
                          <Badge color="blue" variant="outline" className="ml-2">
                            {business.photos.all}
                          </Badge>
                        </button>
                        <button
                          className={`px-4 py-2 ${activePhotoTab === "video" ? "bg-blue-100 text-blue-700" : ""}`}
                          onClick={() => setActivePhotoTab("video")}
                        >
                          Videos
                          <Badge color="blue" variant="outline" className="ml-2">
                            {business.photos.video}
                          </Badge>
                        </button>
                        <button
                          className={`px-4 py-2 ${activePhotoTab === "exterior" ? "bg-blue-100 text-blue-700" : ""}`}
                          onClick={() => setActivePhotoTab("exterior")}
                        >
                          Exterior
                          <Badge color="blue" variant="outline" className="ml-2">
                            {business.photos.exterior}
                          </Badge>
                        </button>
                      </div>
                    </div>

                    {activePhotoTab === "all" && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[...Array(9)].map((_, index) => (
                          <div
                            key={index}
                            className="aspect-square relative rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() =>
                              openImageModal(business.images[index % business.images.length] || "/placeholder.svg")
                            }
                          >
                            <img
                              src={business.images[index % business.images.length] || "/placeholder.svg"}
                              alt={`${business.name} photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {activePhotoTab === "video" && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, index) => (
                          <div key={index} className="aspect-square relative rounded-md overflow-hidden group">
                            <img
                              src={business.images[index % business.images.length] || "/placeholder.svg"}
                              alt={`${business.name} video ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                              <Video className="h-12 w-12 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activePhotoTab === "exterior" && (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="aspect-video relative rounded-md overflow-hidden">
                          <img
                            src={business.images[0] || "/placeholder.svg"}
                            alt={`${business.name} exterior`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="primary" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Upload Photos
                    </Button>
                  </CardFooter>
                </Card>
              </TabPanel>

              <TabPanel value="reviews" activeTab={activeTab}>
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Customer Reviews</CardTitle>
                      <CardDescription>See what others are saying about {business.name}</CardDescription>
                    </div>
                    <Button variant="primary">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Write a Review
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-green-600">{business.rating}</div>
                        <div>
                          <div className="flex mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={
                                  i < Math.floor(business.rating)
                                    ? "h-5 w-5 text-amber-400 fill-current"
                                    : "h-5 w-5 text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-500">Based on {business.totalRatings} reviews</div>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Recommend
                        </Button>
                      </div>
                    </div>

                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review, index) => (
                          <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar initials={review.name.charAt(0)} />
                              <div>
                                <div className="font-medium">{review.name}</div>
                                <div className="flex items-center">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={
                                          i < review.rating
                                            ? "h-4 w-4 text-amber-400 fill-current"
                                            : "h-4 w-4 text-gray-300"
                                        }
                                      />
                                    ))}
                                  </div>
                                  <span className="ml-2 text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">{review.comment}</p>
                            {review.images && review.images.length > 0 && (
                              <div className="flex gap-2 mt-3">
                                {review.images.map((image, imgIndex) => (
                                  <div
                                    key={imgIndex}
                                    className="w-16 h-16 relative rounded overflow-hidden cursor-pointer"
                                    onClick={() => openImageModal(image)}
                                  >
                                    <img
                                      src={image || "/placeholder.svg"}
                                      alt="Review"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-2 mt-3">
                              <Button variant="ghost" size="sm" className="h-8 text-gray-500 hover:text-gray-700">
                                <ThumbsUp className="h-3 w-3 mr-1" /> Helpful
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 text-gray-500 hover:text-gray-700">
                                Reply
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <User className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                        <p className="text-gray-500 mb-4">No reviews yet. Be the first to review!</p>
                        <Button variant="primary">Write a Review</Button>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline">View All Reviews</Button>
                  </CardFooter>
                </Card>
              </TabPanel>

              <TabPanel value="services" activeTab={activeTab}>
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle>Services Offered</CardTitle>
                    <CardDescription>Explore our range of beauty and wellness services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {services.map((service, index) => (
                        <Card key={index} className="border-gray-100 overflow-hidden">
                          <CardHeader className="bg-blue-50 pb-3">
                            <CardTitle className="text-lg text-blue-700">{service.category.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <ul className="divide-y divide-gray-100">
                              {service.services.map((item, serviceIndex) => (
                                <li key={serviceIndex} className="py-2 flex justify-between">
                                  <span>{item.name}</span>
                                  {item.price && <span className="font-medium text-gray-700">{item.price}</span>}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="primary">Book Appointment</Button>
                  </CardFooter>
                </Card>
              </TabPanel>

              <TabPanel value="overview" activeTab={activeTab}>
                <div className="space-y-6">
                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                      <CardTitle>About {business.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{business.description}</p>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>
                          Established in {business.yearEstablished} •{" "}
                          {new Date().getFullYear() - Number.parseInt(business.yearEstablished)} years in business
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                      <CardTitle>Popular Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {services.slice(0, 4).flatMap((category) =>
                          category.services.slice(0, 1).map((service, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                <span className="text-blue-700 font-bold">{category.category.name.charAt(0)}</span>
                              </div>
                              <span className="font-medium">{service.name}</span>
                              <span className="text-sm text-gray-500">{service.price}</span>
                            </div>
                          )),
                        )}
                      </div>
                      <div className="mt-4 text-center">
                        <Button variant="outline" onClick={() => setActiveTab("services")}>
                          View All Services
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                      <CardTitle>Photo Gallery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {business.images.slice(0, 3).map((image, index) => (
                          <div
                            key={index}
                            className="aspect-square relative rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openImageModal(image)}
                          >
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`${business.name} photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <Button variant="outline" onClick={() => setActiveTab("photos")}>
                          View All Photos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                      <CardTitle>Recent Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {reviews.length > 0 ? (
                        <div className="space-y-4">
                          {reviews.slice(0, 2).map((review, index) => (
                            <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                              <div className="flex items-start gap-3 mb-2">
                                <Avatar initials={review.name.charAt(0)} size="sm" />
                                <div>
                                  <div className="font-medium">{review.name}</div>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={
                                          i < review.rating
                                            ? "h-3 w-3 text-amber-400 fill-current"
                                            : "h-3 w-3 text-gray-300"
                                        }
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm line-clamp-2">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 bg-gray-50 rounded-lg">
                          <p className="text-gray-500">No reviews yet</p>
                        </div>
                      )}
                      <div className="mt-4 text-center">
                        <Button variant="outline" onClick={() => setActiveTab("reviews")}>
                          View All Reviews
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabPanel>
            </div>

            <div className="md:w-1/3">
              <Card className="border-gray-100 shadow-sm mb-6 sticky top-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <a href={`tel:${business.phoneNumber}`} className="text-blue-600 hover:underline">
                      {business.phoneNumber}
                    </a>
                  </div>

                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-blue-600 mt-1" />
                      <div>
                        <p className="mb-1">{formattedAddress}</p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600">
                            Get Directions
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600">
                            Copy Address
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className={isOpen ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                          {isOpen ? "Open Now" : "Closed"}
                        </span>
                      </div>
                      <button className="p-0 h-auto text-blue-600" onClick={() => setShowAllHours(!showAllHours)}>
                        <ChevronDown className={`h-4 w-4 transition-transform ${showAllHours ? "rotate-180" : ""}`} />
                      </button>
                    </div>

                    {showAllHours ? (
                      <div className="space-y-1 text-sm">
                        {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                          const dayName = getDayName(day).toLowerCase()
                          const openKey = `${dayName}Open`
                          const closeKey = `${dayName}Close`
                          const isToday = day === new Date().getDay()

                          return (
                            <div key={day} className={`flex justify-between ${isToday ? "font-medium" : ""}`}>
                              <span>
                                {getDayName(day)}
                                {isToday && " (Today)"}
                              </span>
                              <span>
                                {business.openingHours[openKey]} - {business.openingHours[closeKey]}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">Today: {formatOpeningHours(business.openingHours)}</div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-blue-600" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      <span>Suggest new hours</span>
                    </Button>

                    <Button variant="ghost" className="w-full justify-start text-blue-600" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>Send Enquiry by Email</span>
                    </Button>

                    <Button variant="ghost" className="w-full justify-start text-blue-600" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>Get info via SMS/Email</span>
                    </Button>

                    <Button variant="ghost" className="w-full justify-start text-blue-600" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      <span>Share</span>
                    </Button>

                    <Button variant="ghost" className="w-full justify-start text-blue-600" size="sm">
                      <Star className="h-4 w-4 mr-2" />
                      <span>Tap to rate</span>
                    </Button>

                    {business.website && (
                      <Button variant="ghost" className="w-full justify-start text-blue-600" size="sm">
                        <Globe className="h-4 w-4 mr-2" />
                        <span>Visit our Website</span>
                      </Button>
                    )}

                    <Separator />

                    <div className="relative">
                      <Button variant="ghost" className="w-full justify-between text-blue-600" size="sm">
                        <div className="flex items-center">
                          <Facebook className="h-4 w-4 mr-2" />
                          <span>Follow us</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <Separator />

                    <Button variant="ghost" className="w-full justify-start text-blue-600" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      <span>Edit this listing</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-100 shadow-sm mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Get in Touch</CardTitle>
                  <CardDescription>Send an enquiry to {business.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="tel"
                        placeholder="Your Phone"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <textarea
                        placeholder="Your Message"
                        rows={4}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      ></textarea>
                    </div>
                    <Button type="submit" variant="primary" className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Send Enquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-gray-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Also listed in</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <a href="/beauty-parlours" className="text-blue-600 block hover:underline">
                      Beauty Parlours
                    </a>
                    <a href="/salons" className="text-blue-600 block hover:underline">
                      Salons
                    </a>
                    <a href="/women-beauty-parlours" className="text-blue-600 block hover:underline">
                      Women Beauty Parlours
                    </a>
                    <a href="/bridal-makeup" className="text-blue-600 block hover:underline">
                      Bridal Makeup
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      <Modal isOpen={showEnquiryForm} onClose={() => setShowEnquiryForm(false)} title={`Contact ${business.name}`}>
        <p className="text-gray-500 mb-4">Fill out the form below to send an enquiry</p>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Your Phone"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-medium">
              Service Interested In
            </label>
            <select
              id="service"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a service</option>
              {services.flatMap((category) =>
                category.services.map((service, index) => (
                  <option key={index} value={service.name}>
                    {service.name}
                  </option>
                )),
              )}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEnquiryForm(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Send Enquiry
            </Button>
          </div>
        </form>
      </Modal>

      {/* Image Modal */}
      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)} title={business.name}>
        <div className="relative h-[600px] w-full">
          <img src={selectedImage || "/placeholder.svg"} alt={business.name} className="w-full h-full object-contain" />
        </div>
      </Modal>
    </div>
  )
}

// Enquiry Form Component
function EnquiryForm({ title = "Get in Touch", businessId }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success message
      alert("Enquiry sent successfully! We'll get back to you as soon as possible.")

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>We'll get back to you within 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone"
              type="tel"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <Button type="submit" variant="primary" className="w-full gap-2" disabled={isSubmitting}>
            <Send className="h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Enquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

