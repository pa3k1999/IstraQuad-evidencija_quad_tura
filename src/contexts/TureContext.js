import React, { createContext, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase.config';

export const TureContext = createContext();

export function TureProvider({ children }) {

  const [ture, setTure] = useState('lol');

  const getData = async (dbPath) => {
    let data = [];

    const querySnapshot = await getDocs(collection(db, dbPath));

    querySnapshot.forEach((doc) => {
      data.push({id: doc.id, ...doc.data()});
    });
    return await data;
  };

  (async () => {
    console.log(await getData('quadovi'));
  })();

  return <TureContext.Provider value={{ ture }}>{children}</TureContext.Provider>;
}
