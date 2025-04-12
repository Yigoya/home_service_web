import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../Shared/api';
import CustomerLayout from '../AuthLayout/CustomerLayout';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Upload } from 'lucide-react';

export default function PublishTender() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [locations, setLocations] = useState([
    { name: "afar", value: "afar" },
    { name: "amhara", value: "amhara" },
    { name: "benishangul_gumuz", value: "benishangul-gumuz" },
    { name: "central_ethiopia", value: "central-ethiopia" },
    { name: "gambella", value: "gambella" },
    { name: "harari", value: "harari" },
    { name: "oromia", value: "oromia" },
    { name: "sidama", value: "sidama" },
    { name: "somali", value: "somali" },
    { name: "south_ethiopia", value: "south-ethiopia" },
    { name: "south_west_ethiopia", value: "south-west-ethiopia" },
    { name: "tigray", value: "tigray" },
    { name: "addis_ababa", value: "addis-ababa" },
    { name: "dire_dawa", value: "dire-dawa" },
    { name: "snnpr", value: "snnpr" },
  ]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: 'addis-ababa',
    closingDate: '',
    contactInfo: '',
    status: 'OPEN',
    categoryId: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let language = localStorage.getItem('i18nextLng') === "en" ? "ENGLISH" : 
                      (localStorage.getItem('i18nextLng') === "am" ? "AMHARIC" : "OROMO");
        const categoriesResponse = await axios.get(`${API_URL}/home?lang=${language}`);
        const tenderServices = categoriesResponse.data["services"].filter(service => service.categoryId === 3);
        setCategories(tenderServices);
        if (tenderServices.length > 0) {
          setFormData(prev => ({...prev, categoryId: tenderServices[0].id}));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(t('error_fetching_categories'));
      }
    };

    fetchCategories();
  }, [t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Check if user is authenticated
    const user = localStorage.getItem('user');
    if (!user) {
      setError(t('please_login_to_publish_tender'));
      setLoading(false);
      return;
    }

    try {
      // Create a FormData instance for multipart/form-data
      const submitFormData = new FormData();
      
      // Append all form fields
      for (const key in formData) {
        submitFormData.append(key, formData[key]);
      }
      
      // Append the file if selected
      if (selectedFile) {
        submitFormData.append('file', selectedFile);
      }

      // Send the request
      const response = await axios.post(`${API_URL}/tenders`, submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': `Bearer ${JSON.parse(user).token}`
        }
      });

      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        location: 'addis-ababa',
        closingDate: '',
        contactInfo: '',
        status: 'OPEN',
        categoryId: categories.length > 0 ? categories[0].id : '',
      });
      setSelectedFile(null);
      setFileName("");
      
      // Redirect to tender page after 2 seconds
      setTimeout(() => {
        navigate('/tender');
      }, 2000);
      
    } catch (error) {
      console.error('Error publishing tender:', error);
      setError(error.response?.data?.message || t('error_publishing_tender'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white mt-20">
      <CustomerLayout isTender={true} nextRoute={"/tender"} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          {/* <button 
            onClick={() => navigate('/tender')} 
            className="flex items-center text-[#3385bb] hover:text-[#2a6c99] mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> {t('back_to_tenders')}
          </button> */}
          <h1 className="text-2xl font-bold text-gray-800">{t('publish_tender')}</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {t('tender_published_successfully')}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                {t('tender_title')} *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3385bb]"
                required
                placeholder={t('enter_tender_title')}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                {t('tender_description')} *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3385bb]"
                required
                placeholder={t('enter_tender_description')}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                  {t('location')} *
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3385bb]"
                  required
                >
                  {locations.map((location) => (
                    <option key={location.value} value={location.value}>
                      {t(location.name)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="closingDate">
                  {t('closing_date')} *
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    id="closingDate"
                    name="closingDate"
                    value={formData.closingDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3385bb]"
                    required
                  />
                  
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactInfo">
                  {t('contact_info')} *
                </label>
                <input
                  type="email"
                  id="contactInfo"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3385bb]"
                  required
                  placeholder={t('enter_contact_email')}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryId">
                  {t('category')} *
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3385bb]"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                {t('tender_documents')}
              </label>
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="file" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">
                      {fileName || t('drag_drop_or_click_to_upload')}
                    </p>
                    <p className="text-xs text-gray-400">
                      {t('pdf_doc_docx_supported')}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/tender')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#3385bb] text-white rounded-md hover:bg-[#2a6c99] disabled:opacity-50"
              >
                {loading ? t('publishing') + '...' : t('publish_tender')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 