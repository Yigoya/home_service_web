import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './Shared/pages/Landing'
import SignUp from './Customer/Pages/SignUp'
import Login from './Shared/pages/Login'
import TechnicianList from './Customer/Pages/TechnicianList'
import ContactUs from './Customer/Pages/ContactUs'
import Registration from './Technician/Pages/Registration'
import TechnicianDetail from './Customer/Pages/TechnicianDetail'
import BookTechnician from './Customer/Pages/BookTechnician'
import VerificationPage from './Customer/Pages/VerificationPage'
import TechVerificationPage from './Technician/Pages/TechVerificationPage'
import Layout from './AuthLayout/Layout'
import Profile from './Customer/Pages/Profile'
import CustomerNavBar from './Customer/Components/CustomerNavBar'
import CustomerLayout from './AuthLayout/CustomerLayout'
import { AuthProvider } from './Shared/Context/AuthContext'

import Services from './Customer/Pages/Services'
import TotalTechnicianList from './Customer/Pages/TotalTechnicianList'


function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route element ={<CustomerLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path='/customer-signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/services' element={<Services />} />
            <Route path='/technician-list/:id' element={<TechnicianList/>} />
            <Route path ='all-technician-list' element = {<TotalTechnicianList />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/technician-registration' element={<Registration />} />
            <Route path ='/technician-details/:id' element={<TechnicianDetail />} />
            <Route path ='/book-technician/:id' element={<BookTechnician />} />
            <Route path="/verify-email"  element={<VerificationPage />} />
            <Route path='/tech-verification-waiting' element={<TechVerificationPage />} />
            <Route path='/customer-profile' element={<Profile />} />
          </Route>
        </Routes>
      </Router>
     </AuthProvider>
    </>
  )
}

export default App
