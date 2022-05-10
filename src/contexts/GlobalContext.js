import { unstable_createMuiStrictModeTheme } from '@mui/material';
import { amber, red, yellow } from '@mui/material/colors';
import React, { createContext, useEffect, useState } from 'react';
import { addDoc, doc, collection, getDocs, updateDoc, deleteDoc, setDoc, where, query, getDoc } from 'firebase/firestore';
import db from '../firebase.config';

export const GlobalContext = createContext();

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    mode: 'light',
    primary: {
      main: red[500],
    },
    secondary: {
      main: amber[500],
    },
    sideC: {
      main: yellow[500],
    },
  },
  shape: {
    borderRadius: 15,
  },
});

const getData = async (dbPath, setData) => {
  let data = [];
  const querySnapshot = await getDocs(collection(db, dbPath));
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  setData(data);
};

const handleNewDataF = async (data, vrsta, id, state, setState) => {
  try {
    const docRef =  id === '' ? await addDoc(doc(db, vrsta), { ...data }) : await setDoc(doc(db, vrsta, id), { ...data });
    setState([...state, {id: id === '' ? docRef.id : id, ...data}]);
    console.log('Document written with ID: ', id === '' ? docRef.id : id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const handleUpdateDataF = async (data, vrsta, id, state, setState) => {
  try {
    await updateDoc(doc(db, vrsta, id), { ...data });
    setState([...state.filter(VQ => VQ.id !== id), {id: id, ...data}]);
    console.log('Document updated.');
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

const handleDeleteeDataF = async (vrsta, id, state, setState) => {
  try {
    console.log(vrsta)
    console.log(id)
    await deleteDoc(doc(db, vrsta, id));
    setState([...state.filter(VQ => VQ.id !== id)]);
    console.log('Document deleted.');
  } catch (e) {
    console.error('Error deliting document: ', e);
  }
};

const getUserEmail = async (korisnickoIme) => {
  try{
    const first = query(collection(db, "vodici"), where("korisnickoIme", "==", korisnickoIme));
    const documentSnapshotsFirst = await getDocs(first);
    return documentSnapshotsFirst.docs[0].data().eMail
  }catch (e) {
    return 'error'
  }
};

export function GlobalProvider({ children }) {
  const [vrsteQuadova, setVrsteQuadova] = useState([]);
  const [quadovi, setQuadovi] = useState([]);

  useEffect(() => {
    getData('vrsteQuadova', setVrsteQuadova)
    getData('quadovi', setQuadovi);
    
  }, []);

    
  // console.log(quadovi)
  // console.log(vrsteQuadova)

  const handleNewData = async(data, vrsta, id) => {
    if (vrsta === 'vrsteQuadova')
      await handleNewDataF(data, vrsta, id, vrsteQuadova, setVrsteQuadova)
    else if (vrsta === 'quadovi')
      await handleNewDataF(data, vrsta, id, quadovi, setQuadovi) 
  };

  const handleUpdateData = async(data, vrsta, id) => {
    if (vrsta === 'vrsteQuadova')
      await handleUpdateDataF(data, vrsta, id, vrsteQuadova, setVrsteQuadova)
    else if (vrsta === 'quadovi')
      await handleUpdateDataF(data, vrsta, id, quadovi, setQuadovi)
  };

  const handleDeleteeData = async(vrsta, id) => {
    if (vrsta === 'vrsteQuadova')
      await handleDeleteeDataF(vrsta, id, vrsteQuadova, setVrsteQuadova)
    else if (vrsta === 'quadovi')
      await handleDeleteeDataF(vrsta, id, quadovi, setQuadovi)
  };

  return <GlobalContext.Provider value={{ theme, vrsteQuadova, handleNewData, handleUpdateData, handleDeleteeData, quadovi, getUserEmail}}>{children}</GlobalContext.Provider>;
}
