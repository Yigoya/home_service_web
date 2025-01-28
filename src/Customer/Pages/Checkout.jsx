import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { checkoutApi } from "../Api/Api";
import axios from "axios";

const Checkout = () => {
  const [selectedCode, setSelectedCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("0964001822");
  const amount = 100;
  const paymentMethods = [
    {
      id: "855",
      name: "Telebirr",
      logo: "data:image/jpeg;base64,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RERERERERERERERERERERERERERF/9k=",
      inputType: "tel", // Input type for phone numbers
      placeholder: "Enter phone number",
    },
    {
      id: "880",
      name: "M-Pesa",
      logo: "data:image/png;base64,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",
      inputType: "tel", // Input type for phone numbers
      placeholder: "Enter phone number",
    },
    {
      id: "946",
      name: "CBEBirr",
      logo: "data:image/jpeg;base64,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",
      inputType: "text", // Input type for account numbers
      placeholder: "Enter account number",
    },
    {
      id: "534",
      name: "Ebirr",
      logo: "data:image/png;base64,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",
      inputType: "text", // Input type for account numbers
      placeholder: "Enter account number",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(checkoutApi, {
        amount: amount,
        email: user.email,
        firstName: user.name.split(" ")[0], // Get the first name
        lastName: user.name.split(" ")[1], // Get the last name
        bankCode: selectedCode,
        phoneNumber: phoneNumber,
      });
      console.log("Payment initialized:", response.data);
      let redirectUrl = response.data;
      window.location.href = redirectUrl;
      
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
  };

  // Get the selected payment method details
  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === selectedCode
  );

  return (
    <div className="min-h-screen max-md:mt-10 bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-10 px-4 py-3 border-b">
        <div className="max-w-lg mx-auto flex items-center">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold ml-4">Checkout</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg lg:mt-10 mx-auto pt-16 px-4 pb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Payment Methods */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedCode(method.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md
                    ${
                      selectedCode === method.id
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-200"
                    }`}
                >
                  <div className="aspect-square w-full max-w-[120px] mx-auto mb-2 relative">
                    <img
                      src={method.logo || "/placeholder.svg"}
                      alt={method.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm text-center font-medium text-gray-700">{method.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number or Account Number Input */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedPaymentMethod?.inputType === "tel" ? "Phone Number" : "Account Number"}
            </h2>
            <div className="relative">
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-purple-500 transition-colors">
                {/* Flag for phone number input */}
                {selectedPaymentMethod?.inputType === "tel" && (
                  <div className="px-3 py-2 border-r-2 border-gray-200">
                    <img
                      src="https://flagcdn.com/et.svg"
                      alt="Ethiopian flag"
                      className="w-6 h-4 object-cover"
                    />
                  </div>
                )}
                <input
                  type={selectedPaymentMethod?.inputType || "text"} // Dynamic input type
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 px-3 py-2 outline-none text-lg"
                  placeholder={selectedPaymentMethod?.placeholder || "Enter details"}
                />
              </div>
            </div>
          </div>

          {/* Chapa Link */}
          <div className="text-center">
            <a href="#" className="text-emerald-500 hover:text-emerald-600 font-medium transition-colors">
              Pay with Chapa
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-xl text-lg font-medium
              hover:bg-emerald-700 active:bg-emerald-800 transition-colors duration-200
               disabled:cursor-not-allowed"
            disabled={!selectedCode || !phoneNumber}
          >
            Pay {amount} ETB
          </button>
        </form>
      </main>
    </div>
  );
};

export default Checkout;