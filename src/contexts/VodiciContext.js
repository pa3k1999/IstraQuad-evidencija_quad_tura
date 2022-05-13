import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDataF, handleDeleteeDataF, handleNewDataF, handleUpdateDataF } from './firestoreFunkcije';
import { GlobalContext } from './GlobalContext';

export const VodiciContext = createContext();

export function VodiciProvider({ children }) {

  const { auth } = useContext(GlobalContext);

  const [selectedVodici, setSelectedVodici] = useState({id: '', eMail: '', ime: '', prezime: '', korisnickoIme: ''});

  const [vodici, setVodici] = useState([]);

  useEffect(() => {
    getDataF('vodici', setVodici);
    console.log('--Fetching data from firebase (vrsteQuadova i quadovi), then rerender--');
  }, []);

  const handleNewDataVodic = async (data, userData) => {
    await createUserWithEmailAndPassword(auth, userData.eMail, userData.lozinka)
  .then(async(userCredential) => {
    const user = userCredential.user;
    await handleNewDataF(data, 'vodici', user.uid, vodici, setVodici);
  })
  .catch((error) => {
    console.log(error)
  });
  }

  const handleUpdateDataVodic = async (data, id) => {
    await handleUpdateDataF(data, 'vodici', id, vodici, setVodici);
  };

  const handleDeleteeDataVodic = async (id) => {
    await handleDeleteeDataF('vodici', id, vodici, setVodici);
  };

  return <VodiciContext.Provider value={{ selectedVodici, setSelectedVodici, handleNewDataVodic, handleUpdateDataVodic, handleDeleteeDataVodic, vodici }}>{children}</VodiciContext.Provider>;
}
