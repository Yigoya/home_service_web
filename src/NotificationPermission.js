// NotificationPermission.js
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "BMUb69kHSGGsVRbWAFuho3cGV-mRzA0FVQCEvdKxOUD4CBVNeB7HsDJOwvBjOTb6UVlMh02K5MSZCl2u5Yv_caM" });
      console.log("Notification Token:", token);
      localStorage.setItem("FCMToken", token);
      return token;
    } else {
      console.error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error requesting notification permission", error);
  }
};
