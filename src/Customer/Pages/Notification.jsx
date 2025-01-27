import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format, isToday, isYesterday, isSameWeek } from 'date-fns'
import { Bell, Mail, AlertCircle, CheckCircle, Loader2, Trash2, PieChart } from 'lucide-react'
import { CustomerNotificationApi } from '../Api/Api'
import LoadingPage from '../../Shared/Components/LoadingPage'
import { useTranslation } from 'react-i18next';
import  FileSearch  from '../../assets/Filesearching.gif'

const Notification = () => {
    const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'))
  const id = user?.id
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    types: { BOOKING_COMPLETE: 0, BOOKING_REQUEST: 0, BOOKING_CANCELLATION: 0, other: 0 }
  })

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${CustomerNotificationApi}/${id}`)
      console.log('Notifications:', response.data)
      setNotifications(response.data)
      calculateStats(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch notifications')
      setLoading(false)
    }
  }

  const calculateStats = (notificationsData) => {
    const newStats = {
      total: notificationsData.length,
      unread: notificationsData.filter(n => !n.readStatus).length,
      types: { BOOKING_COMPLETE: 0, BOOKING_REQUEST: 0, BOOKING_CANCELLATION: 0, other: 0 }
    }
    notificationsData.forEach(n => {
      if (n.type in newStats.types) {
        newStats.types[n.type]++
      } else {
        newStats.types.other++
      }
    })
    setStats(newStats)
  }

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${CustomerNotificationApi}/${id}`, { readStatus: true })
      const updatedNotifications = notifications.map(n => 
        n.id === id ? { ...n, readStatus: true } : n
      )
      setNotifications(updatedNotifications)
      calculateStats(updatedNotifications)
    } catch (err) {
      console.error('Failed to mark notification as read', err)
    }
  }

  const markAllAsRead = async () => {
    try {
      await axios.patch(`${CustomerNotificationApi}/markAllRead/${customer.id}`)
      const updatedNotifications = notifications.map(n => ({ ...n, readStatus: true }))
      setNotifications(updatedNotifications)
      calculateStats(updatedNotifications)
    } catch (err) {
      console.error('Failed to mark all notifications as read', err)
    }
  }

  const clearAllNotifications = async () => {
    try {
      await axios.delete(`${CustomerNotificationApi}/clearAll/${customer.id}`)
      setNotifications([])
      calculateStats([])
    } catch (err) {
      console.error('Failed to clear all notifications', err)
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'BOOKING_REQUEST':
        return <Mail className="h-5 w-5 text-green-600" />
      case 'BOOKING_CANCELLATION':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case 'BOOKING_COMPLETE':
          return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'BOOKING_START':
            return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'BOOKING_ACCEPTANCE':
            return <CheckCircle className="h-5 w-5 text-green-600" />  
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const groupNotifications = (notifications) => {
    return notifications.reduce((groups, notification) => {
      const date = new Date(notification.deliveryDate)
      let key = format(date, 'yyyy-MM-dd')
      
      if (isToday(date)) key = 'Today'
      else if (isYesterday(date)) key = 'Yesterday'
      else if (isSameWeek(date, new Date())) key = 'This Week'
      else key = format(date, 'MMMM yyyy')

      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(notification)
      return groups
    }, {})
  }

  const getPercentage = (value) => {
    return stats.total > 0 ? (value / stats.total) * 100 : 0
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingPage className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
        {error}
      </div>
    )
  }

  const groupedNotifications = groupNotifications(notifications)

  return (
    <div className="max-w-7xl mt-5 mx-auto p-4 lg:flex lg:space-x-8">
      {/* Statistics Section - Fixed on large screens */}
      <div className="hidden lg:block lg:mt-16 lg:w-1/4">
        <div className="lg:ml-8 max-w-xs space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">{t('notification_status')}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('total_notification')}</span>
                <span className="font-semibold">{stats.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('unread_notification')}</span>
                <span className="font-semibold text-emerald-600">{stats.unread}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">{t('notification_type')}</h2>
            <div className="space-y-2">
              {Object.entries(stats.types).map(([type, count]) => (
                <div key={type} className="flex items-center">
                    <div className="w-24 text-sm">
                    {type === 'BOOKING_COMPLETE' && 'Completed'}
                    {type === 'BOOKING_REQUEST' && 'Requested'}
                    {type === 'BOOKING_CANCELLATION' && 'Cancelled'}
                    {type === 'other' && 'Other'}
                    </div>
                  <div className="flex-grow bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-emerald-600 rounded-full h-2`}
                      style={{ width: `${getPercentage(count)}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-right text-sm">{count}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">{t('quick_action')}</h2>
            <button 
              onClick={markAllAsRead}
              className="w-full bg-emerald-600 text-white rounded-md py-2 px-4 hover:bg-emerald-600 transition duration-300 mb-2"
            >
              {t('mark_all')}
            </button>
            <button 
              onClick={clearAllNotifications}
              className="w-full bg-red-600 text-white rounded-md py-2 px-4 hover:bg-red-600 transition duration-300"
            >
             {t('clear_all')}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="lg:w-3/4 max-md:mt-10 bg-white shadow-xl p-5 lg:mt-16 rounded-xl">
        <h1 className="text-2xl lg:ml-10 pt-4 font-bold mb-6">{t('notification')}</h1>
        {Object.keys(groupedNotifications).length === 0 && (
          <div className=" text-center lg:mt-20 text-gray-400 p-4">
            <img src={FileSearch} className='h-80 flex lg:ml-52' />
             <p className='lg:mb-44'>No notification for now</p>
          </div>
        )}
        {Object.entries(groupedNotifications).map(([date, notifications]) => (
          <div key={date} className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">{date}</h2>
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li 
                  key={notification.id} 
                  className={`bg-white rounded-lg shadow p-4 transition duration-300 ease-in-out ${
                    notification.readStatus ? 'opacity-75' : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-gray-600">{notification.message}</p>
                      <div className="mt-2 text-sm text-gray-600">
                        {format(new Date(notification.deliveryDate), 'PPp')}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {!notification.readStatus && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-emerald-600 hover:text-emerald-600 transition duration-300 ease-in-out mb-2"
                          aria-label="Mark as read"
                        >
                          {t('mark')}
                        </button>
                      )}
                      <button
                        onClick={() => clearAllNotifications()}
                        className="text-red-600 hover:text-red-600 transition duration-300 ease-in-out"
                        aria-label="Delete notification"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notification

