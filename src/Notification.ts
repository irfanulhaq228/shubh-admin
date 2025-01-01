// src/Notification.tsx
import { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase';

const requestFcmToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
    console.log('FCM Token:', token);
    return token;
  } catch (err) {
    console.log('Permission denied or error occurred', err);
    return null;
  }
};

const Notification = () => {
  useEffect(() => {
    requestFcmToken().then((token) => {
      if (token) {
        // Save the token to your server if needed
      }
    });

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Handle the notification
    });
  }, []);

  return null;
};

export default Notification;
