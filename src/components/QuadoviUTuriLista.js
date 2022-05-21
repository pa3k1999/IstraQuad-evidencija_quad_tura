import { Avatar, Divider, List, ListItem, ListItemButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo, useContext, useEffect, useState } from 'react';
import { TureContext } from '../contexts/TureContext';

const ListItemSt = memo(function ListItemSt({ quad, napomena }) {
  const { vrsteQuadova } = useContext(TureContext);

  const quadBoja = vrsteQuadova.find((vQ) => vQ.id === quad.vrstaQuadaId).boja;

  return (
    <ListItem disablePadding>
      <ListItemButton style={{ padding: '0' }}>
        <Stack style={{ width: '100%' }}>
          <Stack direction="row" style={{ padding: '5px 10px', backgroundColor: 'rgba(0, 0, 0, 0.05)', width: '100%' }}>
            <Avatar sx={{ width: 20, height: 20, bgcolor: quadBoja, margin: '2px', marginRight: '5px' }}> </Avatar>
            <Typography style={{ margin: '0', padding: '0' }}>{quad.naziv}</Typography>
          </Stack>
          {napomena ? (
            <>
              <Divider />
              <Box style={{ padding: '0 10px 0 20px' }}>
                <Typography variant="subtitle1">Opis: {napomena.napomena}</Typography>
              </Box>
            </>
          ) : null}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
});

function QuadoviUTuriLista() {
  const { quadovi, selectedZTura, getNapomene } = useContext(TureContext);

  const [napomene, setNapomene] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getNapomene(selectedZTura.id, setNapomene).then(setIsLoading(false));
  }, [selectedZTura]);

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <List style={{ padding: '0' }} dense={true}>
          {selectedZTura.quadovi.map((qZT) => (
            <>
              <ListItemSt
                quad={quadovi.find((q) => q.id === qZT)}
                napomena={napomene.find((n) => n.quadId === qZT)}
              />
              <Divider style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.2)' }} />
            </>
          ))}
        </List>
      )}
    </>
  );
}

export default QuadoviUTuriLista;
