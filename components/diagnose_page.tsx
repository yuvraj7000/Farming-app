import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Diagnose_page = ({ image, setImage }) => {
  const [ status, setStatus] = useState(false);

  const handleRightChoice = () => {
    setStatus(true);
  };

  const handleWrongChoice = () => {
    setImage(null);
  };
  
  if(status){
   
    return(
        <View style={styles.container}>
        <Text style={styles.message}>Hello, you have chosen right</Text>
      </View>
    )

  }


  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.choiceContainer}>
        <TouchableOpacity style={styles.choiceButton} onPress={handleRightChoice}>
          <Text style={styles.choiceText}>Right</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choiceButton} onPress={handleWrongChoice}>
          <Text style={styles.choiceText}>Wrong</Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
};

export default Diagnose_page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  choiceContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  choiceButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  choiceText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});