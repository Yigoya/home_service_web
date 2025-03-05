import { Calendar, ChevronDown } from "lucide-react"
import SearchForm from "./components/SearchForm"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { tenderListApi } from './api';
import { API_URL } from '../Shared/api';
import CustomerLayout from "../AuthLayout/CustomerLayout";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function TenderPage() {
  const [tenders, setTenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(i18n.language)
        let language = i18n.language === "en" ? "ENGLISH" : (i18n.language === "am" ? "AMHARIC" : "OROMO");
        const categoriesResponse = await axios.get(`${API_URL}/home?lang=${language}`);
        const tenderSevrices = categoriesResponse.data["services"].filter(service => service.categoryId == 3);
        const firstCategoryId = tenderSevrices[0]?.id;
        const tendersResponse = await axios.get(`${tenderListApi}/${firstCategoryId}`);
        setTenders(tendersResponse.data['content']);
        setCategories(tenderSevrices);
        setSelectedCategory(tenderSevrices[0]);
        localStorage.setItem('tenderCategorys', JSON.stringify(tenderSevrices));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [i18n.language]);

  const fetchTendersByCategory = async (categoryId) => {
    setLoading(true);
    setError(null);
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

  const searchTenders = async (payload) => {
    setLoading(true);
    setError(null);
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
    navigate("/subscription");
  };

  const navigateToSignUp = () => {
    navigate("/customer-signup?next=/subscription");
  };

  const locations = [
    { name: "all_location", hasDropdown: false, value: "" },
    { name: "afar", hasDropdown: false, value: "afar" },
    { name: "amhara", hasDropdown: false, value: "amhara" },
    { name: "benishangul_gumuz", hasDropdown: false, value: "benishangul-gumuz" },
    { name: "central_ethiopia", hasDropdown: false, value: "central-ethiopia" },
    { name: "gambella", hasDropdown: false, value: "gambella" },
    { name: "harari", hasDropdown: false, value: "harari" },
    { name: "oromia", hasDropdown: false, value: "oromia" },
    { name: "sidama", hasDropdown: false, value: "sidama" },
    { name: "somali", hasDropdown: false, value: "somali" },
    { name: "south_ethiopia", hasDropdown: false, value: "south-ethiopia" },
    { name: "south_west_ethiopia", hasDropdown: false, value: "south-west-ethiopia" },
    { name: "tigray", hasDropdown: false, value: "tigray" },
    { name: "addis_ababa", hasDropdown: false, value: "addis-ababa" },
    { name: "dire_dawa", hasDropdown: false, value: "dire-dawa" },
    { name: "snnpr", hasDropdown: false, value: "snnpr" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <div className="min-h-screen bg-white mt-20">
      <CustomerLayout isTender={true} nextRoute={"/tender"} />
      <nav className="bg-white border-b border-gray-200">
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
      </nav>
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
              <div className="border p-4 rounded">
                <h3 className="font-bold text-[#3498db] mb-2">{t('register_as')}</h3>
                <p className="font-bold">{t('agency_buyer_and')}</p>
                <p className="text-[#3498db] font-bold text-xl">{t('publish')}</p>
                <p>{t('your_tender_with_us')}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
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
                    onClick={() => fetchTendersByCategory(category.id)}
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
                {/* Filters */}
                <div className="p-2 flex items-center gap-8 border-b bg-gray-200">
                  <input
                    type="text"
                    placeholder={t('posted_date')}
                    className="border border-gray-400 rounded p-2 text-sm flex-1"
                  />
                  <input
                    type="text"
                    placeholder={t('latest_first')}
                    className="border border-gray-400 rounded p-2 text-sm flex-1"
                  />
                  <button className="bg-[#3385bb] text-white px-4 py-2 rounded text-sm flex-1">
                    {t('sort_tenders')}
                  </button>
                </div>

                {/* Tenders List */}
                <div className="space-y-4 p-2">
                  {tenders.map((tender) => (
                    <div
                      key={tender.id}
                      className="border-b pb-4 cursor-pointer"
                      onClick={() => navigate(`/tender/${tender.id}`)}
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
                  ))}
                </div>
              </div>
            </div>
          </div>

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

            <div className="border rounded p-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-24%2009-07-04-wswkSHBHf5PBfQaESYZzeizqncIimT.png"
                alt="Payment Methods"
                className="w-full h-auto"
              />
            </div>

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

