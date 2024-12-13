importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyAD1kXO44hQ4RP3068xd4Q9lEsgXWTiNUM",
    authDomain: "home-service-92c52.firebaseapp.com",
    projectId: "home-service-92c52",
    storageBucket: "home-service-92c52.firebasestorage.app",
    messagingSenderId: "550887223281",
    appId: "1:550887223281:web:70ad4c0db2705ec893de50",
    measurementId: "G-RMS5D6KQZV"
  });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received:", event.notification);

  event.notification.close(); // Close the notification

  // Navigate to a specific URL
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // If a tab with the app is already open, focus it

      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new tab with the app
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});
