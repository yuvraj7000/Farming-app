import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import data from '../assets/state_district.json';

const Dropdown = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const states = data.states.map((state) => ({
    label: state.state,
    value: state.state,
  }));

  const districts = selectedState
    ? data.states.find((state) => state.state === selectedState).districts.map((district) => ({
        label: district,
        value: district,
      }))
    : [];

  return (
    <View style={styles.container}>
        <View style={styles.instruction}>
              <Text style={styles.text}>Get real-time updates on mandi prices across India.</Text>
              </View>
      <Text style={styles.label}>Select State</Text>
      <RNPickerSelect
        onValueChange={(value) => {
          setSelectedState(value);
          setSelectedDistrict(null); // Reset district when state changes
        }}
        items={states}
        style={pickerSelectStyles}
        value={selectedState}
        placeholder={{ label: "Select a state", value: null }}
      />
      {selectedState && (
        <>
          <Text style={styles.label}>Select District</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedDistrict(value)}
            items={districts}
            style={pickerSelectStyles}
            value={selectedDistrict}
            placeholder={{ label: "Select a district", value: null }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'black',
        marginBottom: 10,
    },
    instruction:{
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
  container: {
    padding: 10,
    backgroundColor: '#fff',
    margin: 8,
    padding: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 0,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
  inputAndroid: {
    backgroundColor: '#DBF8FF',
    fontSize: 14,
    // paddingHorizontal: 8,
    // paddingVertical: 1,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
});

export default Dropdown;