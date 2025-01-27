import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TechVerificationPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          {t('soon')}
        </h1>
        <p className="text-gray-600 mb-6">
          {t('text')}
        </p>
       
        <Link
          className="bg-emerald-500 text-white py-2 px-6 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          to='/'
        >
          {t('back')}
        </Link>
      </div>
    </div>
  );
};

export default TechVerificationPage;
