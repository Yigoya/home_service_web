import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
  en: {
    translation: {
      "choose_your_best": "Choose Your Best",
      "every_service": "Every Service That",
      "you_will_need": "You Will Need",
      "search_services": "Search Services",
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
      }
    }
  },
  am: {
    translation: {
      "choose_your_best": "ባለሙያ ይምረጡ",
      "every_service": "የሚያስፈልጎትን አገልግሎት",
      "you_will_need": "ከ እኛ ዘንድ ያግኙ",
      "search_services": "አገልግሎት ይምረጡ",
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
    }
  }
};


i18n.use(initReactI18next).init({
  resources,
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
