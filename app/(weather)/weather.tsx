import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView} from 'react-native-safe-area-context';
import { 
  
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import weather_icon from '../../context/weather_icon/weather_icon.json';
import axios from 'axios';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';


const HOURLY_API = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=44.34&lon=10.99&appid=90d2e1a10f78f0969364bab71f203ed5';
const DAILY_API = 'https://api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=16&appid=90d2e1a10f78f0969364bab71f203ed5';

const Weather = () => {
  const { t } = useTranslation();
    const [hourlyData, setHourlyData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [location, setLocation] = useState<{
      coords: { latitude: number; longitude: number };
      city: string;
      country: string;
    }>({
      coords: { latitude: 0, longitude: 0 },
      city: '',
      country: ''
    });
    const animation = useRef<LottieView>(null);
  
    useEffect(() => {
      (async () => {
        // Request location permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setIsLoading(false);
          return;
        }
  
        // Get current position
        let location = await Location.getCurrentPositionAsync({});
        
        // Reverse geocode to get city/country
        const geo = await Location.reverseGeocodeAsync(location.coords);
        
        // Update location state
        setLocation({
          coords: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          },
          city: geo[0]?.city || 'Unknown City',
          country: geo[0]?.country || 'Unknown Country'
        });
  
        // Fetch weather data with current coordinates
        try {
          const [hourlyRes, dailyRes] = await Promise.all([
            axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=90d2e1a10f78f0969364bab71f203ed5`),
            axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${location.coords.latitude}&lon=${location.coords.longitude}&cnt=16&appid=90d2e1a10f78f0969364bab71f203ed5`)
          ]);
  
          // Process data
          const processedHourly = processHourlyData(hourlyRes.data.list);
          const processedDaily = dailyRes.data.list.slice(4, 16);
          
          setHourlyData(processedHourly);
          setDailyData(processedDaily);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setErrorMsg('Failed to fetch weather data');
        } finally {
          setIsLoading(false);
        }
      })();
    }, []);

    if (errorMsg) {
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
            <Text style={styles.errorSubtext}>Please enable location services</Text>
          </View>
        );
      }

  const processHourlyData = (list) => {
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
    if ((mph >= 1 && mph < 2) || (mph > 4 && mph <= 5)) return { text: 'Moderate for Spraying', color: '#FFC107' };
    return { text: 'Avoid Spraying', color: '#F44336' };
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    return `${((hour + 11) % 12 + 1)}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const renderHourlyDay = ({ item }) => (
    <View style={styles.hourdayContainer}>
      <View style={styles.hourdayHeader}>
        <Text style={styles.hourdateText}>
          {new Date(item.date).toLocaleDateString(t('en-US'), {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
        <Text style={styles.minMaxText}>
          {t("High")}: {Math.round(item.maxTemp)}°C / {t("Low")}: {Math.round(item.minTemp)}°C
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

  const renderDailyDay = ({ item }) => {
    const sprayCondition = getSprayCondition(item.speed);
  
    return (
      <View style={styles.dailyContainer}>
        <View style={styles.dailydayHeader}>
          <Text style={styles.dailydateText}>{new Date(item.dt * 1000).toLocaleDateString('hi-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
})}</Text>
        
        </View>
        <Text style={styles.dailyminMaxText}>
            {t("High")}: {Math.round(item.temp.max - 273.15)}°C / {t("Low")}: {Math.round(item.temp.min - 273.15)}°C
          </Text>
        <View style={styles.dailyContent}>
          <Image
            source={{ uri: weather_icon[item.weather[0].icon] }}
            style={styles.weatherIcon}
          />
           <Text style={styles.descriptionText}>
              {t(item.weather[0].description)}
            </Text>
         
            {/* <Text style={styles.descriptionText}>
              {item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}
            </Text> */}
            {/* <View style={[styles.sprayCondition, { backgroundColor: sprayCondition.color }]}>
              <Text style={styles.sprayText}>{sprayCondition.text}</Text>
            </View> */}
            <Text style={styles.popText}>🌧️ {Math.round(item.pop * 100)}% {t("Precipitation")}</Text>
          </View>
        
      </View>
    );
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
          {t(item.weather[0].description)}
        </Text>
        <View style={[styles.sprayCondition, { backgroundColor: sprayCondition.color }]}>
          <Text style={styles.sprayText}>{t(sprayCondition.text)}</Text>
        </View>
        <Text style={styles.popText}>🌧️ {Math.round(item.pop * 100)}%</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
         <View style={styles.animationContainer}>
              <LottieView
                autoPlay
                ref={animation}
                style={styles.lottie}
                source={require('../../assets/animations/weather.json')}
              />
              <Text style={styles.loadingText}>{t("loading Weather")}</Text>
            </View>
        
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
  <Text style={styles.title}>
    {location.city}, {t(location.country)}
  </Text>
  <Text style={styles.subtitle}>{t("4 days Hourly")}</Text>
</View>

        {/* Hourly Forecast Section */}
        <FlatList
          data={hourlyData}
          renderItem={renderHourlyDay}
          keyExtractor={(item, index) => `hourly-${index}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hourlyList}
        />

        {/* Daily Forecast Section */}
        <Text style={styles.sectionTitle}>{t("next 12 days")}</Text>
        <FlatList
          data={dailyData}
          renderItem={renderDailyDay}
          keyExtractor={(item, index) => `daily-${index}`}
          numColumns={2}
          contentContainerStyle={styles.dailyGrid}
          scrollEnabled={false} // Disable scrolling since it's inside ScrollView
        />
        
        <FlatList
      // ... existing props ...
      ListFooterComponent={
        <View style={styles.footerContainer}>
          <View style={styles.dailyGrid}>
            {/* Daily forecast grid */}
          </View>
          
          {/* Disclaimer Section */}
          <View style={styles.disclaimerContainer}>
  <Text style={styles.disclaimerHeading}>{t("Important Note for Farmers")}</Text>
  <Text style={styles.disclaimerText}>
    • {t("Weather forecasts are estimates and actual conditions may vary")}{'\n'}
    • {t("Always verify field conditions before agricultural operations")}{'\n'}
    • {t("Wind speed recommendations are general guidelines")}{'\n'}
    • {t("Consider microclimate variations in your specific location")}{'\n'}
    • {t("Consult local agricultural authorities for critical decisions")}{'\n'}
    • {t("Forecast data source: OpenWeatherMap API")}{'\n\n'}
    {t("This information should not be used as sole basis for farming decisions.")}{' '}
    {t("The developers assume no liability for actions taken based on this forecast.")}
  </Text>
</View>
        </View>
      }
    />

    <View style={styles.last}>

        </View>


      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Keep all your existing hourly styles
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
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  hourdayContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 6,
    backgroundColor: '#FAFAFA',
  },
  hourdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#cae1ed',
  },
  hourdateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    flex: 1,
  },
  
  dayContainer: {
    margin: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 6,
    backgroundColor: '#FAFAFA',
  },
  // dailyContainer: {
  //   width: 160,
  //   margin: 8,
  //   borderWidth: 1,
  //   borderColor: '#EEE',
  //   borderRadius: 6,
  //   backgroundColor: '#FAFAFA',
  // },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#cae1ed',
  },
  dailydayHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#cae1ed',
    alignItems: 'center',
    padding: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    flex: 1,
  },
  dailydateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    flex: 1,
  },
  dailyminMaxText:{
    padding: 8,
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    textAlign: 'center',
  },
  minMaxText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    textAlign: 'center',
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
  // weatherIcon: {
  //   width: 40,
  //   height: 40,
  //   marginVertical: 2,
  // },
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
  // popText: {
  //   fontSize: 11,
  //   color: '#2196F3',
  //   fontWeight: '500',
  //   marginTop: 2,
  // },
  // dailyContent: {
  //   flexDirection: 'col',
  //   justifyContent: 'center',
  //   padding: 8,
  //   alignItems: 'center',
  // },
  dailyDetails: {
    flex: 1,
    marginLeft: 12,
  },
  listContent: {
    paddingBottom: 12,
  },
  hourlyList: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
  dailyGrid: {
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  dailyContainer: {
    width: '48%', // Leave 4% space between items
    margin: 4,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    paddingBottom: 8,
  },
  dailyContent: {
    alignItems: 'center',
    padding: 8,
  },
  weatherIcon: {
    width: 48,
    height: 48,
    marginVertical: 4,
  },
  popText: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  footerContainer: {
    paddingBottom: 24, // Add space at bottom
  },
  disclaimerContainer: {
    margin: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  disclaimerHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#6c757d',
  },
  last: {
    height: 50,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffe6e6',
  },
  errorText: {
    color: '#cc0000',
    fontSize: 16,
    textAlign: 'center',
  },
  errorSubtext: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  lottie: {
    width: 300,
    height: 300,
  },
  loadingText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#333',
  },
});

export default Weather;