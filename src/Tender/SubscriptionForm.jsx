"use client"

import { useState } from "react"
import { Check } from "lucide-react"




export default function SubscriptionForm({ plan, onClose }) {
  const [formData, setFormData] = useState({
    notificationChannels: {
      email: false,
      whatsapp: false,
      telegram: false,
    },
    whatsappTelegram: "",
    category: "",
    companyName: "",
    tinNumber: "",
  })

  const storedData = localStorage.getItem('tenderCategorys');

  const categories = JSON.parse(storedData)
  console.log(categories)

  const handleChannelChange = (channel) => {
    setFormData((prev) => ({
      ...prev,
      notificationChannels: {
        ...prev.notificationChannels,
        [channel]: !prev.notificationChannels[channel],
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div
                className={`p-6 ${
                    plan.id === "free"
                        ? "bg-[#EBF5FB]"
                        : plan.id === "monthly_1"
                            ? "bg-[#008000] text-white"
                            : plan.id === "monthly_3"
                                ? "bg-black text-white"
                                : "bg-[#337AB7] text-white"
                }`}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-semibold">{plan.name}</h2>
                        <p className="mt-1">
                            ₹{plan.price.toFixed(2)} ({plan.duration})
                        </p>
                    </div>
                    <button onClick={onClose} className="text-sm hover:bg-black hover:bg-opacity-10 rounded-full p-2">
                        ✕
                    </button>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Tender Receive Via */}
                <div className="space-y-3">
                    <label className="block font-medium">Tender Receive Via</label>
                    <div className="space-y-2">
                        {["Email", "WhatsApp", "Telegram"].map((channel) => (
                            <label key={channel} className="flex items-center gap-2">
                                <div
                                    className={`w-5 h-5 border rounded flex items-center justify-center cursor-pointer
                                        ${
                                            formData.notificationChannels[channel.toLowerCase()]
                                                ? "bg-[#337AB7] border-[#337AB7]"
                                                : "border-gray-300"
                                        }`}
                                    onClick={() => handleChannelChange(channel.toLowerCase())}
                                >
                                    {formData.notificationChannels[channel.toLowerCase()] && <Check className="h-4 w-4 text-white" />}
                                </div>
                                <span>{channel}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* WhatsApp/Telegram Contact */}
                {(formData.notificationChannels.whatsapp    ) && (
                    <div className="space-y-2">
                        <label className="block font-medium"> WhatsApp Number </label>
                        <input
                            type="text"
                            value={formData.whatsappTelegram}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    whatsappTelegram: e.target.value,
                                }))
                            }
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#337AB7]"
                            placeholder="Enter your Telegram username"
                        />
                    </div>
                )}

                {(formData.notificationChannels.telegram) && (
                    <div className="space-y-2">
                        <label className="block font-medium">Telegram Username</label>
                        <input
                            type="text"
                            value={formData.telegram}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    telegram: e.target.value,
                                }))
                            }
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#337AB7]"
                            placeholder="Enter your Telegram username"
                        />
                    </div>
                )}

                {/* Category Selection */}
                <div className="space-y-2">
                    <label className="block font-medium">Select Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                category: e.target.value,
                            }))
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#337AB7]"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                    <label className="block font-medium">
                        Your Company Name <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                companyName: e.target.value,
                            }))
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#337AB7]"
                        placeholder="Enter your company name"
                    />
                </div>

                {/* TIN Number */}
                <div className="space-y-2">
                    <label className="block font-medium">
                        Your TIN Number <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        value={formData.tinNumber}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                tinNumber: e.target.value,
                            }))
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#337AB7]"
                        placeholder="Enter your TIN number"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                        plan.id === "free"
                            ? "bg-[#337AB7]"
                            : plan.id === "monthly_1"
                                ? "bg-[#008000]"
                                : plan.id === "monthly_3"
                                    ? "bg-black"
                                    : "bg-[#337AB7]"
                    }`}
                >
                    Complete Subscription
                </button>
            </form>
        </div>
    </div>
)
}

