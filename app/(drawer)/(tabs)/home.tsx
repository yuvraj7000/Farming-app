import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Market_card from '@/components/market_card'
import Dignose_card from '@/components/dignose_card'
const Home= () => {
  return (
    <SafeAreaView>
    <ScrollView>
    <View style={styles.container}>
        <Text style={styles.moto}>Empowring Farmers for a Better Tomorrow</Text>
        <View style={styles.weather}>
          <Text>Weather Card</Text>
        </View>
        <Market_card />
        <Dignose_card />
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moto: {
    padding: 20,
  
    fontSize: 15,
    // fontWeight: 'bold',
    color: 'black',
  },
  weather: {
    padding: 20,
    width: 350,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})