import React, { memo, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import { IconButton, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { QuadoviContext } from '../contexts/QuadoviContext';
import { useNavigate } from 'react-router-dom';

const ListItemSt = memo(function ListItemSt({ handleSetIsOpenForma, quad, handleOpenDelete }) {
  const { setSelectedQuad } = useContext(QuadoviContext);
  const navigate = useNavigate();

  const handleEdit = () => {
    setSelectedQuad(quad);
    handleSetIsOpenForma(true);
  };

  const handleDelete = () => {
    setSelectedQuad(quad);
    handleOpenDelete(true);
  };

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
        <ListItemButton style={{ padding: '0', paddingLeft: '10px' }} onClick={() => navigate(`/quad/${quad.id}`)}>
          <Stack justifyContent="center" alignItems="flex-start" spacing={0} style={{ paddingBottom: '5px' }}>
            <Typography variant="subtitle1" gutterBottom component="div" margin={0}>
              {quad.naziv}
            </Typography>
            <Typography variant="caption" gutterBottom component="div" margin={0}>
              {quad.brSasije}
            </Typography>
          </Stack>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
});

function QuadoviLista({ quadovi, handleSetIsOpenForma, setIsConfirmDOpen }) {
  return (
    <List style={{ padding: '0' }} dense={true}>
      {quadovi.map((q) => (
        <ListItemSt
          quad={q}
          handleSetIsOpenForma={handleSetIsOpenForma}
          handleOpenDelete={setIsConfirmDOpen}
          key={q.id}
        />
      ))}
    </List>
  );
}

export default memo(QuadoviLista);
