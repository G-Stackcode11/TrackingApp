import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveImageWithMetadata = async (imageUri, metadata) => {
  try {
    const entry = {
      uri: imageUri,
      metadata,
      timestamp: Date.now(),
    };

    const existing = await AsyncStorage.getItem('imageData');
    const data = existing ? JSON.parse(existing) : [];
    data.push(entry);

    await AsyncStorage.setItem('imageData', JSON.stringify(data));
    console.log('Image metadata saved to AsyncStorage');
  } catch (e) {
    console.error('Failed to save data:', e);
  }
};


export const getAllSavedImages = async () => {
  try {
    const json = await AsyncStorage.getItem('imageData');
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load image metadata:', e);
    return [];
  }
};

export const clearAllImageData = async () => {
  try {
    await AsyncStorage.removeItem('imageData');
    console.log('All image metadata cleared');
  } catch (e) {
    console.error('Failed to clear data:', e);
  }
};
