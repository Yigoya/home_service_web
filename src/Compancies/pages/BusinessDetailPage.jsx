"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Upload,
  Send,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShoppingBag,
  Plus,
  Minus,
  Share2,
  Heart,
  Info,
  Calendar,
  DollarSign,
  Image,
  Users,
  Coffee,
  Maximize,
  Edit,
  MessageSquare,
} from "lucide-react"
import { businessApi, reviewApi, orderApi } from "../services/api"
import { useNavigate, useParams } from "react-router-dom"
import { API_URL_FILE } from "../../Shared/api.js"
import { useSelector } from "react-redux"
import OrderModal from "../components/orderModal.jsx"

// Simple utility function to conditionally join classNames
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

// Add CSS for hide-scrollbar
const styles = `
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;             /* Chrome, Safari and Opera */
  }
`

// Simple toast implementation
const Toast = ({ title, message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex flex-col z-50 min-w-[300px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={16} />
        </button>
      </div>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  )
}

export default function BusinessDetailPage() {
  const { id } = useParams()
  const [business, setBusiness] = useState(null)
  const [reviews, setReviews] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState("")
  const [rating, setRating] = useState(0)
  const [reviewImages, setReviewImages] = useState([])
  const [reviewFiles, setReviewFiles] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [orderItem, setOrderItem] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [allImages, setAllImages] = useState([])
  const [imageTypes, setImageTypes] = useState({}) // Store image type (business, review, service) and metadata
  const galleryRef = useRef(null)
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const [orderForm, setOrderForm] = useState({
    paymentMethodId: "",
    scheduledDate: "",
    specialInstructions: "",
    selectedOptions: {}
  });
  const [isOrdering, setIsOrdering] = useState(false);
  const specialInstructionsRef = useRef(null);
  // Add new state for hero slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderAutoPlaying, setIsSliderAutoPlaying] = useState(true);
  const sliderIntervalRef = useRef(null);

  const handleSpecialInstructionsChange = useCallback((e) => {
    const value = e.target.value;
    setOrderForm(prev => ({
      ...prev,
      specialInstructions: value
    }));
  }, []);

  // Function to extract and organize all images
  const organizeImages = (businessData, reviewsData, servicesData) => {
    const images = []
    const types = {}

    // Add business images
    if (businessData.images) {
      businessData.images.forEach(img => {
        images.push(img)
        types[img] = { type: 'business' }
      })
    }

    // Add review images
    if (reviewsData) {
      reviewsData.forEach(review => {
        if (review.images) {
          review.images.forEach(img => {
            images.push(img)
            types[img] = { 
              type: 'review',
              reviewId: review.id,
              reviewerName: review.name,
              date: review.date
            }
          })
        }
      })
    }

    // Add service images
    if (servicesData) {
      servicesData.forEach(service => {
        if (service.image) {
          images.push(service.image)
          types[service.image] = { 
            type: 'service',
            serviceId: service.id,
            serviceName: service.name,
            price: service.price
          }
        }
      })
    }

    return { images, types }
  }

  const handlePrevImage = () => {
    if (!allImages?.length) return
    setGalleryIndex((prevIndex) => (prevIndex === 0 ? allImages.length - 1 : prevIndex - 1))
  }

  const handleNextImage = () => {
    if (!allImages?.length) return
    setGalleryIndex((prevIndex) => (prevIndex === allImages.length - 1 ? 0 : prevIndex + 1))
  }

  const openGallery = (index) => {
    setGalleryIndex(index)
    setIsGalleryOpen(true)
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      // Store the raw files
      const files = Array.from(e.target.files)
      setReviewFiles((prevFiles) => [...prevFiles, ...files])
      
      // Create URLs for preview
      const filesArray = files.map((file) => URL.createObjectURL(file))
      setReviewImages((prevImages) => [...prevImages, ...filesArray])
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    
    try {
      const formData = new FormData()
      
      // Add review data directly to formData
      formData.append('businessId', parseInt(id))
      formData.append('userId', 4) // TODO: Replace with actual logged-in user ID
      formData.append('rating', rating)
      formData.append('comment', e.target.comment.value)
      
      // Add stored files to formData
      reviewFiles.forEach((file) => {
        formData.append('images', file)
      })

      // Send the review
      await reviewApi.createWithImages(formData)

      // Show success message
      setToast({
        title: "Review Submitted",
        message: "Thank you for sharing your experience!",
      })

      // Reset form
      setRating(0)
      setReviewImages([])
      setReviewFiles([]) // Clear stored files
      e.target.reset()

      // Refresh reviews
      const response = await businessApi.getDetails(id)
      setReviews(response.data.reviews)
    } catch (err) {
      console.log(err)
      setToast({
        title: "Error",
        message: err.message || "Failed to submit review. Please try again.",
      })
    }
  }

  const handleSubmitEnquiry = (e) => {
    e.preventDefault()
    setToast({
      title: "Enquiry Sent",
      message: "We'll get back to you as soon as possible!",
    })
    setIsEnquiryOpen(false)
    e.target.reset()
  }

  const handleOrder = async (orderData) => {
    console.log(orderData)
    // if (!orderItem) return;
    
    // // Validate required fields
    // if (!orderForm.name) {
    //   setToast({
    //     title: "Validation Error",
    //     message: "Please select a location name",
    //   });
    //   return;
    // }

    // if (!orderForm.paymentMethodId) {
    //   setToast({
    //     title: "Validation Error",
    //     message: "Please select a payment method",
    //   });
    //   return;
    // }

    // if (!orderForm.scheduledDate) {
    //   setToast({
    //     title: "Validation Error",
    //     message: "Please select a scheduled date and time",
    //   });
    //   return;
    // }

    // Validate scheduled date is not in the past
    // const selectedDate = new Date(orderForm.scheduledDate);
    // const now = new Date();
    // if (selectedDate < now) {
    //   setToast({
    //     title: "Validation Error",
    //     message: "Please select a future date and time",
    //   });
    //   return;
    // }

    try {
      setIsOrdering(true);
      // const orderData = {
      //   customerId: user.roleId, 
      //   businessId: parseInt(id),
      //   items: [{
      //     serviceId: orderItem.id,
      //     quantity: quantity,
      //     selectedOptions: orderForm.selectedOptions,
      //     notes: orderForm.specialInstructions
      //   }],
      //   serviceLocationId: parseInt(orderForm.serviceLocationId),
      //   paymentMethodId: parseInt(orderForm.paymentMethodId),
      //   scheduledDate: orderForm.scheduledDate,
      //   specialInstructions: specialInstructionsRef.current.value
      // };

      orderData.customerId = user.roleId
      orderData.businessId = parseInt(id)

      const response = await orderApi.create(orderData);

      setToast({
        title: "Order Placed Successfully",
        message: `Your order has been placed successfully! We'll contact you shortly to confirm.`,
      });
      
      // Reset form and close modal
      setOrderItem(null);
      setQuantity(1);
      setOrderForm({
        serviceLocationId: "",
        paymentMethodId: "",
        scheduledDate: "",
        specialInstructions: "",
        selectedOptions: {}
      });
    } catch (err) {
      console.log(err)
      setToast({
        title: "Order Failed",
        message: err.response?.data?.message || "Failed to place order. Please try again.",
      });
    } finally {
      setIsOrdering(false);
    }
  };

  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0
    const sum = reviews.reduce((total, review) => total + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const formatOpeningHours = () => {
    if (!business?.openingHours) return []
    const days = [
      { day: "Monday", open: business.openingHours.mondayOpen, close: business.openingHours.mondayClose },
      { day: "Tuesday", open: business.openingHours.tuesdayOpen, close: business.openingHours.tuesdayClose },
      { day: "Wednesday", open: business.openingHours.wednesdayOpen, close: business.openingHours.wednesdayClose },
      { day: "Thursday", open: business.openingHours.thursdayOpen, close: business.openingHours.thursdayClose },
      { day: "Friday", open: business.openingHours.fridayOpen, close: business.openingHours.fridayClose },
      { day: "Saturday", open: business.openingHours.saturdayOpen, close: business.openingHours.saturdayClose },
      { day: "Sunday", open: business.openingHours.sundayOpen, close: business.openingHours.sundayClose },
    ]
    return days
  }

  const isOpen = () => {
    if (!business?.openingHours) return false
    const now = new Date()
    const day = now.getDay() // 0 is Sunday, 1 is Monday, etc.
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const currentTime = hours * 60 + minutes

    // Adjust day to match our array (where Monday is 0)
    const adjustedDay = day === 0 ? 6 : day - 1

    const dayData = formatOpeningHours()[adjustedDay]
    if (!dayData?.open || !dayData?.close) return false

    const [openHours, openMinutes] = dayData.open.split(":").map(Number)
    const [closeHours, closeMinutes] = dayData.close.split(":").map(Number)

    const openTime = openHours * 60 + openMinutes
    const closeTime = closeHours * 60 + closeMinutes

    return currentTime >= openTime && currentTime < closeTime
  }

  // Fetch business details
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        setLoading(true)
        const response = await businessApi.getDetails(id)
        const { business: businessData, reviews: reviewsData, services: servicesData } = response.data
        
        // Organize all images
        const { images, types } = organizeImages(businessData, reviewsData, servicesData)
        setAllImages(images)
        setImageTypes(types)
        
        setBusiness(businessData)
        setReviews(reviewsData)
        setServices(servicesData)
        setActiveImage(images[0])
        setError(null)
      } catch (err) {
        setError(err.message || "Failed to fetch business details")
        setToast({
          title: "Error",
          message: "Failed to load business details. Please try again later.",
        })
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBusinessDetails()
    }
  }, [id])

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // For the sticky navigation enhancement
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Gallery swipe functionality
  useEffect(() => {
    if (!isGalleryOpen || !galleryRef.current) return

    let startX
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX
      const diff = startX - endX

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleNextImage()
        } else {
          handlePrevImage()
        }
      }
    }

    const galleryElement = galleryRef.current
    galleryElement.addEventListener("touchstart", handleTouchStart)
    galleryElement.addEventListener("touchend", handleTouchEnd)

    return () => {
      galleryElement.removeEventListener("touchstart", handleTouchStart)
      galleryElement.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isGalleryOpen, galleryIndex])

  // Toast auto-close
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  // Add this helper function near the top of the component
  const findImageIndex = (targetImage) => {
    return allImages.findIndex(img => img === targetImage)
  }

  // Add new functions for the image slider
  const goToNextSlide = useCallback(() => {
    if (!business?.images?.length) return;
    setCurrentSlide(prev => (prev === business.images.length - 1 ? 0 : prev + 1));
  }, [business]);

  const goToPrevSlide = useCallback(() => {
    if (!business?.images?.length) return;
    setCurrentSlide(prev => (prev === 0 ? business.images.length - 1 : prev - 1));
  }, [business]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Add a useEffect for auto-play functionality
  useEffect(() => {
    if (isSliderAutoPlaying && business?.images?.length > 1) {
      sliderIntervalRef.current = setInterval(() => {
        goToNextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (sliderIntervalRef.current) {
        clearInterval(sliderIntervalRef.current);
      }
    };
  }, [isSliderAutoPlaying, goToNextSlide, business]);

  // Pause autoplay on hover
  const pauseAutoPlay = () => setIsSliderAutoPlaying(false);
  const resumeAutoPlay = () => setIsSliderAutoPlaying(true);

  // Add similar effect for the hero slider for swipe functionality
  useEffect(() => {
    const heroElement = document.getElementById('hero-slider');
    if (!heroElement) return;

    let startX;
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      pauseAutoPlay();
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNextSlide();
        } else {
          goToPrevSlide();
        }
      }
      
      resumeAutoPlay();
    };

    heroElement.addEventListener("touchstart", handleTouchStart);
    heroElement.addEventListener("touchend", handleTouchEnd);

    return () => {
      heroElement.removeEventListener("touchstart", handleTouchStart);
      heroElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goToNextSlide, goToPrevSlide]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600">{error || "Business not found"}</p>
        </div>
      </div>
    )
  }

  const StarRating = ({ value, onChange, interactive = false, size = "default" }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onChange(star) : undefined}
            className={interactive ? "focus:outline-none" : undefined}
          >
            <Star
              className={`${size === "small" ? "w-4 h-4" : "w-5 h-5"} ${star <= value ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} ${interactive && "cursor-pointer hover:scale-110 transition-transform"}`}
            />
          </button>
        ))}
      </div>
    )
  }

  // Custom Badge component
  const Badge = ({ children, variant = "default", className = "" }) => {
    const baseClasses =
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

    const variantClasses = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
      success: "bg-green-500 text-white hover:bg-green-600",
      destructive: "bg-red-500 text-white hover:bg-red-600",
    }

    return <span className={cn(baseClasses, variantClasses[variant], className)}>{children}</span>
  }

  // Custom Button component
  const Button = ({
    children,
    variant = "default",
    size = "default",
    className = "",
    disabled = false,
    onClick,
    type = "button",
  }) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    const variantClasses = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    }

    const sizeClasses = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md text-sm",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10",
    }

    return (
      <button
        type={type}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  // Custom Card components
  const Card = ({ children, className = "" }) => {
    return <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>{children}</div>
  }

  const CardHeader = ({ children, className = "" }) => {
    return <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>
  }

  const CardTitle = ({ children, className = "" }) => {
    return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>{children}</h3>
  }

  const CardDescription = ({ children, className = "" }) => {
    return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  }

  const CardContent = ({ children, className = "" }) => {
    return <div className={cn("p-6 pt-0", className)}>{children}</div>
  }

  const CardFooter = ({ children, className = "" }) => {
    return <div className={cn("flex items-center p-6 pt-0", className)}>{children}</div>
  }

  // Custom Avatar components
  const Avatar = ({ children, className = "" }) => {
    return (
      <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>{children}</div>
    )
  }

  const AvatarFallback = ({ children, className = "" }) => {
    return (
      <div className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}>
        {children}
      </div>
    )
  }

  // Custom Input component
  const Input = ({ className = "", type = "text", placeholder, id, required = false, onChange, value }) => {
    return (
      <input
        type={type}
        id={id}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
      />
    )
  }

  // Custom Textarea component
  const Textarea = ({ className = "", placeholder, id, required = false, onChange, value }) => {
    return (
      <textarea
        id={id}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
      />
    )
  }

  // Mobile menu component
  const MobileMenu = ({ isOpen, onClose }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
        <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={onClose} className="p-2">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <a
              href="#overview"
              onClick={() => {
                onClose()
                setActiveTab("overview")
              }}
              className={cn("text-lg font-medium", activeTab === "overview" && "text-blue-500")}
            >
              Overview
            </a>
            <a
              href="#services"
              onClick={() => {
                onClose()
                setActiveTab("services")
              }}
              className={cn("text-lg font-medium", activeTab === "services" && "text-blue-500")}
            >
              Services
            </a>
            <a
              href="#gallery"
              onClick={() => {
                onClose()
                setActiveTab("gallery")
              }}
              className={cn("text-lg font-medium", activeTab === "gallery" && "text-blue-500")}
            >
              Gallery
            </a>
            <a
              href="#reviews"
              onClick={() => {
                onClose()
                setActiveTab("reviews")
              }}
              className={cn("text-lg font-medium", activeTab === "reviews" && "text-blue-500")}
            >
              Reviews
            </a>
            <a
              href="#contact"
              onClick={() => {
                onClose()
                setActiveTab("contact")
              }}
              className={cn("text-lg font-medium", activeTab === "contact" && "text-blue-500")}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Modal component
  const Modal = ({ isOpen, onClose, title, description, children }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold">{title}</h2>
              {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  }

  // Gallery Modal component with image info
  const GalleryModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null
    
    const currentImage = allImages[galleryIndex]
    const imageInfo = imageTypes[currentImage]

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 z-50" onClick={onClose}>
        <button className="absolute top-4 right-4 text-white p-2 z-10" onClick={onClose}>
          <X size={24} />
        </button>
        <div
          className="relative w-full h-[80vh] flex items-center justify-center flex-col"
          onClick={(e) => e.stopPropagation()}
          ref={galleryRef}
        >
          <img
            src={`${API_URL_FILE}${currentImage}` || "/placeholder.svg"}
            alt={imageInfo?.type === 'service' ? imageInfo.serviceName : `Gallery image ${galleryIndex + 1}`}
            className="max-h-[80%] max-w-full object-contain mb-4"
          />
          
          {/* Image information overlay */}
          <div className="text-white text-center">
            {imageInfo?.type === 'service' && (
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{imageInfo.serviceName}</h3>
                <p className="text-lg">${imageInfo.price}</p>
              </div>
            )}
            {imageInfo?.type === 'review' && (
              <div className="space-y-2">
                <p>Review by {imageInfo.reviewerName}</p>
                <p className="text-sm">{imageInfo.date}</p>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === galleryIndex ? "bg-white" : "bg-white/40"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setGalleryIndex(index)
                }}
              />
            ))}
          </div>
        </div>
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation()
            handlePrevImage()
          }}
        >
          <ChevronLeft size={32} />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation()
            handleNextImage()
          }}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto w-full">
      {/* Add style tag */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b sticky top-0 bg-white/95 backdrop-blur-sm z-40">
        <h1 className="text-xl font-bold">{business.name}</h1>
        <div className="flex items-center gap-2">
          <button className="rounded-full border p-2" onClick={() => setIsFavorite(!isFavorite)}>
            <Heart className={cn("h-5 w-5", isFavorite && "fill-red-500 text-red-500")} />
          </button>
          <button className="p-2" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Hero Section with Multi-Image Gallery */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[350px] w-full overflow-hidden">
        {business.images && business.images.length > 0 ? (
          <>
            {/* Grid Gallery Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 h-full">
              {/* Feature Image (First Image) - Takes up more space */}
              <div 
                className="relative col-span-1 md:col-span-2 h-full cursor-pointer"
                onClick={() => openGallery(findImageIndex(business.images[0]))}
              >
                <img
                  src={`${API_URL_FILE}${business.images[0]}` || "/placeholder.svg"}
                  alt={`${business.name} - Feature Image`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Side Gallery - Smaller Images */}
              <div className="relative hidden md:grid grid-rows-2 h-full">
                {/* Show the second image if available */}
                {business.images.length > 1 && (
                  <div 
                    className="relative h-full cursor-pointer"
                    onClick={() => openGallery(findImageIndex(business.images[1]))}
                  >
                    <img
                      src={`${API_URL_FILE}${business.images[1]}` || "/placeholder.svg"}
                      alt={`${business.name} - Image 2`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                
                {/* Show the third image if available, otherwise show "View All" button */}
                {business.images.length > 2 && (
                  <div 
                    className="relative h-full cursor-pointer"
                    onClick={() => openGallery(findImageIndex(business.images[2]))}
                  >
                    <img
                      src={`${API_URL_FILE}${business.images[2]}` || "/placeholder.svg"}
                      alt={`${business.name} - Image 3`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* If there are more than 3 images, show a count overlay */}
                    {business.images.length > 3 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Maximize className="w-6 h-6 mx-auto mb-1" />
                          <p className="font-medium">+{business.images.length - 3} more</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Standard hover effect if not showing count overlay */}
                    {business.images.length <= 3 && (
                      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                ) }
              </div>
              
              {/* Mobile View - Only show first image with indicator that there are more */}
              {business.images.length > 1 && (
                <div className="absolute bottom-4 right-4 md:hidden z-20">
                  <button 
                    className="bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center"
                    onClick={() => openGallery(0)}
                  >
                    <Image className="w-3 h-3 mr-1" />
                    +{business.images.length - 1} photos
                  </button>
                </div>
              )}
            </div>
            
            {/* Information Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10 z-10 pointer-events-none">
              <div className="max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-500 pointer-events-auto">{business.isVerified ? "Verified" : "Unverified"}</Badge>
                  {business.isFeatured && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500 pointer-events-auto">
                      Featured
                    </Badge>
                  )}
                  <Badge
                    variant={isOpen() ? "success" : "destructive"}
                    className={`${isOpen() ? "bg-green-500" : "bg-red-500"} pointer-events-auto`}
                  >
                    {isOpen() ? "Open Now" : "Closed"}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{business.name}</h1>
                <div className="flex items-center gap-2 text-white">
                  <StarRating value={calculateAverageRating()} />
                  <span className="text-sm">
                    {calculateAverageRating()} ({reviews.length} reviews)
                  </span>
                </div>
              </div>
            </div>
            
            {/* Full-screen button */}
            <button
              className="absolute top-4 right-4 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white p-2 z-20"
              onClick={() => openGallery(0)}
            >
              <Maximize className="h-5 w-5" />
            </button>
          </>
        ) : (
          <>
            <img
              src="/placeholder.svg"
              alt={business.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
              <div className="max-w-7xl mx-auto w-full">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{business.name}</h1>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Contact Bar - Desktop only */}
      <div className="hidden lg:block relative z-20 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 min-w-max">
              <Phone className="w-4 h-4 text-blue-500" />
              <a href={`tel:${business.phoneNumber}`} className="hover:underline">
                {business.phoneNumber}
              </a>
            </div>
            <div className="hidden md:flex items-center gap-1 min-w-max">
              <Mail className="w-4 h-4 text-blue-500" />
              <a href={`mailto:${business.email}`} className="hover:underline">
                {business.email}
              </a>
            </div>
            <div className="hidden md:flex items-center gap-1 min-w-max">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>
                {business.location.name}, {business.location.city}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Share2 className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 hidden md:flex"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn("w-4 h-4", isFavorite && "fill-red-500 text-red-500")} />
            </button>
            <button
              className="text-sm bg-green-500 text-white px-3 py-1 rounded-full hidden md:flex items-center hover:bg-green-600 transition-colors"
              onClick={() => window.open(`https://business-dashboard-pi.vercel.app/partnership-request/${id}`, '_blank')}
            >
              <Users className="w-4 h-4 mr-2" />
              Become a Partner
            </button>
            <button
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full hidden md:flex items-center"
              onClick={() => setIsEnquiryOpen(true)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation Bar - Desktop */}
      <div className="hidden lg:block sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar">
            <a
              href="#overview"
              className={cn(
                "block text-lg font-medium hover:text-blue-500 transition-colors py-4 px-6",
                activeTab === "overview" && "text-blue-500 border-b-2 border-blue-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("overview");
                document.getElementById("overview").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Overview
            </a>
            <a
              href="#services"
              className={cn(
                "block text-lg font-medium hover:text-blue-500 transition-colors py-4 px-6",
                activeTab === "services" && "text-blue-500 border-b-2 border-blue-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("services");
                document.getElementById("services").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Services
            </a>
            <a
              href="#gallery"
              className={cn(
                "block text-lg font-medium hover:text-blue-500 transition-colors py-4 px-6",
                activeTab === "gallery" && "text-blue-500 border-b-2 border-blue-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("gallery");
                document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Gallery
            </a>
            <a
              href="#reviews"
              className={cn(
                "block text-lg font-medium hover:text-blue-500 transition-colors py-4 px-6",
                activeTab === "reviews" && "text-blue-500 border-b-2 border-blue-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("reviews");
                document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Reviews
            </a>
            <a
              href="#contact"
              className={cn(
                "block text-lg font-medium hover:text-blue-500 transition-colors py-4 px-6",
                activeTab === "contact" && "text-blue-500 border-b-2 border-blue-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("contact");
                document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Tab Navigation Bar - Mobile */}
      <div className="lg:hidden sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar">
            <a
              href="#overview"
              className={cn(
                "block text-base font-medium hover:text-blue-500 transition-colors py-3 px-4",
                activeTab === "overview" && "text-blue-500 border-b-2 border-blue-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("overview");
                document.getElementById("overview").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Overview
            </a>
            <a
              href="#services"
              className={cn(
                "block text-base font-medium hover:text-blue-500 transition-colors py-3 px-4",
                activeTab === "services" && "text-blue-500 border-b-2 border-blue-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("services");
                document.getElementById("services").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Services
            </a>
            <a
              href="#gallery"
              className={cn(
                "block text-base font-medium hover:text-blue-500 transition-colors py-3 px-4",
                activeTab === "gallery" && "text-blue-500 border-b-2 border-blue-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("gallery");
                document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Gallery
            </a>
            <a
              href="#reviews"
              className={cn(
                "block text-base font-medium hover:text-blue-500 transition-colors py-3 px-4",
                activeTab === "reviews" && "text-blue-500 border-b-2 border-blue-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("reviews");
                document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Reviews
            </a>
            <a
              href="#contact"
              className={cn(
                "block text-base font-medium hover:text-blue-500 transition-colors py-3 px-4",
                activeTab === "contact" && "text-blue-500 border-b-2 border-blue-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("contact");
                document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Main Content Column */}
          <div className="space-y-10">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-48 lg:scroll-mt-48">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardHeader className="bg-gray-50 pb-3">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-500" />
                    About {business.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 leading-relaxed">{business.description}</p>
                </CardContent>
              </Card>
            </section>

            {/* Services Section */}
            <section id="services" className="scroll-mt-16 lg:scroll-mt-48">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardHeader className="bg-gray-50 pb-3">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Coffee className="w-6 h-6 text-blue-500" />
                    Services & Products
                  </CardTitle>
                  <CardDescription>Explore our offerings</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                      
                      <Card key={index} className="overflow-hidden border-0 shadow-md group">
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={`${API_URL_FILE}${service.image}` || "/placeholder.svg"}
                            alt={service.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                            <span className="text-white font-bold">${service.price.toFixed(2)}</span>
                            <button
                              className="bg-white/90 text-black hover:bg-white px-3 py-1 rounded text-sm"
                              onClick={() => {
                                console.log("user", user)
                                if (!user) {
                                 
                                  navigate("/login")
                                  return
                                }
                                
                                setOrderItem(service)

                                }}
                            >
                              Order Now
                            </button>
                          </div>
                          {!service.available && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white border border-white px-2 py-1 rounded-full text-xs">
                                Currently Unavailable
                              </span>
                            </div>
                          )}
                        </div>
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                            <Badge
                              variant={service.available ? "success" : "outline"}
                              className={service.available ? "bg-green-500" : ""}
                            >
                              {service.available ? "Available" : "Unavailable"}
                            </Badge>
                          </div>
                          <CardDescription className="line-clamp-2">{service.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                          <span className="font-bold">${service.price.toFixed(2)}</span>
                          <Button
                            size="sm"
                            disabled={!service.available}
                            onClick={() => {
                              if (!user) {
                                 navigate("/login")
                                 return
                               }
                              setOrderItem(service)}}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Order Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="scroll-mt-16 lg:scroll-mt-48">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardHeader className="bg-gray-50 pb-3">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Image className="w-6 h-6 text-blue-500" />
                    Gallery
                  </CardTitle>
                  <CardDescription>Take a look inside our coffee shop</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {allImages.map((image, index) => {
                      const imageInfo = imageTypes[image]
                      return (
                        <div
                          key={index}
                          className={`overflow-hidden rounded-lg cursor-pointer relative group ${activeImage === image ? "ring-2 ring-blue-500" : ""}`}
                          onClick={() => openGallery(index)}
                        >
                          <img
                            src={`${API_URL_FILE}${image}` || "/placeholder.svg"}
                            alt={imageInfo?.type === 'service' ? imageInfo.serviceName : `Gallery image ${index + 1}`}
                            className="w-full h-24 object-cover transition-transform group-hover:scale-110 duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize className="w-5 h-5 text-white" />
                          </div>
                          {imageInfo?.type !== 'business' && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                              {imageInfo?.type === 'service' ? 'Service' : 'Review'}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="scroll-mt-16 lg:scroll-mt-48">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardHeader className="bg-gray-50 pb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-blue-500" />
                        Customer Reviews
                      </CardTitle>
                      <CardDescription>See what others are saying</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                      <div className="flex items-center">
                        <StarRating value={calculateAverageRating()} />
                      </div>
                      <span className="text-lg font-bold">{calculateAverageRating()}</span>
                      <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                  {reviews.map((review, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{review.name}</h4>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <StarRating value={review.rating} />
                      </div>
                      <p className="mb-4 leading-relaxed">{review.comment}</p>
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {review.images.map((img, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="relative cursor-pointer"
                              onClick={() => {
                                const galleryIndex = findImageIndex(img)
                                if (galleryIndex !== -1) {
                                  setGalleryIndex(galleryIndex)
                                  setIsGalleryOpen(true)
                                }
                              }}
                            >
                              <img
                                src={`${API_URL_FILE}${img}` || "/placeholder.svg"}
                                alt={`Review image ${imgIndex + 1}`}
                                className="w-24 h-24 object-cover rounded-md hover:opacity-90 transition-opacity"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                <Maximize className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Review Form */}
                  <div className="pt-4 border-t">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Edit className="w-5 h-5 text-blue-500" />
                      Write a Review
                    </h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Rating</label>
                        <StarRating value={rating} onChange={setRating} interactive={true} />
                      </div>
                      <div>
                        <label htmlFor="comment" className="block text-sm font-medium mb-2">
                          Your Review
                        </label>
                        <Textarea
                          id="comment"
                          placeholder="Share your experience with this business..."
                          required
                          className="min-h-[100px]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Add Photos (optional)</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {reviewImages.map((img, index) => (
                            <div key={index} className="relative w-20 h-20">
                              <img
                                src={img || "/placeholder.svg"}
                                alt={`Upload preview ${index + 1}`}
                                className="w-full h-full object-cover rounded-md"
                              />
                              <button
                                type="button"
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                onClick={() => setReviewImages(reviewImages.filter((_, i) => i !== index))}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <label className="w-20 h-20 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleFileChange}
                            />
                            <Upload className="w-6 h-6 text-gray-400" />
                          </label>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        disabled={rating === 0}
                        className="bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 hover:scale-105"
                      >
                        Submit Review
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Contact Section */}
            <section id="contact" className="scroll-mt-16 lg:scroll-mt-20">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardHeader className="bg-gray-50 pb-3">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-blue-500" />
                    Send an Enquiry
                  </CardTitle>
                  <CardDescription>Have questions? Get in touch with us</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          required
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        placeholder="+251 91 234 5678"
                        className="border-gray-300 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="What would you like to know?"
                        required
                        className="min-h-[150px] border-gray-300 focus:border-blue-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 hover:scale-105"
                    >
                      <Send className="w-4 h-4 mr-2 inline-block" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </section>

            {/* Contact Info Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardHeader className="bg-gray-50 pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p>{business.location.street}</p>
                      <p>
                        {business.location.name}, {business.location.city}
                      </p>
                      <p>{business.location.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <a
                      href={`tel:${business.phoneNumber}`}
                      className="hover:underline hover:text-blue-500 transition-colors"
                    >
                      {business.phoneNumber}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <a
                      href={`mailto:${business.email}`}
                      className="hover:underline hover:text-blue-500 transition-colors"
                    >
                      {business.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-blue-500 transition-colors"
                    >
                      {business.website.replace("https://", "")}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-md">
                <CardHeader className="bg-gray-50 pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Opening Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {formatOpeningHours().map((item, index) => {
                      const today = new Date().getDay()
                      const isToday = (today === 0 && index === 6) || today - 1 === index

                      return (
                        <div
                          key={index}
                          className={cn(
                            "flex justify-between py-1",
                            isToday && "font-medium bg-gray-50 -mx-2 px-2 rounded-md",
                          )}
                        >
                          <span className={cn(isToday && "text-blue-500")}>{item.day}</span>
                          <span>
                            {item.open} - {item.close}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-md">
                <CardHeader className="bg-gray-50 pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-blue-500" />
                    Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {business.socialMedia.facebook && (
                      <a
                        href={`https://${business.socialMedia.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 p-2 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                    {business.socialMedia.twitter && (
                      <a
                        href={`https://${business.socialMedia.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 p-2 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {business.socialMedia.instagram && (
                      <a
                        href={`https://${business.socialMedia.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 p-2 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {business.socialMedia.linkedin && (
                      <a
                        href={`https://${business.socialMedia.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 p-2 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-30 lg:hidden">
        <button
          className="h-14 w-14 rounded-full shadow-lg bg-blue-500 text-white flex items-center justify-center"
          onClick={() => setIsEnquiryOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Gallery Modal */}
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
      
      {/* Order Modal */}

      <OrderModal
        isOpen={!!orderItem}
        onClose={() => setOrderItem(null)}
        orderItem={orderItem}
        API_URL_FILE={API_URL_FILE}
        onSubmitOrder={handleOrder}
      />
      {/* 
      <Modal
        isOpen={!!orderItem}
        onClose={() => setOrderItem(null)}
        title={orderItem ? `Order ${orderItem.name}` : ""}
        description="Complete your order details"
      >
        {orderItem && (
          <>
            <div className="mt-4 space-y-4">
              <div className="aspect-video overflow-hidden rounded-md">
                <img
                  src={`${API_URL_FILE}${orderItem.image}` || "/placeholder.svg"}
                  alt={orderItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-500">{orderItem.description}</p>

              
              {orderItem.options &&
                orderItem.options.map((option, index) => (
                  <div key={index} className="space-y-2">
                    <label className="text-sm font-medium">{option.name}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {option.choices.map((choice, choiceIndex) => (
                        <button
                          key={choiceIndex}
                          className={cn(
                            "border rounded-md py-2 px-3 text-sm flex justify-between hover:bg-gray-50",
                            orderForm.selectedOptions[option.name] === choice && "border-blue-500 bg-blue-50"
                          )}
                          onClick={() => setOrderForm(prev => ({
                            ...prev,
                            selectedOptions: {
                              ...prev.selectedOptions,
                              [option.name]: choice
                            }
                          }))}
                        >
                          {choice}
                          {option.prices[choiceIndex] > 0 && (
                            <span className="text-xs text-gray-500 ml-1">
                              +${option.prices[choiceIndex].toFixed(2)}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

              
              <div className="flex items-center justify-between">
                <div className="flex items-center border rounded-md">
                  <button className="px-3 py-2" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button className="px-3 py-2" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-lg font-bold">${(orderItem.price * quantity).toFixed(2)}</p>
                </div>
              </div>

              
              <div>
                <label htmlFor="serviceLocation" className="block text-sm font-medium mb-2">
                  Service Location
                </label>
                <select
                  id="serviceLocation"
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={orderForm.serviceLocationId}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, serviceLocationId: e.target.value }))}
                  required
                >
                  <option value="">Select a location</option>
                  <option value="1">Home</option>
                  <option value="2">Office</option>
                  <option value="3">Business Location</option>
                </select>
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium mb-2">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={orderForm.paymentMethodId}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, paymentMethodId: e.target.value }))}
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="1">Cash</option>
                  <option value="2">Credit Card</option>
                  <option value="3">Mobile Money</option>
                </select>
              </div>
              <div>
                <label htmlFor="scheduledDate" className="block text-sm font-medium mb-2">
                  Scheduled Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="scheduledDate"
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={orderForm.scheduledDate}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label htmlFor="specialInstructions" className="block text-sm font-medium mb-2">
                  Special Instructions
                </label>
                <textarea
                  ref={specialInstructionsRef}
                  id="specialInstructions"
                  className="w-full rounded-md border border-gray-300 p-2 min-h-[80px]"
                  placeholder="Any special requests or notes for your order..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button 
                className="px-4 py-2 border rounded-md hover:bg-gray-50" 
                onClick={() => setOrderItem(null)}
                disabled={isOrdering}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                onClick={handleOrder}
                disabled={isOrdering || !orderForm.serviceLocationId || !orderForm.paymentMethodId || !orderForm.scheduledDate}
              >
                {isOrdering ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </>
        )}
      </Modal>  */ }

      {/* Enquiry Modal */}
      <Modal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        title="Send an Enquiry"
        description={`Have questions? Get in touch with ${business.name}.`}
      >
        <form onSubmit={handleSubmitEnquiry} className="space-y-4 mt-4">
          <div>
            <label htmlFor="popup-name" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <Input id="popup-name" placeholder="John Doe" required />
          </div>
          <div>
            <label htmlFor="popup-email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <Input id="popup-email" type="email" placeholder="john@example.com" required />
          </div>
          <div>
            <label htmlFor="popup-phone" className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <Input id="popup-phone" placeholder="+251 91 234 5678" />
          </div>
          <div>
            <label htmlFor="popup-message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <Textarea
              id="popup-message"
              placeholder="What would you like to know?"
              required
              className="min-h-[100px]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
              onClick={() => setIsEnquiryOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              <Send className="w-4 h-4 mr-2 inline-block" />
              Send Message
            </button>
          </div>
        </form>
      </Modal>

      {/* Toast */}
      {toast && <Toast title={toast.title} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  )
}

