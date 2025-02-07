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
      "every_service": "All in One Services,",
      "every_service1": "On Demand!",
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
      "total_service":"Total Services",
      "total_technician":"Total Technicians",
      "total_customer":"Total Customers",
      "total_booking":"Total Bookings",
      "quick_link":"Quick Links",
      "connecting":"Connecting you with the best technicians in town",
      "download":"Download Our App",
      "follow":"Follow Us",
      "right":"©2024 huluMoya. All rights reserved. Built with 💚 in Ethiopia",
      "addr":"Address",
      "from_google":"Google Play",
      "from_apple":"App Store",
      "get":"Get it on",
      "agrree":"By creating an account you agree to our terms of service and privacy policy.",
      "see_more":"See More",
      "see_less":"See Less",




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
      "every_service": "የፈለጉት ሙያ በፈለጉት",
      "every_service1": "ቦታ እና ሰዓት",
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
      "total_service":"አገልግሎቶች ",
      "total_technician":"ባለሞያዎች",
      "total_customer":"ተጠቃሚዎች",
      "total_booking":"ውሎች",
      "quick_link":"ተጨማሪ",
      "connecting":"ሰዎችን ከአዳዲስ መፍትሄዎች ጋር ማገናኘት ለዘላቂ ቀጣይነት",
      "download":"አፕሊኬሽናችንን ያውርዱ",
      "follow":"ቤተሰብ ይሁኑ",
      "right":"በ2017 ዓ.ም በኢትዮጵያ ተሰራ 💚 ሁሉም መብቶች የተጠበቁ ናቸው።",
      "addr":"አድራሻ  ",
      "from_google":"ከጉግልመተግበሪያ ",
      "from_apple":"ከአፕል መተግበሪያ",
      "get":"ያውርዱ",
      "agrree":"በመመዝገብ በአገልግሎት ውላችን እና በግላዊነት ፖሊሲያችን ተስማምተዋል።",
      "See_more":"ተጨማሪ ይመልከቱ",
      "See_less":"ያሳንሱ",


       
       
  }
  },
  om: {
    translation: {
      "login":"Galmaa'i",
      "become_tech":"Hojjetaadhaa",
      "applay_now":"Amma Iyyadhu",
      "choose_your_best": "Choose an Offer",
      "our_service":"Our Services",
      "our_top_technicians":"Our Top Technicians",
      "testmony":"Ragaa ba'uu",
      "contact":"Nu Qunnamaa",
      "serv":"Tajaajila",
      "technicians":"Teeknishaanota",
      "tech_regi":"Galmee Teeknishaanotaa",
      "upload":"Faayila Olkaa'uu",
      "name":"Maqaa",
      "email":"Imeelii",
      "phone":"Lakkoofsa Bilbilaa",
      "password":"Jecha iccitii",
      "confirm_password":"Password mirkaneessuu",
      "bio":"waa’ee kee",
      "id_card":"Kaardii Id",
      "profile":"Fakkii Profaayilii",
      "cv":"CV keessan an Documents",
      "subcity":"Magaalaa Xiqqaa",
      "woreda":"Woreeda",
      "regis":"Galmeessuu",
      "message":"Ergaa",
      "submit": "Galchuu",
      "enter_name":"Maqaa",
      "enter_email": "Enter Your Email",
      "enter_phone": "Lakkoofsa Bilbilaa Keessan Galchaa",
      "enter_password": "Password",
      "enter_bio": "Waa'ee Ofii keetii nuuf himi",
      "select_subcity":"Magaalaa Xiqqaa filadhu",
      "select_woreda":"Woreeda filadhu",
      "sent" : "Ergaan Keessan Milkaa'inaan Ergame",
      "filter_by": "Filter By",
      "rating": "Sadarkaa kennuu",
      "price": "Gatii",
      "etb": "birrii",
      "address":"Teessoo",
      "info":"ODEEFFANNOO",
      "location": "Bakka jirtu filadhu",
      "locations": {
        "select": "Bakka jirtu filadhu",
        "bole": "Bole",
        "akaki_kality": "Akaki Kality",
        "gullele": "Gullele",
        "kirkos": "Kirkos",
        "lideta": "Lideta"
      },
      "every_service": "Tajaajila Hundaa Tokko ",
      "every_service1": "Keessatti, Gaaffii Irratti!",
      "search_services": "Maal irratti gargaarsi si barbaachisa?",
      "our-servises": "Tajaajila Keenya",  
      "pending":"Eeggataa kan jiru",
      "completed":"Xumurameera",
      "confirmed":"Mirkanaa'eera",
      "reset":"Filtara Irra Deebi'i Saagi",
      "logout":"Ba'i",
      "prof":"Ibsama",
      "notification":"Beeksisa",
      "tech":"Teeknishaan",
      "mark":"Akka Dubbifameetti Mallatteessi",
      "soon":"Yeroo dhiyootti isin qunnamna!",
      "text":"We will Galmeessitaniif Galatoomaa gareen keenya reezumee keessan gamaaggamaa jira, guyyoota muraasa booda wal qunnamna!yeroo dhiyootti isin qunnamaa!",
      "back":"Dugda",
      "customer":"Maamiltoota",
      "booking":"Kitaaba gochuu",
      "service":"Tajaajila",
      "view":"Profaayilii Ilaali",
      "book":"Amma Kitaaba",
      "sign_google":"Sign in with Google",
      "sign_facebook":"Sign in with Facebook",
      "account":"Don't have an account?",
      "signup":"Herrega Uumuu",
      "job":"Ibsa Hojii",
      "accept":"Simachuu",
      "decline":"Gadi bu'uu",
      "start":"Eegaluu",
      "complete":"Guutuu",
      "submit":"Galchuu",
      "review":"Keessa deebi'uu",
      "dispute":"Walitti bu'iinsa",
      "title":"Mata-duree",
      "enter_title":"Mata-duree",
      "welcome1":"Welcome to Company Name",
      "welcome2":"Quality Service, on demand",
      "header":"Experienced, hand-picked Proffessionals to serve you at your doorstep",
      "which":"Which Service Do You Need?",
      "cancel":"Haquu",
      "add_review":"Add Rivew",
      "welcome":"Baga nagaan dhufte",
      "try":"Ammas Yaali",
      "get_start":"Jalqabuu",
      "reg":"Galmeessuu",
      "verfy_reg":"Galmee Keessan Mirkaneessaa",
      "Start_now":"Hojii Kee Jalqabi",
      "why":"Maaliif Nu filachuu",
      "one_year":"Wabii qulqullinaa ji'a 1",
      "time_sche":"Sagantaa fi sa’aatii eeguu kan danda’u",
      "trust":"Teeknishaanota amanamoo & mirkanaa'an ",
      "faq":"FAQ",
      "lang":"Afaan Jijjiiri",
      "halted":"Dhaabbate",
      "started":"Jalqabame",
      "edit":"Gulaaluu",
      "job_des":"Ibsa Hojii",
      "no_booking":"Ammallee Booking Hin Qabne.",
      "track":"waltajjii kana irratti Gocha keessan rack godhaa",
      "scheduled_date":"Guyyaa beellamame",
      "des_job":"Iyoob ibsi",
      "notification_status":"Haala Beeksisa",
      "total_notification":"Beeksisa Waliigalaa",
      "unread_notification":"Beeksisa Hin Dubbifamne",
      "notification_type":"Gosa Beeksisa",
      "quick_action":"Tarkaanfiiwwan Saffisaa",
      "mark_all":" Hundaa akka Dubbisitti mallatteessi",
      "clear_all":"beeksisa hunda qulqulleessi",
      "notification":"beeksisa kennuu",
      "mark":"Akka dubbifameetti mallatteessi",
      "yr_desput":"Falmii Keessan",
      "reason":"Sababa",
      "sec_despute":" Falmiin keessan milkaa'inaan dhiyaateera!",
      "yes_account":"Duraanis akkaawuntii qabduu?",
      "pro_tech": "Ogeessa Teeknishaan",
      "submit":"Galchuu",
      "forgot_pass":"Password dagattaniittuu?",
      "reset_pass":"Jecha Darbii Irra Deebi'i",
      "email_phone":"Lakkoofsa Imeelii/Bilbilaa",
      "join_us":"Waltajjii Keenyaatti makamaa",
      "Choose_option":"Akkaataa itti galmaa'uu barbaaddu filadhu ",
      "signup_tech":"Teeknishaa ta'uun Galmaa'i",
      "signup_cust":"Akka Maamilaatti Galmaa'i",
      "offer":"Offer Your services and grow your business",
      "find_tech":"Find reliable technicians for your needs",
      "testimonialSubtitle":"Discover what our customers are saying about their experiences",
      "search":"Maqaa Barbaadi",
      "protech":"OGEESSOTA TEEKNISHAAN",
      "business":"Sa'aatii Hojii",
      "sunday":"Dilbata",
      "monday":"Wiixata",
      "tuesday":"Kibxata",
      "wednesday":"Wednesday",
      "thursday":"Kamisa",
      "friday":"Jimaata",
      "saturday":"Sanbata",
      "closed":"Cufameera",
      "noreviw":"Irra Deebiin Hin Argamu",
      "around":"Around me",
      "clear":"Ifaar",
      "yrprofike":"Profile keessan",
      "book-technician":"Teeknishaan Kitaabaa",
      "boooking":"Booking ...",
      "filter":"FILTAROOTA",
      "accept":"Simachuu",
      "deny":"Deny",
      "or":"yookaan",
      "first_name":"Maqaa jalqabaa",
      "last_name":"Maqaa akaakayyuu",
      "terms":"Haala Tajaajilaa",
      "privacy":"Imaammata Dhuunfaa",
      "total_service":"Tajaajila Waliigalaa",
      "total_technician":"Teeknishaanota Waliigalaa",
      "total_customer":"Maamiltoota Waliigalaa",
      "total_booking":"Waliigala Bookings",
      "quick_link":"Hidhamtoota Saffisaa",
      "connecting":"Teeknishaanota magaalattii keessaa warra ciccimoo ta'an waliin isin wal qunnamsiisuu",
      "download":"App Keenya Buufadhu",
      "follow":"Nu Hordofaa",
      "right":"©2017 huluMoyaa jedhamtu. Mirgi Qopheessaa Seeraan Kan Eegame. Itoophiyaa keessatti 💚 waliin ijaarame",
      "addr":"Teessoo",
      "from_google":"Google Play",
      "from_apple":"App Store",
      "get":"Irra kaa'i",
      "agrree":"Akkaawuntii uumuudhaan haala tajaajilaa fi imaammata dhuunfaa keenyaa irratti walii galta.",
      "See_more":"Dabalataa",
      "See_less":"Dabalataa",




    }
  },
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
