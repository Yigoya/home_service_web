import React from 'react';
import { useTranslation } from 'react-i18next';
import ProfileCard from '../../Shared/UIComponents/ProfileCard';

const TechnicianList = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('choose_your_best')}</h1>
      
    </div>
  );
};

export default TechnicianList;