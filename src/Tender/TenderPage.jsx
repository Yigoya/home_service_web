import { Calendar, ChevronDown } from "lucide-react"
import SearchForm from "./components/SearchForm"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { tenderListApi } from './api';
import { API_URL } from '../Shared/api';
import CustomerLayout from "../AuthLayout/CustomerLayout";
import { useNavigate } from 'react-router-dom';

export default function TenderPage() {
  const [tenders, setTenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(`${API_URL}/home`);
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
  }, []);

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
    { name: 'All Location', hasDropdown: false, value: '' },
    { name: 'Afar', hasDropdown: false, value: 'afar' },
    { name: 'Amhara', hasDropdown: false, value: 'amhara' },
    { name: 'Benishangul-Gumuz', hasDropdown: false, value: 'benishangul-gumuz' },
    { name: 'Central Ethiopia', hasDropdown: false, value: 'central-ethiopia' },
    { name: 'Gambella', hasDropdown: false, value: 'gambella' },
    { name: 'Harari', hasDropdown: false, value: 'harari' },
    { name: 'Oromia', hasDropdown: false, value: 'oromia' },
    { name: 'Sidama', hasDropdown: false, value: 'sidama' },
    { name: 'Somali', hasDropdown: false, value: 'somali' },
    { name: 'South Ethiopia', hasDropdown: false, value: 'south-ethiopia' },
    { name: 'South West Ethiopia', hasDropdown: false, value: 'south-west-ethiopia' },
    { name: 'Tigray', hasDropdown: false, value: 'tigray' },
    { name: 'Addis Ababa', hasDropdown: false, value: 'addis-ababa' },
    { name: 'Dire Dawa', hasDropdown: false, value: 'dire-dawa' },
    { name: 'Southern Nations, Nationalities, and Peoples\'', hasDropdown: false, value: 'snnpr' },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <div className="min-h-screen bg-white mt-20">
      <CustomerLayout isTender={true}/>
      <nav className="bg-white border-b border-gray-200">
      <div className="max-w-full mx-auto s flex justify-between items-stretch h-16 border-collapse border-gray-200">
        
              {['RFP Issuing Agencies', 'RFP Categories', 'RFP Locations', 'Offshore RFPs', 'Monthly/Annually RFP Subscription', 'Expired (Sample) RFPs (Free)', 'API & Email Preferences', 'RSS / Atom Feeds', 'RFP FAQs'].map((item, index) => (
                <div key={index} className="flex flex-row items-center justify-center px-2 border border-gray-200 w-full">
                <a
                  key={item}
                  href="#"
                  className="text-sm font-medium text-[#3385bb] hover:text-[#2a6c99]"
                >
                  {item}
                </a>
                
                </div>
              ))}
        
      </div>
    </nav>  
      <SearchForm searchTenders={searchTenders} locations={locations} categorys={categories}/>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              <button onClick={()=> navigateToSubscription()} className="w-full bg-[#3385bb] text-white p-4 text-sm rounded">
                Announce or Publish your RFP on RFPMart
              </button>
              <button className="w-full bg-[#3385bb] text-white p-4 text-sm rounded">Member Login</button>
              <button className="w-full bg-[#3385bb] text-white p-4 text-sm rounded">Member Login (Captcha)</button>
              <button onClick={()=> navigateToSignUp()} className="w-full bg-[#3385bb] text-white p-4 text-sm rounded">Register</button>
              <div className="border p-4 rounded">
                <h3 className="font-bold text-[#3498db] mb-2">REGISTER AS</h3>
                <p className="font-bold">AGENCY ( BUYER ) &</p>
                <p className="text-[#3498db] font-bold text-xl">PUBLISH</p>
                <p>YOUR RFP WITH US</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-8 border border-gray-100">
                {/* Header */}
          <div className="grid grid-cols-11 bg-[#3385bb] text-white">
            <div className="col-span-2 p-3">Location</div>
            <div className="col-span-3 p-3 border-r border-white">Category</div>
            <div className="col-span-6 p-3">Mobile Application Development</div>
          </div>

           {/* Content Grid */}
                <div className="grid grid-cols-11">
                  {/* Location Column */}
                  <div className="col-span-2 border-r border-gray-100">
                  {locations.map((location, index) => (
                    <div
                    key={location.name}
                    className={`px-3 py-5 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${index !== locations.length - 1 ? "border-b border-gray-100" : ""}`}
                    >
                    <span>{location.name}</span>
                    {location.hasDropdown && <ChevronDown className="w-4 h-4 text-[#3498db]" />}
                    </div>
                  ))}
                  </div>

                {/* Category Column */}
                  <div className="col-span-3 border-r border-gray-100">
                    <div className="p-2">
                      <input type="text" placeholder="Search By Category" className="w-full p-2 border rounded border-gray-300" />
                    </div>
                    {categories.map((category) => (
                      <div onClick={() => fetchTendersByCategory(category.id)} key={category.id} className={`p-3 hover:bg-gray-100 cursor-pointer text-sm font-medium ${category === selectedCategory ? "bg-gray-200 " : "text-[#3385bb]"}`}>
                        {category.name}
                      </div>
                    ))}
                  </div>

                  {/* Tenders Column */}
                  <div className="col-span-6">
                {/* Filters */}
                  <div className="p-2 flex items-center gap-8 border-b bg-gray-200">
                    <input type="text" placeholder="Posted Date" className="border border-gray-400 rounded p-2 text-sm flex-1" />
                    <input type="text" placeholder="Latest First" className="border border-gray-400 rounded p-2 text-sm flex-1" />
                    <button className="bg-[#3385bb] text-white px-4 py-2 rounded text-sm flex-1">Sort RFPs</button>
                  </div>

                  {/* Tenders List */}
                  <div className="space-y-4 p-2">
                    {tenders.map((tender) => (
                    <div key={tender.id} className="border-b pb-4">
                      <h3 className="text-black font-medium mb-2 text-sm">{tender.title}</h3>
                      <div className="grid grid-cols-1 gap-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">Posted Date:</span>
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">{formatDate(tender.datePosted)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#3385bb]">Expiry Date:</span>
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
              <h3 className="font-bold mb-2">HAVING A QUERY ABOUT OUR SERVICE?</h3>
              <p className="text-[#3498db] text-sm">
                YOU CAN CLICK HERE AND SEND US AN E-MAIL. WE WILL GET BACK TO YOU WITHIN 24 HOURS VIA E-MAIL
              </p>
            </div>

            <div className="border rounded p-4 text-center">
              <h3 className="font-bold mb-2">SUBSCRIBE NOW!</h3>
              <button className="bg-orange-500 text-white w-full py-2 rounded">SUBSCRIBE FOR E-MAIL</button>
            </div>

            <div className="border rounded p-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-24%2009-07-04-wswkSHBHf5PBfQaESYZzeizqncIimT.png"
                alt="Payment Methods"
                className="w-full h-auto"
              />
            </div>

            <div className="border rounded p-4">
              <h3 className="text-[#3498db] font-bold mb-2">CUSTOMER SERVICE</h3>
              <p className="font-bold">FEEDBACK</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

