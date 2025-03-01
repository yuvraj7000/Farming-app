import React, { useEffect, useState } from 'react';
import { Platform, Text, Image, TouchableOpacity, View , StyleSheet } from 'react-native';
import Diagnose_presentation from './diagnose_presentation';
import axios from 'axios';
import LottieView from 'lottie-react-native';


const PlantDiagnosis = ({ imageUri, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

    const uploadImage = async (uri, language) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('image', {
          uri: uri,
          name: 'image.jpg', // Image name
          type: 'image/jpeg', // MIME type
        });
        formData.append('language', language);
    
        const res = await axios.post('http://165.22.223.49:5000/api/v1/diagnose/plant', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log('Response:', res.data);
        try {
          const jsonString = res.data.diagnose.replace(/```json|```/g, ''); // Remove ```json and ```
          const diagnoseObject = JSON.parse(jsonString);
          console.log('diagnoseobject : ',diagnoseObject);
          setResponse(diagnoseObject);
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

  
  
  if(loading){
  return (
    <Text>loading</Text>
  )
}
if(response){
  console.log("response : ",response);
  return (
    <Diagnose_presentation imageUri={imageUri} data={response} />
  )
}

const handleRightChoice =() => {
  uploadImage(imageUri, 'hindi');
}

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
      </View>
  ); // This component doesn't render anything
};

export default PlantDiagnosis;


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