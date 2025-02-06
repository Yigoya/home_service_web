import React from "react"
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import cleanImage from '../../assets//house_clean.png';
 // Make sure to add your background image

function PreSignup() {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${cleanImage})`,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backgroundBlend: "overlay",
      }}
    >
      <div className="w-full max-w-md space-y-8 bg-white/90 backdrop-blur-sm p-8 mt-24 rounded-2xl shadow-lg">
        <div className="text-center">
        <h2 className="text-5xl font-bold text-center text-emerald-800 mb-8">huluMoya</h2>
        </div>

        <div className="space-y-4">
          {/* Customer Sign In Button */}
          <div className="space-y-2">
            <button
              onClick={() => navigate("/customer-signup")}
              className="w-full py-4 px-6 text-center text-white bg-emerald-700 hover:bg-emerald-600 rounded-full text-lg font-medium transition-colors"
            >
                {t('signup_cust')}
            </button>
            {/* <div className="text-center text-sm ">
              <span className="text-gray-600 "  >{t('yes_account')} </span>
              <a href="/login" className="text-emerald-700 hover:text-emerald-600">
              {t('login')}
              </a>
            </div> */}
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center text-gray-500">
            <div className="border-t w-8 border-gray-400 flex-grow" />
            <span className="px-4">{t('or')}</span>
            <div className="border-t w-8 border-gray-400 flex-grow" />
          </div>

          {/* SweepStar Sign In Button */}
          <div className="space-y-2">
            <button
              onClick={() => navigate("/technician-registration")}
              className="w-full py-4 px-6 text-center text-white bg-black hover:bg-gray-800 rounded-full text-lg font-medium transition-colors"
            >
               {t('signup_tech')}
            </button>
            {/* <div className="text-center text-sm">
              <span className="text-gray-600">{t('yes_account')} </span>
              <a href="/login" className="text-emerald-700 hover:text-emerald-600">
                {t('login')}
              </a>
              </div> */}
          </div>
        </div>

        {/* Terms Text */}
        <div className="text-center text-sm text-gray-500 px-6">
          <p>
            By creating an account you
            agree to our{" "}
            <a href="/terms" className="text-emerald-600 hover:text-emerald-700">
              terms of service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-emerald-600 hover:text-emerald-700">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default PreSignup

