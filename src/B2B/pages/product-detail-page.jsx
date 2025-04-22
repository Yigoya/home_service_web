"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  ChevronRight,
  Star,
  ShoppingBag,
  Truck,
  Shield,
  MessageCircle,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Info,
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  X,
  AlertTriangle,
  CheckCircle,
} from "react-feather"
import axios from "axios"
import { API_URL, API_URL_FILE } from "../../Shared/api"
import LoadingPage from "../../Shared/Components/LoadingPage"
import * as Dialog from "@radix-ui/react-dialog"
import * as Tabs from "@radix-ui/react-tabs"
import * as Toast from "@radix-ui/react-toast"
import * as Tooltip from "@radix-ui/react-tooltip"

function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { jwtToken, user } = useSelector((state) => state.data)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({
    subject: "",
    message: "",
  })
  const [orderForm, setOrderForm] = useState({
    quantity: 1,
    shippingDetails: "",
    paymentMethod: "credit_card",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState("")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("success")
  const [relatedProducts, setRelatedProducts] = useState([])
  const [activeTab, setActiveTab] = useState("description")
  const [zoomedImage, setZoomedImage] = useState(false)

  useEffect(() => {
    fetchProductDetails()
    window.scrollTo(0, 0)
  }, [productId])

  const fetchProductDetails = async () => {
    setLoading(true)
    try {
      // This is a mock API call since the actual endpoint wasn't provided
      const response = await axios.get(`${API_URL}/marketplace/products/${productId}`)
      setProduct(response.data)

      // Pre-fill inquiry subject
      setInquiryForm({
        ...inquiryForm,
        subject: `Inquiry about ${response.data.name}`,
      })

      // Set minimum quantity
      setQuantity(response.data.minOrderQuantity || 1)
      setOrderForm({
        ...orderForm,
        quantity: response.data.minOrderQuantity || 1,
      })

      // Fetch related products (mock data)
      fetchRelatedProducts(response.data.category)
    } catch (error) {
      console.error("Error fetching product details:", error)
      showToast("Failed to load product details", "error")
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async (category) => {
    try {
      // Mock API call for related products
      const response = await axios.get(`${API_URL}/marketplace/products?category=${category}&limit=4`)
      // Filter out the current product
      const filtered = response.data.filter((p) => p.id !== Number.parseInt(productId))
      setRelatedProducts(filtered.slice(0, 4))
    } catch (error) {
      console.error("Error fetching related products:", error)
    }
  }

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value >= (product?.minOrderQuantity || 1)) {
      setQuantity(value)
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
    setOrderForm({
      ...orderForm,
      quantity: orderForm.quantity + 1,
    })
  }

  const decrementQuantity = () => {
    if (quantity > (product?.minOrderQuantity || 1)) {
      setQuantity((prev) => prev - 1)
      setOrderForm({
        ...orderForm,
        quantity: orderForm.quantity - 1,
      })
    }
  }

  const handleInquiryChange = (e) => {
    const { name, value } = e.target
    setInquiryForm({
      ...inquiryForm,
      [name]: value,
    })
  }

  const handleOrderFormChange = (e) => {
    const { name, value } = e.target
    setOrderForm({
      ...orderForm,
      [name]: value,
    })
  }

  const submitInquiry = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess("")

    try {
      const response = await axios.post(
        `${API_URL}/marketplace/inquiries`,
        {
          subject: inquiryForm.subject,
          message: inquiryForm.message,
          senderId: 1,
          recipientId: product.businessId,
          productId: product.id,
          status: "PENDING",
        },
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${jwtToken}`,
        //   },
        // },
      )

      setSubmitSuccess("Your inquiry has been sent successfully!")
      showToast("Inquiry sent successfully", "success")

      setTimeout(() => {
        setIsInquiryModalOpen(false)
        setSubmitSuccess("")
        setInquiryForm({
          ...inquiryForm,
          message: "",
        })
      }, 2000)
    } catch (error) {
      console.error("Error sending inquiry:", error)
      setSubmitError("Failed to send inquiry. Please try again.")
      showToast("Failed to send inquiry", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitOrder = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess("")

    try {
      const totalAmount = product.price * orderForm.quantity

      const response = await axios.post(
        `${API_URL}/marketplace/orders`,
        {
          buyerId: 1,
          sellerId: product.businessId,
          productId: product.id,
          quantity: orderForm.quantity,
          totalAmount,
          status: "PENDING",
          shippingDetails: orderForm.shippingDetails,
          paymentMethod: orderForm.paymentMethod,
          notes: orderForm.notes,
          orderDate: new Date().toISOString(),
        },
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${jwtToken}`,
        //   },
        // },
      )

      setSubmitSuccess("Your order has been placed successfully!")
      showToast("Order placed successfully", "success")

      setTimeout(() => {
        setIsOrderModalOpen(false)
        setSubmitSuccess("")
        // navigate("/b2bpage")
      }, 2000)
    } catch (error) {
      console.error("Error placing order:", error)
      setSubmitError("Failed to place order. Please try again.")
      showToast("Failed to place order", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    showToast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", "success")
  }

  const showToast = (message, type = "success") => {
    setToastMessage(message)
    setToastType(type)
    setToastOpen(true)
  }

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToast("Link copied to clipboard", "success")
    }
  }

  const navigateImage = (direction) => {
    if (direction === "next") {
      setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
    } else {
      setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
    }
  }

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`)
  }

  if (loading || !product) {
    return <LoadingPage />
  }

  // Format specifications for display
  const formattedSpecs = product.specifications ? product.specifications.split(",").map((spec) => spec.trim()) : []

  return (
    <Toast.Provider swipeDirection="right">
      <Tooltip.Provider>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto sm:px-6 py-4">
            {/* Breadcrumb */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a href="/" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <a
                      href="javascript:history.back()"
                      className="ml-1 text-sm text-gray-500 hover:text-blue-600 transition-colors md:ml-2"
                    >
                      Products
                    </a>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2">{product.name}</span>
                  </div>
                </li>
              </ol>
            </nav>

            {/* Product Details */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-8">
                {/* Product Images */}
                <div className="space-y-6">
                  <div
                    className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group cursor-zoom-in"
                    onClick={() => setZoomedImage(true)}
                  >
                    <img
                      src={`${API_URL_FILE}${product.images[selectedImage]}` || "/placeholder-product.jpg"}
                      alt={product.name}
                      className="w-full h-full object-center object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigateImage("prev")
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
                        >
                          <ArrowLeft size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigateImage("next")
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
                        >
                          <ArrowRight size={20} />
                        </button>
                      </>
                    )}

                    {product.stockQuantity < 10 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Low Stock
                      </div>
                    )}
                  </div>

                  {product.images.length > 1 && (
                    <div className="flex space-x-3 overflow-x-auto pb-2 px-1">
                      {product.images.map((image, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                            selectedImage === idx
                              ? "ring-2 ring-blue-500 ring-offset-2"
                              : "border border-gray-200 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={`${API_URL_FILE}${image}` || "/placeholder.svg"}
                            alt={`${product.name} thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {selectedImage === idx && <div className="absolute inset-0 bg-blue-500/10"></div>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
                      <div className="flex space-x-2">
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <button
                              onClick={toggleWishlist}
                              className={`p-2 rounded-full ${isWishlisted ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500 hover:bg-gray-200"} transition-colors`}
                            >
                              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                            </button>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="bg-gray-800 text-white text-xs px-2 py-1 rounded"
                              sideOffset={5}
                            >
                              {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                              <Tooltip.Arrow className="fill-gray-800" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>

                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <button
                              onClick={shareProduct}
                              className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                            >
                              <Share2 className="h-5 w-5" />
                            </button>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="bg-gray-800 text-white text-xs px-2 py-1 rounded"
                              sideOffset={5}
                            >
                              Share product
                              <Tooltip.Arrow className="fill-gray-800" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">SKU: {product.sku}</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <Star
                          key={rating}
                          className={`h-5 w-5 ${rating < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="ml-2 text-sm text-gray-500">4.0 (12 reviews)</p>
                    <a href="#reviews" className="ml-3 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                      View all reviews
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">
                        ${product.price.toFixed(2)} <span className="text-sm text-gray-500">{product.currency}</span>
                      </p>
                      {product.oldPrice && (
                        <p className="mt-1 text-sm text-gray-500 line-through">
                          ${product.oldPrice.toFixed(2)} {product.currency}
                        </p>
                      )}
                    </div>
                    <div className="bg-green-50 px-3 py-1 rounded-full">
                      <p className="text-sm font-medium text-green-700 flex items-center">
                        <Check size={16} className="mr-1" />
                        In Stock ({product.stockQuantity})
                      </p>
                    </div>
                  </div>

                  <Tabs.Root
                    className="border border-gray-200 rounded-lg"
                    defaultValue="description"
                    value={activeTab}
                    onValueChange={setActiveTab}
                  >
                    <Tabs.List className="flex border-b border-gray-200 bg-gray-50 rounded-t-lg">
                      <Tabs.Trigger
                        className={`px-4 py-3 text-sm font-medium flex-1 text-center transition-colors ${
                          activeTab === "description"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        value="description"
                      >
                        Description
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        className={`px-4 py-3 text-sm font-medium flex-1 text-center transition-colors ${
                          activeTab === "specifications"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        value="specifications"
                      >
                        Specifications
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        className={`px-4 py-3 text-sm font-medium flex-1 text-center transition-colors ${
                          activeTab === "shipping"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        value="shipping"
                      >
                        Shipping
                      </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="description" className="p-4">
                      <div className="prose prose-sm text-gray-700 max-w-none">
                        <p>{product.description}</p>
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="specifications" className="p-4">
                      {formattedSpecs.length > 0 ? (
                        <ul className="space-y-2">
                          {formattedSpecs.map((spec, index) => (
                            <li key={index} className="flex items-start">
                              <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No specifications available</p>
                      )}
                    </Tabs.Content>

                    <Tabs.Content value="shipping" className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Truck className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Delivery</h4>
                            <p className="text-sm text-gray-500">3-5 business days</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <ShoppingBag className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                            <p className="text-sm text-gray-500">On orders over $100</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Shield className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Warranty</h4>
                            <p className="text-sm text-gray-500">2 year manufacturer warranty</p>
                          </div>
                        </div>
                      </div>
                    </Tabs.Content>
                  </Tabs.Root>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Info size={14} className="mr-1" />
                        Minimum order: {product.minOrderQuantity}
                      </span>
                    </div>
                    <div className="flex rounded-md shadow-sm">
                      <button
                        type="button"
                        onClick={decrementQuantity}
                        disabled={quantity <= (product?.minOrderQuantity || 1)}
                        className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min={product.minOrderQuantity}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-center"
                      />
                      <button
                        type="button"
                        onClick={incrementQuantity}
                        className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setIsOrderModalOpen(true)}
                      className="flex-1 bg-blue-600 py-3 px-4 rounded-lg text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Place Order
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsInquiryModalOpen(true)}
                      className="flex-1 bg-white py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm flex items-center justify-center"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Send Inquiry
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <ShoppingBag className="flex-shrink-0 mr-2 h-5 w-5 text-blue-500" />
                      <span className="text-sm text-gray-700">Free shipping over $100</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Truck className="flex-shrink-0 mr-2 h-5 w-5 text-blue-500" />
                      <span className="text-sm text-gray-700">Delivery in 3-5 days</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Shield className="flex-shrink-0 mr-2 h-5 w-5 text-blue-500" />
                      <span className="text-sm text-gray-700">2 year warranty</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="p-6 lg:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((relatedProduct) => (
                      <div
                        key={relatedProduct.id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                        onClick={() => handleProductClick(relatedProduct.id)}
                      >
                        <div className="h-48 overflow-hidden bg-gray-100 relative">
                          <img
                            src={relatedProduct.images[0] || "/placeholder-product.jpg"}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                          {relatedProduct.oldPrice && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              Sale
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mt-1">{relatedProduct.description}</p>
                          <div className="mt-3 flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-blue-600">${relatedProduct.price.toFixed(2)}</div>
                              {relatedProduct.oldPrice && (
                                <div className="text-xs text-gray-500 line-through">
                                  ${relatedProduct.oldPrice.toFixed(2)}
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">Min: {relatedProduct.minOrderQuantity}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Image Zoom Modal */}
          <Dialog.Root open={zoomedImage} onOpenChange={setZoomedImage}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
              <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
                <div className="relative max-w-5xl max-h-[90vh] overflow-hidden">
                  <img
                    src={product.images[selectedImage] || "/placeholder-product.jpg"}
                    alt={product.name}
                    className="max-w-full max-h-[90vh] object-contain"
                  />
                  <button
                    onClick={() => setZoomedImage(false)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => navigateImage("prev")}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                      >
                        <ArrowLeft size={24} />
                      </button>
                      <button
                        onClick={() => navigateImage("next")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                      >
                        <ArrowRight size={24} />
                      </button>
                    </>
                  )}
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          {/* Inquiry Modal */}
          <Dialog.Root open={isInquiryModalOpen} onOpenChange={setIsInquiryModalOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
              <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-40">
                <div className="mx-auto max-w-md w-full rounded-xl bg-white p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title className="text-lg font-semibold text-gray-900">Send Inquiry</Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="rounded-full p-1 hover:bg-gray-100 transition-colors">
                        <X size={20} className="text-gray-500" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <form onSubmit={submitInquiry} className="space-y-4">
                    {submitSuccess && (
                      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center">
                        <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                        {submitSuccess}
                      </div>
                    )}

                    {submitError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
                        <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
                        {submitError}
                      </div>
                    )}

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={inquiryForm.subject}
                        onChange={handleInquiryChange}
                        required
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={inquiryForm.message}
                        onChange={handleInquiryChange}
                        required
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          Cancel
                        </button>
                      </Dialog.Close>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          "Send Inquiry"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          {/* Order Modal */}
          <Dialog.Root open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
              <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-40">
                <div className="mx-auto max-w-md w-full rounded-xl bg-white p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title className="text-lg font-semibold text-gray-900">Place Order</Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="rounded-full p-1 hover:bg-gray-100 transition-colors">
                        <X size={20} className="text-gray-500" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <form onSubmit={submitOrder} className="space-y-4">
                    {submitSuccess && (
                      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center">
                        <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                        {submitSuccess}
                      </div>
                    )}

                    {submitError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
                        <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
                        {submitError}
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center mb-3">
                        <img
                          src={product.images[0] || "/placeholder-product.jpg"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md mr-3"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">${product.price.toFixed(2)} per unit</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="order-quantity" className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <div className="flex rounded-md shadow-sm">
                        <button
                          type="button"
                          onClick={() => {
                            if (orderForm.quantity > (product?.minOrderQuantity || 1)) {
                              setOrderForm({
                                ...orderForm,
                                quantity: orderForm.quantity - 1,
                              })
                            }
                          }}
                          disabled={orderForm.quantity <= (product?.minOrderQuantity || 1)}
                          className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          id="order-quantity"
                          name="quantity"
                          min={product.minOrderQuantity}
                          value={orderForm.quantity}
                          onChange={handleOrderFormChange}
                          required
                          className="block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-center"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setOrderForm({
                              ...orderForm,
                              quantity: orderForm.quantity + 1,
                            })
                          }}
                          className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={orderForm.paymentMethod}
                        onChange={handleOrderFormChange}
                        required
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="credit_card">Credit Card</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="paypal">PayPal</option>
                        <option value="crypto">Cryptocurrency</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="shippingDetails" className="block text-sm font-medium text-gray-700 mb-1">
                        Shipping Details
                      </label>
                      <textarea
                        id="shippingDetails"
                        name="shippingDetails"
                        rows={3}
                        value={orderForm.shippingDetails}
                        onChange={handleOrderFormChange}
                        required
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Please provide your shipping address and any special instructions..."
                      />
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={2}
                        value={orderForm.notes}
                        onChange={handleOrderFormChange}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Any additional information for this order..."
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Price per unit:</span>
                          <span className="text-gray-900">
                            ${product.price.toFixed(2)} {product.currency}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Quantity:</span>
                          <span className="text-gray-900">{orderForm.quantity}</span>
                        </div>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <div className="flex justify-between font-medium">
                            <span className="text-gray-900">Total:</span>
                            <span className="text-blue-600">
                              ${(product.price * orderForm.quantity).toFixed(2)} {product.currency}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          Cancel
                        </button>
                      </Dialog.Close>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          "Confirm Order"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          {/* Toast */}
          <Toast.Root
            className={`fixed bottom-4 right-4 z-50 flex items-center p-4 shadow-lg rounded-lg ${
              toastType === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            }`}
            open={toastOpen}
            onOpenChange={setToastOpen}
            duration={3000}
          >
            <div className={`mr-2 ${toastType === "success" ? "text-green-500" : "text-red-500"}`}>
              {toastType === "success" ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
            </div>
            <Toast.Description
              className={`text-sm font-medium ${toastType === "success" ? "text-green-800" : "text-red-800"}`}
            >
              {toastMessage}
            </Toast.Description>
            <Toast.Close className="ml-4 text-gray-400 hover:text-gray-500">
              <X size={16} />
            </Toast.Close>
          </Toast.Root>
          <Toast.Viewport />
        </div>
      </Tooltip.Provider>
    </Toast.Provider>
  )
}

export default ProductDetailPage
