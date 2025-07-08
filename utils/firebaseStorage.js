// utils/firebaseStorage.js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { firebaseApp } from '../firebaseConfig'; // You’ll create this file next

const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const uploadImageToFirebase = async (uri, metadata) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const fileName = `images/${Date.now()}.jpg`;
    const imageRef = ref(storage, fileName);

    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);

    const docRef = await addDoc(collection(firestore, 'animal_images'), {
      imageUrl: downloadURL,
      ...metadata,
      timestamp: Timestamp.now(),
    });

    console.log('Uploaded to Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
