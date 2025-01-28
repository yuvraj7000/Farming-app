import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Dropdown from '@/components/dropdown'
import { SafeAreaView } from 'react-native-safe-area-context'

const Market = () => {
  return (
    <SafeAreaView>
    <View>
      <Dropdown/>
    </View>
    </SafeAreaView>
  )
}

export default Market

const styles = StyleSheet.create({
  intruction: {
    padding: 5,
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