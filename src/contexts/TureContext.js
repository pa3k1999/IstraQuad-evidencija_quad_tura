import React, { createContext, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import db from '../firebase.config';
import { getDataF } from './firestoreFunkcije';

export const TureContext = createContext();

const deleteZTura = async (id, datumId, zTure, setZTure) => {
  try {
    await deleteDoc(doc(db, 'ture', id));
    const queryNapomene = query(collection(db, 'napomene'), where('turaId', '==', id));
    const queryRef = await getDocs(queryNapomene);
    queryRef.forEach((d) => {
      deleteDoc(doc(db, 'napomene', d.id));
    });
    const filterdTure = zTure[datumId].filter((zT) => zT.id !== id);
    console.log(filterdTure.length);
    if (filterdTure.length === 0) {
      let tempZTure = { ...zTure };
      delete tempZTure[datumId];
      setZTure({ ...tempZTure });
    } else {
      setZTure({ ...zTure, [datumId]: filterdTure });
    }

    console.log('Tura obrisana.');
  } catch (e) {
    console.error('Error deliting document: ', e);
  }
};

const getNapomene = async (id, setNapomene) => {
  let array = [];
  try {
    const queryNapomene = query(collection(db, 'napomene'), where('turaId', '==', id));
    const queryRef = await getDocs(queryNapomene);
    queryRef.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error(e);
  }
  setNapomene(array);
};

const getData = async (zTure, setZTure, rasponDatuma) => {
  let obj = {};
  console.log(rasponDatuma);

  try {
    const queryTure = query(
      collection(db, 'ture'),
      where('vrijemePocetka', '>=', rasponDatuma.pocetak),
      where('vrijemePocetka', '<=', rasponDatuma.kraj)
    );
    const queryRef = await getDocs(queryTure);
    queryRef.forEach((doc) => {
      const date = doc.data().vrijemePocetka.toDate();
      const temp = obj[`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`] || [];
      temp.push({ id: doc.id, ...doc.data() });
      obj = {
        ...obj,
        [`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`]: temp,
      };
    });
  } catch (e) {
    console.error(e);
  }
  setZTure(obj);
};

const handleNewZTuraF = async (NovaZTura, napomene, zTure, setZTure, rasponDatuma) => {
  try {
    const docRef = await addDoc(collection(db, 'ture'), { ...NovaZTura });
    const docId = docRef.id;

    Object.keys(napomene).forEach(async (n) => {
      if (napomene[n].trim() !== '') {
        const nap = { napomena: napomene[n], quadId: n, turaId: docId };
        await addDoc(collection(db, 'napomene'), { ...nap });
      }
    });

    const datum = NovaZTura.vrijemePocetka.toDate();
    if (
      rasponDatuma.pocetak <= NovaZTura.vrijemePocetka.toDate() &&
      rasponDatuma.kraj >= NovaZTura.vrijemePocetka.toDate()
    ) {
      let ture = zTure[`${datum.getDate()}.${datum.getMonth() + 1}.${datum.getFullYear()}`] || [];
      ture.push({ id: docId, ...NovaZTura });
      setZTure({ ...zTure, [`${datum.getDate()}.${datum.getMonth() + 1}.${datum.getFullYear()}`]: ture });
    }
    console.log('Document written with ID: ' + docId);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export function TureProvider({ children }) {
  const [selectedZTura, setSelectedZTura] = useState({
    id: '',
    brVozaca: '',
    brSuvozaca: '',
    naziv: '',
    vodicId: '',
    vrstaTureId: '',
    quadovi: [],
    napomene: [],
  });
  const [zTure, setZTure] = useState({});
  const [rasponDatuma, setRasponDatuma] = useState({ pocetak: new Date(), kraj: new Date() });
  const [vrsteTura, setVrsteTura] = useState([]);
  const [vodici, setVodici] = useState([]);
  const [vrsteQuadova, setVrsteQuadova] = useState([]);
  const [quadovi, setQuadovi] = useState([]);

  useEffect(() => {
    getDataF('vrsteQuadova', setVrsteQuadova);
    getDataF('quadovi', setQuadovi);
    getDataF('vodici', setVodici);
    getDataF('vrsteTura', setVrsteTura);
    handleSetRaspon();
    console.log('--Fetching data from firebase --');
  }, []);

  useEffect(() => {
    getData(zTure, setZTure, rasponDatuma);
    console.log('--Fetching data for zTure --');
  }, [rasponDatuma]);

  const handleSetRaspon = (ref = new Date()) => {
    setRasponDatuma({
      pocetak: new Date(ref.getFullYear(), ref.getMonth(), 1, 0, 0),
      kraj: new Date(ref.getFullYear(), ref.getMonth() + 1, 1, 0, 0),
    });
  };

  const handleSetRasponOdDo = (refOd, refDo) => {
    setRasponDatuma({
      pocetak: new Date(refOd.getFullYear(), refOd.getMonth(), refOd.getDate(), 0, 0),
      kraj: new Date(refDo.getFullYear(), refDo.getMonth(), refDo.getDate() + 1, 0, 0),
    });
  };

  const handleNewZTura = async (NovaZTura, napomene) => {
    await handleNewZTuraF(NovaZTura, napomene, zTure, setZTure, rasponDatuma);
  };

  const handleDeleteZTura = async () => {
    const id = selectedZTura.id;
    const dat = selectedZTura.vrijemePocetka.toDate();
    const datumId = `${dat.getDate()}.${dat.getMonth() + 1}.${dat.getFullYear()}`;
    await deleteZTura(id, datumId, zTure, setZTure);
  };

  return (
    <TureContext.Provider
      value={{
        zTure,
        vrsteTura,
        vodici,
        vrsteQuadova,
        quadovi,
        selectedZTura,
        setSelectedZTura,
        handleNewZTura,
        handleSetRaspon,
        getNapomene,
        handleSetRasponOdDo,
        handleDeleteZTura,
      }}
    >
      {children}
    </TureContext.Provider>
  );
}
