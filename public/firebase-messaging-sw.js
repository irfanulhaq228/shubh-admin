// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyB37ek_hwB_FPUmzn_4E1VqXgTKOKAwedM",
  authDomain: "shubh-exchange.firebaseapp.com",
  projectId: "shubh-exchange",
  storageBucket: "shubh-exchange.firebasestorage.app",
  messagingSenderId: "37110600801",
  appId: "1:37110600801:web:9e01d14f0d797ec6930620",
  measurementId: "G-15LPPK4MT9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
