import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

import Language_component from '@/components/language_component';

const Index = () => {
  return (
    <SafeAreaProvider>
      
      <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../assets/icons/app_logo.png')} />
        </View>
        <View>
          <Language_component/>
        </View>
        </ScrollView>

      </SafeAreaView>
      
    </SafeAreaProvider>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
  logoContainer: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100, 
    width: 100, 
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10, // For Android shadow
}
});