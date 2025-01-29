import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


const MandiData = () => {
    records = useSelector((state) => state.records);
    uniqueMarkets = useSelector((state) => state.markets);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [marketDetails, setMarketDetails] = useState([]);

  const handleMarketClick = (market) => {
    const details = records.filter(item => item.market === market);
    setSelectedMarket(market);
    setMarketDetails(details);
  };

  if (!records || !uniqueMarkets) {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    );
  }

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
                <Text style={styles.tableCell}>{item.commodity}</Text>
                <Text style={styles.tableCell}>{item.variety}</Text>
                <Text style={styles.tableCell}>{item.min_price}</Text>
                <Text style={styles.tableCell}>{item.max_price}</Text>
                <Text style={styles.tableCell}>{item.modal_price}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

MandiData.propTypes = {
  records: PropTypes.array,
  uniqueMarkets: PropTypes.array,
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

export default MandiData;