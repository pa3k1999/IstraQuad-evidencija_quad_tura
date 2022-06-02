import React, { createContext, useEffect, useState } from 'react';
import { getDataF, handleDeleteeDataF, handleNewDataF, handleUpdateDataF } from './firestoreFunkcije';
import axios from 'axios';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import db from '../firebase.config';

export const VodiciContext = createContext();

const handleDeleteVQuada = async (uid) => {
  try {
    const queryTure = query(collection(db, 'ture'), where('vodicId', '==', uid));
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

export function VodiciProvider({ children }) {
  const [selectedVodici, setSelectedVodici] = useState({ id: '', eMail: '', ime: '', prezime: '', korisnickoIme: '' });
  const [vodici, setVodici] = useState([]);

  useEffect(() => {
    getDataF('vodici', setVodici);
    console.log('--Fetching data from firebase (vrsteQuadova i quadovi), then rerender--');
  }, []);

  const handleNewDataVodic = async (data, userData, isAdmin) => {
    await axios
      .get('http://localhost:4000/novi-user', {
        headers: {
          email: `${userData.eMail}`,
          lozinka: `${userData.lozinka}`,
          isadmin: `${isAdmin}`,
        },
      })
      .then((res) => {
        const user = res.data;
        handleNewDataF(data, 'vodici', user.uid, vodici, setVodici);
      });
  };

  const handleUpdateDataVodic = async (data, id) => {
    await handleUpdateDataF(data, 'vodici', id, vodici, setVodici);
  };

  const handleDeleteeDataVodic = async (id) => {
    await axios
      .delete('http://localhost:4000/obrisi-vodica', {
        headers: {
          uid: `${id}`,
        },
      })
      .then(async (res) => {
        if (res.data) {
          await handleDeleteeDataF('vodici', id, vodici, setVodici);
          await handleDeleteVQuada(id);
        }
      });
  };

  return (
    <VodiciContext.Provider
      value={{
        selectedVodici,
        setSelectedVodici,
        handleNewDataVodic,
        handleUpdateDataVodic,
        handleDeleteeDataVodic,
        vodici,
      }}
    >
      {children}
    </VodiciContext.Provider>
  );
}
