import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import cropsData from '../context/crop/crops.json'; // Your actual data
import cropImages from '../context/crop/crops.js'; // Your image map
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';


const Crop_section = () => {
  const { t, i18n} = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
    const router = useRouter();
  const handleCropPress = (crop) => {
    console.log(crop);
    router.push(
        {
            pathname: '/crop',
            params: { name: crop.name },
          }
    );
    
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => handleCropPress(item)}>
        <Image 
          source={cropImages[item.name]} // Use imageKey from data to access images
          style={styles.cropImage} 
        />
        <Text style={styles.cropName}>{item[language]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("Information of Crops")}</Text>
      {/* Buttons to change the number of columns */}
    
      <FlatList
        data={cropsData} // Use actual data array
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4} // Dynamically set the number of columns
        key={4} 
        contentContainerStyle={styles.listContent}
      />
    
    </View>
  );
};

export default Crop_section;

const styles = StyleSheet.create({
  container: {
    
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    // color: 'grey',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 110,
  },
  card: {
    flex: 1,
    
    width: 100,
    // aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cropImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

});