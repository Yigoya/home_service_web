import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Menu, X, User, LogIn, UserPlus, Bell, Download, Home, Settings, LogOut, Crown, Globe } from 'lucide-react';
import { format } from 'date-fns';
import api from '../../lib/axios';
import { logout } from '../../store/slices/authSlice';
import { setNotifications, markAsRead, markAllAsRead } from '../../store/slices/notificationSlice';
import { useTranslation } from 'react-i18next';
import { setMainSubcategory } from '../../store/dataSlice';
import { API_URL_FILE } from '../api';

export default function Navbar({ isTender }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subcategory, mainsubcategory, isOnMainSubcategory , loading } = useSelector((state) => state.data);
  const { user } = useSelector((state) => state.auth);
  const { notifications, unreadCount } = useSelector((state) => state.notification);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setIsLangMenuOpen(false);
    window.location.reload();
  };

  // Get language display name based on code
  const getLanguageDisplay = (code) => {
    const languages = {
      'en': 'English',
      'am': 'አማርኛ',
      'om': 'Afaan Oromoo'
    };
    return languages[code] || code.toUpperCase();
  };

  const isInSubcategory = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return (path.includes('/service-categories') || path.includes('/technician-list')) && !isOnMainSubcategory;
    }
    return false;
  };

  const isInCompanyPage = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      console.log(path);
      return (path.includes('/subcategories') || path.includes('/business') || path.includes('/business-details'));
    }
    return false;
  };

  const getPath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '';
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await api.get(`/notifications/unread/${user?.id}`);
      dispatch(setNotifications(response.data));
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/mark-as-read`);
      dispatch(markAsRead(id));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.put(`/mark-all-as-read/${user?.id}`);
      dispatch(markAllAsRead());
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed top-0 w-full z-50">
      <div className={`${!isTender && "max-w-7xl"} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={()=>{
              console.log(mainsubcategory, "mainsubcategory"); 
              if (isTender) {
                navigate('/');
              }
              else if(isInSubcategory()) {
                dispatch(setMainSubcategory(mainsubcategory));
                navigate('/service-categories');
              } else if (isInCompanyPage()) {
                navigate('/companies');
              }
              
              else {
                navigate('/');
              }
            }}
              className="flex items-center cursor-pointer">
              <div className="relative w-10 h-10 mr-2">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg transform rotate-6 transition-transform group-hover:rotate-12"></div>
                <div className="absolute inset-0 bg-white rounded-lg shadow-lg flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">H</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                HuluMoya
              </h1>
            </button>
            
            {/* <div className="hidden md:flex ml-10 space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">Contact</a>
            </div> */}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 gap-1"
              >
                <Globe className="h-4 w-4 mr-1" />
                <span>{getLanguageDisplay(i18n.language)}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-10">
                  <button 
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button 
                    onClick={() => changeLanguage('am')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    አማርኛ
                  </button>
                  <button 
                    onClick={() => changeLanguage('om')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Afaan Oromoo
                  </button>
                </div>
              )}
            </div>
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsNotificationOpen(!isNotificationOpen);
                      setIsProfileOpen(false);
                    }}
                    className="relative text-gray-700 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Bell className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  
                  
                  {isNotificationOpen && (
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-2 z-50">
                      <div className="flex items-center justify-between px-4 py-2 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-500">
                            No new notifications
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                                !notification.readStatus ? 'bg-blue-50' : ''
                              }`}
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <div className="flex justify-between items-start">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {format(new Date(notification.deliveryDate), 'MMM d, h:mm a')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setIsNotificationOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                  >
                    {user.profileImage ? (
                      <img
                        src={`${API_URL_FILE}${user.profileImage}`}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="text-sm font-medium">{user.name}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                      <Link
                        to="/customer/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to="/subscription"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Subscription
                        {user?.subscription && (
                          <span className="ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {user.subscription.name}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 gap-1"
              >
                <Globe className="h-4 w-4 mr-1" />
                <span>{getLanguageDisplay(i18n.language)}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-10">
                  <button 
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button 
                    onClick={() => changeLanguage('am')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    አማርኛ
                  </button>
                  <button 
                    onClick={() => changeLanguage('om')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Afaan Oromoo
                  </button>
                </div>
              )}
            </div>
                <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  <Download className="h-4 w-4 mr-1" />
                  Get App
                </button>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <button
                  onClick={() => {
                    if (isTender) {
                      navigate('/signup?type=tender');
                    }
                    else if (isInCompanyPage() || getPath().includes('/companies')) {
                      navigate('/signup?type=company');
                    }
                    else if (isInSubcategory() || isOnMainSubcategory) {
                      dispatch(setMainSubcategory(mainsubcategory));
                      navigate('/signup?type=technician');
                    }
                    else {
                      navigate('/signup');
                    }
                  }}

                  className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            {user && (
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsMenuOpen(false);
                }}
                className="relative p-2 mr-2 text-gray-700 hover:text-blue-600"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsNotificationOpen(false);
              }}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <div className="px-3 py-2 border-b">
                  <div className="flex items-center space-x-3">
                    {user.profileImage ? (
                      <img
                        src={`${API_URL_FILE}${user.profileImage}`}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </div>
                <Link
                  to="/customer/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <Link
                        to="/subscription"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Subscription
                        {user?.subscription && (
                          <span className="ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {user.subscription.name}
                          </span>
                        )}
                      </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <a href="#services" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">Services</a>
                <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">About</a>
                <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">Contact</a>
                <hr className="my-2" />
                <button className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                  <Download className="h-5 w-5 mr-2" />
                  Get Mobile App
                </button>
                <Link
                  to="/login"
                  className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Link>
                <Link
                  to="/signup/customer"
                  className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile notifications */}
      {isNotificationOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Mark all as read
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">
                No new notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                    !notification.readStatus ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      {format(new Date(notification.deliveryDate), 'MMM d, h:mm a')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </nav>
  );
}