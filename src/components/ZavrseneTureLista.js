import React, { memo, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { TureContext } from '../contexts/TureContext';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import { GlobalContext } from '../contexts/GlobalContext';

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

const ListItemSt = memo(function ListItemSt({ zTura, handleOpenDetalji, handleOpenConfirm }) {
  const { vrsteTura, vrsteQuadova, quadovi, setSelectedZTura } = useContext(TureContext);
  const { theme } = useContext(GlobalContext);

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
  };

  const handleDeleteZTura = () => {
    setSelectedZTura(zTura);
    handleOpenConfirm();
  };

  return (
    <ListItem
      disablePadding
      sx={{
        '& .vrijemeTrajanja': {
          transition: 'all 0.3s ease-out',
        },
        '&:hover': {
          '& .MuiIconButton-root': {
            opacity: 1,
          },
          '& .vrijemeTrajanja': {
            opacity: 0.2,
          },
        },
      }}
      secondaryAction={
        <>
          <Typography
            className="vrijemeTrajanja"
            height="22px"
            variant="subtitle2"
            gutterBottom
            component="div"
            margin={0}
            style={{ cursor: 'pointer' }}
            sx={{
              [theme.breakpoints.down('sm')]: {
                opacity: 0,
              },
            }}
          >
            {`${('0' + vrP.getHours()).slice(-2)}:${('0' + vrP.getMinutes()).slice(-2)} - ${(
              '0' + vrZ.getHours()
            ).slice(-2)}:${('0' + vrZ.getMinutes()).slice(-2)}`}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleDeleteZTura}
            sx={{
              transition: 'all 0.3s ease-out',
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              position: 'absolute',
              right: '-16px',
              bottom: '-11px',
              paddingRight: '10px',
              borderRadius: '15px 0 0 15px',
              opacity: 0,
              [theme.breakpoints.down('sm')]: {
                opacity: 1,
              },
              '&:hover': {
                background: theme.palette.primary.light,
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemButton style={{ padding: '0', paddingLeft: '10px' }} onClick={handleOpenItem}>
        <ListItemIcon sx={{}}>
          <Typography variant="h5" gutterBottom component="div" margin="auto">
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
            {Object.keys(quadoviUTuri).map((idVQ) => {
              const boja = vrsteQuadova.find((q) => q.id === idVQ).boja;
              return <ChipSt key={idVQ} avatar=" " num={quadoviUTuri[idVQ]} color={boja} />;
            })}

            {zTura.brSuvozaca > 0 ? <ChipSt icon={<PersonIcon />} num={`+${zTura.brSuvozaca}`} /> : ''}
          </Box>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
});

function ZavrseneTureLista({ zTure, handleOpenDetalji, handleOpenConfirm }) {
  return (
    <List style={{ padding: '0' }} dense={true}>
      {zTure.map((zT) => (
        <ListItemSt
          key={zT.id}
          zTura={zT}
          handleOpenDetalji={handleOpenDetalji}
          handleOpenConfirm={handleOpenConfirm}
        />
      ))}
    </List>
  );
}

export default memo(ZavrseneTureLista);
