// utils/firebaseStorage.js

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { firebaseApp } from '../firebaseConfig';

// Initialize Firebase services
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

//  Helper: Convert image URI to Blob (works for content:// URIs)
const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(new Error('Failed to convert URI to blob'));
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send();
  });
};

//  Main Upload Function
export const uploadImageToFirebase = async (uri, metadata) => {
  try {
    console.log("📸 Uploading URI:", uri);

    // Use XMLHttpRequest instead of fetch to handle Android URIs
    const blob = await uriToBlob(uri);

    const fileName = `images/${Date.now()}.jpg`;
    const imageRef = ref(storage, fileName);

    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);

    const docRef = await addDoc(collection(firestore, 'animal_images'), {
      imageUrl: downloadURL,
      ...metadata,
      timestamp: Timestamp.now(),
    });

    console.log('✅ Uploaded to Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Upload error:', error);
    throw error;
  }
};
