import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


import data from '../assets/state_district.json';
import { useSelector, useDispatch } from 'react-redux'
import {setMarkets, setRecords} from '../context/redux/sclice'


const Dropdown = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [sdata, ssdata] = useState(null);

  const dispatch = useDispatch();

  function getUniqueMarkets(apiResponse) {

    const allMarkets = apiResponse.records.map(item => item.market);
    

    const uniqueMarkets = [...new Set(allMarkets)];
    
    console.log('Unique Markets:', uniqueMarkets);
    return uniqueMarkets;
  }
  
  if (sdata){
    console.log('sdata:', 'helloooo');
  }

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

  const handleSearch = () => {
    if (!selectedState || !selectedDistrict) return;

    const apiKey = '579b464db66ec23bdd0000010a5d8d330fe04faf5faa8fe9223be9d4';
    const encodedState = encodeURIComponent(selectedState);
    const encodedDistrict = encodeURIComponent(selectedDistrict);
    
    const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&limit=1000&filters%5Bstate.keyword%5D=${encodedState}&filters%5Bdistrict%5D=${encodedDistrict}`;
    console.log('API URL:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        dispatch(setRecords(data.records));
        dispatch(setMarkets(getUniqueMarkets(data)));
        // ssdata(getUniqueMarkets(data));

        // Handle the response data here
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.instruction}>
        <Text style={styles.text}>Get real-time updates on mandi prices across India.</Text>
      </View>
      
      <Text style={styles.label}>Select State</Text>
      <RNPickerSelect
        onValueChange={(value) => {
          setSelectedState(value);
          setSelectedDistrict(null);
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

      <TouchableOpacity
        style={[styles.button, (!selectedState || !selectedDistrict) && styles.buttonDisabled]}
        onPress={handleSearch}
        disabled={!selectedState || !selectedDistrict}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity> 
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
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
