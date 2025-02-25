import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

const Diagnose_page = ({ image, setImage }) => {
  const [status, setStatus] = useState(false);
  const [apiResponse, setApiResponse] = useState('');

  const handleRightChoice = async () => {
    try {
      if (!image) {
        console.error('No image selected');
        return;
      }

      const formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpeg', // Ensure the correct type
        name: 'image.jpg',
      });
      formData.append('language', 'hindi');

      console.log('Sending Image:', image);

      const response = await fetch('http://165.22.223.49:4000/api/v1/diagnose/plant', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      setApiResponse(data.diagnose || 'No response from API');
      setStatus(true);
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  const handleWrongChoice = () => {
    setImage(null);
  };

  if (status) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Hello, you have chosen right</Text>
        {apiResponse && <Text style={styles.apiResponse}>{apiResponse}</Text>}
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text>No image selected</Text>
        )}
        <View style={styles.choiceContainer}>
          <TouchableOpacity style={styles.choiceButton} onPress={handleRightChoice}>
            <Text style={styles.choiceText}>Right</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.choiceButton} onPress={handleWrongChoice}>
            <Text style={styles.choiceText}>Wrong</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Diagnose_page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  choiceContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  choiceButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
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
  apiResponse: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});
