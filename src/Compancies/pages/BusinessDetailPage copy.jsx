"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Star, CheckCircle, Award, MapPin, Phone, Mail, Globe, Clock, Share2, Edit2, Heart } from "react-feather"
import EnquiryForm from "../components/EnquiryForm"
import { businessApi } from "../services/api"

function BusinessDetailPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [activePhotoTab, setActivePhotoTab] = useState("all")
  const [business, setBusiness] = useState(null)
  const [services, setServices] = useState([])
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessData()
  }, [id])

  // Fallback data if API fails
  const fallbackBusiness = {
    id: 1,
    name: "Shreyosi Family Salon",
    rating: 4.7,
    totalRatings: 449,
    isTrusted: true,
    isVerified: true,
    isClaimed: true,
    address: {
      street: "West Apcar Garden, Apcar Garden",
      city: "Asansol",
      state: "West Bengal",
      postalCode: "713301",
      country: "India",
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
    description: "Women beauty parlour offering expert bridal makeup, hair styling, and nail art services.",
    yearEstablished: "2003",
    services: [
      { name: "Waxing", icon: "👣" },
      { name: "Bridal Makeup", icon: "👰" },
      { name: "Facial", icon: "💆‍♀️" },
      { name: "Home Services Offered", icon: "🏠" },
    ],
    serviceDetails: [
      {
        category: "Hair Care",
        services: [
          { name: "Hair Washing", price: null },
          { name: "Keratin Kits", price: "+5" },
          { name: "Hair Removal", price: null },
        ],
      },
      {
        category: "Skin Care",
        services: [
          { name: "Dermabrasion", price: null },
          { name: "Facial", price: "+10" },
        ],
      },
      {
        category: "Makeup",
        services: [
          { name: "Engagement Makeup", price: null },
          { name: "Nail Art Modeling/Makeup", price: "+8" },
        ],
      },
      {
        category: "Hair Removal",
        services: [
          { name: "Threading", price: null },
          { name: "Full Wax - Bikini Line", price: "+2" },
        ],
      },
    ],
    photos: {
      all: 427,
      video: 30,
      exterior: 1,
    },
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-16-50-259JNRtGdSs7ugDmf048NjTKZCcWVn.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-16-50-259JNRtGdSs7ugDmf048NjTKZCcWVn.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-16-50-259JNRtGdSs7ugDmf048NjTKZCcWVn.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-16-50-259JNRtGdSs7ugDmf048NjTKZCcWVn.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-16-50-259JNRtGdSs7ugDmf048NjTKZCcWVn.png",
    ],
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
        <h1 className="text-2xl font-bold mb-4">Business Not Found</h1>
        <p className="mb-4">The business you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    )
  }

  // Format address
  const formattedAddress = business.location.street
    ? `${business.location.street}, ${business.location.city} - ${business.location.postalCode}`
    : business.location

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Photo Gallery */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="col-span-2 row-span-2">
          <img
            src={business.images[0] || "/placeholder.svg"}
            alt={business.name}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        <div>
          <img
            src={business.images[1] || business.images[0]}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src={business.images[2] || business.images[0]}
            alt={business.name}
            className="w-full h-full object-cover rounded-tr-lg"
          />
        </div>
        <div>
          <img
            src={business.images[3] || business.images[0]}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative">
          <img
            src={business.images[4] || business.images[0]}
            alt={business.name}
            className="w-full h-full object-cover rounded-br-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-br-lg">
            <div className="text-white text-center">
              <div className="text-2xl font-bold">+{business.photos?.all || 432}</div>
              <div>More</div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-800 text-white p-1 rounded-md text-xs">
              <Star size={14} />
            </span>
            <h1 className="text-2xl font-bold">{business.name}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-2">
            <div className="flex items-center">
              <span className="text-white bg-green-600 px-2 py-1 rounded-md text-sm font-semibold flex items-center">
                {business.rating} <Star size={14} className="ml-1" />
              </span>
              <span className="ml-2 text-gray-600">{business.totalRatings} Ratings</span>
            </div>

            {business.isTrusted && (
              <span className="text-yellow-500 text-sm flex items-center">
                <Award size={14} className="mr-1" /> Trust
              </span>
            )}

            {business.isVerified && (
              <span className="text-blue-500 text-sm flex items-center">
                <CheckCircle size={14} className="mr-1" /> Verified
              </span>
            )}

            {business.isClaimed && (
              <span className="text-green-500 text-sm flex items-center">
                <CheckCircle size={14} className="mr-1" /> Claimed
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-gray-500" />
            <span className="text-gray-700">{formattedAddress}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-green-500" />
            <span className="text-gray-700">Opens at {business.openingHours.mondayOpen}</span>
            <span className="text-gray-500 text-sm">
              • {new Date().getFullYear() - Number.parseInt(business.yearEstablished)} Years in Business
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <a
              href={`tel:${business.phoneNumber}`}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <Phone size={16} />
              <span>{business.phoneNumber}</span>
            </a>

            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              <Mail size={16} />
              <span>Enquire Now</span>
              <span className="text-xs bg-blue-600 px-1 rounded ml-1">Responds in 2 hours</span>
            </button>

            <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
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
              <span>WhatsApp</span>
            </button>

            <button className="flex items-center gap-2 border border-gray-300 p-2 rounded-md hover:bg-gray-50 transition-colors">
              <Share2 size={16} className="text-gray-600" />
            </button>

            <button className="flex items-center gap-2 border border-gray-300 p-2 rounded-md hover:bg-gray-50 transition-colors">
              <Heart size={16} className="text-gray-600" />
            </button>

            <button className="flex items-center gap-2 border border-gray-300 p-2 rounded-md hover:bg-gray-50 transition-colors">
              <Edit2 size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <div className="text-right">Click to Rate</div>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} className="text-2xl text-gray-300 hover:text-yellow-500 transition-colors">
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex overflow-x-auto">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "serviceMenu" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("serviceMenu")}
          >
            Service Menu
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "quickInfo" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("quickInfo")}
          >
            Quick Info
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "services" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("services")}
          >
            Services
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "photos" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("photos")}
          >
            Photos
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "reviews" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          {activeTab === "serviceMenu" && (
            <div>
              <img
                src={business.images[0] || "/placeholder.svg"}
                alt="Service Menu"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          {activeTab === "quickInfo" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Quick Information</h2>

              <div className="mb-4">
                <h3 className="text-gray-600 mb-1">Business summary</h3>
                <p>{business.description}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-gray-600 mb-1">Year of Establishment</h3>
                <p>{business.yearEstablished}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Highlights from the business</h2>
                <div className="grid grid-cols-4 gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center mb-2">
                        <span className="text-2xl">{service.icon}</span>
                      </div>
                      <span className="text-center text-sm">{service.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>{service.category.name}</span>
                    </h3>
                    <ul className="space-y-1">
                      {services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="text-sm">
                          {service.name} {service.price && <span className="text-gray-500">{service.price}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                  View All
                </button>
              </div>
            </div>
          )}

          {activeTab === "photos" && (
            <div>
              <div className="border-b border-gray-200 mb-6">
                <div className="flex overflow-x-auto">
                  <button
                    className={`px-4 py-2 font-medium ${activePhotoTab === "all" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                    onClick={() => setActivePhotoTab("all")}
                  >
                    All
                    <span className="ml-2 text-sm text-gray-500">{business.images.length} Photos / Videos</span>
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${activePhotoTab === "video" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                    onClick={() => setActivePhotoTab("video")}
                  >
                    Video
                    <span className="ml-2 text-sm text-gray-500">{business.images.length} Videos</span>
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${activePhotoTab === "exterior" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                    onClick={() => setActivePhotoTab("exterior")}
                  >
                    Exterior
                    <span className="ml-2 text-sm text-gray-500">{business.images.length} Photo</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((photo) => (
                  <div key={photo} className="aspect-square">
                    <img
                      src={business.images[0] || "/placeholder.svg"}
                      alt="Salon"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-600 transition-colors">
                  Upload Photos
                </button>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Customer Reviews</h2>
                <button className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-600 transition-colors">
                  Write a Review
                </button>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">{review.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {review.images.map((image, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={image || "/placeholder.svg"}
                              alt="Review"
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                </div>
              )}

              <div className="text-center mt-6">
                <button className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                  View All Reviews
                </button>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div>
              <h2 className="text-lg font-semibold mb-6">Services Offered</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="font-semibold text-blue-700">{service.category.name}</h3>
                    </div>
                    <div className="p-4">
                      <ul className="divide-y divide-gray-100">
                        {services.map((service, serviceIndex) => (
                          <li key={serviceIndex} className="py-2 flex justify-between">
                            <span>{service.name}</span>
                            {service.price && <span className="font-medium text-gray-700">{service.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "overview" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Service Menu</h2>
              <img
                src={business.images[0] || "/placeholder.svg"}
                alt="Service Menu"
                className="w-full h-auto rounded-lg mb-6"
              />

              <h2 className="text-lg font-semibold mb-4">Quick Information</h2>
              <div className="mb-4">
                <h3 className="text-gray-600 mb-1">Business summary</h3>
                <p>{business.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-600 mb-1">Year of Establishment</h3>
                <p>{business.yearEstablished}</p>
              </div>

              <h2 className="text-lg font-semibold mb-4">Highlights from the business</h2>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {services.map((service, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center mb-2">
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                    <span className="text-center text-sm">{service.name}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-semibold mb-4">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((photo) => (
                  <div key={photo} className="aspect-square">
                    <img
                      src={business.images[0] || "/placeholder.svg"}
                      alt="Salon"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button className="text-blue-600 hover:underline" onClick={() => setActiveTab("photos")}>
                  View All Photos
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="md:w-1/3">
          <div className="border border-gray-200 rounded-lg p-4 bg-white mb-6">
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <div className="flex items-center gap-2 mb-4">
              <Phone size={16} className="text-blue-500" />
              <a href={`tel:${business.phoneNumber}`} className="text-blue-500 hover:underline">
                {business.phoneNumber}
              </a>
            </div>

            <h2 className="text-lg font-semibold mb-4">Address</h2>
            <p className="mb-2">{formattedAddress}</p>

            <div className="flex gap-2 mb-4">
              <button className="text-blue-500 text-sm hover:underline flex items-center">
                <MapPin size={14} className="mr-1" /> Get Directions
              </button>
              <button className="text-blue-500 text-sm hover:underline">📋 Copy</button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-green-500" />
              <span>Opens at {business.openingHours.mondayOpen}</span>
              <button className="text-blue-500 text-sm">▼</button>
            </div>

            <div className="space-y-2">
              <button className="flex items-center gap-2 text-blue-500 w-full hover:underline">
                <Edit2 size={14} />
                <span>Suggest new hours</span>
              </button>

              <button className="flex items-center gap-2 text-blue-500 w-full hover:underline">
                <Mail size={14} />
                <span>Send Enquiry by Email</span>
              </button>

              <button className="flex items-center gap-2 text-blue-500 w-full hover:underline">
                <Phone size={14} />
                <span>Get info via SMS/Email</span>
              </button>

              <button className="flex items-center gap-2 text-blue-500 w-full hover:underline">
                <Share2 size={14} />
                <span>Share</span>
              </button>

              <button className="flex items-center gap-2 text-blue-500 w-full hover:underline">
                <Star size={14} />
                <span>Tap to rate</span>
              </button>

              <button className="flex items-center gap-2 text-blue-500 w-full hover:underline">
                <Globe size={14} />
                <span>Visit our Website</span>
              </button>

              <div className="border-t border-gray-100 pt-2">
                <button className="flex items-center justify-between gap-2 text-blue-500 w-full hover:underline">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                    </svg>
                    <span>Follow us</span>
                  </div>
                  <span>▼</span>
                </button>
              </div>

              <div className="border-t border-gray-100 pt-2">
                <button className="flex items-center gap-2 text-blue-500 w-full hover:underline">
                  <Edit2 size={14} />
                  <span>Edit this listing</span>
                </button>
              </div>
            </div>
          </div>

          <EnquiryForm title="Get the List of" businessId={business.id} />

          <div className="border border-gray-200 rounded-lg p-4 bg-white mt-6">
            <h2 className="text-lg font-semibold mb-4">Also listed in</h2>
            <div className="space-y-2">
              <Link to="/beauty-parlours-asansol" className="text-blue-500 block hover:underline">
                Beauty Parlours
              </Link>
              <Link to="#" className="text-blue-500 block hover:underline">
                Salons
              </Link>
              <Link to="#" className="text-blue-500 block hover:underline">
                Women Beauty Parlours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessDetailPage

