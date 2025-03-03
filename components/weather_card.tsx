import { StyleSheet, Text, View, Image, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'expo-router'
import * as Location from 'expo-location'
import weatherIcon from '../context/weather_icon/weather_icon.json'


const Weather_card = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_KEY = '90d2e1a10f78f0969364bab71f203ed5'

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          alert('Permission to access location was denied')
          return
        }

        let location = await Location.getCurrentPositionAsync({})
        const { latitude, longitude } = location.coords

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        )

        setWeatherData(response.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <View style={styles.weather}>
        <Text>Loading weather data...</Text>
      </View>
    )
  }

  if (!weatherData) {
    return (
      <View style={styles.weather}>
        <Text>Failed to load weather data</Text>
      </View>
    )
  }

  return (
    <View style={styles.weather}>
      <View style={styles.topSection}>
        <View>
          <Text style={styles.temp}>
            {(weatherData.main.temp - 273.15).toFixed(1)}°C
          </Text>
          <Text style={styles.location}>
            {weatherData.name}, India
          </Text>
          <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{weatherData.main.humidity}%</Text>
          <Text style={styles.statLabel}>Humidity</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{weatherData.wind.speed}m/s</Text>
          <Text style={styles.statLabel}>Wind</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{weatherData.main.pressure}hPa</Text>
          <Text style={styles.statLabel}>Pressure</Text>
        </View>
      </View>
        </View>
        
        <View style={styles.iconContainer}>
            <Image
          style={styles.weatherIcon}
          source={{
            uri: weatherIcon[weatherData.weather[0].icon],
          }}
        />
        <Text style={styles.description}>
        {weatherData.weather[0].description}
      </Text>
        
        </View>
       
      </View>

      
      <View style={styles.forcast}>
      <Link href="/weather">
                <View style={styles.linkContainer}>
                  <Text style={styles.link}>See 16 days weather foarcast >></Text>
                  </View>
        </Link>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    weather: {
      width: 350,
      height: 160,
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,

    },
    topSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    temp: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333',
    },
    location: {
      fontSize: 15,
      color: '#666',
    },
    iconContainer: {
      alignItems: 'center',
    },
    weatherIcon: {
      width: 90,
      height: 90,
    },
    description: {
      fontSize: 14,
      color: '#666',
      textTransform: 'capitalize',
    },
    statsContainer: {
      flexDirection: 'row',
      paddingTop: 10,
      gap: 10,
      justifyContent: 'space-between',
    },
    stat: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 14,
      fontWeight: '600',
      color: '#333',
    },
    statLabel: {
      fontSize: 12,
      color: '#666',
    },
    forcast:{
    alignItems: 'flex-end',
    },
    linkContainer: {
     
        borderRadius: 5,
        // padding: 10,
        // width: 150,
        // alignItems: 'center',
    },
  link: {
    // paddingTop: 10,
    color: '#007BFF',
    fontSize: 14,
    // fontWeight: 'bold',
  },
  });

export default Weather_card