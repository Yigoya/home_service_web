import React from "react";
import transparency from "../../assets/guarantee.png";
import equipment from "../../assets/on-time.png";
import expert from "../../assets/diploma.png";
import { useTranslation } from "react-i18next";

const WhyWe = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-t from-emerald-100 via-emerald-50 to-white  py-8 px-4 rounded-lg">
      <h2 className="text-center text-2xl font-bold mb-6">{t('why')}</h2>
      <div className="flex flex-col md:flex-row justify-between lg:items-center bg-gray-200 rounded-3xl py-4 px-6 space-y-4 md:space-y-0 md:space-x-6">
        {/* 1st Feature */}
        <div className="flex items-center space-x-4 ">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <img src={transparency} alt="Quality Guarantee" className="w-6 h-6" />
          </div>
          <p className="text-gray-700 font-medium">{t('one_year')}</p>
        </div>
        {/* 2nd Feature */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <img src={equipment} alt="Scheduling and Punctuality" className="w-6 h-6" />
          </div>
          <p className="text-gray-700 font-medium">{t('time_sche')}</p>
        </div>
        {/* 3rd Feature */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <img src={expert} alt="Trusted Technicians" className="w-6 h-6" />
          </div>
          <p className="text-gray-700 font-medium">{t('trust')}</p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="   px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">16+</p>
            <p className="text-black">Total Services</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">150+</p>
            <p className="text-black">Total Technicians</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">500+</p>
            <p className="text-black">Total Customers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">200+</p>
            <p className="text-black">Total Jobs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyWe;