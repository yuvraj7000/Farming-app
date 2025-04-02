import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Text, View, StyleSheet, TouchableOpacity , Image } from 'react-native';
import { useTranslation  } from 'react-i18next';


const DrawerLabel =({label, icon})=>{
    const { t } = useTranslation();
    return(
        <View>
        <Text style={styles.drawerLabel}>{t(label)}</Text>
        </View>
    )
}

export default function Layout() {
  const { t } = useTranslation();
 
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(tabs)" 
          options={{
            drawerLabel: () => ( <View><Text style={styles.headerTitle}>{t('app_name')}</Text></View> ),
            title: 'KisanBandhu',
            headerTitle: () => (
              <Text style={styles.headerTitle}>{t('app_name')}</Text>
            ),

          }}
        />
        <Drawer.Screen
          name="about" 
          options={{
            drawerLabel: () => <DrawerLabel label="About Us" icon="info"/>,
            title: 'About Us',
          }}
        />
        <Drawer.Screen
          name="privacy" 
          options={{
            drawerLabel: () => <DrawerLabel label="Privacy Policy" icon="info"/>,
            title: 'Privacy Policy',
          }}
        />
        <Drawer.Screen
          name="profile" 
          options={{
            drawerLabel: () => <DrawerLabel label="Notification Settings" icon="info"/>,
            title: 'Profile',
          }}
        />
        <Drawer.Screen
          name="language" 
          options={{
            drawerLabel: () => <DrawerLabel label="Select Language" icon="info"/>,
            title: 'Language',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8,
    borderColor: '#ccc',
    borderRadius: 5,
    borderBottomWidth: 1,
    color: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});



