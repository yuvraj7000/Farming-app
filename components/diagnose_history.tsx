import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router'; 

const HistoryCard = ({ imageUri, response, onDelete }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.cardContent}>
      <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/diagnosePresentation',
              params: { imageUri, response: JSON.stringify(response) }, // Pass data as query parameters
            })
          }
        >
        <Text style={styles.remarks}>
          {response.remarks
            ? response.remarks.split(' ').slice(0, 10).join(' ') + '...'
            : response.Description.split(' ').slice(0, 10).join(' ') + '...'}
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>{t("Delete")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DiagnoseHistory = () => {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const value = await AsyncStorage.getItem('diagnose_history');
      if (value) {
        setHistory(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const deleteHistoryItem = async (index) => {
    try {
      const updatedHistory = [...history];
      updatedHistory.splice(index, 1); // Remove the item at the specified index
      setHistory(updatedHistory);
      await AsyncStorage.setItem('diagnose_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error deleting history item:', error);
    }
  };

  // Refetch history whenever the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t("Diagnose History")}</Text>
      {history.length > 0 ? (
        history.map((val, index) => (
          <HistoryCard
            key={index}
            imageUri={val.imageUri}
            response={val.response}
            onDelete={() =>
              Alert.alert(
                t("Delete Confirmation"),
                t("Are you sure you want to delete this item?"),
                [
                  { text: t("Cancel"), style: "cancel" },
                  { text: t("Delete"), style: "destructive", onPress: () => deleteHistoryItem(index) },
                ]
              )
            }
          />
        ))
      ) : (
        <Text style={styles.noHistory}>{t("No history available")}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#DDD',
    borderTopWidth: 2,
    padding: 10,
    width: 370,
    marginTop: 10,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,

  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  remarks: {
    fontSize: 12,
    width: 210,
    color: '#333',
    paddingHorizontal: 10,
  },
  deleteButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF4D4D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noHistory: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DiagnoseHistory;