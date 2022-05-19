import React, { createContext, useEffect, useState } from 'react';
import { addDoc, collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, Timestamp, where } from 'firebase/firestore';
import db from '../firebase.config';
import { getDataF, handleDeleteeDataF, handleNewDataF, handleUpdateDataF } from './firestoreFunkcije';

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
  let obj = {};
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
      obj = {
        ...obj,
        [`${firstDate.getDate()}.${firstDate.getMonth()}.${firstDate.getFullYear()}`] : [...tempData],
      };
    } catch (e) { 
      console.error(e)
      break
    }
  }
  setStart(startAft);
  setData({...data, ...obj});
};

const handleNewZTuraF = async(zTura, napomene, vrsta, state, setState) => {
  const dataTemp = {...zTura};
  delete dataTemp.quadovi;
  delete dataTemp.napomene;
  try {
    const docRef = await addDoc(collection(db, vrsta), { ...dataTemp });
    const docId = docRef.id;

    zTura.quadovi.forEach(async q => {
      await setDoc(doc(db, vrsta, docRef.id, 'quadovi', q.idQuada), {})
    })
    const tempNapomene = [];
    Object.keys(napomene).forEach(async n => {
      if(napomene[n].trim() !== ''){
        const nap = {napomena: napomene[n], quadId: n, turaId: docId}
        const docNap = await addDoc(collection(db, 'napomene'), { ...nap })
        tempNapomene.push({...nap, id: docNap.id});
      }
    })
 
    const datum = zTura.vrijemePocetka.toDate();
    let ture = state[`${datum.getDate()}.${datum.getMonth()}.${datum.getFullYear()}`] || []
    console.log(ture)
    ture.push({...zTura, napomene: tempNapomene});
    setState({...state, [`${datum.getDate()}.${datum.getMonth()}.${datum.getFullYear()}`]: ture})

    console.log('Document written with ID: ' + docId);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
export function TureProvider({ children }) {
  const [selectedZTura, setSelectedZTura] = useState({id: '', brVozaca: '', brSuvozaca: '', naziv: '', vodicId: '', vrstaTureId: '', quadovi: [], napomene: []});
  const [zTure, setZTure] = useState({});
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

  const handleGetData = () => {
    getData(zTure, setZTure, startFrom, setStartFrom);
  };

  const handleNewZTura = async(zTura, napomene) => {
    await handleNewZTuraF(zTura, napomene, 'ture', zTure, setZTure);
  }

  return <TureContext.Provider value={{ handleGetData, zTure, vrsteTura, vodici, vrsteQuadova, quadovi, selectedZTura, setSelectedZTura, handleNewZTura}}>{children}</TureContext.Provider>;
}
