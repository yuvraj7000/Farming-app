import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Text, View, StyleSheet, TouchableOpacity  } from 'react-native';


const DrawerLabel =({label, icon})=>{
    return(
        <View>
        <Text style={styles.drawerLabel}>{label}</Text>
        </View>
    )
}

export default function Layout() {
 
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(tabs)" 
          options={{
            drawerLabel: () => ( <View><Text style={styles.drawerLabel}>KisanBandhu</Text></View> ),
            title: 'KisanBandhu',
            headerTitle: () => (
              <Text style={styles.headerTitle}>KisanBandhu</Text>
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
          name="privacy" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: () => <DrawerLabel label="Privacy Policy" icon="info"/>,
            title: 'Privacy Policy',
          }}
        />
        <Drawer.Screen
          name="profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: () => <DrawerLabel label="Profile" icon="info"/>,
            title: 'Profile',
          }}
        />
        <Drawer.Screen
          name="language" // This is the name of the page and must match the url from root
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
    color: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});



