import { API_URL } from "../../Shared/api";

export const customerSignUpApi = `${API_URL}/auth/customer/signup`
export const CustomerIdentity = `${API_URL}/profile/customer`;
export const CustomerJobs = `${API_URL}/booking/customer`
export const TechnicianListApi = `${API_URL}/profile/technician`
export const SingleTech = `${API_URL}/technicians`
export const SingleService = `${API_URL}/services`
export const TechnicianBooking = `${API_URL}/booking/request`
export const CustomerNotificationApi = `${API_URL}/notifications/unread`
export const notificationStatusApi = `${API_URL}/notifications/fcm-send`
export const techDetailApi = `${API_URL}/profile/technician`
export const checkoutApi = `${API_URL}/payment/initialize`
