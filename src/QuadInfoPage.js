import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import TabWrap from './components/TabWrap';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import db from './firebase.config';
import { useParams } from 'react-router-dom';
import NapomenaQuadaListItem from './components/NapomenaQuadaListItem';

const getBoja = async (vrstaQuadaId) => {
  const refVq = await getDoc(doc(db, 'vrsteQuadova', vrstaQuadaId));
  const boja = refVq.data().boja;
  return boja;
};

const getQuad = async (id) => {
  const refQ = await getDoc(doc(db, 'quadovi', id));
  const boja = await getBoja(refQ.data().vrstaQuadaId);
  const quad = { id: id, ...refQ.data(), boja: boja};
  return quad;
};

const getTure = async (id) => {
  let array = [];
  try {
    const queryNapomene = query(collection(db, 'ture'), where("quadovi", "array-contains", id));
    const queryRef = await getDocs(queryNapomene);
    queryRef.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error('ture:  ' + e);
  }
  return array;
};

const getNapomene = async(id) => {
  let array = [];
  try {
    const queryNapomene = query(collection(db, 'napomene'), where('quadId', '==', id));
    const queryRef = await getDocs(queryNapomene);
    queryRef.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error('napomene:  ' + e);
  }
  return array;
};

function QuadInfoPage() {

  const { id } = useParams();

  const [quad, setQuad] = useState({});
  const [tureQuada, setTureQuada] = useState([]);
  const [napomeneQuad, setNapomeneQuad] = useState([]);

  const [isLoadingQuad, setIsLoadingQuad] = useState(true);
  const [isLoadingNapomene, setIsLoadingNapomene] = useState(true);

  useEffect(() => {
    getQuad(id).then(quad => {
      setQuad(quad)
      setIsLoadingQuad(false);
      })
      getTure(id).then(tureTemp => {
        setTureQuada(tureTemp);
        getNapomene(id).then(napomeneTemp => {
          setNapomeneQuad(napomeneTemp);
          setIsLoadingNapomene(false);
      })})

    console.log('--Fetching data from firebase (korisnik)--');
  }, []);

  //TODO: dodati broj odradjenih tura i mozd provedenih sati na turama...

  return (
    <TabWrap
      title={
        <Box padding={0}>
          <Stack
            justifyContent="center"
            alignItems="flex-start"
            spacing={0}
            style={{ marginLeft: '5px', height: '100%' }}
          >
            <Stack direction="row" alignItems="center">
              <Avatar sx={{ width: 20, height: 20, bgcolor: quad.boja, margin: '2px', marginRight: '5px' }}> </Avatar>
              <Typography variant="h6" gutterBottom component="div" margin={0}>{isLoadingQuad ? '' : quad.naziv}</Typography>
            </Stack>
            <Typography variant="subtitle2" gutterBottom component="div" margin={0}>
              {isLoadingQuad ? '' : quad.brSasije}
            </Typography>
          </Stack>
        </Box>
      }
    >
      <Box>
        {isLoadingNapomene ? '' : (
          napomeneQuad.map(n => {
            const tura = tureQuada.find(t => t.id === n.turaId);
            return <NapomenaQuadaListItem nazivTure={tura.naziv} datum={tura.vrijemePocetka.toDate()} napomena={n.napomena}/>
          })
        )}
      </Box>
    </TabWrap>
  )
}

export default  QuadInfoPage;