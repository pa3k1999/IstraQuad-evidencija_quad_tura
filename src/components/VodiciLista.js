import { Divider, IconButton, List, ListItem, ListItemButton, Stack, Typography } from '@mui/material';
import React, { memo, useContext, useState } from 'react';
import { VodiciContext } from '../contexts/VodiciContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmBrisanje from './popupProzori/ConfirmBrisanje';

const ListItemSt = memo(function ListItemSt({ vodic, handleOpenDelete }) {
  const { setSelectedVodici } = useContext(VodiciContext);

  const handleDelete = () => {
    setSelectedVodici(vodic);
    handleOpenDelete(true);
  };

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <>
            <IconButton edge="end" aria-label="delete" style={{ margin: '1px' }} onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        }
        style={{
          height: '54px',
        }}
      >
        <ListItemButton style={{ padding: '0', paddingLeft: '10px' }}>
          <Stack justifyContent="center" alignItems="flex-start" spacing={0} style={{ paddingBottom: '5px' }}>
            <Typography variant="subtitle1" gutterBottom component="div" margin={0}>
              {`${vodic.ime} ${vodic.prezime}`}
            </Typography>
            <Typography variant="body2" gutterBottom component="div" margin={0}>
              {`${vodic.korisnickoIme} [${vodic.eMail}]`}
            </Typography>
          </Stack>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
});

function VodiciLista() {
  const { selectedVodici, handleDeleteeDataVodic, vodici } = useContext(VodiciContext);

  const [isConfirmDOpen, setIsConfirmDOpen] = useState(false);

  return (
    <>
      <List style={{ padding: '0' }} dense={true}>
        {vodici.map((v) => (
          <ListItemSt vodic={v} handleOpenDelete={setIsConfirmDOpen} key={v.id} />
        ))}
      </List>
      <ConfirmBrisanje
        text="Brisanjem ove stavke obrisati će se sve duge stavke koje su vezane sa ovom stavkom (zavrsene ture). Jeste li sigurni da želite obristai ovu stavku?"
        isOpen={isConfirmDOpen}
        handleClose={() => setIsConfirmDOpen(false)}
        handleDeleteeData={() => handleDeleteeDataVodic(selectedVodici.id)}
      />
    </>
  );
}

export default VodiciLista;
