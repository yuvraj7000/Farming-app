import { Stack } from "expo-router";
import "../context/i18n/i18n"

export default function RootLayout() {
 


  return (
  <Stack>
    {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
    <Stack.Screen name="(intro)" options={{ headerShown: false }} />
  </Stack>);
}
