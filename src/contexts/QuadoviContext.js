import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { getDataF, handleNewDataF, handleUpdateDataF } from './firestoreFunkcije';
import db from '../firebase.config';

export const QuadoviContext = createContext();

const handleDeleteQuada = async (id, state, setState) => {
  try {
    deleteDoc(doc(db, 'quadovi', id));
    setState([...state.filter((VQ) => VQ.id !== id)]);
    const queryTure = query(collection(db, 'ture'), where('quadovi', 'array-contains', id));
    getDocs(queryTure).then((queryRefTure) => {
      queryRefTure.forEach((docT) => {
        deleteDoc(doc(db, 'ture', docT.id));
      });
    });
    console.log('Document deleted.');
  } catch (e) {
    console.error('Error deliting document: ', e);
  }
};

export function QuadoviProvider({ children }) {
  const [selectedQuad, setSelectedQuad] = useState({ id: '', brSasije: '', vrstaQuadaId: '' });

  const [vrsteQuadova, setVrsteQuadova] = useState([]);
  const [quadovi, setQuadovi] = useState([]);

  useEffect(() => {
    getDataF('vrsteQuadova', setVrsteQuadova);
    getDataF('quadovi', setQuadovi);
    console.log('--Fetching data from firebase (vrsteQuadova i quadovi), then rerender--');
  }, []);

  const handleNewDataQuad = async (data) => {
    await handleNewDataF(data, 'quadovi', '', quadovi, setQuadovi);
  };

  const handleUpdateDataQuad = async (data, id) => {
    await handleUpdateDataF(data, 'quadovi', id, quadovi, setQuadovi);
  };

  const handleDeleteeDataQuad = async (id) => {
    await handleDeleteQuada(id, quadovi, setQuadovi);
  };

  return (
    <QuadoviContext.Provider
      value={{
        selectedQuad,
        setSelectedQuad,
        handleNewDataQuad,
        handleUpdateDataQuad,
        handleDeleteeDataQuad,
        vrsteQuadova,
        quadovi,
      }}
    >
      {children}
    </QuadoviContext.Provider>
  );
}
