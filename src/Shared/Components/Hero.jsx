import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, PenTool as Tool, Briefcase, Wrench, Search, ArrowRight, CheckCircle, Clock, Users, Shield, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { useDispatch } from 'react-redux';
import { setSubcategory } from '../../store/dataSlice';
import Tender from '../../assets/tender.png';
import Business from '../../assets/justcall.png';
import Maintenance from '../../assets/maintenance.png';
import Professional from '../../assets/professional.png';

const services = [
  {
    title: 'Tender Services',
    icon: Building2,
    description: 'Professional bid management and tender submission services',
    route: '/tender',
  },
  {
    title: 'Business Solutions',
    icon: Briefcase,
    description: 'Comprehensive business consulting and strategy services',
    route: '/companies',
  },
  {
    title: 'Maintenance',
    icon: Tool,
    description: '24/7 maintenance and support services',
    route: '/service-categories',
  },
  {
    title: 'Professional Services',
    icon: Wrench,
    description: 'Expert professional services across industries',
    route: '/service-categories',
  },
];

const features = [
  {
    icon: CheckCircle,
    title: 'Quality Assured',
    description: 'Our services meet the highest industry standards with ISO 9001:2015 certification.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support with guaranteed response times.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Highly qualified professionals with decades of combined experience.',
  },
  {
    icon: Shield,
    title: 'Secure Process',
    description: 'Enterprise-grade security protocols protecting your business data.',
  },
];

export default function Hero() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useFetchData();

  // Use translated service information
  const translatedServices = [
    {
      title: t('tender_services', 'Tender Services'),
      icon: Tender,
      description: t('tender_description', 'Professional bid management and tender submission services'),
      onClick: () => navigate('/tender'),
    },
    {
      title: t('business_solutions', 'Business Solutions'),
      icon: Business,
      description: t('business_description', 'Comprehensive business consulting and strategy services'),
      onClick: () => navigate('/companies'),
    },
    {
      title: t('maintenance', 'Maintenance'),
      icon: Maintenance,
      description: t('maintenance_description', '24/7 maintenance and support services'),
      onClick: () => {
        dispatch(setSubcategory(services[3])); 
        navigate("/service-categories");
        return;
      }
    },
    {
      title: t('professional_services', 'Professional Services'),
      icon: Professional,
      description: t('professional_description', 'Expert professional services across industries'),
      onClick: () => {
        dispatch(setSubcategory(services[2])); 
        navigate("/service-categories");
        return;
      }
    },
  ];

  // Use translated feature information
  const translatedFeatures = [
    {
      icon: CheckCircle,
      title: t('quality_assured', 'Quality Assured'),
      description: t('quality_description', 'Our services meet the highest industry standards with ISO 9001:2015 certification.'),
    },
    {
      icon: Clock,
      title: t('support_247', '24/7 Support'),
      description: t('support_description', 'Round-the-clock customer support with guaranteed response times.'),
    },
    {
      icon: Users,
      title: t('expert_team', 'Expert Team'),
      description: t('team_description', 'Highly qualified professionals with decades of combined experience.'),
    },
    {
      icon: Shield,
      title: t('secure_process', 'Secure Process'),
      description: t('secure_description', 'Enterprise-grade security protocols protecting your business data.'),
    },
  ];

  return (
    <div className="pt-16">
      <div className="relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            className="w-full h-[700px] object-cover"
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt={t('office_building_alt', 'Modern Office Building')}
          />
          <div className="absolute h-[700px] inset-0 bg-gray-900/75"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              {t('welcome1', "Building Tomorrow's")}
              <span className="block text-blue-500 mt-2">{t('welcome2', 'Business Solutions')}</span>
            </h1>
            
            <p className="mt-8 text-lg text-gray-300 leading-relaxed">
              {t('header', 'Empowering businesses with innovative solutions and strategic expertise. Partner with us to transform your business operations and achieve sustainable growth.')}
            </p>

            {/* Enhanced Search Section */}
            <div className="mt-10">
              <div className={`relative max-w-xl mx-auto transform transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
                <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-10 blur-lg transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  {!loading ? <Search className="absolute left-4 h-5 w-5 text-gray-400" /> : <Loader className="absolute left-4 h-5 w-5 text-gray-400" />}  
                  <input
                    type="text"
                    placeholder={!loading ? t('search_placeholder', 'Search our services...') : 'Wait loading data ...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full pl-12 pr-32 py-4 bg-white rounded-2xl shadow-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <button className="absolute right-2 bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span className="hidden sm:inline">{t('search_now', 'Search')}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Popular Searches */}
              {/* <div className="mt-6 flex justify-center gap-6 text-sm">
                <span className="text-gray-400">{t('popular_searches', 'Popular')}:</span>
                <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="h-4 w-4" />
                  {t('consulting', 'Consulting')}
                </button>
                <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="h-4 w-4" />
                  {t('enterprise_solutions', 'Enterprise Solutions')}
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Services Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {translatedServices.map((service) => (
              <div
                key={service.title}
                onClick={!loading && !error && service.onClick}
                className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 ${loading ? '': 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
                    <img src={service.icon} className="h-8 w-8" />
                    {/* <service.icon className="h-6 w-6" /> */}
                  </div>
                  <ArrowRight className="h-5 w-5 text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {t(service.title, service.title)}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {t(service.description, service.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-24 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('why', 'Why Choose Us')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('excellence_description', 'We deliver excellence through our comprehensive range of services')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {translatedFeatures.map((feature) => (
              <div
                key={feature.title}
                className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 blur-lg"></div>
                    <div className="relative h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                    {t(feature.title, feature.title)}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {t(feature.description, feature.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}