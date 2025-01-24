import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

import Language_component from '@/components/language_component';

const Index = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../assets/icons/app_logo.png')} />
          <Text style={styles.title}>KisanBandhu</Text>
        </View>
        <View>
          <Language_component/>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5', 
  },
  logoContainer: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 120, 
    width: 120, 
    marginBottom: 20, 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333',
  },
  subTitle: {
    padding: 20,
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333',
  }
});