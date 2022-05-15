import React, { createContext, useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import db from '../firebase.config';
import { getDataF } from './firestoreFunkcije';

export const TureContext = createContext();

const getNapomene = async (idTure) => {
  let napomene = [];

  const documentSnapshot = await getDocs(query(collection(db, 'napomene'), where('turaId', '==', idTure)));
  documentSnapshot.forEach((doc) => {
    napomene.push({ id: doc.id, ...doc.data() });
  });
  return napomene;
};

const getQuadovi = async (idTure) => {
  let quadovi = [];

  const documentSnapshot = await getDocs(collection(db, 'ture', idTure, 'quadovi'));
  documentSnapshot.forEach((doc) => {
    quadovi.push({ idQuada: doc.id });
  });
  return quadovi;
};

//TODO: kao bude sporo ond napravit da ucita po mjesecu

const getData = async (data, setData, start, setStart) => {
  let startAft = start;
  let array = [];
  for (let i = 0; i < 16; i++) {
    const first =
      startAft === undefined
        ? query(collection(db, 'ture'), orderBy('vrijemePocetka'), limit(1))
        : query(collection(db, 'ture'), orderBy('vrijemePocetka'), startAfter(startAft), limit(1));
    const documentSnapshotsFirst = await getDocs(first);
    try {
      const firstDate = documentSnapshotsFirst.docs[0].data().vrijemePocetka.toDate();
      const dateFilter = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate(), 23, 59);
      let tempData = [];
      const second = query(
        collection(db, 'ture'),
        where('vrijemePocetka', '>=', firstDate),
        where('vrijemePocetka', '<=', dateFilter)
      );
      const documentSnapshotsSecond = await getDocs(second);
      startAft = documentSnapshotsSecond.docs[documentSnapshotsSecond.docs.length - 1];

      for (const doc of documentSnapshotsSecond.docs) {
        const napomene = await getNapomene(doc.id);
        const quadovi = await getQuadovi(doc.id);
        tempData.push({ id: doc.id, ...doc.data(), napomene: napomene, quadovi: quadovi });
      }

      array.push({
        datum: new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate()),
        tureData: [...tempData],
      });
      console.log(array);
    } catch (e) { 
      console.error(e)
      break
    }
  }
  setStart(startAft);
  setData([...data, ...array]);
};

export function TureProvider({ children }) {
  const [selectedZTura, setSelectedZTura] = useState({id: '', brVozaca: '', brSuvozaca: '', naziv: '', vodicId: '', vrstaTureId: '', quadovi: [], napomene: []});
  const [zTure, setZTure] = useState([]);
  const [startFrom, setStartFrom] = useState();
  const [vrsteTura, setVrsteTura] = useState([]);
  const [vodici, setVodici] = useState([]);
  const [vrsteQuadova, setVrsteQuadova] = useState([]);
  const [quadovi, setQuadovi] = useState([]);

  useEffect(() => {
    getDataF('vrsteQuadova', setVrsteQuadova);
    getDataF('quadovi', setQuadovi);
    getDataF('vodici', setVodici);
    getDataF('vrsteTura', setVrsteTura);
    console.log('--Fetching data from firebase --');
  }, []);

  console.log(zTure);

  const handleGetData = () => {
    getData(zTure, setZTure, startFrom, setStartFrom);
  };

  return <TureContext.Provider value={{ handleGetData, zTure, vrsteTura, vodici, vrsteQuadova, quadovi, selectedZTura, setSelectedZTura }}>{children}</TureContext.Provider>;
}
