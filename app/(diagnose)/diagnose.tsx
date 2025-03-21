
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PlantDiagnosis from '@/components/plant_diagnosis';
import { useTranslation } from 'react-i18next';

export default function Diagnose() {
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
<View style={styles.permissionContainer}>
  <Text style={styles.permissionMessage}>
    {t("We need your permission to access the camera")}
  </Text>
  <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
    <Text style={styles.permissionButtonText}>{t("Grant Permission")}</Text>
  </TouchableOpacity>
</View>
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      // base64: true,
    });

    console.log(result);

    if (!result.canceled) {
     setImage(result.assets[0].uri);
    }
    console.log("image ---",image);
  };

  const takePhoto = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync({
        quality: 1,
        // base64: true, 
      });
      setImage(photo.uri);
      console.log(photo);
      
    }
  };

  if (image) {
    console.log("image ---",image);
    return (
      <PlantDiagnosis imageUri={image} setImage ={setImage} />
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={'back'} ref={(ref) => setCameraRef(ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Image source={require('../../assets/icons/take_photo.png')} style={styles.image} />
            <Text style={styles.text}>{t("Take Photo")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Image source={require('../../assets/icons/gallary.png')} style={styles.image} />
            <Text style={styles.text}>{t("Open Gallery")}</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  
    backgroundColor: '#F5F5F5', // Light background for better contrast
    padding: 10,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light background for better contrast
    padding: 20,
  },
  permissionMessage: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333', // Darker text for better readability
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#007BFF', // Blue button background
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  permissionButtonText: {
    color: '#FFF', // White text for better contrast
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333', // Darker text for better readability
  },
  camera: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden', // Ensures the camera view has rounded corners
  },
  buttonContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for buttons
    padding: 10,
    borderRadius: 10,
    margin: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#007BFF', // Blue button background
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF', // White text for better contrast on blue buttons
    marginTop: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
});