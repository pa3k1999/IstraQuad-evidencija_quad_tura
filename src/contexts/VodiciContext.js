import React, { createContext, useEffect, useState } from 'react';
import { getDataF, handleDeleteeDataF, handleNewDataF, handleUpdateDataF } from './firestoreFunkcije';

export const VodiciContext = createContext();

export function VodiciProvider({ children }) {

  const [selectedVodici, setSelectedVodici] = useState({id: '', eMail: '', ime: '', prezime: '', korisnickoIme: ''});

  const [vodici, setVodici] = useState([]);

  useEffect(() => {
    getDataF('vodici', setVodici);
    console.log('--Fetching data from firebase (vrsteQuadova i quadovi), then rerender--');
  }, []);

  const handleNewDataVodic = async (data, id) => {
    await handleNewDataF(data, 'vodici', id, vodici, setVodici);
  }

  const handleUpdateDataVodic = async (data, id) => {
    await handleUpdateDataF(data, 'vodici', id, vodici, setVodici);
  };

  const handleDeleteeDataVodic = async (id) => {
    await handleDeleteeDataF('vodici', id, vodici, setVodici);
  };

  return <VodiciContext.Provider value={{ selectedVodici, setSelectedVodici, handleNewDataVodic, handleUpdateDataVodic, handleDeleteeDataVodic, vodici }}>{children}</VodiciContext.Provider>;
}
