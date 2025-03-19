import React from 'react';
import { Stack } from 'expo-router';

const WeatherLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="weather"
        options={{
          title: "16 Day Weather Forecast",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default WeatherLayout;