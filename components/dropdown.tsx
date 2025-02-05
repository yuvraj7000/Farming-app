import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import statesData from '../assets/state_district.json';
import Mandi_Data from './mandi_data';

const Dropdown = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [search, setSearch] = useState(false);
  const [key, setKey] = useState(0);
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
    if(selectedState && selectedDistrict){
      setKey(prevKey => prevKey + 1);
      setSearch(true);
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
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      
      {search && <Mandi_Data key={key} state={selectedState} district={selectedDistrict} />}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginBottom: 10,
  },
});

export default Dropdown;