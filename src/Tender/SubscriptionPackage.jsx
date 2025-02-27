"use client"

import { Check } from "lucide-react"
import { useState } from "react"
import SubscriptionForm from "./SubscriptionForm"

const plans = [
  {
    id: "free",
    name: "Free Membership",
    price: 0.0,
    duration: "N/A",
    features: [
      "Access State Tenders for Free (Website Only)",
      "Download Tender Document for Free (Website Only)",
      "Create a Free Business Listing",
    ],
  },
  {
    id: "monthly_1",
    name: "1 Month",
    price: 500.0,
    duration: "1 Month",
    features: [
      "Unlimited Tender Access",
      "Tender Notification via Email, WhatsApp, Telegram",
      "Online Dashboard Access",
      "Access to Archive Tenders",
      "Unlimited Keywords",
      "Personal Dashboard",
      "Advanced Search by Category, Location, etc.",
    ],
  },
  {
    id: "monthly_3",
    name: "3 Months",
    price: 1000.0,
    duration: "3 Months",
    features: [
      "Unlimited Tender Access",
      "Tender Notification via Email, WhatsApp, Telegram",
      "Online Dashboard Access",
      "Access to Archive Tenders",
      "Unlimited Keywords",
      "Personal Dashboard",
      "Advanced Search by Category, Location, etc.",
    ],
  },
  {
    id: "monthly_6",
    name: "6 Months",
    price: 1400.0,
    duration: "6 Months",
    features: [
      "Unlimited Tender Access",
      "Tender Notification via Email, WhatsApp, Telegram",
      "Online Dashboard Access",
      "Access to Archive Tenders",
      "Unlimited Keywords",
      "Personal Dashboard",
      "Advanced Search by Category, Location, etc.",
    ],
  },
  {
    id: "yearly",
    name: "1 Year",
    price: 2000.0,
    duration: "12 Months",
    features: [
      "Unlimited Tender Access",
      "Tender Notification via Email, WhatsApp, Telegram",
      "Online Dashboard Access",
      "Access to Archive Tenders",
      "Unlimited Keywords",
      "Personal Dashboard",
      "Advanced Search by Category, Location, etc.",
    ],
  },
]

// Combined unique features from all plans
const allFeatures = [
  "Summaries of Notices",
  "Advanced Search",
  "Personalized Dashboard",
  "Unlimited Keywords**",
  "Unlimited Profile Modifications",
  "Soft Copies, Tender Documents, Corrigendum (if available)",
  "Daily Email Alerts - Tender Notices, RFPs, RFQs, Pre-qualifications",
  "Daily Email Alerts - Contract Awards",
  "Weekly Excel Reports",
  "Monthly Analysis Reports",
]

export default function PricingTable() {
  const [isMonthly, setIsMonthly] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState(null)

  // Filter plans based on duration
  const displayPlans = isMonthly
    ? plans.filter((plan) => plan.id.includes("monthly") || plan.id === "free")
    : [plans[0], plans[plans.length - 1]] // Free and Yearly plans

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-[#1B2837] text-white p-4 text-center">
        <h2 className="text-xl font-medium">Subscribe now to get access to world's largest tender database.</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Subheading */}
        <div className="text-center mb-4">
          <h3 className="text-lg text-gray-700">We offer monthly and annual subscriptions</h3>
        </div>

        {/* Package Toggle */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            className={`px-4 py-2 rounded-md ${isMonthly ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={() => setIsMonthly(true)}
          >
            Monthly Packages
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              !isMonthly ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setIsMonthly(false)}
          >
            Yearly Packages
          </button>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-6">
          {displayPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg overflow-hidden shadow-lg ${
                plan.id === "free"
                  ? "bg-[#EBF5FB]"
                  : plan.id === "monthly_1"
                    ? "bg-[#008000] text-white"
                    : plan.id === "monthly_3"
                      ? "bg-black text-white"
                      : "bg-[#337AB7] text-white"
              }`}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-center">{plan.name}</h3>
                <div className="text-center mt-2">
                  <div className="text-2xl font-bold">₹{plan.price.toFixed(2)}</div>
                  <div className="text-sm">({plan.duration})</div>
                </div>
                
                <button
                  className={`w-full mt-4 px-4 py-2 rounded ${
                    plan.id === "free"
                      ? "bg-white border border-gray-300 hover:bg-gray-50"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                >
                 {plan.id === "free" ? "Subscribed" : "Subscribe"}
                </button>
                <div className="mt-6 space-y-3">
                  {allFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {(plan.id === "free" && index < 6) ||
                      (plan.id === "monthly_1" && index < 8) ||
                      (plan.id === "monthly_3" && index < 10) ||
                      plan.id === "yearly" ? (
                        <Check className={`h-5 w-5 ${plan.id === "free" ? "text-green-600" : "text-white"}`} />
                      ) : (
                        <span className="h-5 w-5" />
                      )}
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header Row */}
            <thead>
              <tr>
                <th className="border p-4 bg-gray-50 w-1/4">Details</th>
                {displayPlans.map((plan) => (
                  <th
                    key={plan.id}
                    className={`border p-4 text-center ${
                      plan.id === "free"
                        ? "bg-[#EBF5FB]"
                        : plan.id === "monthly_1"
                          ? "bg-[#008000] text-white"
                          : plan.id === "monthly_3"
                            ? "bg-black text-white"
                            : "bg-[#337AB7] text-white"
                    }`}
                  >
                    {plan.name}
                    <div className="text-sm mt-1">₹{plan.price.toFixed(2)}</div>
                    <div className="text-xs">({plan.duration})</div>
                    <button
                      disabled={plan.id === "free"}
                      className={`mt-2 px-4 py-1 w-full rounded ${
                        plan.id === "free"
                          ? "bg-white border border-gray-300 hover:bg-gray-50 text-gray-600"
                          : "bg-white text-black hover:bg-gray-50"
                      }`}
                      onClick={() => plan.id === "free" ? null : setSelectedPlan(plan)}
                    >
                      { plan.id === "free" ? "Subscribed" : "Subscribe"}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {allFeatures.map((feature, index) => (
                <tr key={index}>
                  <td className="border p-4">{feature}</td>
                  {displayPlans.map((plan) => (
                    <td
                      key={plan.id}
                      className={`border p-4 text-center ${
                        plan.id === "free"
                          ? "bg-[#EBF5FB] bg-opacity-50"
                          : plan.id === "monthly_1"
                            ? "bg-[#008000] bg-opacity-10"
                            : plan.id === "monthly_3"
                              ? "bg-black bg-opacity-5"
                              : "bg-[#337AB7] bg-opacity-10"
                      }`}
                    >
                      {(plan.id === "free" && index < 6) ||
                      (plan.id === "monthly_1" && index < 8) ||
                      (plan.id === "monthly_3" && index < 10) ||
                      (plan.id === "monthly_6" && index < 10) ||
                      plan.id === "yearly" ? (
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedPlan && <SubscriptionForm plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
    </div>
  )
}

