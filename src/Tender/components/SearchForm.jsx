import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const SearchForm = ({ searchTenders, locations, categorys }) => {
  const [formData, setFormData] = useState({
    keyword: null,
    status: "OPEN",
    location: null,
    serviceId: null,
    datePosted: null,
    closingDate: null,
    page: 0,
    size: 10,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const datePostedRef = useRef(null);
  const closingDateRef = useRef(null);
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name , value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    console.log(e.target.value)
    setFormData((prevData) => ({
      ...prevData,
      serviceId: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    await searchTenders(formData)
    setLoading(false);
    
  };

  const handleFocus = (ref) => {
    ref.current.type = "date";
    ref.current.focus();
  };

  const handleBlur = (ref, name) => {
    if (!formData[name]) {
      ref.current.type = "text";
    }
  };

  const handleClear = () => {
    setFormData({
      keyword: null,
      status: "OPEN",
      location: null,
      serviceId: null,
      datePosted: null,
      closingDate: null,
      page: 0,
      size: 10,
    });
    setError(null);
  };



  return (
    <div className="mx-auto py-6 px-16 ">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-wrap space-y-4 md:space-y-0">
          <div className="w-full md:w-1/6 px-2">
            <input
              type="text"
              name="keyword"
              value={formData.keyword}
              onChange={handleInputChange}
              placeholder={t('keyword_searching')}
              className="w-full px-4 py-3 pt-4 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900"
            />
          </div>
          <div className="w-full md:w-1/6 px-2">
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-3 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                <b>{t('tender_status')}</b>
              </option>
              <option value="OPEN">{t('open')}</option>
              <option value="CLOSED">{t('closed')}</option>
            </select>
          </div>
          <div className="w-full md:w-1/6 px-2">
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                <b>{t('tender_by_region')}</b>
              </option>
              {locations.map((option) => (
                <option key={option.name} value={option.value}>
                  {t(option.name)}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/6 px-2">
            <select
              name="category"
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[
                { serviceId: null, name: t('tender_by_category') },
                ...categorys
              ].map((option) => (
                <option key={option.serviceId} value={option.serviceId}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/6 px-2">
            <input
              ref={datePostedRef}
              type="text"
              name="datePosted"
              value={formData.datePosted}
              onChange={handleInputChange}
              onFocus={() => handleFocus(datePostedRef)}
              onBlur={() => handleBlur(datePostedRef, 'datePosted')}
              placeholder={t('date_posted')}
              className="w-full px-4 py-3 pt-4 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900"
            />
          </div>
          <div className="w-full md:w-1/6 px-2">
            <input
              ref={closingDateRef}
              type="text"
              name="closingDate"
              value={formData.closingDate}
              onChange={handleInputChange}
              onFocus={() => handleFocus(closingDateRef)}
              onBlur={() => handleBlur(closingDateRef, 'closingDate')}
              placeholder={t('closing_date')}
              className="w-full px-4 py-3 pt-4 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleClear}
            className="px-8 py-3 mt-2 bg-[#e7671f] text-white rounded hover:bg-orange-600 transition-colors"
            disabled={loading}
          >
            {t('clear_search')}
          </button>
          <button
            type="submit"
            className="px-8 py-3 mt-2 bg-[#3385bb] text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? t('searching') : t('search_now')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;