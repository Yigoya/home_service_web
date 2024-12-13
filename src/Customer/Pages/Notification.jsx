import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format, isToday, isYesterday, isSameWeek } from 'date-fns'
import { Bell, Mail, AlertCircle, CheckCircle, Loader2, Trash2, PieChart } from 'lucide-react'
import { CustomerNotificationApi } from '../Api/Api'
import LoadingPage from '../../Shared/Components/LoadingPage'

const Notification = () => {
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
        return <Mail className="h-5 w-5 text-blue-500" />
      case 'BOOKING_CANCELLATION':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'BOOKING_COMPLETE':
          return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'BOOKING_START':
            return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'BOOKING_ACCEPTANCE':
            return <CheckCircle className="h-5 w-5 text-green-500" />  
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

  const getPercentage = (value) => {
    return stats.total > 0 ? (value / stats.total) * 100 : 0
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingPage className="h-8 w-8 animate-spin text-blue-500" />
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
    <div className="max-w-7xl mx-auto p-4 lg:flex lg:space-x-8">
      {/* Statistics Section - Fixed on large screens */}
      <div className="hidden lg:block lg:mt-16 lg:w-1/4">
        <div className="fixed w-1/4 max-w-xs space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Notification Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Notifications</span>
                <span className="font-semibold">{stats.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Unread Notifications</span>
                <span className="font-semibold text-blue-500">{stats.unread}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Notification Types</h2>
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
                      className={`bg-blue-500 rounded-full h-2`}
                      style={{ width: `${getPercentage(count)}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-right text-sm">{count}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <button 
              onClick={markAllAsRead}
              className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-300 mb-2"
            >
              Mark All as Read
            </button>
            <button 
              onClick={clearAllNotifications}
              className="w-full bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 transition duration-300"
            >
              Clear All Notifications
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="lg:w-3/4">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
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
                      <div className="mt-2 text-sm text-gray-500">
                        {format(new Date(notification.deliveryDate), 'PPp')}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {!notification.readStatus && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mb-2"
                          aria-label="Mark as read"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => clearAllNotifications()}
                        className="text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
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

