import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const Index = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../assets/icons/app_logo.png')} />
          <Text style={styles.title}>KisanBandhu</Text>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 150, 
    width: 150, 
    marginBottom: 20, 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333',
  },
});