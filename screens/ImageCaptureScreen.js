import React, { useState } from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MetadataForm from '../components/MetadataForm';
import { saveImageWithMetadata } from '../utils/storage'; // for local storage
import { uploadImageToFirebase } from '../utils/firebaseStorage'; // for cloud storage
import { useNavigation } from '@react-navigation/native';

export default function ImageCaptureScreen() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isReadyForMetadata, setIsReadyForMetadata] = useState(false);
  const navigation = useNavigation();

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }

    launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        const newImage = response.assets[0];
        setSelectedImages((prev) => [...prev, newImage.uri]);
        setIsReadyForMetadata(false); // Wait for Done Capturing
      }
    });
  };

  const pickFromGallery = () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 0 }, // 0 = unlimited selection
      (response) => {
        if (!response.didCancel && !response.errorCode) {
          const uris = response.assets.map((asset) => asset.uri);
          setSelectedImages((prev) => [...prev, ...uris]);
          setIsReadyForMetadata(true); // Show metadata form
        }
      }
    );
  };

  const removeAll = () => {
    setSelectedImages([]);
    setIsReadyForMetadata(false);
  };

  const onSubmitMetadata = async (metadata) => {
    if (selectedImages.length === 0) {
      Alert.alert('No Images', 'Please select or capture images first.');
      return;
    }

    try {
      for (const uri of selectedImages) {
        await saveImageWithMetadata(uri, metadata); // save locally
        await uploadImageToFirebase(uri, metadata); // upload to Firebase
      }

      Alert.alert('✅ Success', 'Metadata saved and uploaded successfully.');
      setSelectedImages([]);
      setIsReadyForMetadata(false);
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('❌ Error', 'Failed to upload image or metadata.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="📸 Take Photo" onPress={takePhoto} />
      <Button title="🖼️ Pick from Gallery" onPress={pickFromGallery} />
      <Button title="❌ Clear Selection" onPress={removeAll} color="red" />
      <Button title="📂 View Gallery" onPress={() => navigation.navigate('Gallery')} />

      <View style={styles.imagePreviewContainer}>
        {selectedImages.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.thumbnail} />
        ))}
      </View>

      {selectedImages.length > 0 && !isReadyForMetadata && (
        <Button
          title="✅ Done Capturing"
          onPress={() => setIsReadyForMetadata(true)}
          color="green"
        />
      )}

      {isReadyForMetadata && <MetadataForm onSubmit={onSubmitMetadata} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    justifyContent: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
});
