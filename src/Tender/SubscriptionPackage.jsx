"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SubscriptionForm from "./SubscriptionForm";

const plans = [
  {
    id: "free",
    name: "explorer_pass",
    price: 0.0,
    duration: "N/A",
    features: [
      "discover_state_tenders",
      "grab_tender_docs",
      "showcase_business",
    ],
  },
  {
    id: "monthly_1",
    name: "sprint_starter",
    price: 500.0,
    duration: "1 Month",
    features: [
      "unlimited_tender_opportunities",
      "stay_ahead_alerts",
      "command_bids_dashboard",
      "unlock_archived_tenders",
      "search_freely_keywords",
      "personalize_tender_hub",
      "master_advanced_search",
    ],
  },
  {
    id: "monthly_3",
    name: "momentum_builder",
    price: 1000.0,
    duration: "3 Months",
    features: [
      "unlimited_tender_opportunities",
      "stay_ahead_alerts",
      "command_bids_dashboard",
      "unlock_archived_tenders",
      "search_freely_keywords",
      "personalize_tender_hub",
      "master_advanced_search",
    ],
  },
  {
    id: "monthly_6",
    name: "growth_voyager",
    price: 1400.0,
    duration: "6 Months",
    features: [
      "unlimited_tender_opportunities",
      "stay_ahead_alerts",
      "command_bids_dashboard",
      "unlock_archived_tenders",
      "search_freely_keywords",
      "personalize_tender_hub",
      "master_advanced_search",
    ],
  },
  {
    id: "yearly",
    name: "tender_titan",
    price: 2000.0,
    duration: "12 Months",
    features: [
      "unlimited_tender_opportunities",
      "stay_ahead_alerts",
      "command_bids_dashboard",
      "unlock_archived_tenders",
      "search_freely_keywords",
      "personalize_tender_hub",
      "master_advanced_search",
    ],
  },
];

const allFeatures = [
  "precision_advanced_search",
  "command_center_dashboard",
  "endless_keywords",
  "profile_tweaks_limitless",
  "digital_tender_docs",
  "daily_tender_alerts",
  "contract_wins_alerts",
  "weekly_insights_excel",
  "monthly_triumph_reports",
];

export default function PricingTable() {
  const { t } = useTranslation();
  const [isMonthly, setIsMonthly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const displayPlans = isMonthly
    ? plans.filter((plan) => plan.id.includes("monthly") || plan.id === "free" || plan.id === "yearly")
    : [plans[0], plans[plans.length - 1]];

  return (
    <div className="w-full mt-24">
      {/* Header */}
      <div className="bg-[#1B2837] text-white p-4 text-center">
        <h2 className="text-xl font-medium">{t("subscribe_header")}</h2>
      </div>

      <div className="mx-48 px-4 py-8">
        {/* Package Toggle */}
        <div className="flex justify-center gap-2 mb-8">
          {/* <button
            className={`px-4 py-2 rounded-md ${isMonthly ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={() => setIsMonthly(true)}
          >
            {t("monthly_packages")}
          </button>
          <button
            className={`px-4 py-2 rounded-md ${!isMonthly ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={() => setIsMonthly(false)}
          >
            {t("yearly_packages")}
          </button> */}
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
                <h3 className="text-xl font-semibold text-center">{t(plan.name)}</h3>
                <div className="text-center mt-2">
                  <div className="text-2xl font-bold">{plan.price.toFixed(2)} Birr</div>
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
                  {plan.id === "free" ? t("subscribed") : t("subscribe")}
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
                      <span className="text-sm">{t(feature)}</span>
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
            <thead>
              <tr>
                <th className="border p-4 bg-gray-50 w-1/3">Details</th>
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
                    {t(plan.name)}
                    <div className="text-sm mt-1">{plan.price.toFixed(2)} Birr</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature, index) => (
                <tr key={index}>
                  <td className="border p-4">{t(feature)}</td>
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
                        <Check className="h-7 w-7 text-green-600 mx-auto" />
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="border p-4"></td>
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
                    <button
                      disabled={plan.id === "free"}
                      className={`mt-2 px-4 py-1 w-full rounded ${
                        plan.id === "free"
                          ? "bg-white border border-gray-300 hover:bg-gray-50 text-gray-600"
                          : "bg-white text-black hover:bg-gray-50"
                      }`}
                      onClick={() => (plan.id === "free" ? null : setSelectedPlan(plan))}
                    >
                      {plan.id === "free" ? t("subscribed") : t("subscribe")}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {selectedPlan && <SubscriptionForm plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
    </div>
  );
}