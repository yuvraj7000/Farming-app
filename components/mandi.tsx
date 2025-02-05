import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Mandi = ({ data}) => {
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [marketDetails, setMarketDetails] = useState([]);

  const uniqueMarkets = [...new Set(data.map(item => item.Market))];

  const handleMarketClick = (market) => {
    const details = data.filter(item => item.Market === market);
    setSelectedMarket(market);
    setMarketDetails(details);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.marketContainer}>
        <Text style={styles.marketTitle}>Markets</Text>
        {uniqueMarkets.map((market, index) => (
          <TouchableOpacity
            key={index}
            style={styles.marketButton}
            onPress={() => handleMarketClick(market)}
          >
            <Text style={styles.marketButtonText}>{market}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMarket && (
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Market Data for {selectedMarket}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Commodity</Text>
              <Text style={styles.tableHeader}>Variety</Text>
              <Text style={styles.tableHeader}>Min Price</Text>
              <Text style={styles.tableHeader}>Max Price</Text>
              <Text style={styles.tableHeader}>Modal Price</Text>
            </View>
            {marketDetails.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.Commodity}</Text>
                <Text style={styles.tableCell}>{item.Variety}</Text>
                <Text style={styles.tableCell}>{item.Min_Price}</Text>
                <Text style={styles.tableCell}>{item.Max_Price}</Text>
                <Text style={styles.tableCell}>{item.Modal_Price}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  marketContainer: {
    marginTop: 20,
  },
  marketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  marketButton: {
    backgroundColor: '#FFA001',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  marketButtonText: {
    color: 'white',
    fontSize: 16,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    flex: 1,
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#f1f1f1',
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
});

export default Mandi;