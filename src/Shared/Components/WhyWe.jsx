import React from "react";
import transparency from "../../assets/guarantee.png";
import equipment from "../../assets/on-time.png";
import expert from "../../assets/diploma.png";
import { useTranslation } from "react-i18next";

const WhyWe = () => {
  const { t, i18n } = useTranslation();
  const isAmharic = i18n.language === "am";


  return (
    <div className=" py-8 px-4 rounded-lg">
     <h2 className={`text-center font-bold mb-6 ${isAmharic ? "text-3xl" : "text-2xl"}`}>
        {t('why')}
     </h2>      <div className="flex flex-col md:flex-row justify-between lg:items-center bg-gray-200 rounded-3xl py-4 px-6 space-y-4 md:space-y-0 md:space-x-6">
        {/* 1st Feature */}
        <div className="flex items-center space-x-4 ">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <img src={transparency} alt="Quality Guarantee" className="w-6 h-6" />
          </div>
          <p className={`text-gray-700 font-medium ${isAmharic ? "text-lg" : "text-base"}`}>
            {t('one_year')}
          </p>
          </div>
        {/* 2nd Feature */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <img src={equipment} alt="Scheduling and Punctuality" className="w-6 h-6" />
          </div>
          <p className={`text-gray-700 font-medium ${isAmharic ? "text-lg" : "text-base"}`}>
            {t('time_sche')}
          </p>
        </div>
        {/* 3rd Feature */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <img src={expert} alt="Trusted Technicians" className="w-6 h-6" />
          </div>
          <p className={`text-gray-700 font-medium ${isAmharic ? "text-lg" : "text-base"}`}>{t('trust')}</p>
        </div>
      </div>

     
      
    </div>
  );
};

export default WhyWe;