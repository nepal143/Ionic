import React, { useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

const App = () => {
  useEffect(() => {
    const setupPushNotifications = async () => {
      // Request permission for push notifications
      const result = await PushNotifications.requestPermissions();
      if (result.receive === 'granted') {
        // Register for push notifications
        PushNotifications.register();
      } else {
        console.error('Push Notification permission denied');
        return;
      }

      // Handle token received
      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration token:', token.value);
      });

      // Handle registration error
      PushNotifications.addListener('registrationError', (error) => {
        console.error('Push registration error:', error);
      });

      // Handle notification received
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push notification received:', notification);
      });

      // Handle notification action performed
      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push notification action performed:', notification);
      });
    };

    const scheduleLocalNotifications = async () => {
      // Request permission for local notifications
      const { display } = await LocalNotifications.requestPermissions();
      if (display === 'granted') {
        console.log('Local Notification permission granted');
        // Schedule a notification every minute
        LocalNotifications.schedule({
          notifications: [
            {
              id: 1,
              title: 'Test Notification',
              body: 'This is a notification sent every minute.',
              schedule: {
                every: 'minute', // Sends notification every minute
              },
            },
          ],
        });
      } else {
        console.error('Local Notification permission denied');
      }
    };

    setupPushNotifications();
    scheduleLocalNotifications();
  }, []);

  return (
    <div>
      <h1>React + Ionic + Push Notifications</h1>
    </div>
  );
};

export default App;
