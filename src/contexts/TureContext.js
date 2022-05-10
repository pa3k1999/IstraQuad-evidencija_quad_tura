import React, { createContext, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import db from '../firebase.config';

export const TureContext = createContext();

const getData = async () => {
  
  const first = query(collection(db, "ture"), orderBy("vrijemePocetka"), limit(1));
  const documentSnapshotsFirst = await getDocs(first);
  const firstDate = documentSnapshotsFirst.docs[0].data().vrijemePocetka.toDate();
  // const date = `${firstDate.getDate()}-${firstDate.getMonth()}-${firstDate.getFullYear()}`;
  const dateFilter = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate()+1, 23)
  console.log(firstDate)
  let data = [];
  const second = query(collection(db, "ture"), where("vrijemePocetka", ">=", firstDate),  where("vrijemePocetka", "<=", dateFilter));
  const documentSnapshotsSecond = await getDocs(second);
  documentSnapshotsSecond.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  console.log(data);
};

export function TureProvider({ children }) {



  return <TureContext.Provider value={{ getData }}>{children}</TureContext.Provider>;
}
