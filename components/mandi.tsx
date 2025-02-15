import React, { useState } from 'react';
import i18next from 'i18next';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import commodity from '../context/i18n/commodity_Translation.json';

const Mandi = ({ data }) => {
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
      <Text style={styles.marketTitle}>All Markets of {data[0].District} District</Text>
      <View style={styles.marketContainer}>
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
              <Text style={styles.tableCommodity}>Commodity</Text>
              <Text style={styles.tableHeader}>Min Price</Text>
              <Text style={styles.tableHeader}>Max Price</Text>
              <Text style={styles.tableHeader}>Modal Price</Text>
            </View>
            {marketDetails.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCellLarge}>
                  <Text style={styles.CommodityText}>
                    {commodity[item.Commodity] && commodity[item.Commodity].translations[i18next.language]
                      ? commodity[item.Commodity].translations[i18next.language]
                      : item.Commodity}
                  </Text>
                  <Text style={styles.varietyText}>{item.Variety}</Text>
                  <Text style={styles.dateText}>{item.Arrival_Date}</Text>
                </View>
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
  marketContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5,
  },
  marketTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  marketButton: {
    backgroundColor: '#FFA001',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 1,
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
  tableCommodity: {
    flex: 3,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#f1f1f1',
  },
  tableHeader: {
    flex: 1,
    fontSize: 16,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    backgroundColor: '#f1f1f1',
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  tableCellLarge: {
    flex: 3,
    padding: 5,
   
  },
  CommodityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  varietyText: {
    fontSize: 12,
    color: '#555',
  },
  dateText: {
    fontSize: 10,
    color: '#888',
  },
});

export default Mandi;