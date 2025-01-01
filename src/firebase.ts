// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyB37ek_hwB_FPUmzn_4E1VqXgTKOKAwedM",
  authDomain: "shubh-exchange.firebaseapp.com",
  projectId: "shubh-exchange",
  storageBucket: "shubh-exchange.firebasestorage.app",
  messagingSenderId: "37110600801",
  appId: "1:37110600801:web:9e01d14f0d797ec6930620",
  measurementId: "G-15LPPK4MT9"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registration successful with scope: ', registration.scope);
    }).catch((err) => {
      console.log('Service Worker registration failed: ', err);
    });
}

export { messaging, getToken, onMessage };
