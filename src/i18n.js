import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
  en: {
    translation: {
      "login":"Login",
      "become_tech":"Become a Technician",
      "choose_your_best": "Choose Your Best",
      "our_service":"Our Services",
      "our_top_technicians":"Our Top Technicians",
      "testmony":"What the Customer Says",
      "contact":"Contact Us",
      "serv":"Services",
      "technicians":"Technicians",
      "tech_regi":"Technician Registration",
      "upload":"Upload File",
      "name":"Name",
      "email":"Email",
      "phone":"Phone Number",
      "password":"Password",
      "confirm_password":"Confirm Password",
      "bio":"Bio",
      "id_card":"Id Card",
      "profile":"Profile Image",
      "cv":"Your CV an Documents",
      "subcity":"Sub City",
      "woreda":"Woreda",
      "regis":"Register",
      "message":"Message",
      "submit": "Submit",
      "enter_name":"Enter Your Name",
      "enter_email": "Enter Your Email",
      "enter_phone": "Enter Your Phone Number",
      "enter_password": "Enter Your Password",
      "enter_bio": "Tell us about Yourself",
      "select_subcity":"Select Sub City",
      "select_woreda":"Select Woreda",
      "sent" : "Your Message Sent successfully ",
      "filter_by": "Filter By",
      "rating": "Rating",
      "price": "Price",
      "etb": "ETB",
      "address":"Address",
      "info":"INFORMATION",
      "location": "Select your location",
      "locations": {
        "select": "Select your location",
        "bole": "Bole",
        "akaki_kality": "Akaki Kality",
        "gullele": "Gullele",
        "kirkos": "Kirkos",
        "lideta": "Lideta"
      },
      "every_service": "Every Service That",
      "you_will_need": "You Will Need",
      "search_services": "Search Services",
      "our-servises": "Our Services",
      "services": {
        "HomeAppliancesRepair": {
          "title": "Home Appliances Repair",
          "description": "An appliance repair technician's job includes: Disassembling the appliance, cleaning internal parts, replacing faulty or worn parts, reassembling, and testing.",
          "types": {
            "AirCoolerRepair": "Air Cooler Repair",
            "ACRepair": "AC Repair & Service",
            "WashingMachineRepair": "Washing Machine Repair",
            "FridgeRepair": "Fridge Repair",
            "WaterPurifierRepair": "Water Purifier Repair & Service",
            "GasStoveRepair": "Gas Stove Repair & Service",
            "TelevisionRepair": "Television Repair"
          }
        },
        "CleaningServices": {
          "title": "Cleaning Services",
          "description": "Professional cleaning services tailored to different needs: deep cleaning, office cleaning, and specialized carpet cleaning.",
          "types": {
            "FullHomeCleaning": "Full Home Cleaning",
            "PartTimeCleaners": "Part-time Cleaners",
            "OfficeCleaning": "Office Cleaning",
            "SofaCarpetCleaning": "Sofa & Carpet Cleaning",
            "WaterTankCleaning": "Water Tank Cleaning"
          }
        },
        "HomeMaintenance": {
          "title": "Home Maintenance",
          "description": "Home maintenance services including electrical repair, plumbing, and carpentry for household repairs and improvements.",
          "types": {
            "ElectricalRepair": "Electrical Repair",
            "Plumbing": "Plumbing",
            "Carpentry": "Carpentry",
            "FanInstallation": "Fan Installation",
            "WallPanelsInstallation": "Wall Panels Installation",
            "Mounting": "Mounting",
            "Painting": "Painting"
          }
        },
        "PersonalServices": {
          "title": "Personal Services",
          "description": "Personalized services to improve well-being, including fitness, mental health, and lifestyle coaching.",
          "types": {
            "HomeCare": "Home Care",
            "HomeServant": "Home Servant",
            "SecurityGuardService": "Security Guard Service",
            "HotelServantService": "Hotel Servant Service"
          }
        },
        "RealEstateServices": {
          "title": "Real Estate Services",
          "description": "Services to assist with property management, real estate consulting, and rentals.",
          "types": {
            "HomeOnRent": "Home On Rent",
            "HouseSell": "House Sell",
            "BrokerService": "Broker Service",
            "PropertyManagement": "Property Management"
          }
        },
        "Miscellaneous": {
          "title": "Miscellaneous",
          "description": "Other additional services that we give",
          "types": {
            "AmbulanceService": "Ambulance Service",
            "TalkToExpert": "Talk To Expert",
            "PestControl": "Cockroach, Ant & Pest Control"
          }
        }
      },
      "service": [
        {
          "id": "1",
          "name": "Home Appliances Repair",
          "icon": "FaTools",
          "items": [
            {
              "name": "Air Cooler Repair",
              "description": "Repair and maintenance for all types of air coolers."
            },
            {
              "name": "AC Repair & Service",
              "description": "Comprehensive AC repair and servicing by experts."
            },
            {
              "name": "Washing Machine Repair",
              "description": "Fix and maintain washing machines of all brands."
            },
            {
              "name": "Refrigerator Repair",
              "description": "Ensure your refrigerator is running efficiently."
            },
            {
              "name": "Water Purifier Repair & Service",
              "description": "Professional water purifier repair and maintenance."
            },
            {
              "name": "Gas Stove Repair & Service",
              "description": "Reliable gas stove repair and servicing solutions."
            },
            {
              "name": "Television Repair",
              "description": "Expert TV repair for LED, LCD, and more."
            }
          ]
        },
        {
          "id": "2",
          "name": "Home Maintenance",
          "icon": "FaHome",
          "items": [
            {
              "name": "Electrician",
              "description": "Professional electrical services for homes and offices."
            },
            {
              "name": "Fan Installation",
              "description": "Fast and efficient fan installation services."
            },
            {
              "name": "Plumber",
              "description": "Reliable plumbing solutions for all types of issues."
            },
            {
              "name": "Furniture Assembly",
              "description": "Quick and precise furniture assembly services."
            },
            {
              "name": "Wall Panels Installation",
              "description": "High-quality wall panel installation for homes."
            },
            {
              "name": "Mounting",
              "description": "Mount TVs, shelves, and more securely and safely."
            },
            {
              "name": "Painting",
              "description": "Professional painting services for vibrant interiors."
            }
          ]
        },
        {
          "id": "3",
          "name": "Cleaning Services",
          "icon": "FaBroom",
          "items": [
            {
              "name": "Full Home Cleaning",
              "description": "Comprehensive cleaning solutions for your entire home."
            },
            {
              "name": "Part-time Cleaners",
              "description": "Hire part-time cleaners for flexible cleaning needs."
            },
            {
              "name": "Sofa & Carpet Cleaning",
              "description": "Deep cleaning for your sofas and carpets."
            },
            {
              "name": "Water Tank Cleaning",
              "description": "Thorough cleaning for water storage tanks."
            }
          ]
        },
        {
          "id": "4",
          "name": "Real Estate Services",
          "icon": "FaBuilding",
          "items": [
            {
              "name": "Home On Rent",
              "description": "Find rental properties suited to your needs."
            },
            {
              "name": "House Sell Service",
              "description": "Sell your house with professional assistance."
            },
            {
              "name": "Broker Service",
              "description": "Get expert help with buying or selling properties."
            }
          ]
        },
        {
          "id": "5",
          "name": "Personal Services",
          "icon": "FaUserFriends",
          "items": [
            {
              "name": "Home Care",
              "description": "Assistance with home care needs for your family."
            },
            {
              "name": "Home Servant",
              "description": "Hire reliable and experienced home servants."
            },
            {
              "name": "Security Guard Service",
              "description": "Professional security guard services for your safety."
            },
            {
              "name": "Hotel Servant Service",
              "description": "Well-trained hotel servant services for your needs."
            }
          ]
        },
        {
          "id": "6",
          "name": "Miscellaneous",
          "icon": "FaWrench",
          "items": [
            {
              "name": "Ambulance Service",
              "description": "Emergency ambulance services available 24/7."
            },
            {
              "name": "Talk To Expert",
              "description": "Consult with experts for your specific needs."
            },
            {
              "name": "Cockroach, Ant & Pest Control",
              "description": "Effective pest control solutions for your home."
            }
          ]
        }
      ]
    }
  },
  am: {
    translation: {
      "login":"ይመዝገቡ",
      "become_tech":"ለባለሞያነት ይመዝገቡ",
      "choose_your_best": "ባለሙያ ይምረጡ",
      "our_service":"የምንሰጣቸው አገልግሎቶች",
      "our_top_technicians":"ተመራጭ ባለሙያዎቻችን",
      "testmony":"ከደንበኞቻችን አፍ",
      "contact":"አስተያየቶን ያስቀምጡልን",
      "serv":"የምንሰጣቸው አገልግሎቶች",
      "technicians":"ባለሞያዎቻችን",
      "tech_regi":"የቴክኒሻን ምዝገባ",
      "upload":"ይምረጡ",
      "name":"ስም",
      "email":"ኢሜይል",
      "phone":"ስልክ",
      "password":"የምስጢር ቁጥር",
      "confirm_password":"የምስጢር ቁጥር ያረጋግጡ",
      "bio":"ስለ እርሶ",
      "id_card":"የመታወቂያ ፎቶ",
      "profile":"ፎቶ",
      "cv":"የትምህርት ማስረጃ",
      "subcity":"ክፍለ ከተማ",
      "woreda":"ወረዳ",
      "regis":"መዝግብ",
      "message":"መልዕክቶን ያስገቡ",
      "submit": "ላክ",
      "sent" : "መልዕክቶ በትክክል ተልኳል",
      "enter_name":"ስምዎትን ያስገቡ",
      "enter_email": "ኢሜይሎትን ያስገቡ",
      "enter_phone": "ስልክ ቁጥሮን ያስገቡ",
      "enter_password": "ምስጢር ቁጥር ያስገቡ",
      "enter_bio": "ስለ ራስዎ በጥቂቱ ይንገሩን",
      "select_subcity":"ክፍለ ከተማ ይምረጡ",
      "select_woreda":"ወርዳ ይምረጡ",
      "filter_by": "ያጣሩ",
      "rating": "ደረጃ",
      "price": "ዋጋ",
      "etb": "ብር",
      "address":"አድራሻ",
      "info":"ተጨማሪ",
      "location": "የእናንተን ቦታ ይምረጡ",

      "locations": {
        "select": "የእናንተን ቦታ ይምረጡ",
        "bole": "ቦሌ",
        "akaki_kality": "አቃቂ ቃሊቲ",
        "gullele": "ጉለሌ",
        "kirkos": "ቂርቆስ",
        "lideta": "ልደታ"
      },
      "every_service": "የሚያስፈልጎትን አገልግሎት",
      "you_will_need": "ከ እኛ ዘንድ ያግኙ",
      "search_services": "አገልግሎት ይምረጡ",
      "our-servises": "የምንሰጣቸው አገልግሎቶች",
      "services": {
        "HomeAppliancesRepair": {
          "title": "የቤት መሳሪያዎች እድሳት",
          "description": "የመሳሪያ እድሳት ባለሙያ ሥራ የሚያካትተው: መሳሪያውን መክፈት, ውስጣዊ ክፍሎችን ማጽዳት, የተበላሸ ወይም የጠፋ ክፍሎችን መተካት",
          "types": {
            "AirCoolerRepair": "የኤር ልር እድሳት",
            "ACRepair": "የኤር ኮንዲሽነር እድሳትና አገልግሎት",
            "WashingMachineRepair": "የማጠቢያ ማሽን እድሳት",
            "FridgeRepair": "የፍሪጅ እድሳት",
            "WaterPurifierRepair": "የውሃ ማጣሪያ እድሳትና አገልግሎት",
            "GasStoveRepair": "የጋዝ ምድጃ እድሳትና አገልግሎት",
            "TelevisionRepair": "የቴሌቪዥን እድሳት"
          }
        },
      
      "CleaningServices": {
        "title": "የጽዳት አገልግሎት",
        "description": "ለተለያዩ ፍላጎቶች የተዘጋጁ ሙያዊ የጽዳት አገልግሎቶች፡ ሙሉ የቤት ጽዳት፣ የቢሮ ጽዳት፣ እና ሶፋ እና ልዩ ምንጣፍ ጽዳት።.",   
        "types": {    
              "FullHomeCleaning": " ሙሉ የቤት ጽዳት",
              "PartTimeCleaners": "የአንድ ጊዜ ጽዳት",
              "OfficeCleaning": "የቢሮ ጽዳት",
              "SofaCarpetCleaning": "የሶፋ እና የምንጣፍ ጽዳት",
              "WaterTankCleaning": "የውሃ ማጠራቀሚያ ጽዳት"
            }
      },

      "HomeMaintenance": {
        "title": "የቤት ውስጥ ጥገና",
        "description": "የቤት ውስጥ ጥገና አገልግሎቶች የኤሌክትሪክ ጥገና፣ የቧንቧ እና የእንጨት ሥራ ጥገና እና ማሻሻያዎች ያካትታል።",  
        "types": {
          "ElectricalRepair": "የኤሌክትሪክ ጥገና",
          "Plumbing": "የቧንቧ ጥገና",
          "Carpentry": "የእንጨት ሥራ",
          "FanInstallation": "የደጋፊ ፓነል ጥገና",
          "WallPanelsInstallation":  "የግድግዳ ፓነሎች መትከል",
          "Mounting": "Mounting",
          "Painting": "የቀለም አገልግሎቶች"
        }
      },
      "PersonalServices": {
        "title":"የግል አገልግሎቶች",
        "description": "የአካል ብቃት፣ የአእምሮ ጤና እና የአኗኗር ዘይቤን ማሰልጠንን ጨምሮ ደህንነትን ለማሻሻል የተዘጋጁ አገልግሎቶች።",
        "types": {
          "HomeCare": "የቤት ውስጥ እንክብካቤ",
          "HomeServant": "የቤት ሰራተኛ",
          "SecurityGuardService": "የጥበቃ አገልግሎት",
          "HotelServantService": "የሆቴል ሰራተኛ አገልግሎት"
        }
      },
      
          
      "RealEstateServices": {
        "title":"የሪል እስቴት አገልግሎቶች",
        "description": "ለንብረት አስተዳደር፣ ለሪል እስቴት ማማከር እና ለኪራይ የሚረዱ አገልግሎቶች።",
        "types": {
          "HomeOnRent": "የቤት ኪራይ",
          "HouseSell": "የቤት ሽያጭ",
          "BrokerService": "የደላላ አገልግሎት",
          "PropertyManagement": "የንብረት አስተዳደር"
        }
      },
         
      "Miscellaneous": {
        "title":"የተለያዩ",
        "description": "የምንሰጣቸው ሌሎች ተጨማሪ አገልግሎቶች",
        "types": {
          "AmbulanceService": "የአምቡላንስ አገልግሎት",
          "TalkToExpert": "ከባለሙያ ጋር ይነጋገሩ",
          "PestControl": "በረሮ፣ ጉንዳን እና ተባይ ማጥፊያ"
        }
      
      }
    },
    "services": [
      {
        "id": "1",
        "name": "የቤት አብራሽ ዕቃዎች እድሳት",
        "icon": "FaTools",
        "items": [
          {
            "name": "የአየር ማቀዝበር እድሳት",
            "description": "ለሁሉም አይነት አየር አቀዝቃዞች እድሳትና ጥገና።"
          },
          {
            "name": "የኤሲ እድሳትና አገልግሎት",
            "description": "የበለጠ ባለሙያ ኤሲ እድሳትና አገልግሎት።"
          },
          {
            "name": "የማጠቢያ ማሽን እድሳት",
            "description": "ለሁሉም አይነት የማጠቢያ ማሽን ጥገና እና እድሳት።"
          },
          {
            "name": "የማቀዝቃዣ እድሳት",
            "description": "እርስዎን ማቀዝቃዣዎች በማስተሻለት እንዲስሩ ያስተዳድሩ።"
          },
          {
            "name": "የውሃ አንፃር እና አገልግሎት",
            "description": "ሙያዊ የውሃ አንፃር እድሳት እና ጥገና።"
          },
          {
            "name": "የጋዝ ምድጃ እና አገልግሎት",
            "description": "ዘላቂና የማስመረቻ የጋዝ ምድጃ እና አገልግሎት።"
          },
          {
            "name": "የቴሌቪዥን እድሳት",
            "description": "ለኤልኤዲ፣ ኤልሲዲ እና ሌሎች ባለሙያ የቴሌቪዥን እድሳት።"
          }
        ]
      },
      {
        "id": "2",
        "name": "የቤት ጥገና",
        "icon": "FaHome",
        "items": [
          {
            "name": "ኤሌክትሪክከን",
            "description": "ለቤቶችና ቢሮዎች ሙያዊ ኤሌክትሪክከን አገልግሎቶች።"
          },
          {
            "name": "የእበት መጫኛ",
            "description": "ፈጣንና በትክክል የእበት መጫኛ አገልግሎት።"
          },
          {
            "name": "ፕላምበር",
            "description": "ለሁሉም አይነት ችግሮች የታመነ የፕላምበር ቅንብሮች።"
          },
          {
            "name": "የተሸከርኩር ማስቀመጥ",
            "description": "ፈጣንና ትክክለኛ የተሸከርኩር ማስቀመጥ አገልግሎት።"
          },
          {
            "name": "የግድግዳ ፓነል አስተካክል",
            "description": "ለቤቶች ከፍተኛ ጥራት ያለው የግድግዳ ፓነል አስተካክል።"
          },
          {
            "name": "ተርኪን እና ጣቢያ",
            "description": "የቲቪዎችን፣ መደላለፊያዎችን እና ሌሎችን በደህና በጥንቃቄ ማስቀመጥ።"
          },
          {
            "name": "ቀለም ማስተካክል",
            "description": "ለእርቃን ውስጥ የታምነና ደስ ያሰኘ ቀለም ማስተካክል።"
          }
        ]
      },
      {
        "id": "3",
        "name": "የጽዳት አገልግሎቶች",
        "icon": "FaBroom",
        "items": [
          {
            "name": "ሙሉ የቤት ጽዳት",
            "description": "ለእርስዎ ሁሉንም ቤት አልኮል የሚሆን ጽዳት።"
          },
          {
            "name": "ክፍል የጊዜ አሳሳቢዎች",
            "description": "የጊዜውን ዘላቂ ማሳሳቢያዎች ለስርዓተ አስተካክል።"
          },
          {
            "name": "ሶፋና የመኝታ ልብስ ጽዳት",
            "description": "ሶፋዎችንና መኝታ ልብስን በጥሩ ጽዳት አስተካክል።"
          },
          {
            "name": "የውሃ ታንክ ጽዳት",
            "description": "የውሃ ታንኮችን በአንፃር ጽዳት።"
          }
        ]
      }
    ]
  }
  }
  }



i18n.use(initReactI18next).init({
  resources,
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
