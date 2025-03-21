import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import { usePushNotifications } from '../context/usePushNotification.ts'

const API_URL = 'http://165.22.223.49:5000/api/v1/pushNotification/add';


const Notification_Card = () => {
 
    const { expoPushToken, notification } = usePushNotifications();

      // Function to send FCM token to the backend
      const sendFcmToken = async (token) => {
        try {
          const response = await axios.post(API_URL, { fcm_token: token });
          console.log('FCM Token sent:', response.data);
        } catch (error) {
          console.error('Error sending FCM token:', error.response?.data || error.message);
        }
      };
    
      // Send FCM token when it's available
      useEffect(() => {
        if (expoPushToken?.data) {
          sendFcmToken(expoPushToken.data);
        }
      }, [expoPushToken]);


    return (
      <View>
        <Text>notification_card</Text>
      </View>
    )
  }


const styles = StyleSheet.create({})

export default Notification_Card