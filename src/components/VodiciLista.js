import { Divider, IconButton, List, ListItem, ListItemButton, Stack, Typography } from '@mui/material';
import React, { memo, useContext, useState } from 'react';
import { VodiciContext } from '../contexts/VodiciContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmBrisanje from './popupProzori/ConfirmBrisanje';

const ListItemSt = memo(function ListItemSt({ handleSetIsOpenForma, vodic, handleOpenDelete }) {

  const { setSelectedVrstaQuada } = useContext(VodiciContext);
  
  const handleEdit = () => {
    setSelectedVrstaQuada(vodic);
    handleSetIsOpenForma(true);
  }
  
  const handleDelete = () => {
    setSelectedVrstaQuada(vodic);
    handleOpenDelete(true);
  }
  
//TODO: maknuti edit button

    return (
      <>
      <ListItem
        disablePadding
        secondaryAction={
          <>
            <IconButton edge="end" aria-label="delete" style={{ margin: '1px' }} onClick={handleEdit}>
              <EditIcon />
            </IconButton>
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

function VodiciLista({ handleSetIsOpenForma }) {
  const { selectedVodici, handleDeleteeDataVodic, vodici } = useContext(VodiciContext);
  const [isConfirmDOpen, setIsConfirmDOpen] = useState(false);
  return (
    <>
    <List style={{ padding: '0' }} dense={true}>
      {vodici.map((v) => (
          <ListItemSt vodic={v} handleSetIsOpenForma={handleSetIsOpenForma} handleOpenDelete={setIsConfirmDOpen} key={v.id}/>
      ))}
    </List>
    <ConfirmBrisanje isOpen={isConfirmDOpen} handleClose={() => setIsConfirmDOpen(false)} dataId={selectedVodici.id} handleDeleteeData={handleDeleteeDataVodic}/>
    </>
  );
}

export default VodiciLista;