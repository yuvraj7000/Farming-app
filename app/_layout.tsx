import { Stack } from "expo-router";
import "../context/i18n/i18n";

import { Provider } from 'react-redux'
import { store } from "../context/redux/store";

export default function RootLayout() {
 


  return (
    <Provider store={store}>
  <Stack>
    <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    <Stack.Screen name="(intro)" options={{ headerShown: false }} />
  </Stack>
  </Provider>
  );
}
