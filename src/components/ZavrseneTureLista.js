import React, { memo, useContext, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { TureContext } from '../contexts/TureContext';
import PersonIcon from '@mui/icons-material/Person';

function ChipSt({ avatar, num, color }) {
  return (
    <Chip
      avatar={
        <Avatar sx={{ bgcolor: color }} style={{ margin: 0 }}>
          {avatar}
        </Avatar>
      }
      size="small"
      style={{ height: '19px', marginRight: '10px' }}
      label={num}
    />
  );
}

const ListItemSt = memo(function ListItemSt({ zTura, handleOpenDetalji }) {
  const { vrsteTura, vrsteQuadova, quadovi, setSelectedZTura } = useContext(TureContext);

  const vrP = zTura.vrijemePocetka.toDate();
  const vrZ = zTura.vrijemeZavrsetka.toDate();

  const vTureNaziv = vrsteTura.find((t) => t.id === zTura.vrstaTureId).naziv;

  const quadoviUTuri = {};
  zTura.quadovi.forEach((qT) => {
    const quad = quadovi.find((q) => q.id === qT);
    quadoviUTuri[quad.vrstaQuadaId] = (quadoviUTuri[quad.vrstaQuadaId] || 0) + 1;
  });

  const handleOpenItem = () => {
    setSelectedZTura(zTura);
    handleOpenDetalji();
  }

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Typography variant="subtitle2" gutterBottom component="div" margin={0}>
          {`${('0' + vrP.getHours()).slice(-2)}:${('0' + vrP.getMinutes()).slice(-2)} - ${('0' + vrZ.getHours()).slice(
            -2
          )}:${('0' + vrZ.getMinutes()).slice(-2)}`}
        </Typography>
      }
    >
      <ListItemButton style={{ padding: '0', paddingLeft: '10px' }} onClick={handleOpenItem}>
        <ListItemIcon>
          <Typography variant="h5" gutterBottom component="div" margin={0}>
            {vTureNaziv}
          </Typography>
        </ListItemIcon>
        <Stack
          justifyContent="center"
          alignItems="flex-start"
          spacing={0}
          style={{ paddingBottom: '5px', marginLeft: '5px' }}
        >
          <Typography variant="subtitle1" gutterBottom component="div" margin={0}>
            {zTura.naziv}
          </Typography>
          <Box>
            {Object.keys(quadoviUTuri).map(idVQ => {
               const boja = vrsteQuadova.find(q => q.id === idVQ).boja;
              return <ChipSt key={idVQ} avatar=" " num={quadoviUTuri[idVQ]} color={boja} />;
            })}

            {zTura.brSuvozaca > 0 ? <ChipSt icon={<PersonIcon />} num={`+${zTura.brSuvozaca}`}  /> : ''}
            
          </Box>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
});

function ZavrseneTureLista({ zTure, handleOpenDetalji }) {
  return (
    <List style={{ padding: '0' }} dense={true}>
      {zTure.map((zT) => (
        <ListItemSt key={zT.id} zTura={zT} handleOpenDetalji={handleOpenDetalji}/>
      ))}
    </List>
  );
}

export default memo(ZavrseneTureLista);
