import React from 'react';
import { View, Image, Text } from 'react-native';
import { Tabs } from 'expo-router';

const icons = {
  crop: require('../../../assets/tabBar_icons/crop.png'),
  weather: require('../../../assets/tabBar_icons/weather.png'),
  market: require('../../../assets/tabBar_icons/market.png'),
  other: require('../../../assets/tabBar_icons/other.png'),
};

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{width:100, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={icons[icon]}
        resizeMode="contain"
        style={{ tintColor: color, width: 30, height: 30 }}
      />
    </View>
  );
};

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#000000",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 15, // Change this to the desired font size
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 75,
          
          
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="crop"
              color={color}
              name="Crop"
              focused={focused}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="market"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="market"
              color={color}
              name="Market"
              focused={focused}
            />
          ),
        }}
      />

<Tabs.Screen
        name="weather"
        options={{
          headerShown: false,
          title: "Weather",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="weather"
              color={color}
              name="Weather"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="other"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="other"
              color={color}
              name="Other"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;