import React, { createContext, useEffect, useState } from 'react';
import { getDataF, handleDeleteeDataF, handleNewDataF, handleUpdateDataF } from './firestoreFunkcije';

export const VrsteQuadovaContext = createContext();

export function VrsteQuadovaProvider({ children }) {

  const [selectedVrstaQuada, setSelectedVrstaQuada] = useState({id: '', naziv: '', obujamMotora: '', boja: ''});

  const [vrsteQuadova, setVrsteQuadova] = useState([]);

  useEffect(() => {
    getDataF('vrsteQuadova', setVrsteQuadova);
    console.log('--Fetching data from firebase (vrsteQuadova i quadovi), then rerender--');
  }, []);

  const handleNewDataVQuada = async (data, id) => {
    await handleNewDataF(data, 'quadovi', id, vrsteQuadova, setVrsteQuadova);
  }

  const handleUpdateDataVQuada = async (data, id) => {
    await handleUpdateDataF(data, 'vrsteQuadova', id, vrsteQuadova, setVrsteQuadova);
  };

  const handleDeleteeDataVQuada = async (id) => {
    await handleDeleteeDataF('vrsteQuadova', id, vrsteQuadova, setVrsteQuadova);
  };

  return <VrsteQuadovaContext.Provider value={{ selectedVrstaQuada, setSelectedVrstaQuada, handleNewDataVQuada, handleUpdateDataVQuada, handleDeleteeDataVQuada, vrsteQuadova }}>{children}</VrsteQuadovaContext.Provider>;
}
