import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('language') || 'en';

const resources = {
  en: {
    translation: {
      "login":"Login",
      "become_tech":"Are you a Worker",
      "applay_now":"Apply Now",
      "choose_your_best": "Choose an Offer",
      "our_service":"Our Services",
      "our_top_technicians":"Our Top Technicians",
      "testmony":"Testmony",
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
      "cv":"Your CV and Documents",
      "subcity":"Sub City",
      "woreda":"Woreda",
      "regis":"Register",
      "message":"Message",
      "submit": "Submit",
      "enter_name":"Name",
      "enter_email": "Enter Your Email",
      "enter_phone": "Enter Your Phone Number",
      "enter_password": "Password",
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
      "every_service": "All Services in One, On Demand!",
      // "every_service1": "On Demand!",
      "search_services": "What do you need help with?",
      "our-servises": "Our Services",  
      "pending":"Pending",
      "completed":"Completed",
      "confirmed":"Confirmed",
      "reset":"Reset Filter",
      "logout":"Log Out",
      "prof":"Profile",
      "notification":"Notification",
      "tech":"Technician",
      "mark":"Mark as Read",
      "soon":"We will contact you soon!",
      "text":"Thanks for registering our team is reviewing your resume, we will be in touch in a few days!",
      "back":"Back",
      "customer":"Customers",
      "booking":"Bookings",
      "service":"Services",
      "view":"View Profile",
      "book":"Book Now",
      "sign_google":"Sign in with Google",
      "sign_facebook":"Sign in with Facebook",
      "account":"Don't have an account?",
      "signup":"Create Account",
      "job":"Job Description",
      "accept":"Accept",
      "decline":"Decline",
      "start":"Start",
      "complete":"Complete",
      "submit":"Submit",
      "review":"Review",
      "dispute":"Dispute",
      "title":"Title",
      "enter_title":"Enter Dispute Title",
      "welcome1":"Welcome to HuluMuya",
      "welcome2":"Quality Service, on demand",
      "header":"Experienced, hand-picked Proffessionals to serve you at your doorstep",
      "which":"Which Service Do You Need?",
      "cancel":"Cancel",
      "add_review":"Add Rivew",
      "welcome":"Welcome",
      "try":"Try Again",
      "get_start":"Getting Started",
      "reg":"Register",
      "verfy_reg":"Verfy Your Registration",
      "Start_now":"Start Your Job",
      "why":"Why choose Us",
      "one_year":"1 month quality guarantee",
      "time_sche":"Flexible scheduling & punctuality",
      "trust":"Trusted & certified technicians ",
      "faq":"FAQ",
      "lang":"Toggle Language",
      "halted":"Halted",
      "started":"Started",
      "edit":"Edit",
      "job_des":"Job Description",
      "no_booking":"No Booking Yet.",
      "available": "Available",
      "unavailable": "Unavailable",
      "busy": "Busy",
      "verified": "Verified",
      "loading": "Loading...",
      "searching": "Searching...",
      "error_fetching_technicians": "Failed to fetch technicians",
      "search_failed": "Search failed",
      "no_technicians_found": "No technicians found matching your criteria.",
      "clear": "Clear Filters",
      "select_location": "Select location",
      "search_location": "Search location...",
      "recent_locations": "Recent Locations",
      "popular_cities": "Popular Cities",
      "current_location": "Current Location",
      "use_current_location": "Use current location",
      "no_locations_found": "No locations found. Try a different search.",
      "search_placeholder": "Search for services or technicians",
      "trending_now": "Trending Now",
      "popular_searches": "Popular Searches",
      "click_search": "Click search button to search",
      "find_tech": "Find a Technician",
      "connecting": "Connecting you with the best technicians in your area",
      "results_count": "{{count}} technician(s) found",
      "no_results_found": "No results found",
      "subscribe_for_email": "SUBSCRIBE FOR E-MAIL",
      "customer_service": "CUSTOMER SERVICE",
      "feedback": "FEEDBACK", 
      "keyword_searching": "Keyword searching",
      "tender_status": "Tender Status",
      "open": "Open",
      "closed": "Closed",
      "tender_by_region": "Tender by Region",
      "tender_by_category": "Tender by Category",
      "date_posted": "Date Posted",
      "closing_date": "Closing Date",
      "clear_search": "Clear Search",
      "search_now": "Search Now",
      "searching": "Searching...",
      "subscribe_header": "Subscribe now to unlock the world's largest tender database!",
      "monthly_packages": "Monthly Packages",
      "yearly_packages": "Yearly Packages",
      "subscribed": "Subscribed",
      "subscribe": "Subscribe",
      // Plan names
      "explorer_pass": "Explorer Pass",
      "sprint_starter": "Sprint Starter",
      "momentum_builder": "Momentum Builder",
      "growth_voyager": "Growth Voyager",
      "tender_titan": "Tender Titan",
      // Plan features
      "discover_state_tenders": "Discover State Tenders at No Cost (Website Only)",
      "grab_tender_docs": "Grab Tender Documents Free (Website Only)",
      "showcase_business": "Showcase Your Business with a Free Listing",
      "unlimited_tender_opportunities": "Dive into Unlimited Tender Opportunities",
      "stay_ahead_alerts": "Stay Ahead with Alerts on Email, WhatsApp, Telegram",
      "command_bids_dashboard": "Command Your Bids with an Online Dashboard",
      "unlock_archived_tenders": "Unlock the Vault of Archived Tenders",
      "search_freely_keywords": "Search Freely with Unlimited Keywords",
      "personalize_tender_hub": "Personalize Your Tender Hub",
      "master_advanced_search": "Master Advanced Search by Category, Location & More",
      // All features
      "precision_advanced_search": "Precision Advanced Search",
      "command_center_dashboard": "Your Command Center Dashboard",
      "endless_keywords": "Endless Keywords Unleashed**",
      "profile_tweaks_limitless": "Profile Tweaks Without Limits",
      "digital_tender_docs": "Digital Tender Docs at Your Fingertips",
      "daily_tender_alerts": "Daily Tender Alerts Straight to You",
      "contract_wins_alerts": "Contract Wins Alerted Daily",
      "weekly_insights_excel": "Weekly Insights in Excel Glory",
      "monthly_triumph_reports": "Monthly Tender Triumph Reports",
      "tender_receive_via": "Tender Receive Via",
      "email": "Email",
      "whatsapp": "WhatsApp",
      "telegram": "Telegram",
      "whatsapp_number": "WhatsApp Number",
      "telegram_username": "Telegram Username",
      "enter_telegram_username": "Enter your Telegram username",
      "select_category": "Select Category",
      "select_a_category": "Select a category",
      "your_company_name": "Your Company Name",
      "optional": "(Optional)",
      "enter_company_name": "Enter your company name",
      "your_tin_number": "Your TIN Number",
      "enter_tin_number": "Enter your TIN number",
      "complete_subscription": "Complete Subscription",
      "all_location": "All Location",
      "afar": "Afar",
      "amhara": "Amhara",
      "benishangul_gumuz": "Benishangul-Gumuz",
      "central_ethiopia": "Central Ethiopia",
      "gambella": "Gambella",
      "harari": "Harari",
      "oromia": "Oromia",
      "sidama": "Sidama",
      "somali": "Somali",
      "south_ethiopia": "South Ethiopia",
      "south_west_ethiopia": "South West Ethiopia",
      "tigray": "Tigray",
      "addis_ababa": "Addis Ababa",
      "dire_dawa": "Dire Dawa",
      "snnpr": "Southern Nations, Nationalities, and Peoples'",
      "Page Not Found": "Page Not Found",
      "The page you are looking for doesn't exist or has been moved.": "The page you are looking for doesn't exist or has been moved.",
      "Return to Home": "Return to Home",
      "If you believe this is an error, please contact our support team.": "If you believe this is an error, please contact our support team.",
      "Organization, notice and document details": "Organization, notice and document details",
      "back_to_tenders": "Back to Tenders",
      "no_tenders_found": "No tenders found",
      
      // Publish Tender Page Translations
      "publish_tender": "Publish Tender",
      "tender_title": "Tender Title",
      "enter_tender_title": "Enter tender title",
      "tender_description": "Tender Description",
      "enter_tender_description": "Enter tender description",
      "contact_info": "Contact Info",
      "enter_contact_email": "Enter contact email",
      "tender_documents": "Tender Documents",
      "drag_drop_or_click_to_upload": "Drag & drop files or click to upload",
      "pdf_doc_docx_supported": "PDF, DOC, DOCX files up to 10MB",
      "publishing": "Publishing",
      "tender_published_successfully": "Tender published successfully",
      "please_login_to_publish_tender": "Please login to publish a tender",
      "error_publishing_tender": "Error publishing tender. Please try again.",
      "error_fetching_categories": "Error fetching categories. Please refresh the page.",
      "cancel": "Cancel",
      "consulting": "Consulting",
      "enterprise_solutions": "Enterprise Solutions",
      "office_building_alt": "Modern Office Building",
      "excellence_description": "We deliver excellence through our comprehensive range of services",
      "get_app": "Get App",
      "announce_or_publish_tender": "Announce or Publish Tender",
      "member_login": "Member Login",
      "register": "Register",
    }
  },
  am: {
    translation: {
      "login": "ግባ",
      "become_tech": "ባለሙያ ነዎት?",
      "applay_now": "አመልክት",
      "choose_your_best": "ምርጥ የደንበኛ አገልግሎት",
      "our_service": "የእኛ አገልግሎቶች",
      "our_top_technicians": "ምርጥ ባለሙያዎች",
      "testmony": "ማስረጃ",
      "contact": "ያግኙን",
      "serv": "አገልግሎቶች",
      "technicians": "ባለሙያዎች",
      "tech_regi": "የባለሙያ ምዝገባ",
      "upload": "ፋይል ይጫኑ",
      "name": "ስም",
      "email": "ኢሜይል",
      "phone": "ስልክ ቁጥር",
      "password": "የይለፍ ቃል",
      "confirm_password": "የይለፍ ቃል ያረጋግጡ",
      "bio": "መግለጫ",
      "id_card": "መታወቂያ ካርድ",
      "profile": "የመገለጫ ምስል",
      "cv": "ሲቪ እና ሰነዶች",
      "subcity": "ክፍለ ከተማ",
      "woreda": "ወረዳ",
      "regis": "ተመዝገብ",
      "message": "መልእክት",
      "submit": "አስገባ",
      "enter_name": "ስም",
      "enter_email": "ኢሜይል አድራሻ",
      "enter_phone": "ስልክ ቁጥር",
      "enter_password": "የይለፍ ቃል",
      "enter_bio": "ስለራስዎ ይንገሩን",
      "select_subcity": "ክፍለ ከተማ ይምረጡ",
      "select_woreda": "ወረዳ ይምረጡ",
      "sent": "መልእክትዎ በተሳካ ሁኔታ ተልኳል",
      "filter_by": "አጣራ በ",
      "rating": "ደረጃ",
      "price": "ዋጋ",
      "etb": "ብር",
      "address": "አድራሻ",
      "info": "መረጃ",
      "location": "አካባቢ ይምረጡ",
      "locations": {
        "select": "አካባቢ ይምረጡ",
        "bole": "ቦሌ",
        "akaki_kality": "አቃቂ ቃሊቲ",
        "gullele": "ጉለሌ",
        "kirkos": "ቂርቆስ",
        "lideta": "ልደታ"
      },
      "every_service": "ሁሉም አገልግሎቶች በአንድ ቦታ!",
      "search_services": "ምን ያስፈልግዎታል?",
      "our-servises": "አገልግሎቶቻችን",
      "pending": "በመጠበቅ ላይ",
      "completed": "የተጠናቀቀ",
      "confirmed": "የተረጋገጠ",
      "reset": "እንደገና አስጀምር",
      "logout": "ውጣ",
      "prof": "መገለጫ",
      "notification": "ማሳወቂያ",
      "tech": "ባለሙያ",
      "mark": "እንደተነበበ ምልክት አድርግ",
      "soon": "በቅርብ እናነጋግርዎታለን!",
      "text": "ለምዝገባዎ እናመሰግናለን። ቡድናችን ማመልከቻዎን በመገምገም ላይ ነው፣ በቅርብ ቀናት ውስጥ እናነጋግርዎታለን!",
      "back": "ተመለስ",
      "customer": "ደንበኞች",
      "booking": "ቦታ ማስያዣዎች",
      "service": "አገልግሎቶች",
      "view": "መገለጫ ይመልከቱ",
      "book": "አሁን ይዙ",
      "sign_google": "በጉግል ይግቡ",
      "sign_facebook": "በፌስቡክ ይግቡ",
      "account": "መለያ የለዎትም?",
      "signup": "መለያ ይፍጠሩ",
      "job": "የስራ መግለጫ",
      "accept": "ተቀበል",
      "decline": "አትቀበል",
      "start": "ጀምር",
      "complete": "አጠናቀቅ",
      "review": "ግምገማ",
      "dispute": "ክርክር",
      "title": "ርዕስ",
      "enter_title": "የክርክር ርእስ ያስገቡ",
      "welcome1": "እንኳን ደህና መጡ",
      "welcome2": "ጥራት ያለው አገልግሎት፣ በፍላጎት",
      "header": "ልምድ ያላቸው፣ በጥንቃቄ የተመረጡ ባለሙያዎች በቤትዎ ለማገልገል",
      "which": "የትኛውን አገልግሎት ይፈልጋሉ?",
      "cancel": "ሰርዝ",
      "add_review": "ግምገማ አክል",
      "welcome": "እንኳን ደህና መጡ",
      "try": "እንደገና ሞክር",
      "get_start": "ጀምር",
      "reg": "ተመዝገብ",
      "verfy_reg": "ምዝገባዎን ያረጋግጡ",
      "Start_now": "ስራዎትን ይጀምሩ",
      "why": "እኛን ለምን መረጡ",
      "one_year": "የ1 ወር ጥራት ዋስትና",
      "time_sche": "ተለዋዋጭ የጊዜ መርሀግብር እና ትክክለኛነት",
      "trust": "ታማኝ እና የተረጋገጡ ባለሙያዎች",
      "faq": "ተደጋግመው የሚነሱ ጥያቄዎች",
      "lang": "ቋንቋ ይቀይሩ",
      "halted": "የተቋረጠ",
      "started": "የተጀመረ",
      "edit": "አስተካክል",
      "job_des": "የስራ መግለጫ",
      "no_booking": "እስካሁን ምንም ቦታ አልተያዘም።",
      "available": "ዝግጁ",
      "unavailable": "ዝግጁ አይደለም",
      "busy": "ባተሌ",
      "verified": "የተረጋገጠ",
      "loading": "በመጫን ላይ...",
      "searching": "በመፈለግ ላይ...",
      "error_fetching_technicians": "ባለሙያዎችን ማምጣት አልተቻለም",
      "search_failed": "ፍለጋ አልተሳካም",
      "no_technicians_found": "መስፈርትዎን የሚያሟሉ ምንም ባለሙያዎች አልተገኙም።",
      "clear": "ማጣሪያዎችን አጽዳ",
      "select_location": "አካባቢ ይምረጡ",
      "search_location": "አካባቢ ይፈልጉ...",
      "recent_locations": "የቅርብ ጊዜ አካባቢዎች",
      "popular_cities": "ታዋቂ ከተሞች",
      "current_location": "የአሁኑ አካባቢ",
      "use_current_location": "የአሁኑን አካባቢ ይጠቀሙ",
      "no_locations_found": "ምንም አካባቢዎች አልተገኙም። የተለየ ፍለጋ ይሞክሩ።",
      "search_placeholder": "አገልግሎቶችን ወይም ባለሙያዎችን ይፈልጉ",
      "trending_now": "አሁን ተወዳጅ",
      "popular_searches": "ታዋቂ ፍለጋዎች",
      "click_search": "ለመፈለግ የፍለጋ ቁልፉን ጠቅ ያድርጉ",
      "find_tech": "ባለሙያ ይፈልጉ",
      "connecting": "ከአካባቢዎ ከምርጥ ባለሙያዎች ጋር እናገናኝዎታለን",
      "results_count": "{{count}} ባለሙያ(ዎች) ተገኝተዋል",
      "no_results_found": "ምንም ውጤት አልተገኘም",
      "subscribe_for_email": "ለኢሜይል ይመዝገቡ",
      "customer_service": "የደንበኞች አገልግሎት",
      "feedback": "ግብረ መልስ",
      "monday": "ሰኞ",
      "tuesday": "ማክሰኞ",
      "wednesday": "ረቡዕ",
      "thursday": "ሐሙስ",
      "friday": "አርብ",
      "saturday": "ቅዳሜ",
      "sunday": "እሁድ",
      "business": "የንግድ ሰዓታት",
      "noreviw": "ገና ምንም ግምገማዎች የሉም",
      "download": "ውረድ",
      "get_app": "አፕ ይጫኑ",
      "tender": "ጨረታ",
      "quick_link": "ፈጣን አገናኞች",
      "testimonialSubtitle": "የደንበኛ ግምገማዎች",
      "right": "© 2023 BusinessPro. መብቱ በህግ የተጠበቀ ነው።",
      "privacy": "የግላዊነት ፖሊሲ",
      "terms": "የአገልግሎት ውሎች",
      "from_apple": "አፕል ስቶር",
      "from_google": "ጉግል ፕሌይ",
      "addr": "አዲስ አበባ, ኢትዮጵያ",
      "get": "አግኝ ከ",
      "tender_services": "የጨረታ አገልግሎቶች",
      "tender_description": "የሙያዊ ጨረታ ማስተዳደር እና ማቅረቢያ አገልግሎቶች",
      "business_solutions": "የንግድ መፍትሄዎች",
      "business_description": "ሁሉን አቀፍ የንግድ ማማከርና የስልት አገልግሎቶች",
      "maintenance": "ጥገና",
      "maintenance_description": "24/7 የጥገና እና የድጋፍ አገልግሎቶች",
      "professional_services": "ሙያዊ አገልግሎቶች",
      "professional_description": "በሁሉም ኢንዱስትሪዎች ውስጥ የባለሙያ አገልግሎቶች",
      "quality_assured": "ጥራት የተረጋገጠ",
      "quality_description": "አገልግሎቶቻችን ከፍተኛ የኢንዱስትሪ ደረጃዎችን ያሟሉ ናቸው",
      "support_247": "24/7 ድጋፍ",
      "support_description": "ቀን ከሌት የደንበኞች ድጋፍ ከተረጋገጠ ምላሽ ጊዜ ጋር",
      "expert_team": "የባለሙያዎች ቡድን",
      "team_description": "በብዙ አሰር ዓመታት የተዋሀደ ልምድ ያላቸው ከፍተኛ ብቃት ያላቸው ባለሙያዎች",
      "secure_process": "ደህንነቱ የተጠበቀ ሂደት",
      "secure_description": "የንግድዎን ውሂብ የሚጠብቁ የድርጅት ደረጃ የደህንነት ፕሮቶኮሎች",
      "consulting": "የምክር አገልግሎት",
      "enterprise_solutions": "የድርጅት መፍትሄዎች",
      "office_building_alt": "ዘመናዊ የቢሮ ሕንፃ",
      "excellence_description": "በሁሉም አቀፍ የአገልግሎት ክልላችን ላቅ ያለ ጥራት እናቀርባለን",
      "get_app": "አፕ ይጫኑ",
      "publish_tender": "ጨረታ አገልግሎ",
      "tender_title": "ጨረታ ርእስ",
      "enter_tender_title": "ጨረታ ርእስ ያስገቡ",
      "tender_description": "ጨረታ መግለጫ",
      "enter_tender_description": "ጨረታ መግለጫ ያስገቡ",
      "contact_info": "አገልግሎ መረጃ",
      "enter_contact_email": "አገልግሎ ኢሜይል ያስገቡ",
      "tender_documents": "ጨረታ ሰነዶች",
      "pdf_doc_docx_supported": "PDF, DOC, DOCX ፋይሎች ከአንድ ሜጋ በላይ",
      "upload_documents": "ሰነዶችን ይጫኑ",
      "submit_tender": "ጨረታዎን አስገባ",
      "tender_submitted": "ጨረታዎ ተመልከቱ",
      "tender_failed": "ጨረታዎ አልተሳካም",
      "tender_successful": "ጨረታዎ ተሳካል",
      "tender_updated": "ጨረታዎ ተዘምኗል",
      "tender_deleted": "ጨረታዎ ተሰርዟል",
      "tender_not_found": "ጨረታ አልተገኙም",
      "tender_not_updated": "ጨረታዎ አልተዘምነም",
      "tender_not_deleted": "ጨረታዎ አልተሰርዝም",
      "afar": "አፋር",
      "amhara": "አማራ",
      "benishangul_gumuz": "ቤኒሻንጉል-ጉሙዝ",
      "central_ethiopia": "ማእከላዊ ኢትዮጵያ",
      "gambella": "ጋምቤላ",
      "harari": "ሐረሪ",
      "oromia": "ኦሮሚያ",
      "sidama": "ሲዳማ",
      "somali": "ሶማሌ",
      "south_ethiopia": "ደቡብ ኢትዮጵያ",
      "south_west_ethiopia": "ደቡብ ምዕራብ ኢትዮጵያ",
      "tigray": "ትግራይ",
      "addis_ababa": "አዲስ አበባ",
      "dire_dawa": "ድሬ ዳዋ",
      "snnpr": "ደቡብ ሕዝቦች ክልል",
      "category": "ምድብ",
      "announce_or_publish_tender": "ጨረታ አስተዋውቅ/አስተላልፍ",
      "member_login": "አባል ግባ",
      "register": "ይመዝገቡ",
    }
  },
  om: {
    translation: {
      "login": "Seeni",
      "become_tech": "Hojjataa dhaa?",
      "applay_now": "Amma Iyyadhu",
      "choose_your_best": "Filannoo kee filadhu",
      "our_service": "Tajaajila Keenya",
      "our_top_technicians": "Ogeessota Keenya Filatamoo",
      "testmony": "Ragaa",
      "contact": "Nu Quunnamaa",
      "serv": "Tajaajila",
      "technicians": "Ogeessota",
      "tech_regi": "Galmee Ogeessaa",
      "upload": "Faayila OlFe'i",
      "name": "Maqaa",
      "email": "Imeelii",
      "phone": "Lakkoofsa Bilbilaa",
      "password": "Jecha Darbii",
      "confirm_password": "Jecha Darbii Mirkaneessi",
      "bio": "Seenaa Gababaa",
      "id_card": "Kaardii Eenyummaa",
      "profile": "Suuraa Profaayilii",
      "cv": "CV fi Galmee Kee",
      "subcity": "Magaala Keessaa",
      "woreda": "Aanaa",
      "regis": "Galmaa'i",
      "message": "Ergaa",
      "submit": "Galchi",
      "enter_name": "Maqaa",
      "enter_email": "Imeelii Kee Galchi",
      "enter_phone": "Lakkoofsa Bilbilaa Kee Galchi",
      "enter_password": "Jecha Darbii",
      "enter_bio": "Waa'ee Keetii Nu Himi",
      "select_subcity": "Magaala Keessaa Filadhu",
      "select_woreda": "Aanaa Filadhu",
      "sent": "Ergaan Kee Milkaa'inaan Ergameera",
      "filter_by": "Akka Kanaan Filadhu",
      "rating": "Sadarkaa",
      "price": "Gatii",
      "etb": "ETB",
      "address": "Teessoo",
      "info": "ODEEFFANNOO",
      "location": "Bakka kee filadhu",
      "locations": {
        "select": "Bakka kee filadhu",
        "bole": "Boolee",
        "akaki_kality": "Aqaaqii Qaalittii",
        "gullele": "Gullallee",
        "kirkos": "Qirqoos",
        "lideta": "Lideetaa"
      },
      "every_service": "Tajaajiloota Mara Bakka Tokkotti!",
      "search_services": "Maaltu si barbaachisa?",
      "our-servises": "Tajaajiloota Keenya",
      "pending": "Eegaa Jiru",
      "completed": "Xummurame",
      "confirmed": "Mirkanaa'e",
      "reset": "Haquu",
      "logout": "Ba'i",
      "prof": "Profaayilii",
      "notification": "Beeksisa",
      "tech": "Ogeessa",
      "mark": "Akka Dubbisametti Kaa'i",
      "soon": "Dhiyootti",
      "text": "Galmee keessaniif galatoomaa. Gareen keenya galmee keessan ilaaluu irratti jira, guyyoota muraasa keessatti isin quunnamna!",
      "back": "Deebi'i",
      "customer": "Macaafa",
      "booking": "Galmee Teessoo",
      "service": "Tajaajila",
      "view": "Ilaali",
      "book": "Amma Galmeessi",
      "sign_google": "Google'n Seeni",
      "sign_facebook": "Facebook'n Seeni",
      "account": "Herrega hin qabduu?",
      "signup": "Herrega Haaraa Uumi",
      "job": "Ibsa Hojii",
      "accept": "Simadhu",
      "decline": "Haalu",
      "start": "Jalqabi",
      "complete": "Xumuri",
      "review": "Yaada Kenni",
      "dispute": "Mormii",
      "title": "Mata-duree",
      "enter_title": "Mata-duree Mormii Galchi",
      "welcome1": "Baga Nagaan Dhuftan",
      "welcome2": "Tajaajila Qulqullina Qaba, Fedhii Keessan Waliin",
      "header": "Ogeessota Qulqullina Qaba, Filatamoo, Mana Keessan Tajaajiluuf",
      "which": "Tajaajila Kam Barbaadduu?",
      "cancel": "Haquu",
      "add_review": "Yaada Dabaluu",
      "welcome": "Baga Nagaan Dhuftan",
      "try": "Irra Deebi'ii Yaali",
      "get_start": "Jalqabuuf",
      "reg": "Galmaa'i",
      "verfy_reg": "Galmee Keessan Mirkaneessi",
      "Start_now": "Hojii Keessan Jalqabi",
      "why": "Maaliif Nu Filattan",
      "one_year": "Guutuu Ji'a 1 Tajaajila Qulqullina",
      "time_sche": "Yeroo Jijjiiramaa fi Amanamummaa",
      "trust": "Ogeessota Amanamoo fi Mirkanaa'aa",
      "faq": "Gaaffilee Barreeffamanii",
      "lang": "Afaan Jijjiiri",
      "halted": "Dhaabbate",
      "started": "Jalqabame",
      "edit": "Sirreessi",
      "job_des": "Ibsa Hojii",
      "no_booking": "Ammaaf Galmee Teessoo Hin Jiru.",
      "available": "Argama",
      "unavailable": "Hin Jiru",
      "busy": "Hojii Irra Jira",
      "verified": "Mirkanaa'aa",
      "loading": "Gulaalaa Jira...",
      "searching": "Barbaadaa Jira...",
      "error_fetching_technicians": "Ogeessota Argachuu Dadhabe",
      "search_failed": "Barbaacha Hin Milkoofne",
      "no_technicians_found": "Ogeessota Barbaachisaa Hin Argamne.",
      "clear": "Filannoo Haqi",
      "select_location": "Bakka Filadhu",
      "search_location": "Bakka Barbaadi...",
      "recent_locations": "Bakka Dhiyoo",
      "popular_cities": "Magaalota Beekamoo",
      "current_location": "Bakka Amma Jirtu",
      "use_current_location": "Bakka Amma Jirtu Fayyadami",
      "no_locations_found": "Bakka Hin Argamne. Barbaacha Jijjiiri.",
      "search_placeholder": "Tajaajiloota ykn Ogeessota Barbaadi",
      "trending_now": "Amma Beekamaa",
      "popular_searches": "Barbaachaa Beekamoo",
      "click_search": "Barbaachuuf Cuqaasi",
      "find_tech": "Ogeessa Barbaadi",
      "connecting": "Ogeessota Filatamoo Bakka Keessan Jiran Waliin Isin Walitti Hidha",
      "results_count": "{{count}} Ogeessa Argame",
      "no_results_found": "Waliin Walitti Hin Fidne",
      "subscribe_for_email": "Imeelii Fayyadami",
      "customer_service": "Tajaajila Macaafa",
      "feedback": "Yaada Kenni",
      "monday": "Wiixata",
      "tuesday": "Qibxata",
      "wednesday": "Roobii",
      "thursday": "Kamiisa",
      "friday": "Jimaata",
      "saturday": "Sanbata",
      "sunday": "Dilbata",
      "business": "Sa'aatii Hojii",
      "noreviw": "Yaada Hin Jiru",
      "download": "Buufadhu",
      "get_app": "Appii",
      "quick_link": "Hiriira Ariifataa",
      "testimonialSubtitle": "Yaada Macaafa",
      "right": "© 2023 BusinessPro. Mirgi Hundi Eeggamaa Dha.",
      "privacy": "Seera Dhuunfaa",
      "terms": "Shira Tajaajilaa",
      "from_apple": "Apple Store Irraa",
      "from_google": "Google Play Irraa",
      "addr": "Finfinnee, Itoophiyaa",
      "get": "Argadhu",
      "tender_services": "Tajaajila Dorgommii",
      "tender_description": "Tajaajila Dorgommii Ogummaa fi Qindeessuu",
      "business_solutions": "Furmaata Hojii",
      "business_description": "Furmaata Hojii Addunyaa Guutuu",
      "maintenance": "Tajaajila Eegumsa",
      "maintenance_description": "Tajaajila Eegumsa 24/7",
      "professional_services": "Tajaajila Ogummaa",
      "professional_description": "Tajaajila Ogummaa Industirii Hunda",
      "quality_assured": "Qulqullina Mirkanaa'aa",
      "quality_description": "Tajaajiloonni Keenya Sadarkaa Industirii Ol'aanaa Qaba",
      "support_247": "Deeggarsa 24/7",
      "support_description": "Deeggarsa Macaafa Guyyaa fi Halkan",
      "expert_team": "Garee Ogeessota",
      "team_description": "Garee Ogeessota Qulqullina Qaba",
      "secure_process": "Hojii Nageenya Qaba",
      "secure_description": "Nageenya Odeeffannoo Hojii Keessan Eeguu",
      "consulting": "Tajaajila Gorsa",
      "enterprise_solutions": "Furmaata Hojii",
      "office_building_alt": "Mana Hojii Haaraa",
      "excellence_description": "Tajaajila Qulqullina Sadarkaa Addunyaa Keenya",
      "category": "Kategori",
      "announce_or_publish_tender": "Tajaajila Dorgommii",
      "member_login": "Seeni",
      "member_register": "Galmaa'i",
      "register": "Galmaa'i",
      "tender_title": "Mata-duree Tajaajila",
      "enter_tender_title": "Mata-duree Tajaajila Galchi",
      "tender_description": "Qindeess",
      "enter_tender_description": "Qindeessaa Tajaajila Galchi",
      "contact_info": "Nu Quunnamaa",
      "enter_contact_email": "Imeelii Nu Quunnamaa Galchi",
      "tender_documents": "Faayilaa Tajaajila",
      "pdf_doc_docx_supported": "PDF, DOC, DOCX Faayilaa",
      "upload_documents": "Faayilaa OlFe'i",
      "submit_tender": "Tajaajila Galchi",
      "tender_submitted": "Tajaajila Galchi",
      "tender_failed": "Tajaajila Galchi",
      "tender_successful": "Tajaajila Galchi",
      "tender_updated": "Tajaajila Galchi",
      "tender_deleted": "Tajaajila Galchi",
      "tender_not_found": "Tajaajila Galchi",
      "tender_not_updated": "Tajaajila Galchi",
      "tender_not_deleted": "Tajaajila Galchi",
      "afar": "Afar",
      "amhara": "Amhara",
      "benishangul_gumuz": "Benishangul-Gumuz",
      "central_ethiopia": "Central Ethiopia",
      "gambella": "Gambella",
      "harari": "Harari",
      "oromia": "Oromia",
      "sidama": "Sidama",
      "somali": "Somali",
      "south_ethiopia": "South Ethiopia",
      "south_west_ethiopia": "South West Ethiopia",
      "tigray": "Tigray",
      "addis_ababa": "Addis Ababa",
      "dire_dawa": "Dire Dawa",
      "snnpr": "Southern Nations, Nationalities, and Peoples'",
     
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
