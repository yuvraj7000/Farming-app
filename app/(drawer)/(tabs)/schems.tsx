import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch('http://165.22.223.49:5000/api/v1/schemes/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language_code: 'en' }),
        });

        if (!response.ok) throw new Error('Failed to fetch schemes');

        const data = await response.json();
        setSchemes(data.schemes);
        setFilteredSchemes(data.schemes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const filterSchemes = (filterType) => {
    setSelectedFilter(filterType);
    switch (filterType) {
      case 'Central':
        setFilteredSchemes(schemes.filter((s) => s.gov_level === 'Central'));
        break;
      case 'State':
        setFilteredSchemes(schemes.filter((s) => s.gov_level === 'State'));
        break;
      case 'Private':
        setFilteredSchemes(schemes.filter((s) => s.type === 'Private'));
        break;
      default:
        setFilteredSchemes(schemes);
    }
  };

  const renderSchemeDetails = () => (
    <View style={styles.detailsContainer}>
    {/* Back button with absolute positioning */}
    <TouchableOpacity 
      style={styles.backButton} 
      onPress={() => setSelectedScheme(null)}
    >
      <Text style={styles.backButtonText}>‹ Back</Text>
    </TouchableOpacity>
    <ScrollView style={styles.detailsContainer}>
      {/* <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => setSelectedScheme(null)}
      >
        <Text style={styles.backButtonText}>‹ Back</Text>
      </TouchableOpacity> */}

      <View style={styles.detailsContent}>
        <Text style={styles.detailsTitle}>{selectedScheme.name}</Text>
        
        <View style={styles.metaRow}>
          <Text style={styles.metaPill}>{selectedScheme.type}</Text>
          <Text style={styles.metaPill}>{selectedScheme.gov_level}</Text>
        </View>

        {selectedScheme.image_url && (
          <Image 
            source={{ uri: selectedScheme.image_url }} 
            style={styles.detailsImage} 
          />
        )}

        <View style={styles.detailSection}>
          <Text style={styles.detailHeading}>Funding</Text>
          <Text style={styles.detailValue}>₹{selectedScheme.funding_amount}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailHeading}>Description</Text>
          <Text style={styles.detailText}>{selectedScheme.description}</Text>
        </View>

        <DetailList title="Benefits" items={selectedScheme.benefits} />
        <DetailList title="Eligibility" items={selectedScheme.eligibility} />
        <DetailList title="Application Process" items={selectedScheme.application_process} />

        {/* <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkButtonText}>Official Website</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
    </View>
  );

  const DetailList = ({ title, items }) => (
    <View style={styles.detailSection}>
      <Text style={styles.detailHeading}>{title}</Text>
      {items.map((item, index) => (
        <Text key={index} style={styles.bulletItem}>• {item}</Text>
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => setSelectedScheme(item)}
      activeOpacity={0.9}
    >
      {/* Image thumbnail with fallback */}
      {item.image_url ? (
        <Image 
          source={{ uri: item.image_url }} 
          style={styles.imageThumbnail} 
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
  
      {/* Status indicator */}
      {item.status && (
        <View style={[
          styles.statusIndicator,
          item.status === 'ACTIVE' ? styles.activeStatus : styles.inactiveStatus
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      )}
  
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>
  
        <View style={styles.metaRow}>
          <Text style={styles.govLevel}>{item.gov_level}</Text>
          <Text style={styles.fundingAmount}>₹{parseFloat(item.funding_amount).toLocaleString()}</Text>
        </View>
  
        {/* Date information */}
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel} numberOfLines={1}>
            {new Date(item.start_date).toLocaleDateString()} -{' '}
            {new Date(item.end_date).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  if (selectedScheme) {
    return renderSchemeDetails();
  }

  return (
    <View style={styles.container}>
      {/* Filter Buttons */}
      <FlatList
      data={filteredSchemes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      numColumns={1}
      ListHeaderComponent={
        <View style={styles.filterContainer}>
          <FilterButton 
            label="All" 
            active={selectedFilter === 'all'} 
            onPress={() => filterSchemes('all')} 
          />
          <FilterButton 
            label="Central" 
            active={selectedFilter === 'Central'} 
            onPress={() => filterSchemes('Central')} 
          />
          <FilterButton 
            label="State" 
            active={selectedFilter === 'State'} 
            onPress={() => filterSchemes('State')} 
          />
          <FilterButton 
            label="Private" 
            active={selectedFilter === 'Private'} 
            onPress={() => filterSchemes('Private')} 
          />
        </View>
      }
    />
    </View>
  );
};

const FilterButton = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.filterButton, active && styles.activeFilter]}
    onPress={onPress}
  >
    <Text style={[styles.filterText, active && styles.activeFilterText]}>{label}</Text>
  </TouchableOpacity>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  activeFilter: {
    backgroundColor: '#2b50ed',
  },
  filterText: {
    color: '#495057',
    fontSize: 14,
  },
  activeFilterText: {
    color: 'white',
  },
  listContent: {
    // padding: 1,
  },
  cardPill: {
    fontSize: 12,
    backgroundColor: '#f1f3f5',
    color: '#495057',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#868e96',
    marginBottom: 8,
  },
  cardFunding: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2b50ed',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative', // Needed for absolute positioning of children
  },
  backButton: {
    position: 'absolute',
    bottom: 20, // Adjust based on your safe area
    right: 20,
    zIndex: 1000,
    backgroundColor: 'rgba(76, 73, 246, 1)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    // elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsScrollContainer: {
    flex: 1,
    paddingTop: 80, // Make space for the absolute button
  },
  detailsContent: {
    padding: 20,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 16,
  },
  metaPill: {
    fontSize: 14,
    backgroundColor: '#f1f3f5',
    color: '#495057',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  detailsImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  detailValue: {
    fontSize: 18,
    color: '#2b50ed',
    fontWeight: '600',
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
  },
  bulletItem: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    marginLeft: 8,
  },
  linkButton: {
    backgroundColor: '#2b50ed',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  linkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageThumbnail: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imagePlaceholder: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    color: '#666',
    fontSize: 14,
  },
  statusIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    zIndex: 2,
  },
  activeStatus: {
    backgroundColor: '#d4f7dc',
  },
  inactiveStatus: {
    backgroundColor: '#ffe5e5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginRight: 8,
  },
  typeBadge: {
    backgroundColor: '#e8f4ff',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2b50ed',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  govLevel: {
    fontSize: 14,
    color: '#666',
  },
  fundingAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2b50ed',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: '#888',
    flex: 1,
  },
});

export default Schemes;