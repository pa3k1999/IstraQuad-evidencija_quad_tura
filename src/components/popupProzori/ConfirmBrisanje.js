import { Box, Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import React, { forwardRef, useContext, useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmBrisanje({ isOpen, handleClose, handleDeleteeData, text='Jeste li sigurni da zelite obrisati tu stavku?' }) {
  const { theme } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async() => {
    setIsLoading(true);
    handleDeleteeData().then(setTimeout(() => {
      handleClose();
      setIsLoading(false);
    }, 500));
  };
  
  return (
    <Dialog
      TransitionComponent={Transition}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" style={{ backgroundColor: `${theme.palette.primary.main}`, color: `${theme.palette.primary.contrastText}` }}>Brisanje</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" paddingTop={2}>
          {text}
        </DialogContentText>
      </DialogContent>
      <Box style={{ textAlign: 'right', height: '40px', margin: '20px 10px 10px 10px' }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Button onClick={handleClose} style={{ marginRight: '10px' }}>Odustani</Button>
            <Button onClick={handleDelete} variant="contained" autoFocus>
              Obrisi
            </Button>
          </>
        )}
      </Box>
    </Dialog>
  );
}

export default ConfirmBrisanje;
