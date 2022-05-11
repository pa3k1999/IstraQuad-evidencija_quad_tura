import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

import db from '../firebase.config';

export const getDataF = async (dbPath, setData) => {
  let data = [];
  const querySnapshot = await getDocs(collection(db, dbPath));
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  setData(data);
};

export const handleNewDataF = async (data, vrsta, id, state, setState) => {
  try {
    const docRef = (id === '' ? await addDoc(collection(db, vrsta), { ...data }) : await setDoc(doc(db, vrsta, id), { ...data }));
    setState([...state, { id: id === '' ? docRef.id : id, ...data }]);
    console.log('Document written with ID: ', id === '' ? docRef.id : id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const handleUpdateDataF = async (data, vrsta, id, state, setState) => {
  try {
    await updateDoc(doc(db, vrsta, id), { ...data });
    setState([...state.filter((VQ) => VQ.id !== id), { id: id, ...data }]);
    console.log('Document updated.');
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const handleDeleteeDataF = async (vrsta, id, state, setState) => {
  try {
    console.log(vrsta);
    console.log(id);
    await deleteDoc(doc(db, vrsta, id));
    setState([...state.filter((VQ) => VQ.id !== id)]);
    console.log('Document deleted.');
  } catch (e) {
    console.error('Error deliting document: ', e);
  }
};