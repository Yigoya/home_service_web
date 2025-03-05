"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SubscriptionForm({ plan, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    notificationChannels: {
      email: false,
      whatsapp: false,
      telegram: false,
    },
    whatsapp: "", // Separate field for WhatsApp number
    telegram: "", // Separate field for Telegram username
    category: "",
    companyName: "",
    tinNumber: "",
  });

  const storedData = localStorage.getItem("tenderCategorys");
  const categories = storedData ? JSON.parse(storedData) : [];

  const handleChannelChange = (channel) => {
    setFormData((prev) => ({
      ...prev,
      notificationChannels: {
        ...prev.notificationChannels,
        [channel]: !prev.notificationChannels[channel],
      },
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/login?next=/tender");
  };

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
              <h2 className="text-xl font-semibold">{t(plan.name)}</h2>
              <p className="mt-1">
                {plan.price.toFixed(2)} Birr ({plan.duration})
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-sm hover:bg-black hover:bg-opacity-10 rounded-full p-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tender Receive Via */}
          <div className="space-y-3">
            <label className="block font-medium">{t("tender_receive_via")}</label>
            <div className="space-y-2">
              {["email", "whatsapp", "telegram"].map((channel) => (
                <label key={channel} className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 border rounded flex items-center justify-center cursor-pointer
                      ${
                        formData.notificationChannels[channel]
                          ? "bg-[#337AB7] border-[#337AB7]"
                          : "border-gray-300"
                      }`}
                    onClick={() => handleChannelChange(channel)}
                  >
                    {formData.notificationChannels[channel] && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span>{t(channel)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* WhatsApp Number */}
          {formData.notificationChannels.whatsapp && (
            <div className="space-y-2">
              <label className="block font-medium">{t("whatsapp_number")}</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    whatsapp: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#337AB7]"
                placeholder={t("enter_telegram_username")} // Reusing placeholder for consistency; adjust if needed
              />
            </div>
          )}

          {/* Telegram Username */}
          {formData.notificationChannels.telegram && (
            <div className="space-y-2">
              <label className="block font-medium">{t("telegram_username")}</label>
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
                placeholder={t("enter_telegram_username")}
              />
            </div>
          )}

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="block font-medium">{t("select_category")}</label>
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
              <option value="">{t("select_a_category")}</option>
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
              {t("your_company_name")} <span className="text-gray-500">{t("optional")}</span>
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
              placeholder={t("enter_company_name")}
            />
          </div>

          {/* TIN Number */}
          <div className="space-y-2">
            <label className="block font-medium">
              {t("your_tin_number")} <span className="text-gray-500">{t("optional")}</span>
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
              placeholder={t("enter_tin_number")}
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
            {t("complete_subscription")}
          </button>
        </form>
      </div>
    </div>
  );
}