import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur'; 

const Diagnose_presentation = ({ imageUri, data }) => {
    const [isImageFullscreen, setIsImageFullscreen] = useState(false);
    const screen = Dimensions.get('window');
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => setIsImageFullscreen(true)}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>
  
        <Modal visible={isImageFullscreen} transparent={true} animationType="fade">
          <TouchableOpacity 
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={() => setIsImageFullscreen(false)}
          >
            <BlurView intensity={1000} tint="dark" style={styles.blurContainer}>
              <Image 
                source={{ uri: imageUri }} 
                style={[
                  styles.fullscreenImage,
                  { width: screen.width * 0.95, height: screen.height * 0.8 }
                ]}
                resizeMode="contain"
              />
            </BlurView>
          </TouchableOpacity>
        </Modal>
        
        {data.cure ? (
        <View style={styles.content}>

          <Text style={styles.description}>{data.Description}</Text>

          <Section title="Symptoms" items={data.symptoms} />
          <Section title="cause" items={data.cause} />
          <Section title="Organic Solution" items={data["Organic solution"]} />
          <Section title="Regular Solution" items={data["Regular solution"]} />
          {data["chemical solution"] && (
            <Section title="Chemical Solution" items={data["chemical solution"]} />
          )}
          <Section title="Important Notes" items={data["important notes"]} />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Diagnosis Failed</Text>
          <Text style={styles.description}>{data.remarks}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const Section = ({ title, items }) => (
  <View style={styles.section}>
    <Text style={styles.subTitle}>{title}:</Text>
    {items.map((item, index) => (
      <Text key={index} style={styles.listItem}>• {item}</Text>
    ))}
  </View>
);

export default Diagnose_presentation;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f5f5f5',
      },
      image: {
        width: '100%',
        height: 300,
        borderRadius: 15,
        marginBottom: 25,
        backgroundColor: '#e0e0e0',
      },
      description: {
        fontSize: 15,
        padding: 10,
        marginBottom: 20,
        color: '#333',},
  content: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  section: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 22,
    paddingLeft: 8,
  },
  // Fullscreen modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  blurContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    // borderRadius: 15,
    // borderWidth: 2,
    // borderColor: 'rgba(255,255,255,0.1)',
  },
 
});