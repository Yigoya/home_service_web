import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, PenTool as Tool, Briefcase, Wrench, Search, ArrowRight, CheckCircle, Clock, Users, Shield, Loader, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMainSubcategory } from '../../store/dataSlice';
import Tender from '../../assets/tender.png';
import Business from '../../assets/justcall.png';
import Maintenance from '../../assets/maintenance.png';
import Professional from '../../assets/professional.png';
import B2B from '../../assets/b2b.png';
import useFetchData from "../../hooks/useFetchData"

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
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } =  useFetchData();

  // Flatten the nested services structure for search
  const flattenedServices = useMemo(() => {
    const results = [];
    
    const flatten = (item, type, path = []) => {
      if (!item) return;
      
      results.push({
        id: type === 'category' ? item.categoryId : item.serviceId,
        name: type === 'category' ? item.categoryName : item.name,
        categoryId: item.categoryId,
        type,
        path: [...path, item.name || item.categoryName],
        icon: item.icon
      });

      // Recursively process nested services
      if (item.services && Array.isArray(item.services)) {
        item.services.forEach(service => {
          flatten(service, 'service', [...path, item.name || item.categoryName]);
        });
      }
    };

    if (services && Array.isArray(services)) {
      services.forEach(category => flatten(category, 'category'));
    }

    return results;
  }, [services]);

  // Filter services based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return flattenedServices.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.path.some(p => p.toLowerCase().includes(query))
    ).slice(0, 6); // Limit to 6 results
  }, [searchQuery, flattenedServices]);

  // Handle search result selection
  const handleResultClick = (result) => {
    console.log(result)
    if (result.type === 'category') { 
      if (result.categoryId === 1) {
        dispatch(setMainSubcategory(services[0])); 
        navigate('/tender');
        return;
      }
      if (result.categoryId === 2) {
        dispatch(setMainSubcategory(services[1]));
        navigate('/companies');
        return;
      }
      if (result.categoryId === 3) {
        dispatch(setMainSubcategory(services[2]));
        navigate("/service-categories");
        return; 
      }
      if (result.categoryId === 4) {
        dispatch(setMainSubcategory(services[3]));
        navigate("/service-categories");
        return;
      }
      navigate(`/categories/${result.id}`);
    } else {
      if (result.categoryId === 1) {
        dispatch(setMainSubcategory(services[0])); 
        navigate('/tender');
        return;
      }
      if (result.categoryId === 2) {
        dispatch(setMainSubcategory(services[1]));
        navigate(`/business/${result.id}`);
        return;
      }
      if (result.categoryId === 3) {
        dispatch(setMainSubcategory(services[2]));
        navigate(`/technician-list/${result.id}`);
        return; 
      }
      if (result.categoryId === 4) {
        dispatch(setMainSubcategory(services[3]));
        navigate(`/technician-list/${result.id}`);
        return;
      }
      // navigate(`/services/${result.id}`);
    }
    setShowResults(false);
    setSearchQuery('');
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const searchContainer = document.getElementById('search-container');
      if (searchContainer && !searchContainer.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Use translated service information
  const translatedServices = [
    {
      title: t('tender_services', 'Tender Services'),
      icon: Tender,
      description: t('tender_description', 'Professional bid management and tender submission services'),
      onClick: () => navigate('/tender'),
    },
    {
      title: t('business_solutions', 'All Mart'),
      icon: Business,
      description: t('business_description', 'Comprehensive business consulting and strategy services'),
      onClick: () => navigate('/companies'),
    },
    {
      title: t('maintenance', 'Maintenance'),
      icon: Maintenance,
      description: t('maintenance_description', '24/7 maintenance and support services'),
      onClick: () => {
        dispatch(setMainSubcategory(services[3])); 
        navigate("/service-categories");
        return;
      }
    },
    {
      title: t('professional_services', 'Professional Services'),
      icon: Professional,
      description: t('professional_description', 'Expert professional services across industries'),
      onClick: () => {
        dispatch(setMainSubcategory(services[2])); 
        navigate("/service-categories");
        return;
      }
    },
    {
      title: t('b2b_marketplace', 'B2B Marketplace'),
      icon: B2B,
      description: t('b2b_description', 'Connect with trusted businesses and suppliers in our marketplace'),
      onClick: () => {
        dispatch(setMainSubcategory(services[4])); 
        navigate('/b2bpage');
        return;
      },
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
            <div className="mt-10" id="search-container">
              <div className={`relative max-w-xl mx-auto transform transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
                <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-10 blur-lg transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center">
                    {!loading ? (
                      <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                    ) : (
                      <Loader className="absolute left-4 h-5 w-5 text-gray-400 animate-spin" />
                    )}
                    <input
                      type="text"
                      placeholder={!loading ? t('search_placeholder', 'Search our services...') : t('loading_placeholder', 'Loading data...')}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowResults(true);
                      }}
                      onFocus={() => {
                        setIsFocused(true);
                        setShowResults(true);
                      }}
                      disabled={loading}
                      className="w-full pl-12 pr-32 py-4 bg-white rounded-2xl shadow-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setShowResults(false);
                        }}
                        className="absolute right-20 p-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                    <button 
                      className="absolute right-2 bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => setShowResults(true)}
                    >
                      <span className="hidden sm:inline">{t('search_now', 'Search')}</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Search Results Dropdown */}
                  {showResults && searchResults.length > 0 && (
                    <div className="absolute mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100]">
                      {searchResults.map((result, index) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          onClick={() => handleResultClick(result)}
                          className={`w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors ${
                            index !== searchResults.length - 1 ? 'border-b border-gray-100' : ''
                          }`}
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{result.name}</p>
                            <p className="text-sm text-gray-500">
                              {result.path.slice(0, -1).join(' > ')}
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* No Results Message */}
                  {showResults && searchQuery && searchResults.length === 0 && (
                    <div className="absolute mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 p-4 text-center text-gray-500">
                      {t('no_results', 'No services found matching your search')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Services Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {!(showResults && searchResults.length > 0) && translatedServices.map((service) => (
              <div
                key={service.title}
                onClick={!loading && !error && service.onClick}
                className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 ${loading ? '': 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
                    <img src={service.icon} className="h-10 w-10" alt={service.title} />
                  </div>
                  <ArrowRight className="h-5 w-5 text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            )) 
            }
          </div>
        </div>
      </div>
      {(showResults && searchResults.length > 0) && (
        <div className="bg-white border-t border-gray-200 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('explore_more', 'Explore More Services')}</h2>
            <p className="mt-2 text-gray-600">{t('explore_description', 'Discover our full range of services tailored to meet your business needs.')}</p>
          </div>
        </div>
      )}
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
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
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