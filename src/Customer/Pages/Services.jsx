import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWrench, FaBroom, FaHome, FaUserTie, FaBuilding, FaPuzzlePiece } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

const serviceData = [
    {
      name: 'Cleaning Services',
      icon: <FaBroom />,
      subcategories: [
        { name: 'Full Home cleaning', imageWidth: "600px", imageHeight: "300px",description : "Complete home cleaning including dusting, mopping, and sanitizing", imageWidth: "600px", imageHeight: "300px",image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
        { name: 'Part-time Cleaners',imageWidth: "600px", imageHeight: "300px",description : "Hire part-time cleaners to keep your home neat and clean.",image:"https://i0.wp.com/www.nexdo.co.nz/wp-content/uploads/2022/05/deep-cleaning-1.jpg?fit=800%2C534&ssl=1" },
        { name: 'Sofa & Carpet Cleaning',imageWidth: "600px", imageHeight: "300px",description : "Professional cleaning for sofas and carpets to remove dirt and stains.",image:"https://i0.wp.com/www.nexdo.co.nz/wp-content/uploads/2022/05/deep-cleaning-1.jpg?fit=800%2C534&ssl=1" },
        { name: 'Water Tank Cleaning',imageWidth: "600px", imageHeight: "300px",description : "Ensure your water tank is clean with our specialized cleaning service.",image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" }
      ],
      defaultDescription : "Professional cleaning services including full home cleaning, sofa and carpet cleaning, and more.",
     image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg"
    },
    {
      name: 'Home Appliances Repair',
      icon: <FaWrench />,
      subcategories: [
        { name: 'Air Cooler Repair',imageWidth: "600px", imageHeight: "300px",description : "Repair services for air coolers to keep them running efficiently.",image:"https://i0.wp.com/www.nexdo.co.nz/wp-content/uploads/2022/05/deep-cleaning-1.jpg?fit=800%2C534&ssl=1" },
        { name: 'AC Repair & Service',imageWidth: "600px", imageHeight: "300px",description : "Full AC repair and maintenance services to keep your unit cooling effectively.",image:"https://i0.wp.com/www.nexdo.co.nz/wp-content/uploads/2022/05/deep-cleaning-1.jpg?fit=800%2C534&ssl=1" },
        { name: 'Washing Machine Repair',imageWidth: "600px", imageHeight: "300px",description : "Troubleshoot and repair services for washing machines of all brands.",image:"https://i0.wp.com/www.nexdo.co.nz/wp-content/uploads/2022/05/deep-cleaning-1.jpg?fit=800%2C534&ssl=1" },
        { name: 'Fridge Repair',imageWidth: "600px", imageHeight: "300px",description : "Refrigerator repair and servicing to keep your food fresh and cold.",image:"https://i0.wp.com/www.nexdo.co.nz/wp-content/uploads/2022/05/deep-cleaning-1.jpg?fit=800%2C534&ssl=1" },
        { name: 'Water Purifier Repair & Service',imageWidth: "600px", imageHeight: "300px",description : "Ensure clean drinking water with our water purifier repair service.",image:"https://i0.wp.com/www.nexdo.co.nz/wp-content/uploads/2022/05/deep-cleaning-1.jpg?fit=800%2C534&ssl=1" },
        { name: 'Gas Stove Repair & Service',imageWidth: "600px", imageHeight: "300px",description : "Safe and efficient gas stove repair and servicing.,",image:"https://i0.wp.com/www.nexdo.co.nz/wp-content/uploads/2022/05/deep-cleaning-1.jpg?fit=800%2C534&ssl=1" },
        { name: 'Television Repair',imageWidth: "600px", imageHeight: "300px",description : "Repair services for all kinds of televisions, including LED and LCD.", image:"https://i0.wp.com/www.nexdo.co.nz/wp-content/uploads/2022/05/deep-cleaning-1.jpg?fit=800%2C534&ssl=1" }
      ],
      defaultDescription : "An appliance repair technician's job includes: Disassembling the appliance, cleaning internal parts, replacing faulty or worn parts, reassembling, and testing.",
      image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg"
    },
    {
        name: 'Home Maintenance',
        icon: <FaHome />,
        subcategories: [
          { name: 'Electrician',imageWidth: "600px", imageHeight: "300px",description : "Professional electrical services for wiring, fixture installation, and troubleshooting electrical issues.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'Fan Installation',imageWidth: "600px", imageHeight: "300px",description : "Installation of ceiling, wall, and exhaust fans to improve air circulation and comfort.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'Plumber',imageWidth: "600px", imageHeight: "300px",description : "Plumbing services, including leak repairs, pipe fittings, and installation of sinks and faucets.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'Furniture Assembly',imageWidth: "600px", imageHeight: "300px",description : "Assembly of furniture items such as desks, chairs, beds, and shelves for a secure setup.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'Wall Panels Installation',imageWidth: "600px", imageHeight: "300px",description : "Installation of decorative and acoustic wall panels to enhance room aesthetics and sound quality.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'Mounting',imageWidth: "600px", imageHeight: "300px",description : "Secure mounting of TVs, shelves, and other items to maximize space and organization.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'Painting',imageWidth: "600px", imageHeight: "300px",description : "Interior and exterior painting services to refresh your home with quality finishes and professional application.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" }
        ],
        defaultDescription : "Comprehensive home maintenance services including electrical work, plumbing, and painting to keep your home in top condition.",
       image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg"
    },
      {
        name: 'Real Estate Services',
        icon: <FaBuilding />,
        subcategories: [
          { name: 'Home On Rent',imageWidth: "600px", imageHeight: "300px",description : "Assistance in finding rental properties that meet your preferences and budget, with verified listings.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'House Sell Service',imageWidth: "600px", imageHeight: "300px",description : "Professional house selling services including market assessment and buyer negotiations.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'Broker Service',imageWidth: "600px", imageHeight: "300px",description : "Reliable broker services to connect you with the best deals, whether you're buying, selling, or renting.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" }
        ],
        defaultDescription : "Real estate services for renting, buying, and selling homes, with professional assistance every step of the way.",
      
        image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg"},
      {
        name: 'Personal Services',
        icon: <FaUserTie />,
        subcategories: [
          { name: 'Home Care',imageWidth: "600px", imageHeight: "300px",description : "Home care services for individuals in need of assistance with daily activities in a comfortable home environment.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'Home Servant',imageWidth: "600px", imageHeight: "300px",description : "Full-time or part-time home servant services for household chores and meal preparation.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'Security Guard Service',imageWidth: "600px", imageHeight: "300px",description : "Professional security guard services to ensure safety and protection for residential or commercial properties.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'Hotel Servant Service',imageWidth: "600px", imageHeight: "300px",description :"Trained hotel servant services for private homes or events, providing hospitality and housekeeping assistance.", image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" }
        ],
        defaultDescription : "Personalized services for home care, housekeeping, and security to provide comfort and support.",
        image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg"  
    },
      {
        name: 'Miscellaneous',
        icon: <FaPuzzlePiece />,
        subcategories: [
          { name: 'Ambulance Service',imageWidth: "600px", imageHeight: "300px",description : "Emergency and non-emergency ambulance services for safe transportation to medical facilities." ,image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg"},
          { name: 'Talk To Expert',imageWidth: "600px", imageHeight: "300px",description : "Consultations with experts in various fields to receive advice, guidance, and solutions for specific needs.",image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" },
          { name: 'Cockroach, Ant & Pest Control',imageWidth: "600px", imageHeight: "300px",description : "Pest control services to eliminate infestations of cockroaches, ants, and other pests.",image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg" }
        ],
        defaultDescription : "Miscellaneous services including emergency assistance, expert consultations, and pest control for a safer and healthier environment.",
        image:"https://www.chambershca.org/Images_Content/Site1/Images/Pages/cleaning-service-team-provides-housekeeping-service.jpg"  
    }
    ];




    const Services = () => {
        const { t } = useTranslation();
        const [selectedService, setSelectedService] = useState(serviceData[0]);
        const [selectedSubcategory, setSelectedSubcategory] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [searchText, setSearchText] = useState('');
    
        const handleCategoryClick = (service) => {
            setSelectedService(service);
            setSelectedSubcategory(null);
        };
    
        const handleSubcategoryClick = (subcategory) => {
            setSelectedSubcategory(subcategory);
        };
    
        const filteredSubcategories = selectedService.subcategories.filter((sub) =>
            sub.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
                
                {/* Search bar */}
                <div className="relative w-full max-w-xs sm:max-w-md mx-auto mb-8">
                    <div className="flex items-center bg-white rounded-full border-2 border-blue-400 px-3 py-1 sm:px-4 sm:py-2 shadow-sm">
                        <input
                            type="text"
                            placeholder={t("search_services")}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none text-sm sm:text-base"
                        />
                        <FiSearch
                            size={24}
                            className="text-gray-600 ml-2 transform hover:scale-110 transition-transform duration-200 cursor-pointer"
                        />
                    </div>
                </div>
    
                {/* Services category part with sliding icons */}
                <div className="overflow-x-auto py-4">
                    <div className="flex space-x-6 justify-start">
                        {serviceData.map((service) => (
                            <button
                                key={service.name}
                                onClick={() => handleCategoryClick(service)}
                                className={`flex flex-col items-center ${selectedService.name === service.name ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
                            >
                                <div className="text-2xl mb-2">{service.icon}</div>
                                <span>{service.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
    
                {/* Subcategory Buttons */}
                <div className="flex flex-wrap  gap-4 mb-8 lg:justify-center mt-6">
                    {filteredSubcategories.map((sub) => (
                        <button
                            key={sub.name}
                            onClick={() => handleSubcategoryClick(sub)}
                            className="border rounded-full px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white transition"
                        >
                            {sub.name}
                        </button>
                    ))}
                </div>
    
                {/* Service Details */}
                <div className="flex flex-col sm:flex-row items-center gap-8 bg-gray-100 p-6 rounded-lg shadow-md">
                    <img
                        src={selectedSubcategory?.image || selectedService.image}
                        alt={selectedSubcategory?.name || selectedService.name}
                        className="w-full sm:w-1/3 h-auto rounded-lg"
                    />
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            {selectedSubcategory ? selectedSubcategory.name : selectedService.name}
                        </h3>
                        <p className="text-gray-700">
                            {selectedSubcategory ? selectedSubcategory.description : selectedService.defaultDescription}
                        </p>
                    </div>
                </div>
            </div>
        );
    };
    
    export default Services;