import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/button';
import { useRouter } from 'expo-router';
const data = [
  {
    heading: 'featureCard_plant_heading',
    content: 'featureCard_plant_content',
    image: require('../../assets/icons/dignose_feature.png'),
    color: '#E67070',
  },
  {
    heading: 'featureCard_weather_heading',
    content: 'featureCard_weather_content',
    image: require('../../assets/icons/weather_feature.png'),
    color: '#70BDE6',
  },
  {
    heading: 'featureCard_mandi_heading',
    content: 'featureCard_mandi_content',
    image: require('../../assets/icons/mandi_feature.png'),
    color: '#B9E670',
  },
];

const FeatureCard = ({ heading, content, image, color }) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Image source={image} style={styles.cardImage} />
      <View style={styles.textContainer}>
        <Text style={styles.cardHeading}>{t(heading)}</Text>
        <Text style={styles.cardContent}>{t(content)}</Text>
      </View>
    </View>
  );
};

const Feature = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const buttonPress= ()=> {
    router.push('/home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/icons/app_icon.png')} />
        <Text style={styles.title}>KisanBandhu</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.subtitle}>{t('What we offer')}</Text>
        <View style={styles.cardsContainer}>
          {data.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </View>
        <Button buttonName={t('Get Started')} handleDone={buttonPress} />
      </View>
    </SafeAreaView>
  );
};

export default Feature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    height: 80,
    width: 80,
    marginRight: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 14,
  },
});