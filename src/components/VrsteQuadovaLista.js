import React, { memo, useContext, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import { IconButton, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmBrisanje from './popupProzori/ConfirmBrisanje';
import { VrsteQuadovaContext } from '../contexts/VrsteQuadovaContext';
import { GlobalContext } from '../contexts/GlobalContext';

const ListItemSt = memo(function ListItemSt({ handleSetIsOpenForma, vrstaQuada, handleOpenDelete }) {
  const { setSelectedVrstaQuada } = useContext(VrsteQuadovaContext);
  const { userClaims } = useContext(GlobalContext);

  const handleEdit = () => {
    setSelectedVrstaQuada(vrstaQuada);
    handleSetIsOpenForma(true);
  };

  const handleDelete = () => {
    setSelectedVrstaQuada(vrstaQuada);
    handleOpenDelete(true);
  };

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          userClaims.admin ? (
            <>
              <IconButton edge="end" aria-label="delete" style={{ margin: '1px' }} onClick={handleEdit}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" style={{ margin: '1px' }} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <></>
          )
        }
        style={{
          height: '54px',
        }}
      >
        <ListItemButton style={{ padding: '0', paddingLeft: '10px', borderLeft: `10px solid ${vrstaQuada.boja}` }}>
          <Stack justifyContent="center" alignItems="flex-start" spacing={0} style={{ paddingBottom: '5px' }}>
            <Typography variant="subtitle1" gutterBottom component="div" margin={0}>
              {vrstaQuada.naziv}
            </Typography>
            <Typography variant="body2" gutterBottom component="div" margin={0}>
              {vrstaQuada.obujamMotora}
            </Typography>
          </Stack>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
});

function VrsteQuadovaLista({ handleSetIsOpenForma }) {
  const { selectedVrstaQuada, handleDeleteeDataVQuada, vrsteQuadova } = useContext(VrsteQuadovaContext);
  const [isConfirmDOpen, setIsConfirmDOpen] = useState(false);
  return (
    <>
      <List style={{ padding: '0' }} dense={true}>
        {vrsteQuadova.map((VQ) => (
          <ListItemSt
            vrstaQuada={VQ}
            handleSetIsOpenForma={handleSetIsOpenForma}
            handleOpenDelete={setIsConfirmDOpen}
            key={VQ.id}
          />
        ))}
      </List>
      <ConfirmBrisanje
        text="Brisanjem ove stavke obrisati ce se sve stavke koje su vezane sa ovom stavkom (zavrsene ture i quadovi). Jeste li sigurni da zelite obristai ovu stavku?"
        isOpen={isConfirmDOpen}
        handleClose={() => setIsConfirmDOpen(false)}
        handleDeleteeData={() => handleDeleteeDataVQuada(selectedVrstaQuada.id)}
      />
    </>
  );
}

export default memo(VrsteQuadovaLista);
