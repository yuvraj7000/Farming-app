import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const Market_card = () => {
    
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/icons/mandi_feature.png')} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.description}>Get real-time prices of commodities from mandis across the country.</Text>
          <Link href="/market">
          <View style={styles.linkContainer}>
            <Text style={styles.link}>See Mandi Prices</Text>
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Market_card;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#70BDE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 350,
    height: 140,
    borderRadius: 10,
    backgroundColor: '#70BDE6',
    padding: 20,
  },
  image: {
    height: 90,
    width: 90,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 230,
  },
  description: {
    fontSize: 13,
    marginBottom: 10,
  },
    linkContainer: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
        width: 150,
        alignItems: 'center',
    },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});