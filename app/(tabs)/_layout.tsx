import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const RootLayout = () => {
  return (
    <Tabs >
      <Tabs.Screen name='home' options={{ headerShown: false }}/>
      <Tabs.Screen name='weather' options={{ headerShown: false }}/>
      <Tabs.Screen name='market' options={{ headerShown: false }}/>
        <Tabs.Screen name='other' options={{ headerShown: false }}/>
      </Tabs>
  )
}

export default RootLayout