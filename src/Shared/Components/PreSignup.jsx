import React from 'react'
import { Wrench, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';


const PreSignup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <div className="min-h-screen lg:mt-5 flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('join_us')}</h1>
          <p className="text-gray-500">{t('Choose_option')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Technician Option */}
          <button
            onClick={() => navigate('/technician-registration')}
            className="w-full h-auto p-6 flex flex-col items-center gap-4 rounded-lg border border-gray-200 
                     hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Wrench className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t('signup_tech')}
              </h2>
              <p className="text-gray-500 text-sm">
              {t('offer')}
              </p>
            </div>
          </button>

          {/* Customer Option */}
          <button
            onClick={() => navigate('/customer-signup')}
            className="w-full h-auto p-6 flex flex-col items-center gap-4 rounded-lg border border-gray-200 
                     hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t('signup_cust')}
              </h2>
              <p className="text-gray-500 text-sm">
              {t('find_tech')}
              </p>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
        {t('yes_account')}{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            {t('login')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreSignup

