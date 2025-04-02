import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import statesData from '../context/i18n/state_district.json';
import Mandi_Data from './mandi_data';
import { useTranslation } from 'react-i18next';


const Dropdown = () => {
  const { t, i18n } = useTranslation();
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [search, setSearch] = useState(false);
  const [key, setKey] = useState(0);
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language, language]);


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

  const handleSearch = () => {
    if (selectedState && selectedDistrict) {
      setKey((prevKey) => prevKey + 1);
      setSearch(true);
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
        <Text style={styles.buttonText}>{t("Search")}</Text>
      </TouchableOpacity>

      {!search && (
        <View style={styles.notSelected}>
          <Image source={require('../assets/icons/no_mandi_data.png')} style={styles.noimage}></Image>
          <Text style={styles.notext}>{t("Select State and District to see Mandi Prices")}</Text>

        </View>
      )}

      {search && (
        <Mandi_Data
          key={key}
          state={selectedState}
          district={selectedDistrict}
          transDistrict={
            statesData.states
              .find((s) => s.state.en === selectedState)
              ?.districts.find((d) => d.en === selectedDistrict)?.[language] || ''
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 5,
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
