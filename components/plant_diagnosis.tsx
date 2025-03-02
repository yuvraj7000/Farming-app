import React, { useEffect, useState, useRef } from 'react';
import { Platform, Text, Image, TouchableOpacity, View , StyleSheet } from 'react-native';
import Diagnose_presentation from './diagnose_presentation';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const PlantDiagnosis = ({ imageUri, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const animation = useRef<LottieView>(null);

  const uploadImage = async (uri, language) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      formData.append('language', language);
  
      const res = await axios.post('http://165.22.223.49:5000/api/v1/diagnose/plant', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const jsonString = res.data.diagnose.replace(/```json|```/g, '');
      const diagnoseObject = JSON.parse(jsonString);
      setResponse(diagnoseObject);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (response) {
    return <Diagnose_presentation imageUri={imageUri} data={response} />;
  }

  const handleRightChoice = () => {
    uploadImage(imageUri, 'hindi');
  };

  const handleWrongChoice = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
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

      {loading && (
        <View style={styles.overlay}>
          <View style={styles.animationContainer}>
            <LottieView
              autoPlay
              ref={animation}
              style={styles.lottie}
              source={require('../assets/animations/Animation - 1740852996224.json')}
            />
            <Text style={styles.loadingText}>Analyzing your plant...</Text>
          </View>
        </View>
      )}
    </View>
  );
};

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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#333',
  },
});

export default PlantDiagnosis;