import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {t('Page Not Found')}
          </h2>
          <p className="mt-2 text-base text-gray-600">
            {t('The page you are looking for doesn\'t exist or has been moved.')}
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            {t('Return to Home')}
          </Link>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            {t('If you believe this is an error, please contact our support team.')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 