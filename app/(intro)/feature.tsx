import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {useTranslation} from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
  {
    heading : 'featureCard_plant_heding',
    content : 'featureCard_plant_content',
    image : '../../assets/icons/dignose_feature',
  },
  {
    content : 'featureCard_weather_content',
    heading : 'featureCard_weather_heding',
    image : '../../assets/icons/weather_feature'
  },
  {
    heading : 'featureCard_mandi_heding',
    content : 'featureCard_mandi_content',
    image : '../../assets/icons/mandi_feature'
  },
]


const FeatureCard = ({heading, content, image}) =>{
   return(
    <View>
      <View></View>
      <View></View>
    </View>
   )
}

const Feature = () => {
  const {t} = useTranslation();
   


  return (
    <SafeAreaView style={styles.container}>
    
    <View style={styles.con1}>
      
       <Image style={styles.logo} source={require('../../assets/icons/app_icon.png')} />
       <Text style={styles.title}>KisanBandhu</Text>
      
    </View>
    <View style={styles.con2}>
    <Text>What we offer</Text>
    
    

    </View>

   
    </SafeAreaView>
  )
}

export default Feature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  con1:{
     flex: 1,
     
     flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 100,
    alignItems: 'center'
  },
  logo: {
    height: 80,
    width: 80
  },
  title: {
    fontSize: 30,
  }
})