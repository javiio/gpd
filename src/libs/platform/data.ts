import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

// Dev keys. TODO: move to env vars
const firebaseConfig = {
  apiKey: 'AIzaSyDoHZo0ZK8yDhOv7crptXvOj8Q7BjX9ZPk',
  authDomain: 'nextdesign-d9dfa.firebaseapp.com',
  projectId: 'nextdesign-d9dfa',
  storageBucket: 'nextdesign-d9dfa.appspot.com',
  messagingSenderId: '863435879874',
  appId: '1:863435879874:web:6ab1c45cc9b3493179d25b',
  measurementId: 'G-NMMBKW0DEB',
};

const firebaseApp = initializeApp(firebaseConfig);

export const currentUser = {
  id: 'javi',
};

export const useUserCollection = (path: string) =>
  useCollection(
    collection(getFirestore(firebaseApp), `users/${currentUser.id}/${path}`),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

export const useUserDoc = (...path: string[]) => {
  return useDocument(
    doc(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
};

export const setUserDoc = async (data: object, ...path: string[]) => {
  await setDoc(
    doc(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path),
    data,
    { merge: true }
  );
};

export const addArrayItemUserDoc = async (
  data: object,
  attribute: string,
  ...path: string[]
) => {
  await updateDoc(
    doc(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path),
    {
      [attribute]: arrayUnion(data),
    }
  );
};
