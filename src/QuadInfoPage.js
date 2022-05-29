import { Avatar, Box, List, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import TabWrap from './components/TabWrap';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import db from './firebase.config';
import { useParams } from 'react-router-dom';
import NapomenaQuadaListItem from './components/NapomenaQuadaListItem';
import styled from '@emotion/styled';

const StyledStack = styled((props) => <Stack direction="column" justifyContent="center" alignItems="center" spacing={0} {...props} />)(({ theme }) => ({
  margin: '10px 0', 
}));

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

const getVrsteTura = async() => {
  let data = [];
  const querySnapshot = await getDocs(collection(db, 'vrsteTura'));
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

function QuadInfoPage() {

  const { id } = useParams();

  const [quad, setQuad] = useState({});
  const [tureQuada, setTureQuada] = useState([]);
  const [napomeneQuad, setNapomeneQuad] = useState([]);

  const [ukupnoVrijeme, setUkupnoVrijeme] = useState(0);
  const [isLoadingQuad, setIsLoadingQuad] = useState(true);
  const [isLoadingNapomene, setIsLoadingNapomene] = useState(true);

  useEffect(() => {
    getQuad(id).then(quad => {
      setQuad(quad)
      setIsLoadingQuad(false);
      })
      getTure(id).then(tureTemp => {
        setTureQuada(tureTemp);
        getNapomene(id).then(async(napomeneTemp) => {
          const napomeneFilterTemp = napomeneTemp.sort((a, b) => tureTemp.find(t => t.id === b.turaId).vrijemePocetka - tureTemp.find(t => t.id === a.turaId).vrijemePocetka)
          setNapomeneQuad(napomeneFilterTemp);
          setIsLoadingNapomene(false);
          const vrsteQuadovaTemp = await getVrsteTura();
          setUkupnoVrijeme(tureTemp.reduce((sum, t)=> sum + vrsteQuadovaTemp.find((vT) => vT.id === t.vrstaTureId).minute, 0))
      })})

    console.log('--Fetching data from firebase (korisnik)--');
  }, []);

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
        <Stack direction='row' justifyContent="space-evenly" sx={{width: '100%'}}>
          <StyledStack>
            <Typography variant="subtitle1">
              broj tura
            </Typography>
            <Typography variant="h5">
              {tureQuada.length}
            </Typography>
          </StyledStack>
          <StyledStack>
            <Typography variant="subtitle1">
              sati na turama
            </Typography>
            <Typography variant="h5">
            {Math.trunc(ukupnoVrijeme / 60)}h
            </Typography>
          </StyledStack>
        </Stack>
        
        <List style={{ padding: '0' }} dense={true}>
          {isLoadingNapomene ? '' : (
            napomeneQuad.map(n => {
              const tura = tureQuada.find(t => t.id === n.turaId);
              return <NapomenaQuadaListItem key={n.id} nazivTure={tura.naziv} datum={tura.vrijemePocetka.toDate()} napomena={n.napomena}/>
            })
          )}
        </List>
      </Box>
    </TabWrap>
  )
}

export default  QuadInfoPage;