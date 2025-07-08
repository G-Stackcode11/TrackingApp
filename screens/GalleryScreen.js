import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GalleryScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const saved = await AsyncStorage.getItem('imageData');
    if (saved) {
      setData(JSON.parse(saved));
    }
  };

  const clearAllData = async () => {
    Alert.alert('Confirm', 'Are you sure you want to delete all saved data?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('imageData');
          setData([]);
          Alert.alert('Deleted', 'All data has been cleared.');
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="🧹 Clear All Data" onPress={clearAllData} color="red" />
      {data.length === 0 ? (
        <Text style={styles.message}>No images saved yet.</Text>
      ) : (
        data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text>Animal ID: {item.metadata.animalId}</Text>
            <Text>Age: {item.metadata.age}</Text>
            <Text>Health: {item.metadata.health}</Text>
            <Text>Body Condition: {item.metadata.bodyCondition}</Text>
            <Text>Remarks: {item.metadata.remarks}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
  },
  card: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
});
