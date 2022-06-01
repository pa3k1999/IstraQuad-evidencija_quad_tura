import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemButton, Slide, Stack, Typography } from '@mui/material';
import React, { forwardRef, memo, useContext, useState } from 'react';
import { VodiciContext } from '../contexts/VodiciContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmBrisanje from './popupProzori/ConfirmBrisanje';
import { Box } from '@mui/system';
import { GlobalContext } from '../contexts/GlobalContext';

const ListItemSt = memo(function ListItemSt({ vodic, handleOpenDelete }) {

  const { setSelectedVodici } = useContext(VodiciContext);
  
  const handleDelete = () => {
    setSelectedVodici(vodic);
    handleOpenDelete(true);
  }
  
//TODO: maknuti edit button

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

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function VodiciLista() {

  const { theme } = useContext(GlobalContext);
  const { selectedVodici, handleDeleteeDataVodic, vodici } = useContext(VodiciContext);

  const [isConfirmDOpen, setIsConfirmDOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);
    handleDeleteeDataVodic(selectedVodici.id).then(setTimeout(() => {
      setIsConfirmDOpen(false);
      setIsLoading(false);
    }, 500));
  }

  return (
    <>
      <List style={{ padding: '0' }} dense={true}>
        {vodici.map((v) => (
            <ListItemSt vodic={v} handleOpenDelete={setIsConfirmDOpen} key={v.id}/>
        ))}
      </List>
      <Dialog
        TransitionComponent={Transition}
        open={isConfirmDOpen}
        onClose={() => setIsConfirmDOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ backgroundColor: `${theme.palette.primary.main}`, color: `${theme.palette.primary.contrastText}` }}>Brisanje</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" paddingTop={2}>
            Jeste li sigurni da zelite obrisati tu stavku?
          </DialogContentText>
        </DialogContent>
        <Box style={{ textAlign: 'right', height: '40px', margin: '20px 10px 10px 10px' }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Button onClick={() => setIsConfirmDOpen(false)} style={{ marginRight: '10px' }}>Odustani</Button>
              <Button onClick={handleDelete} variant="contained" autoFocus>
                Obrisi
              </Button>
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
}

export default VodiciLista;