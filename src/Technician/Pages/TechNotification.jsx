import { useState, useEffect } from 'react'
import axios from 'axios'
import { format, isToday, isYesterday, isSameWeek } from 'date-fns'
import { Bell, Mail, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { TechnicianNotificationApi } from '../Api/Api'
import { notificationStatusApi } from '../../Customer/Api/Api'
import { useTranslation } from 'react-i18next';


const TechNotification = () => {
  const { t } = useTranslation();
  const technician = JSON.parse(localStorage.getItem('user'))
  const id = technician.id
  console.log(id)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${TechnicianNotificationApi}/${id}`)
      console.log('Notifications:', response.data)
      setNotifications(response.data)
      
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch notifications')
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${notificationStatusApi}/${id}`, { readStatus: true })
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, readStatus: true } : n
      ))
    } catch (err) {
      console.error('Failed to mark notification as read', err)
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'BOOKING_REQUEST':
        return <Mail className="h-5 w-5 text-blue-500" />
      case 'ALERT':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'BOOKING_START':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'BOOKING_ACCEPTANCE':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'BOOKING_DENIED':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case ' BOOKING_CANCELLATION':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
        {error}
      </div>
    )
  }

  const groupedNotifications = groupNotifications(notifications)

  return (
    <div className="max-w-2xl bg-gray-200 h-screen mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t('notification')}</h1>
      {Object.entries(groupedNotifications).map(([date, notifications]) => (
        <div key={date} className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">{date}</h2>
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li 
                key={notification.id} 
                className={`bg-white rounded-lg shadow p-4 transition duration-300 ease-in-out ${
                  notification.readStatus ? 'opacity-50' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-gray-600">{notification.message}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {format(new Date(notification.deliveryDate), 'PPp')}
                    </div>
                  </div>
                  {!notification.readStatus && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="ml-2 text-emeraled-500 hover:text-emeraled-600 transition duration-300 ease-in-out"
                    >
                      {t('mark')}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default TechNotification