import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import statesData from '../assets/state_district.json';
import { usePushNotifications } from '../context/usePushNotification.ts'

const API_URL = 'http://165.22.223.49:5000/api/v1/pushNotification/add';

const NotificationDropdown = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [search, setSearch] = useState(false);
  const [key, setKey] = useState(0);

    const { expoPushToken, notification } = usePushNotifications();

      // Function to send FCM token to the backend
      const sendFcmToken = async (expoPushToken,selectedDistrict) => {
        try {
          const response = await axios.post(API_URL, { fcm_token: expoPushToken.data, district: selectedDistrict });
          console.log('FCM Token sent:', response.data);
        } catch (error) {
          console.error('Error sending FCM token:', error.response?.data || error.message);
        }
      };



  const stateItems = statesData.states.map((item) => ({
    label: item.state,
    value: item.state,
  }));

  const districtItems =
    selectedState &&
    statesData.states
      .find((item) => item.state === selectedState)
      ?.districts.map((district) => ({
        label: district,
        value: district,
      })) || [];

  const handleSearch = () => {
    // if (selectedState && selectedDistrict) {
    //   setKey((prevKey) => prevKey + 1);
    //   setSearch(true);
    // }
    
     if (selectedState && selectedDistrict && expoPushToken?.data) {
    try {
      sendFcmToken(expoPushToken, selectedDistrict);
      console.log('FCM Token sent:', expoPushToken, selectedDistrict);
    } catch (error) {
      console.error('Error sending FCM token:', error.response?.data || error.message);
    }
  }
  else{
    console.log('Please select district');
  }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select State</Text>
      <RNPickerSelect
        onValueChange={(value) => {
          setSelectedState(value);
          setSelectedDistrict(null);
        }}
        placeholder={{ label: 'Select a state', value: null }}
        items={stateItems}
        style={pickerSelectStyles}
        value={selectedState}
      />

      {selectedState && (
        <>
          <Text style={styles.label}>Select District</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedDistrict(value)}
            placeholder={{ label: 'Select a district', value: null }}
            items={districtItems}
            style={pickerSelectStyles}
            value={selectedDistrict}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>add district</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  label: {
    fontSize: 14,
    // marginBottom: 5,
    // marginTop: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    // marginTop: 10,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  notSelected: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    // paddingVertical: 6,
    // paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    // marginBottom: 8,
  },
  inputAndroid: {
    fontSize: 14,
    // paddingHorizontal: 8,
    // paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    // marginBottom: 8,
  },
});

export default NotificationDropdown;