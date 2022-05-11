import React, { createContext, useEffect, useState } from 'react';
import { getDataF, handleDeleteeDataF, handleNewDataF, handleUpdateDataF } from './firestoreFunkcije';

export const QuadoviContext = createContext();

export function QuadoviProvider({ children }) {

  const [selectedQuad, setSelectedQuad] = useState({id: '', brSasije: '', vrstaQuadaId: ''});

  const [vrsteQuadova, setVrsteQuadova] = useState([]);
  const [quadovi, setQuadovi] = useState([]);

  useEffect(() => {
    getDataF('vrsteQuadova', setVrsteQuadova);
    getDataF('quadovi', setQuadovi);
    console.log('--Fetching data from firebase (vrsteQuadova i quadovi), then rerender--');
  }, []);

  const handleNewDataQuad = async (data, id) => {
    await handleNewDataF(data, 'quadovi', id, quadovi, setQuadovi);
  }

  const handleUpdateDataQuad = async (data, id) => {
    await handleUpdateDataF(data, 'quadovi', id, quadovi, setQuadovi);
  };

  const handleDeleteeDataQuad = async (id) => {
    await handleDeleteeDataF('quadovi', id, quadovi, setQuadovi);
  };

  return <QuadoviContext.Provider value={{ selectedQuad, setSelectedQuad, handleNewDataQuad, handleUpdateDataQuad, handleDeleteeDataQuad, vrsteQuadova, quadovi }}>{children}</QuadoviContext.Provider>;
}