import { Calendar, ChevronDown, ArrowLeft } from "lucide-react"
import SearchForm from "./components/SearchForm"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { tenderListApi } from './api';
import { API_URL } from '../Shared/api';
import CustomerLayout from "../AuthLayout/CustomerLayout";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import useFetchData from "../hooks/useFetchData";

export default function TenderPage() {
  const { tenders: categories, loading: loadingCategories, error: errorCategories } = useFetchData();
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(loadingCategories);
  const [error, setError] = useState(errorCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTender, setSelectedTender] = useState(null);
  const [tenderDetailLoading, setTenderDetailLoading] = useState(false);
  const [tenderDetailError, setTenderDetailError] = useState(null);
  const { t } = useTranslation();
  
  const user = localStorage.getItem('user');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedCategory = categories[0]
        console.log(selectedCategory)
        const tendersResponse = await axios.get(`${tenderListApi}/${selectedCategory.serviceId}`);
        setTenders(tendersResponse.data['content'])
        setSelectedCategory(selectedCategory)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [categories]);

  const fetchTendersByCategory = async (categoryId) => {
    setError(null);
     setSelectedTender(null); // Clear any selected tender when changing category
    try {
      const response = await axios.get(`${tenderListApi}/${categoryId}`);
      setTenders(response.data['content']);
      localStorage.setItem('tenderCategory', JSON.stringify(categories.find(category => category.id === categoryId)));
      setSelectedCategory(categories.find(category => category.id === categoryId));
    } catch (error) {
      setError('Error fetching tenders');
      console.error('Error fetching tenders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTendersByLocation = async (location) => {
    setLoading(true);
    setError(null);
    setSelectedTender(null); // Clear any selected tender when changing location
    try {
      const response = await axios.get(`${API_URL}/tenders/location?location=${location}`);
      setTenders(response.data['content']);
    } catch (error) {
      setError('Error fetching tenders by location');
      console.error('Error fetching tenders by location:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTenderDetail = async (tenderId) => {
    setTenderDetailLoading(true);
    setTenderDetailError(null);
    try {
      const response = await axios.get(`${API_URL}/tenders/${tenderId}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch tender data");
      }
      setSelectedTender(response.data);
    } catch (err) {
      setTenderDetailError("Error loading tender details. Please try again later.");
      console.error(err);
    } finally {
      setTenderDetailLoading(false);
    }
  };

  const searchTenders = async (payload) => {
    setLoading(true);
    setError(null);
    setSelectedTender(null); // Clear any selected tender when searching
    console.log(payload)
    try {
      const response = await axios.post(`${API_URL}/tenders/search`, payload);
      console.log(response.data)
      setTenders(response.data['content']);
    } catch (error) {
      setError('Error searching tenders');
      console.error('Error searching tenders:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const navigateToSubscription = () => {
    navigate("/tenders");
  };

  const navigateToSignUp = () => {
    navigate("/customer-signup?next=/subscription");
  };

  const locations = [
    { name: "afar", hasDropdown: false, value: "Afar" },
    { name: "amhara", hasDropdown: false, value: "Amhara" },
    { name: "benishangul_gumuz", hasDropdown: false, value: "Benishangul Gumuz" },
    { name: "central_ethiopia", hasDropdown: false, value: "Central Ethiopia" },
    { name: "gambella", hasDropdown: false, value: "Gambella" },
    { name: "harari", hasDropdown: false, value: "Harari" },
    { name: "oromia", hasDropdown: false, value: "Oromia" },
    { name: "sidama", hasDropdown: false, value: "Sidama" },
    { name: "somali", hasDropdown: false, value: "Somali" },
    { name: "south_ethiopia", hasDropdown: false, value: "South Ethiopia" },
    { name: "south_west_ethiopia", hasDropdown: false, value: "South-West Ethiopia" },
    { name: "tigray", hasDropdown: false, value: "Tigray" },
    { name: "addis_ababa", hasDropdown: false, value: "Addis Ababa" },
    { name: "dire_dawa", hasDropdown: false, value: "Dire Dawa" },
    { name: "snnpr", hasDropdown: false, value: "SNNPR" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <div className="min-h-screen bg-white mt-20">
      {/* <nav className="bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto s flex justify-between items-stretch h-16 border-collapse border-gray-200">
          {[
            'tender_issuing_agencies',
            'tender_categories',
            'tender_locations',
            'monthly_annually_tender_subscription',
            'free_tenders',
            'tender_faqs',
          ].map((key, index) => (
            <div key={index} className="flex flex-row items-center justify-center px-2 border border-gray-200 w-full">
              <a href="#" className="text-sm font-bold text-[#3385bb] hover:text-[#2a6c99]">
                {t(key)}
              </a>
            </div>
          ))}
        </div>
      </nav> */}
      <SearchForm searchTenders={searchTenders} locations={locations} categorys={categories} />
      <div className="px-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Sidebar */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              <button
                onClick={() => navigateToSubscription()}
                className="w-full bg-[#3385bb] text-white p-4 text-sm rounded"
              >
                {t('announce_or_publish_tender')}
              </button>
              <button className="w-full bg-[#3385bb] text-white p-4 text-sm rounded">
                {t('member_login')}
              </button>
              <button
                onClick={() => navigateToSignUp()}
                className="w-full bg-[#3385bb] text-white p-4 text-sm rounded"
              >
                {t('register')}
              </button>
              {/* <div className="border p-4 rounded">
                <h3 className="font-bold text-[#3498db] mb-2">{t('register_as')}</h3>
                <p className="font-bold">{t('agency_buyer_and')}</p>
                <p className="text-[#3498db] font-bold text-xl">{t('publish')}</p>
                <p>{t('your_tender_with_us')}</p>
              </div> */}
            </div>
          </div>

          {/* Main Content */}
          {selectedTender ? (
          <div className="p-2 md:col-span-8 border border-gray-100">
                    <button 
                      onClick={() => setSelectedTender(null)} 
                      className="mb-2 flex items-center text-[#3385bb] hover:text-[#2a6c99]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" /> {t('back_to_tenders')}
                    </button>
                    
                    {tenderDetailLoading ? (
                      <div className="p-4 text-center">
                        <p>{t('loading')}...</p>
                      </div>
                    ) : tenderDetailError ? (
                      <div className="p-4 text-center text-red-500">
                        <p>{tenderDetailError}</p>
                      </div>
                    ) : (
                      <>
                        {/* Main Tender Information */}
                        <div className="border rounded mb-4">
                          <div className="border-b p-3 bg-gray-50">
                            <h2 className="font-medium">{selectedTender.title}</h2>
                          </div>

                          <div className="p-3">
                            <p>
                              Johannesburg Water South Africa has Released a tender for {selectedTender.title} in Environment and Pollution. The
                              tender was released on {formatDate(selectedTender.datePosted)}.
                            </p>

                            <div className="mt-3">
                              <p>
                                <span className="font-medium">Country - </span>
                                {selectedTender.location}
                              </p>
                              <p>
                                <span className="font-medium">Summary - </span>
                                {selectedTender.title}
                              </p>
                              <p>
                                <span className="font-medium">Deadline - </span>
                                {formatDate(selectedTender.closingDate)}
                              </p>
                              <p>
                                <span className="font-medium">GT reference number - </span>
                                {selectedTender.id}
                              </p>
                              <p>
                                <span className="font-medium">Product classification - </span>
                                {selectedTender.categoryName}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Organization Details */}
                        <div className="border rounded mb-4">
                          <div className="border-b p-3 bg-gray-50">
                            <h2 className="font-medium">{t('Organization, notice and document details')}</h2>
                          </div>

                          <div className="p-3 relative">
                            <div className={`${!user ? "blur-sm" : ""} transition-all duration-300`}>
                              <p>
                                <span className="font-medium">Contact: </span>
                                {selectedTender.contactInfo}
                              </p>
                              <p>
                                <span className="font-medium">Contact Email: </span>
                                {selectedTender.contactInfo}
                              </p>
                              <p>
                                <span className="font-medium">Phone number: </span>+251 911 123456
                              </p>
                              <p>
                                <span className="font-medium">PO Box: </span>12345
                              </p>
                              <p>
                                <span className="font-medium">Document Type: </span>Tender Notice
                              </p>
                            </div>
                          
                            {!user && (
                              <div className="flex justify-center mt-3 absolute inset-0 items-center">
                                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
                                  {t('login')}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
          ) : (
            <div className="md:col-span-8 border border-gray-100">
              {/* Header */}
              <div className="grid grid-cols-11 bg-[#3385bb] text-white">
                <div className="col-span-2 p-3">{t('location')}</div>
              <div className="col-span-3 p-3 border-r border-white">{t('category')}</div>
              <div className="col-span-6 p-3">{selectedCategory != null ? selectedCategory.name : ''}</div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-11">
              {/* Location Column */}
              <div className="col-span-2 border-r border-gray-100">
                {locations.map((location, index) => (
                  <div
                    key={location.name}
                    onClick={() => fetchTendersByLocation(location.value)} // Use value instead of name for consistency
                    className={`px-3 py-3 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${
                      index !== locations.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <span>{t(location.name)}</span>
                    {location.hasDropdown && <ChevronDown className="w-4 h-4 text-[#3498db]" />}
                  </div>
                ))}
              </div>

              {/* Category Column */}
              <div className="col-span-3 border-r border-gray-100">
                <div className="p-2">
                  <input
                    type="text"
                    placeholder={t('search_by_category')}
                    className="w-full p-2 border rounded border-gray-300"
                  />
                </div>
                {categories.map((category) => (
                  <div
                    onClick={() => fetchTendersByCategory(category.serviceId)}
                    key={category.id}
                    className={`p-3 hover:bg-gray-100 cursor-pointer text-sm font-medium ${
                      category === selectedCategory ? 'bg-gray-200 ' : 'text-[#3385bb]'
                    }`}
                  >
                    {category.name}
                  </div>
                ))}
              </div>

              {/* Tenders Column */}
              <div className="col-span-6">
                    {/* Tenders List */}
                    <div className="space-y-4 p-2">
                      {loading ? (
                        <div className="text-center p-4">
                          <p>{t('loading')}...</p>
                        </div>
                      ) : error ? (
                        <div className="text-center p-4 text-red-500">
                          <p>{error}</p>
                        </div>
                      ) : tenders.length === 0 ? (
                        <div className="text-center p-4">
                          <p>{t('no_tenders_found')}</p>
                        </div>
                      ) : (
                        tenders.map((tender) => (
                          <div
                            key={tender.id}
                            className="border-b pb-4 cursor-pointer"
                            onClick={() => fetchTenderDetail(tender.id)}
                          >
                            <h3 className="text-black font-medium mb-2 text-sm">{tender.title}</h3>
                            <div className="grid grid-cols-1 gap-1 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-green-600">{t('posted_date')}:</span>
                                <Calendar className="w-4 h-4 text-green-600" />
                                <span className="text-green-600">{formatDate(tender.datePosted)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#3385bb]">{t('expiry_date')}:</span>
                                <Calendar className="w-4 h-4 text-[#3498db]" />
                                <span className="text-[#3385bb]">{formatDate(tender.closingDate)}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
              </div>
            </div>
          </div>
          )}
          {/* Right Sidebar */}
          <div className="md:col-span-2 space-y-4">
            <div className="border rounded p-4 text-center">
              <h3 className="font-bold mb-2">{t('having_query')}</h3>
              <p className="text-[#3498db] text-sm">{t('send_email_query')}</p>
            </div>

            <div className="border rounded p-4 text-center">
              <h3 className="font-bold mb-2">{t('subscribe_now')}</h3>
              <button className="bg-orange-500 text-white w-full py-2 rounded">
                {t('subscribe_for_email')}
              </button>
            </div>

            {/* <div className="border rounded p-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-24%2009-07-04-wswkSHBHf5PBfQaESYZzeizqncIimT.png"
                alt="Payment Methods"
                className="w-full h-auto"
              />
            </div> */}

            <div className="border rounded p-4">
              <h3 className="text-[#3498db] font-bold mb-2">{t('customer_service')}</h3>
              <p className="font-bold">{t('feedback')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

