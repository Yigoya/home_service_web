"use client"

import { useState, useRef } from "react"
import {
  Minus,
  Plus,
  Calendar,
  MapPin,
  CreditCard,
  MessageSquare,
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Home,
} from "lucide-react"

export default function OrderModal({ isOpen, onClose, orderItem, API_URL_FILE, onSubmitOrder }) {
  const [quantity, setQuantity] = useState(1)
  const [isOrdering, setIsOrdering] = useState(false)
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [locationStep, setLocationStep] = useState(1)

  const [orderForm, setOrderForm] = useState({
    selectedOptions: {},
    paymentMethodId: null,
    scheduledDate: "",
    specialInstructions: "",
    // Location details
    locationName: "Downtown Addis",
    locationType: "AREA",
    parentLocationId: "",
    street: "123 Main St",
    city: "Addis Ababa",
    state: "Addis Ababa",
    postalCode: "1000",
    country: "Ethiopia",
    coordinates: {
      latitude: 9.03,
      longitude: 38.74,
    },
  })

  const specialInstructionsRef = useRef(null)

  // Calculate total price including options
  const calculateTotal = () => {
    if (!orderItem) return 0

    let total = orderItem.price * quantity

    // Add option prices
    if (orderItem.options) {
      orderItem.options.forEach((option) => {
        const selectedChoice = orderForm.selectedOptions[option.name]
        if (selectedChoice) {
          const choiceIndex = option.choices.findIndex((c) => c === selectedChoice)
          if (choiceIndex !== -1 && option.prices[choiceIndex]) {
            total += option.prices[choiceIndex] * quantity
          }
        }
      })
    }

    return total
  }

  const handleOrder = async () => {
    if (!orderItem) return

    setIsOrdering(true)

    try {
      const orderData = {
        items: [
          {
            serviceId: orderItem.id,
            quantity: quantity,
            selectedOptions: orderForm.selectedOptions,
            notes: specialInstructionsRef.current?.value || "",
          },
        ],
        // Include location details
        name: orderForm.locationName,
        type: orderForm.locationType,
        parentLocationId: orderForm.parentLocationId,
        street: orderForm.street,
        city: orderForm.city,
        state: orderForm.state,
        postalCode: orderForm.postalCode,
        country: orderForm.country,
        coordinates: orderForm.coordinates,
        paymentMethodId: Number.parseInt(orderForm.paymentMethodId),
        scheduledDate: orderForm.scheduledDate,
        specialInstructions: specialInstructionsRef.current?.value || "",
      }

      await onSubmitOrder(orderData)
      onClose()
    } catch (error) {
      console.error("Error placing order:", error)
    } finally {
      setIsOrdering(false)
    }
  }

  // Handle date and time selection
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
    updateScheduledDate(e.target.value, selectedTime)
  }

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value)
    updateScheduledDate(selectedDate, e.target.value)
  }

  const updateScheduledDate = (date, time) => {
    if (!date || !time) return

    const dateTimeStr = `${date}T${time}:00`
    setOrderForm((prev) => ({
      ...prev,
      scheduledDate: dateTimeStr,
    }))
  }

  // Handle location form input changes
  const handleLocationFormChange = (e) => {
    const { name, value } = e.target

    if (name === "latitude" || name === "longitude") {
      setOrderForm((prev) => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: Number.parseFloat(value),
        },
      }))
    } else {
      setOrderForm((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Handle location form navigation
  const nextLocationStep = () => {
    setLocationStep((prev) => Math.min(prev + 1, 2))
  }

  const prevLocationStep = () => {
    setLocationStep((prev) => Math.max(prev - 1, 1))
  }

  // Available time slots
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  // Location types
  const locationTypes = ["HOME", "OFFICE", "BUSINESS", "AREA"]

  if (!isOpen || !orderItem) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 bg-blue-50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-blue-700">{orderItem.name}</h2>
              <p className="text-sm text-gray-500">Complete your order details</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Image and Description */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-square overflow-hidden rounded-lg bg-blue-50 border border-blue-100">
              <img
                src={`${API_URL_FILE}${orderItem.image}` || "/placeholder.svg?height=300&width=300"}
                alt={orderItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-600">{orderItem.description}</p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Base Price</p>
                  <p className="text-2xl font-bold text-blue-700">${orderItem.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
                <div className="flex items-center border border-blue-200 rounded-md w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-9 w-9 flex items-center justify-center text-blue-600 hover:bg-blue-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-9 w-9 flex items-center justify-center text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 my-6"></div>

          {/* Service Options */}
          {orderItem.options && orderItem.options.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium text-blue-800">Customize Your Order</h3>

              {orderItem.options.map((option, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{option.name}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {option.choices.map((choice, choiceIndex) => (
                      <div
                        key={choiceIndex}
                        className={`
                          cursor-pointer transition-all border rounded-lg p-3
                          ${
                            orderForm.selectedOptions[option.name] === choice
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }
                        `}
                        onClick={() =>
                          setOrderForm((prev) => ({
                            ...prev,
                            selectedOptions: {
                              ...prev.selectedOptions,
                              [option.name]: choice,
                            },
                          }))
                        }
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{choice}</p>
                            {option.prices[choiceIndex] > 0 && (
                              <p className="text-xs text-gray-500">+${option.prices[choiceIndex].toFixed(2)}</p>
                            )}
                          </div>
                          {orderForm.selectedOptions[option.name] === choice && (
                            <Check className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="h-px bg-gray-100 my-6"></div>
            </div>
          )}

          {/* Order Details Form */}
          <div className="space-y-5">
            <h3 className="font-medium text-blue-800">Order Details</h3>

            {/* Location Information */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                Service Location
              </label>

              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-blue-700 flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    {locationStep === 1 ? "Location Details" : "Address Information"}
                  </h4>
                  <div className="text-sm text-gray-500">Step {locationStep} of 2</div>
                </div>

                {/* Step 1: Basic Location Info */}
                {locationStep === 1 && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Location Name</label>
                      <input
                        type="text"
                        name="locationName"
                        value={orderForm.locationName}
                        onChange={handleLocationFormChange}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. My Home, Office, etc."
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Location Type</label>
                      <select
                        name="locationType"
                        value={orderForm.locationType}
                        onChange={handleLocationFormChange}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {locationTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Parent Location ID (Optional)
                      </label>
                      <input
                        type="text"
                        name="parentLocationId"
                        value={orderForm.parentLocationId}
                        onChange={handleLocationFormChange}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Leave blank if not applicable"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Address Details */}
                {locationStep === 2 && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Street Address</label>
                        <input
                          type="text"
                          name="street"
                          value={orderForm.street}
                          onChange={handleLocationFormChange}
                          className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Street address"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">City</label>
                          <input
                            type="text"
                            name="city"
                            value={orderForm.city}
                            onChange={handleLocationFormChange}
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">State/Province</label>
                          <input
                            type="text"
                            name="state"
                            value={orderForm.state}
                            onChange={handleLocationFormChange}
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="State/Province"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Postal Code</label>
                          <input
                            type="text"
                            name="postalCode"
                            value={orderForm.postalCode}
                            onChange={handleLocationFormChange}
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Postal code"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Country</label>
                          <input
                            type="text"
                            name="country"
                            value={orderForm.country}
                            onChange={handleLocationFormChange}
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Country"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Latitude</label>
                          <input
                            type="number"
                            step="0.000001"
                            name="latitude"
                            value={orderForm.coordinates.latitude}
                            onChange={handleLocationFormChange}
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Latitude"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Longitude</label>
                          <input
                            type="number"
                            step="0.000001"
                            name="longitude"
                            value={orderForm.coordinates.longitude}
                            onChange={handleLocationFormChange}
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Longitude"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-4">
                  {locationStep === 1 ? (
                    <div></div> // Empty div to maintain flex spacing
                  ) : (
                    <button
                      type="button"
                      onClick={prevLocationStep}
                      className="px-3 py-2 text-sm flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </button>
                  )}

                  {locationStep === 1 && (
                    <button
                      type="button"
                      onClick={nextLocationStep}
                      className="px-4 py-2 text-sm flex items-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <CreditCard className="h-4 w-4 mr-1 text-blue-600" />
                Payment Method
              </label>
              <select
                value={orderForm.paymentMethodId}
                onChange={(e) => setOrderForm((prev) => ({ ...prev, paymentMethodId: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select payment method</option>
                <option value="1">Cash</option>
                <option value="2">Credit Card</option>
                <option value="3">Mobile Money</option>
              </select>
            </div>

            {/* Scheduled Date & Time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                Scheduled Date & Time
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <select
                  value={selectedTime}
                  onChange={handleTimeChange}
                  disabled={!selectedDate}
                  className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <MessageSquare className="h-4 w-4 mr-1 text-blue-600" />
                Special Instructions
              </label>
              <textarea
                ref={specialInstructionsRef}
                placeholder="Any special requests or notes for your order..."
                className="w-full p-3 min-h-[100px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setOrderForm((prev) => ({ ...prev, specialInstructions: e.target.value }))}
              />
            </div>
          </div>

          <div className="h-px bg-gray-100 my-6"></div>

          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="font-medium text-blue-800">Order Summary</h3>

            <div className="bg-blue-50 rounded-lg p-5 space-y-3 border border-blue-100">
              <div className="flex justify-between">
                <span className="text-gray-700">Base Price</span>
                <span className="font-medium">${orderItem.price.toFixed(2)}</span>
              </div>

              {/* Selected Options */}
              {Object.entries(orderForm.selectedOptions).map(([optionName, choice]) => {
                const option = orderItem.options?.find((o) => o.name === optionName)
                if (!option) return null

                const choiceIndex = option.choices.findIndex((c) => c === choice)
                if (choiceIndex === -1 || !option.prices[choiceIndex]) return null

                return (
                  <div key={optionName} className="flex justify-between">
                    <span className="text-sm text-gray-700">
                      {optionName}:{" "}
                      <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{choice}</span>
                    </span>
                    <span>+${option.prices[choiceIndex].toFixed(2)}</span>
                  </div>
                )
              })}

              <div className="flex justify-between">
                <span className="text-gray-700">Quantity</span>
                <span>×{quantity}</span>
              </div>

              <div className="h-px bg-blue-200 my-2"></div>

              <div className="flex justify-between font-bold">
                <span className="text-blue-900">Total</span>
                <span className="text-blue-700 text-xl">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isOrdering}
            className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleOrder}
            disabled={isOrdering || !orderForm.scheduledDate}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[120px] flex items-center justify-center"
          >
            {isOrdering ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

