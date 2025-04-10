import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import tenderBanner from "../../assets/tenderbanner.jpg";


const SearchForm = ({ searchTenders, locations, categorys }) => {
  const [formData, setFormData] = useState({
    keyword: "",
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
    formData.closingDate = closingDateRef.current.value;
    formData.datePosted = datePostedRef.current.value;
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
    datePostedRef.current.type = "text";
    closingDateRef.current.type = "text";
    datePostedRef.current.value = "";
    closingDateRef.current.value = "";
    setLoading(false);
    setError(null);
  };

  console.log(formData);

  return (
    <div className="mx-auto py-6 px-16 bg-slate-500"
                style={{
              backgroundImage: `url(${tenderBanner})`,
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
    >
      <form onSubmit={handleSubmit} className="space-y-12 my-8 bg-gray-200 bg-opacity-30  p-6 rounded-lg shadow-md ">
        <div className="flex flex-wrap space-y-4 md:space-y-0">
          <div className="w-full md:w-1/6 px-2">
            <input
              type="text"
              name="keyword"
              value={formData.keyword ? formData.keyword : ""}
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
              {[{ name:`- ${t('tender_status')} -`, value: null }, { name: t('open'), value: 'OPEN' }, { name: t('closed'), value: 'CLOSED' }].map((option) => (
                <option key={option.name} value={option.value}>
                  {option.name}
                </option>
              ))}
              
            </select>
          </div>
          <div className="w-full md:w-1/6 px-2">
            <select
              name="location"
              value={formData.location ? formData.location : ""}
              onChange={handleInputChange}
              className="w-full px-4 py-3 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[{ name:`- ${t('tender_by_region')} -`, value: null }, ...locations].map((option) => (
                <option key={option.name} value={option.value}>
                  {t(option.name)}
                </option>
              ))}
              
            </select>
          </div>
          <div className="w-full md:w-1/6 px-2">
            <select
              name="category"
              value={formData.serviceId ? null : ""}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[
                { serviceId: null, name: `- ${t('tender_by_category')} -` },
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
              placeholder={`- ${t('date_posted')} -`}
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
              placeholder={`- ${t('closing_date')} -`}
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