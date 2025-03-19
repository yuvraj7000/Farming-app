import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { Link } from 'expo-router'
import * as Location from 'expo-location'
import weatherIcon from '../context/weather_icon/weather_icon.json'
import LottieView from 'lottie-react-native';

const Weather_card = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const animation = useRef<LottieView>(null);

  const API_KEY = '90d2e1a10f78f0969364bab71f203ed5'

  const getSprayCondition = (windSpeed) => {
    const mph = windSpeed * 2.23694
    if (mph >= 2 && mph <= 4) return { text: 'Good for Spraying', color: '#4CAF50' }
    if ((mph >= 1 && mph < 2) || (mph > 4 && mph <= 5)) return { text: 'Moderate', color: '#FFC107' }
    return { text: 'Avoid Spraying', color: '#F44336' }
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') return

        let location = await Location.getCurrentPositionAsync({})
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}`
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
    
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          ref={animation}
          style={styles.lottie}
          source={require('../assets/animations/weather.json')}
        />
        <Text style={styles.loadingText}>Loading weather...</Text>
      </View>
  
  );
}

  if (!weatherData) {
    return (
      <View style={styles.weather}>
        <Text>Failed to load weather data</Text>
      </View>
    )
  }

  const sprayCondition = getSprayCondition(weatherData.wind.speed)
  const rainAmount = weatherData.rain?.['1h'] || weatherData.rain?.['3h'] || 0

  return (
    <View style={styles.weather}>
      <View style={styles.topSection}>
        <View>
          <Text style={styles.temp}>
            {(weatherData.main.temp - 273.15).toFixed(1)}°C
          </Text>
          <Text style={styles.location}>
            {weatherData.name}, {weatherData.sys.country === 'IN' ? 'India' : weatherData.sys.country}
          </Text>

          <View style={styles.conditionContainer}>
            <View style={styles.conditionup}>
              <View style={[styles.sprayCondition, { backgroundColor: sprayCondition.color }]}>
                <Text style={styles.conditionText}>{sprayCondition.text}</Text>
              </View>
              <View style={styles.rainContainer}>
                <Text style={styles.description}>
                  {weatherData.weather[0].description}
                </Text>
              </View>
              
            </View>

            
          </View>
        </View>

        <View style={styles.iconContainer}>
          <Image
            style={styles.weatherIcon}
            source={{ uri: weatherIcon[weatherData.weather[0].icon] }}
          />
          {/* <Text style={styles.description}>
            {weatherData.weather[0].description}
          </Text> */}
        </View>
      </View>

      <View style={styles.conditiondown}>
      <View style={styles.rainContainer}>
                <Text style={styles.conditionValue}>🌧️ {rainAmount}mm</Text>
                {/* <Text style={styles.conditionLabel}>Last hour</Text> */}
              </View>
              <View style={styles.forcast}>
                <Link href="/weather">
                  <View style={styles.linkContainer}>
                    <Text style={styles.link}>See 16 days weather forecast >></Text>
                  </View>
                </Link>
              </View>
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
    padding: 20,
    justifyContent: 'center',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  temp: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 15,
    color: '#666',
    marginBottom: 5,
  },
  iconContainer: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
    // marginBottom: 8,
  },
  conditionContainer: {
    flexDirection: 'col',
    gap: 10,
    // marginTop: 8,
  },
  conditionup: {
    flexDirection: 'row',
    gap: 10,
  },
  conditiondown: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  sprayCondition: {
    borderRadius: 6,

    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rainContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  conditionText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  conditionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
  conditionLabel: {
    fontSize: 12,
    color: '#666',
  },
  forcast: {
    alignItems: 'flex-end',
    marginTop: 1,
  },
  link: {
    color: '#007BFF',
    fontSize: 14,
  },
  animationContainer: {
    width: 350,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  lottie: {
    width: 200,
    height: 100,
  },
  loadingText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#333',
  },

})

export default Weather_card