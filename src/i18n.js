import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


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
      "cv":"Your CV an Documents",
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
      "every_service": "All in One Services, On Demand!",
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
      "welcome1":"Welcome to Company Name",
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
      "track":"Track your Activity on this platform",
      "scheduled_date":"scheduled Date",
      "des_job":"Describe the Job",
      "notification_status":"Notification Status",
      "total_notification":"Total Notification",
      "unread_notification":"Unread Notification",
      "notification_type":"Notification Type",
      "quick_action":"Quick Actions",
      "mark_all":" Mark all as Read",
      "clear_all":"clear all notifications ",
      "notification":"Notifications",
      "mark":"Mark as read",
      "yr_desput":"Your Despute",
      "reason":"Reason",
      "sec_despute":" Your dispute has been submitted successfully!",
      "yes_account":"Already have an acconut?",
      "pro_tech": "Professional Technician",
      "submit":"Submit",
      "forgot_pass":"Forgot Password?",
      "reset_pass":"Reset Password",
      "email_phone":"Email/Phone Number",
      "join_us":"Join Our Platform",
      "Choose_option":"Choose how you want to sign up ",
      "signup_tech":"Sign Up as a Technician",
      "signup_cust":"Sign Up as a Customer",
      "offer":"Offer Your services and grow your business",
      "find_tech":"Find reliable technicians for your needs",
      "testimonialSubtitle":"Discover what our customers are saying about their experiences",
      "search":"Search Name",
      "protech":"PROFESSIONAL TECHNICIAN",
      "business":"Business Hours",
      "sunday":"Sunday",
      "monday":"Monday",
      "tuesday":"Tuesday",
      "wednesday":"Wednesday",
      "thursday":"Thursday",
      "friday":"Friday",
      "saturday":"Saturday",
      "closed":"Closed",
      "noreviw":"No Reviews Available",
      "around":"Around me",
      "clear":"Clear",
      "yrprofike":"Your Profile",
      "book-technician":"Book Technician",
      "boooking":"Booking ...",
      "filter":"FILTERS",
      "accept":"Accept",
      "deny":"Deny",
      "or":"or",
      "first_name":"First Name",
      "last_name":"Last Name",
      "terms":"Terms of Service",
      "privacy":"Privacy Policy",
    }
  },
  am: {
    translation: {
      "login":"ይግቡ",
      "become_tech":"ባለሞያ ኖት",
      "applay_now":"ዛሬውኑ ይመዝገቡ",
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
      "every_service": "የፈለጉት ሙያ በፈለጉት ቦታ እና ሰዓት",
      "search_services": "አገልግሎት ይምረጡ",
      "our-servises": "የምንሰጣቸው አገልግሎቶች",
      "pending":"በሂደት ላይ ያለ  ",
      "completed":" ያለቀ ",
      "confirmed":"የተረጋገጠ",
      "reset":"ያጥፉ",
      "logout":"ይውጡ",
       "prof":"ፕሮፋይል ",
      "notification":"መልዕክቶች",
      "tech":"ምልክት ያድርጉ",
      "soon":"በቅርቡ ከኛ ዘንድ መልዕክት ይደርሶታል::  ",
      "text":"ስለተመዘገቡ እናመሰግናለን፤ በባለሞያዎቻችን ማስረጃዎን ካረጋገጥን በሁዋላ ከኛ ዘንድ መልዕክት ይደርሶታል::",
      "back":"ተመለስ",
      "customer":"ደንበኞች ",
      "booking":"ስራዎች",
      "service":"አገልግሎቶች",
      "view":"ፕሮፋይል ይመልከቱ",
      "book":"ይዘዙ",
      "sign_google":"በ ጉግል ይግቡ ",
      "sign_facebook":"በፌስቡክ ይግቡ",
      "account":"አካውንት የሎትም? ",
      "signup":"ይመዝገቡ",
      "job":"የስራው አይነት",
      "accept":" ይቀበሉ",
      "decline":"ያግዱ",
      "start":"ይጀምሩ",
      "complete":"ይጨርሱ",
      "submit":"ይላኩ",
      "review":"አስተያየት ካሎት",
      "dispute":"ቅሬታ ካሎት",
      "title":"ርዕስ",
      "enter_title":"የቅረታዎን ርዕስ ያስገቡ",
      "welcome1":"እንኳን ወደ  . . . መጡ ",
      "welcome2":"ጥራት ያለው አገልግሎት ከእኛ ዘንድ",
      "header":"ልምድ ያካበቱ፣ የተመረጡ ፕሮፌሽናል ባለሞያዎች እርስዎን ለማገልገል ይተጋሉ",
      "which":"  የትኛውን አገልግሎት መጠቀም ይፈልጋሉ",
      "cancel":"ተመለስ" ,
      "add_review":"አስተያየቶን ያስገቡ" ,
      "welcome":"ሰላም",
      "try":"እንደገና ይሞክሩ",
      "get_start":"ዛሬውኑ ይወስኑ",
      "reg":"ማስረጃዎን ይሟሉ",
      "verfy_reg":"ይመዝገቡ ",
      "Start_now":"ዛሬውኑ ስራዎን ይጀምሩ",
      "why":"ለምን ይመርጡናል",
      "one_year":"ጥራትን ከዋስትና",
      "time_sche":"ቀላል ቀጠሮ ከቅልጥፍና ጋር",
      "trust":"ታማኝ እና ብቁ አገልጋዮች ",
      "faq":"የደንበኞች ጥያቄ",
       "lang":"ቋንቋ ይቀይሩ",
       "halted":"የተቋረጡ",
       "started":"የተጀመሩ",
       "edit":"ያስተካክሉ ",
       "job_des":"የስራ መግለጫ",
       "no_booking":"እስካሁን ምንም የስራ ክንውን የሎትም::",
       "track":"የስራዎን ሂደት ከኛ ጋር ይከታተሉ::",
       "scheduled_date":"የቀጠሮው ሰአት ",
      "des_job":"ስለሚፈልጉት አገልግሎት ጥቂት ይንገሩን",
      "notification_status":"የመልዕክቶ ሁኔታ ",
      "total_notification":"አጠቃላይ መልዕክቶች",
      "unread_notification":"ያልተነበቡ መልዕክቶች",
      "notification_type":"  የመልዕክት አይነቶች",
      "quick_action":"ፈጣን እርምጃዎች",
      "mark_all":" ሁሉንም እይ",
      "clear_all":"ሁሉንም አጥፋ ",
      "notification":"መልዕክቶች",
      "mark":"ምልክት አድርግ",
      "yr_desput":"ቅሬታዎ  ",
      "reason":"ምክንያት",
      "sec_despute":"ቅሬታዎ በትክክል ተልኳል።",
      "yes_account":"ከዚህ በፊት አካውንት አሎት?",
      "submit":"ላክ",
      "forgot_pass":"ምስጢር ቁጥር ከረሱ?",
      "reset_pass":"ምስጢር ቁጥር ይቀይሩ",
      "email_phone":"ኢሜይል ወይም ስልክ ቁጥር ያስገቡ",
      "join_us":"ቤተሰብ ይሁኑ",
      "Choose_option":"እንዴት መመዝገብ እንደሚፈልጉ ይምረጡ",
      "signup_tech":"ለባለሞያነት ይመዝገቡ ",
      "signup_cust":"አገልግሎት ለማግኘት ይመዝገቡ",
      "offer":"አገልግሎትዎን ያቅርቡ እና ገቢዎን ያሳድጉ ",
      "find_tech":"ብቁ የሆኑ ባለሞያዎች ለሚያስፍልጎ አገልግሎት",
      "testimonialSubtitle":"ደንበኞቻችን ስለ ተሞክሯቸው ምን ይላሉ",
      "search":"ባለሞያዎችን በስም ይፈልጉ",
      "protech":"ባለሞያ ",
      "business":"የስራ ቀናት",
      "sunday":"እሁድ",
      "monday":"ሰኞ",
      "tuesday":"ማክሰኞ",
      "wednesday":"ረቡዕ",
      "thursday":"ሐሙስ",
      "friday":"አርብ",
      "saturday":"ቅዳሜ",
      "closed":"ዝግ",
      "noreviw":"እስካሁን ምንም አስተያየት የለም",
      "around":"ከአቅራቢያዬ",
      "clear":"አጥፉ",
      "yrprofike":"የእርሶዎ ፕሮፋይል",
      "book-technician":"ባለሞያ ይዘዙ",
      "boooking":"በሂደት ላይ",
      "filter":"ማጣሪያ",
      "accept":"ይቀበሉ",
      "deny":"ይከልክሉ",
      "or":"ወይም",
      "first_name":"ስም",
      "last_name":"የአባት ስም",
      "terms":"ደንቦች ",
      "privacy":"ፕራይቬሲ",

       
       
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
