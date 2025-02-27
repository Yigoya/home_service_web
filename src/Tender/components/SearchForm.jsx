import { useState } from "react";

const SearchForm = ({ searchTenders, locations, categorys }) => {
  const [formData, setFormData] = useState({
    keyword: "",
    status: "OPEN",
    location: "",
    serviceId: null,
    datePosted: "",
    closingDate: "",
    page: 0,
    size: 10,
  });
  console.log(locations)
  console.log(categorys)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    console.log(formData.category)

    await searchTenders(formData,)
    setLoading(false);
    
  };

  const handleClear = () => {
    setFormData({
      keyword: "",
      status: "",
      location: "",
      serviceId: null,
      datePosted: "",
      closingDate: "",
      page: 0,
      size: 10,
    });
    setError(null);
  };



  return (
    <div className="mx-auto py-6 px-16 bg-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-wrap space-y-4 md:space-y-0">
          <div className="w-full md:w-1/6 px-2">
            <input
              type="text"
              name="keyword"
              value={formData.keyword}
              onChange={handleInputChange}
              placeholder="by keyword e.g., construction"
              className="w-full px-4 py-3 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-1/6 px-2">
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-3 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                - Select a status -
              </option>
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <div className="w-full md:w-1/6 px-2">
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                - Select a location -
              </option>
              {locations.map((option) => (
                <option key={option.name} value={option.value}>
                  {option.name}
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
              <option value="" disabled selected>
                - Select a category -
              </option>
              {categorys.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/6 px-2">
            <input
              type="date"
              name="datePosted"
              value={formData.datePosted}
              onChange={handleInputChange}
              className="w-full px-4 py-3 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-1/6 px-2">
            <input
              type="date"
              name="closingDate"
              value={formData.closingDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 mt-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            Clear Search
          </button>
          <button
            type="submit"
            className="px-8 py-3 mt-2 bg-[#3385bb] text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;