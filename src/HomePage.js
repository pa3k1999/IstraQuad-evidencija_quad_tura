import styled from '@emotion/styled';
import { Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './contexts/GlobalContext';
import db from './firebase.config';

const getTure = async () => {
  let array = [];
  try {
    const queryRef = await getDocs(collection(db, 'ture'));
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

function HomePage() {
  const { theme } = useContext(GlobalContext);

  const [ukupnoVrijeme, setUkupnoVrijeme] = useState(0);
  const [ture, setTure] = useState([]);

  console.log(ukupnoVrijeme);

  useEffect(() => {
    const setup = async () => {
      const tureTemp = await getTure();
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
    <Box
      sx={{
        marginTop: -3,
        width: '100%',
        height: '30%',
        minHeight: '200px',
        maxHeight: '300px',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box paddingTop={3} style={{ maxWidth: '1000px', height: '100%', margin: 'auto', padding: '20px 20px 0 20px' }}>
        <Typography variant="h3" color={theme.palette.primary.contrastText}>
          <b>Istra quad</b>
        </Typography>
      </Box>
      <Box style={{ maxWidth: '1000px', margin: 'auto'}}>
        <Grid container columns={{ xs: 4, md: 8 }} justifyContent="space-evenly" alignItems="center" >
          <Grid item xs={4}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={0}>
              <Typography variant="h6" color={theme.palette.primary.main}>Broj odrađenih tura</Typography>
              <Typography variant="h4" color={theme.palette.primary.main}>{ture.length}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={0}>
              <Typography variant="h6" color={theme.palette.primary.main}>Ukupno sati provedeno na turama</Typography>
              <Typography variant="h4" color={theme.palette.primary.main}>{Math.trunc(ukupnoVrijeme / 60)}h</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      
    </Box>
  );
}

export default HomePage;
