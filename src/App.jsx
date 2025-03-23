import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Shared/pages/Landing';
import SignUp from './Customer/Pages/SignUp';
import Login from './Shared/pages/Login';
import ContactUs from './Customer/Pages/ContactUs';
import Registration from './Technician/Pages/Registration';
import BookTechnician from './Customer/Pages/BookTechnician';
import VerificationPage from './Customer/Pages/VerificationPage';
import TechVerificationPage from './Technician/Pages/TechVerificationPage';
import Profile from './Customer/Pages/Profile';
import CustomerLayout from './AuthLayout/CustomerLayout';
import { AuthProvider } from './Shared/Context/AuthContext';
import Services from './Customer/Pages/Services';
import TotalTechnicianList from './Customer/Pages/TotalTechnicianList';
import TechnicianLayout from './AuthLayout/TechnicianLayout';
import TechProfile from './Technician/Pages/TechProfile';
import Notification from './Customer/Pages/Notification';
import TechNotification from './Technician/Pages/TechNotification';
import Footer from './Shared/Components/Footer';
import 'antd/dist/reset.css';
import UploadPaymentImage from './Technician/Pages/UploadPaymentImage';
import ForgotPassword from './Shared/pages/ForgotPassword';
import PreSignup from './Shared/Components/PreSignup';
import { LocationProvider } from './Shared/Context/LocationContext';
import { SelectedServiceProvider } from "./Shared/Context/SelectedServiceContext";
import ServiceDescriptionBar from "./Shared/Components/ServiceDescriptionBar";
import Checkout from './Customer/Pages/Checkout';
import { LanguageProvider } from './Shared/Context/LanguageContext';
import ScrollTop from './Shared/Components/ScrollTop';
import TenderPage from './Tender/TenderPage';
import TenderCategories from './Tender/TenderCategories';
import SubscriptionPackage from './Tender/SubscriptionPackage';
import TenderDetailPage from './Tender/TenderDetailPage';
import PublishTender from './Tender/PublishTender';
import HomePage from './Compancies/pages/HomePage';
import NotFound from './Shared/pages/NotFound';

import CategoriesPage from "./Compancies/pages/CategoriesPage"
import BusinessDetailPage from "./Compancies/pages/BusinessDetailPage"
import CompanyLayout from './AuthLayout/CompanyLayout';
import SubcategoriesPage from './Compancies/pages/SubcategoriesPage';
import CompanyListingPage from './Compancies/pages/CompanyListingPage';
import BusinessListingPage from './Compancies/pages/CompanyListingPage';
import ServiceCategoriesPage from './Shared/pages/ServiceCategoriesPage';
import BookingForm from './Customer/Pages/BookingForm';
import TechnicianList from './Customer/Pages/TechnicianList';
import TechnicianDetail from './Customer/Pages/TechnicianDetail';
import LandingPage from './Shared/pages/LandingPage';
function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <LanguageProvider>
    <SelectedServiceProvider>
      <LocationProvider>
        <AuthProvider>
          <Router>
              {/* Render the ServiceDescriptionBar outside the Routes */}
              <ScrollTop />
               <ServiceDescriptionBar />
            <Routes>
              <Route path="/tech-upload-payment" element={<UploadPaymentImage />} />
              {user && user.role === "TECHNICIAN" ? (
                <Route element={<TechnicianLayout />}>
                  <Route path="/" element={<TechProfile />} />
                  <Route path="notification/:id" element={<Notification />} />
                </Route>
              ) : (
                <Route element={<CustomerLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/customer-signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/technician-list/:id" element={<TechnicianList />} />
                  <Route path="/all-technician-list" element={<TotalTechnicianList />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/technician-registration" element={<Registration />} />
                  <Route path="/technician-details/:id/:Id" element={<TechnicianDetail />} />
                  <Route path="/book-technician/:technicianId/:serviceId" element={<BookingForm />} />
                  <Route path="/verify-email" element={<VerificationPage />} />
                  <Route path="/tech-verification-waiting" element={<TechVerificationPage />} />
                  <Route path="/customer-profile/:id" element={<Profile />} />
                  <Route path="/notification/:id" element={<Notification />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/pre-signup" element={<PreSignup />} />
                  <Route path='/checkout' element = {<Checkout />} />
                  <Route path="/service-categories" element={<ServiceCategoriesPage />} />
                  <Route path="/tender-categories" element={<TenderCategories/>} />
                  <Route path="/tender/:id" element={<TenderDetailPage/>} />
                  <Route path="*" element={<NotFound />} />
                  <Route path='/subscription' element={<SubscriptionPackage/>} />
                </Route>
              )}
                  <Route path="/tender" element={<TenderPage/>} />
                  <Route path="/tenders" element={<PublishTender/>} />
                  <Route element={<CompanyLayout />}>
                    <Route path="/companies" element={<HomePage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/subcategories" element={<SubcategoriesPage />} />
                    <Route path="/business/:id" element={<BusinessListingPage />} />
                    <Route path="/search" element={<BusinessListingPage />} />
                    <Route path="/business-details/:id" element={<BusinessDetailPage />} />
                  </Route>
                  

            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
      </LocationProvider>
    </SelectedServiceProvider>
    </LanguageProvider>
  );
}

export default App;