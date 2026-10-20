importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
firebase.initializeApp({apiKey:"AIzaSyAR1pUCKsQbxTd7JvyLTAl70EK02xc7AcQ",authDomain:"app-sav-dz.firebaseapp.com",projectId:"app-sav-dz",storageBucket:"app-sav-dz.firebasestorage.app",messagingSenderId:"603951553060",appId:"1:603951553060:web:9a3857b769ad8031f556b1"});

const messaging = firebase.messaging();

// Notification pro : icône de l'app + titre/texte du message (pas le style générique de Chrome)
messaging.onBackgroundMessage((payload) => {
  const d = payload.data || {};
  const title = d.title || "Assistant technique SAV";
  self.registration.showNotification(title, {
    body: d.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png",
    tag: d.tag || "sav-notif",
    data: { url: d.url || "./" }
  });
});

// Clic sur la notification = ouvre l'app (ou la ramène au premier plan si déjà ouverte)
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "./";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(self.registration.scope) && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

