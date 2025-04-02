import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import statesData from '../context/i18n/state_district.json';
import { useTranslation } from 'react-i18next';
import { usePushNotifications } from '../context/usePushNotification.ts'
import axios from 'axios';

const Dropdown = () => {
  const { t, i18n } = useTranslation();
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [send, setSend] = useState(false);
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState(i18n.language);


  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language, language]);

  const { expoPushToken } = usePushNotifications();

  const API_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/pushNotification/add`;


  const stateItems = statesData.states.map((item) => ({
    label: item.state[language],
    value: item.state.en, // Only English value is used for API requests
  }));

  const districtItems =
    selectedState &&
    statesData.states
      .find((item) => item.state.en === selectedState)
      ?.districts.map((district) => ({
        label: district[language],
        value: district.en, // Only English value is used for API requests
      })) || [];


  const sendFcmToken = async (expoPushToken, selectedDistrict) => {
    try {
      const response = await axios.post(API_URL, { fcm_token: expoPushToken.data, district: selectedDistrict, language: language });
      console.log('FCM Token sent:', response.data);
      setSend(true);
      setError(false)
    } catch (error) {
      setError(true)
      setSend(false)
      console.error('Error sending FCM token:', error.response?.data || error.message);
    }
  };



  const handleSearch = () => {


    if (selectedState && selectedDistrict && expoPushToken?.data) {
      try {
        sendFcmToken(expoPushToken, selectedDistrict);
        console.log('FCM Token sent:', expoPushToken, selectedDistrict);
        setSend(true);
        setError(false)
      } catch (error) {
        setError(true)
        setSend(false)
        console.error('Error sending FCM token:', error.response?.data || error.message);
      }
    }
    else {
      console.log('Please select district');
    }

  };


  return (
    <View style={styles.container}>

      <Text style={styles.label}>{t("Select State")} - </Text>
      <RNPickerSelect
        onValueChange={(value) => {
          setSelectedState(value);
          setSelectedDistrict(null);
        }}
        placeholder={{ label: t("Select State"), value: null }}
        items={stateItems}
        style={pickerSelectStyles}
        value={selectedState}
      />

      {selectedState && (
        <>
          <Text style={styles.label}>{t("Select District")} - </Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedDistrict(value)}
            placeholder={{ label: t("Select District"), value: null }}
            items={districtItems}
            style={pickerSelectStyles}
            value={selectedDistrict}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>{t("Add Area for Notifications")}</Text>
      </TouchableOpacity>

      {send && (
        <View style={styles.done}>
          <Text style={styles.donetext}>{t("Successfully added Area for Notification")}</Text>
        </View>
      )}
      {error && (
        <View style={styles.done}>
          <Text style={styles.errtext}>{t("failed to setup your notifications")}</Text>
          <Text style={styles.trytext}>{t("Try Again")}</Text>
        </View>
      )}
      {!send && !error && (
        <View style={styles.done}>
          <Text style={styles.dtext}>{t("select state and district for notifications")}</Text>
        </View>
      )}

      <View style={styles.description}>
        <Text style={styles.destext}> {t("Stay updated with real-time notifications about important updates, weather alerts, and government schemes tailored to your selected district. Add your area now to never miss out on critical information!")}</Text>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
  },
  label: {
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notSelected: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  notext: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  noimage: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 10,
  },
  done: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  donetext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    padding: 20,
  },
  errtext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
  trytext: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
  },
  dtext: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    padding: 20,
  },
  description: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },
  destext: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },

});

export default Dropdown;
