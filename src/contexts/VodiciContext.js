import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDataF, handleDeleteeDataF, handleNewDataF, handleUpdateDataF } from './firestoreFunkcije';
import { GlobalContext } from './GlobalContext';
import { deleteUser } from "firebase/auth";
import axios from 'axios';

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
    await axios.get('http://localhost:4000/novi-user', {
      headers: {
        email: `${userData.eMail}`,
        lozinka: `${userData.lozinka}`
      },
    }).then(res => {
      const user = res.data;
      handleNewDataF(data, 'vodici', user.uid, vodici, setVodici);
    })
  }

  const handleUpdateDataVodic = async (data, id) => {
    await handleUpdateDataF(data, 'vodici', id, vodici, setVodici);
  };

  const handleDeleteeDataVodic = async (id) => {
    await axios.delete('http://localhost:4000/obrisi-vodica', {
      headers: {
        uid: `${id}`
      },
    }).then(async(res) => {
      if(res.data){
        await handleDeleteeDataF('vodici', id, vodici, setVodici);
      }
    });
    
  };

  return <VodiciContext.Provider value={{ selectedVodici, setSelectedVodici, handleNewDataVodic, handleUpdateDataVodic, handleDeleteeDataVodic, vodici }}>{children}</VodiciContext.Provider>;
}
