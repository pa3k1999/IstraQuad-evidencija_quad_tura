import React, { createContext, useEffect, useState } from 'react';
import { getDataF, handleNewDataF, handleUpdateDataF } from './firestoreFunkcije';
import db from '../firebase.config';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

export const VrsteQuadovaContext = createContext();

const handleDeleteVQuada = async (id, state, setState) => {
  try {
    await deleteDoc(doc(db, 'vrsteQuadova', id));
    setState([...state.filter((VQ) => VQ.id !== id)]);
    const queryQuadovi = query(collection(db, 'quadovi'), where('vrstaQuadaId', '==', id));
    const queryRefQuadovi = await getDocs(queryQuadovi);
    queryRefQuadovi.forEach((docQ) => {
      deleteDoc(doc(db, 'quadovi', docQ.id));
      const queryTure = query(collection(db, 'ture'), where('quadovi', 'array-contains', docQ.id));
      getDocs(queryTure).then((queryRefTure) => {
        queryRefTure.forEach((docT) => {
          deleteDoc(doc(db, 'ture', docT.id));
        });
      });
    });
    console.log('Document deleted.');
  } catch (e) {
    console.error('Error deliting document: ', e);
  }
};

export function VrsteQuadovaProvider({ children }) {
  const [selectedVrstaQuada, setSelectedVrstaQuada] = useState({ id: '', naziv: '', obujamMotora: '', boja: '' });

  const [vrsteQuadova, setVrsteQuadova] = useState([]);

  useEffect(() => {
    getDataF('vrsteQuadova', setVrsteQuadova);
    console.log('--Fetching data from firebase (vrsteQuadova i quadovi), then rerender--');
  }, []);

  const handleNewDataVQuada = async (data, id) => {
    await handleNewDataF(data, 'vrsteQuadova', id, vrsteQuadova, setVrsteQuadova);
  };

  const handleUpdateDataVQuada = async (data, id) => {
    await handleUpdateDataF(data, 'vrsteQuadova', id, vrsteQuadova, setVrsteQuadova);
  };

  const handleDeleteeDataVQuada = async (id) => {
    await handleDeleteVQuada(id, vrsteQuadova, setVrsteQuadova);
  };

  return (
    <VrsteQuadovaContext.Provider
      value={{
        selectedVrstaQuada,
        setSelectedVrstaQuada,
        handleNewDataVQuada,
        handleUpdateDataVQuada,
        handleDeleteeDataVQuada,
        vrsteQuadova,
      }}
    >
      {children}
    </VrsteQuadovaContext.Provider>
  );
}
