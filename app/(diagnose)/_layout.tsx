import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const DiagnoseLayout = () => {
  return (
    <Stack
     
    >
      <Stack.Screen
        name="diagnose"
        options={{
          title: 'Diagnose',
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default DiagnoseLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});