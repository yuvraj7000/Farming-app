import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';
import weather_icon from '../../../context/weather_icon/weather_icon.json';
import axios from 'axios';

const API_URL = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=44.34&lon=10.99&appid=90d2e1a10f78f0969364bab71f203ed5';

const Weather = () => {
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(API_URL);
        const groupedData = processForecastData(response.data.list);
        setForecastData(groupedData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const processForecastData = (list) => {
    const grouped = {};
    list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!grouped[date]) {
        grouped[date] = {
          hours: [],
          minTemp: Infinity,
          maxTemp: -Infinity
        };
      }
      
      const temp = item.main.temp - 273.15;
      grouped[date].minTemp = Math.min(grouped[date].minTemp, temp);
      grouped[date].maxTemp = Math.max(grouped[date].maxTemp, temp);
      grouped[date].hours.push(item);
    });
    
    return Object.keys(grouped)
      .sort()
      .slice(0, 4)
      .map(date => ({
        date,
        ...grouped[date]
      }));
  };

  const getSprayCondition = (windSpeed) => {
    const mph = windSpeed * 2.23694;
    if (mph >= 2 && mph <= 4) return { text: 'Good for Spraying', color: '#4CAF50' };
    if ((mph >= 1 && mph < 2) || (mph > 4 && mph <= 5)) return { text: 'Moderate condit.', color: '#FFC107' };
    return { text: 'Avoid Spraying', color: '#F44336' };
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    return `${((hour + 11) % 12 + 1)}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

   const renderHour = ({ item }) => {
    const sprayCondition = getSprayCondition(item.wind.speed);
    
    return (
      <View style={styles.hourContainer}>
        <Text style={styles.timeText}>
          {formatTime(item.dt_txt.split(' ')[1])}
        </Text>
        <Image
          source={{ uri: weather_icon[item.weather[0].icon] }}
          style={styles.weatherIcon}
        />
        <Text style={styles.tempText}>
          {Math.round(item.main.temp - 273.15)}°C
        </Text>
        <Text style={styles.descriptionText}>
          {item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}
        </Text>
        
        <View style={[styles.sprayCondition, { backgroundColor: sprayCondition.color }]}>
          <Text style={styles.sprayText}>{sprayCondition.text}</Text>
        </View>

        <Text style={styles.popText}>
          🌧️ {Math.round(item.pop * 100)}%
        </Text>
      </View>
    );
  };

  const renderDay = ({ item }) => (
    <View style={styles.dayContainer}>
      <View style={styles.dayHeader}>
        <Text style={styles.dateText}>
          {new Date(item.date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
        <Text style={styles.minMaxText}>
          High: {Math.round(item.maxTemp)}°C / Low: {Math.round(item.minTemp)}°C
        </Text>
      </View>
      <FlatList
        horizontal
        data={item.hours}
        renderItem={renderHour}
        keyExtractor={(hour) => hour.dt_txt}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather Forecast</Text>
      </View>
      <FlatList
        data={forecastData}
        renderItem={renderDay}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dayContainer: {
    margin: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 6,
    backgroundColor: '#FAFAFA',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#F5F5F5',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    flex: 1,
  },
  minMaxText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    textAlign: 'right',
  },
  hourContainer: {
    alignItems: 'center',
    margin: 5,
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 6,
    width: 120,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  timeText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    marginBottom: 2,
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginVertical: 2,
  },
  tempText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
    height: 28,
  },
  sprayCondition: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginVertical: 2,
    width: '100%',
  },
  sprayText: {
    fontSize: 11,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  popText: {
    fontSize: 11,
    color: '#2196F3',
    fontWeight: '500',
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 12,
  },
});

export default Weather;