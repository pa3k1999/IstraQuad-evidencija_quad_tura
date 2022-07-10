import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import TabWrap from './components/TabWrap';
import db from './firebase.config';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledStack = styled((props) => (
  <Stack direction="column" justifyContent="center" alignItems="center" spacing={0} {...props} />
))(({ theme }) => ({
  margin: '10px 0',
  '&:hover': {
    backgroundColor: 'rgba(243, 243, 243, 0.8)',
  },
}));

const getKorisnik = async (uid) => {
  const ref = await getDoc(doc(db, 'vodici', uid));
  const korisnik = { uid: uid, ...ref.data() };
  return korisnik;
};

const getTure = async (uid) => {
  let array = [];
  try {
    const queryNapomene = query(collection(db, 'ture'), where('vodicId', '==', uid));
    const queryRef = await getDocs(queryNapomene);
    queryRef.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error(e);
  }
  return array;
};

const getVrsteTura = async () => {
  let data = [];
  const querySnapshot = await getDocs(collection(db, 'vrsteTura'));
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

function KorisnikPage() {
  const { uid } = useParams();
  const [korisnik, setKorisnik] = useState({});
  const [ture, setTure] = useState([]);

  const [ukupnoVrijeme, setUkupnoVrijeme] = useState(0);
  const [isLoadingKorisnik, setIsLoadingKorisnik] = useState(true);

  console.log(ukupnoVrijeme);

  useEffect(() => {
    getKorisnik(uid).then((korisnik) => {
      setKorisnik(korisnik);
      setIsLoadingKorisnik(false);
    });
    const setup = async () => {
      const tureTemp = await getTure(uid);
      setTure(tureTemp);
      const vrsteTuraTemp = await getVrsteTura();
      setUkupnoVrijeme(
        tureTemp.reduce((sum, t) => sum + vrsteTuraTemp.find((vT) => vT.id === t.vrstaTureId).minute, 0)
      );
    };
    setup();

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
            <Typography variant="h6" gutterBottom component="div" margin={0}>
              {isLoadingKorisnik ? '' : `${korisnik.ime} ${korisnik.prezime}`}
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div" margin={0}>
              {isLoadingKorisnik ? '' : `${korisnik.korisnickoIme} [${korisnik.eMail}]`}
            </Typography>
          </Stack>
        </Box>
      }
    >
      <Box>
        <StyledStack>
          <Typography variant="subtitle1">Broj odrađenih tura</Typography>
          <Typography variant="h5">{ture.length}</Typography>
        </StyledStack>
        <StyledStack>
          <Typography variant="subtitle1">Ukupno sati provedeno na turama</Typography>
          <Typography variant="h5">{Math.trunc(ukupnoVrijeme / 60)}h</Typography>
        </StyledStack>
      </Box>
    </TabWrap>
  );
}

export default KorisnikPage;
