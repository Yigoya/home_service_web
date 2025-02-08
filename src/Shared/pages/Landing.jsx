import { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import axios from "axios"
import { FiSearch } from "react-icons/fi"
import tr from '../../assets/tr.png'

import ServiceDescription from "../Components/ServiceDescription"
import ServiceTypes from "../Components/ServiceTypes"
import ServiceSelector from "../Components/ServiceSelector"
import Testimonials from "../UIComponents/Testimonials"
import WhyWe from "../Components/WhyWe"
import { API_URL } from "../api"
import LoadingPage from "../Components/LoadingPage"
import { useSelectedService } from "../Context/SelectedServiceContext" // Import the context hook
import { LanguageContext } from "../Context/LanguageContext"

const Landing = () => {
  const { t,i18n} = useTranslation();
  const isAmharic = i18n.language === "am";
  const [loading , setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setSelectedService: setSelectedServiceContext } = useSelectedService(); // Use the context
  const {language} = useContext(LanguageContext);

  // Fetch services from the backend
  const fetchServices = async () => {
    console.log(language, "language");
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/services?lang=${language}`);
      if (response.data) {
        setServices(response.data);
        setLoading(false);
        console.log(response.data);
        setSelectedService(response.data[0]);
        //  setSelectedServiceContext(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  // Extracting service names and IDs from each service object to display in the dropdown
const servicesArray = services.flatMap(service => {
  return service.services.map(subService => ({
    id: subService.serviceId,
    name: subService.name,
    icon: subService.icon,
  }));
}); // Flattening the nested arrays into a single array
console.log(servicesArray, "servicesArray");

  useEffect(() => {
    fetchServices();
  }, [language]);

  // Handle search submission

  const sendSearchToBackend = async (query) => {
    if (!query) return;
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) throw new Error("Search query failed");
    } catch (error) {
      console.error("Error sending search query:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  
    // Only filter services if searchText is not empty
    if (e.target.value) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };
  const filteredServices = servicesArray.filter(service => {
    const serviceName = service.name || ""; // Use an empty string if name is undefined
    return serviceName.toLowerCase().includes(searchText.toLowerCase());
  });
  
  

  // Select service handler
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedServiceContext(service); // Update the context
  };
  const handleService = (service) => {
    setSelectedService(service);
  }

  console.log(services, "services"); ;
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="font-sans ">
      {/* Hero Section */}
      <section className="w-full bg-white text-black">
        <div className="flex ">
    {/* <img className="lg:mt-24 lg:block hidden" src={bl || "/placeholder.svg"} alt="" /> */}

      <div className="flex flex-col w-full items-center lg:mt-8 justify-center text-center lg:pt-24 px-4 mb-4 pt-36">
          <h1 className="max-md:text-3xl text-gray-600  lg:text-[30px] lg:mt-3 xl:text-5xl 2xl:text-6xl font-extrabold leading-tight mb-8 text-center">
            <span>{t('every_service')}</span> 
            {/* <span className="">{t('every_service1')}</span> */}
          
          </h1>
          <div className="w-full max-w-3xl mx-auto px-4">
  <div className="relative">
    <div className="flex items-center bg-gray-200 rounded-full shadow-md">
      <input
        type="text"
        placeholder={t("search_services")}
        value={searchText}
        onChange={handleSearchChange}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => {
          if (!document.activeElement.closest(".dropdown-container")) {
            setIsDropdownOpen(false);
          }
        }}
        className={`flex-grow outline-none font-normal placeholder-black bg-transparent ${
          isAmharic ? "text-lg" : "text-base"
        } md:py-3 px-5`}
      />
      <div
        className="bg-emerald-700 hover:bg-emerald-800 rounded-r-full md:p-5 max-md:py-3 md:px-8 max-md:px-4 cursor-pointer flex items-center justify-center"
        onClick={() => sendSearchToBackend(searchText)}
      >
        <FiSearch size={20} className="cursor-pointer text-white" />
      </div>
    </div>

    {/* Dropdown Suggestions */}
    {isDropdownOpen && (
      <div className="dropdown-container absolute top-full left-0 w-full bg-white border text-black py-4 border-gray-200 rounded-md shadow-lg mt-2 z-20 max-h-60 overflow-y-auto">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <Link
  key={service.id}
  to={`/technician-list/${service.id}`}
  onClick={(e) => {
    console.log("Service selected:", service.id); // Debugging
    setTimeout(() => {
      setIsDropdownOpen(false); // Delay closing dropdown
    }, 100); 
  }}
  className="block px-4 py-2 hover:bg-gray-100 text-sm font-bold flex"
>
  <img
    src={`${API_URL || "/placeholder.svg"}/uploads/${service.icon}`}
    className="w-8 h-8 mx-4 object-cover"
    alt={service.name}
  />
  {service.name}
</Link>

          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
        )}
      </div>
    )}
  </div>
  </div>
  </div>
    <div className="hidden lg:block lg:mt-28 lg:w-72 absolute right-0">
          <img src={tr || "/placeholder.svg"} alt="Top-right decoration "  />
        </div>
    </div>
            <div className="flex mt-2 justify-center ">
             <p className="mt-1">{t('become_tech')}?</p> 
            <Link to="/technician-registration" onClick={() => setIsOpen(false)} className={`text-emerald-700 px-3 hover:text-emerald-700 hover:underline ${isAmharic ? "text-lg" : "text-base"}`}>
              {t('applay_now')}
          </Link>
            </div>
        {/* Service Section */}
        <div className="w-full  2xl:max-w-[1450px] max-w-7xl  mx-auto   2xl:px-12 xl:px-10">
      <div className="w-full">
        {selectedService && (
          <>
            <ServiceSelector
              services={services}
              selectedService={selectedService}
              onSelect={handleService}
            />
            <div className="mt-3">
                 <ServiceTypes
                    types={[selectedService.services]}
                    onSelect={handleServiceSelect} // Pass the onSelect prop
                  />
            </div>
            <div>
              <ServiceDescription
                title={selectedService.categoryName}
                description={selectedService.description}
              />
            </div>
          </>
        )}
      </div>
    </div>
      </section>

      {/* Why We Section */}
      <section className="py-12 bg-white">
        <div className="container lg:mx-auto  lg:px-32">
          <WhyWe />
        </div>
      </section>

      {/* Technicians Section */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-32">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {t("our_top_technicians")}
          </h2>
          <TechnicianCarousel />
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="pb-12 bg-white">
        <div className="container mx-auto px-6 lg:px-32">
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('testmony')}
            </h2>
            {/* <p className="text-gray-600 mx-auto">
              {t('testimonialSubtitle')}
            </p> */}
          <Testimonials />
        </div>
      </section>

      {/* FAQ Section */}
      {/* <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-32">
          <FAQ />
        </div>
      </section> */}

      {/* Contact Section */}
      {/* <section className="py-12">
        <div className="container mx-auto  lg:px-32">
          <Contact />
        </div>
      </section> */}
    </div>
  );
};

export default Landing;

