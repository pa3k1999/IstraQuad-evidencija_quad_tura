import styled from '@emotion/styled';
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Slide, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { TureContext } from '../../contexts/TureContext';
import QuadoviUTuriLista from '../QuadoviUTuriLista';
import CloseIcon from '@mui/icons-material/Close';

const StyledDialogContent = styled((props) => (
  <DialogContent
    {...props}
  />
))(() => ({
  padding: 0,
  paddingTop: '20px',
  '&.MuiDialogContent-root': {
    overflowY:'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DetaljiZavrseneTurePopup({ isOpen, handleClose }) {
  const { vrsteTura, vodici, selectedZTura } = useContext(TureContext);
  const { theme } = useContext(GlobalContext);

  const zTuraVrataTure = vrsteTura.find(vT => vT.id === selectedZTura.vrstaTureId);
  const zTuraVodic = vodici.find(v => v.id === selectedZTura.vodicId);

  const vrP = selectedZTura.vrijemePocetka ? selectedZTura.vrijemePocetka.toDate() : new Date();
  const vrZ = selectedZTura.vrijemeZavrsetka ? selectedZTura.vrijemeZavrsetka.toDate() : new Date();
  const datum = `${vrP.getDate()}.${vrP.getMonth()+1}.${vrP.getFullYear()}.`;

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <Dialog
      TransitionComponent={Transition}
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="sm"
      onClose={handleClose}
      open={isOpen}
    >
      <DialogTitle
        style={{ backgroundColor: `${theme.palette.primary.main}`, color: `${theme.palette.primary.contrastText}`, padding: '16px', paddingLeft: '8px' }}
      >
      <Stack direction="row" spacing={1}>
        <Box width='100px' padding={0}>
          <Stack
           justifyContent="center"
           alignItems="center"
           spacing={0}
           >
            <Typography variant="subtitle2" gutterBottom component="div" margin={0}>
              {datum}
            </Typography>
            <Typography variant="h5" gutterBottom component="div" margin={0}>
              {zTuraVrataTure ? zTuraVrataTure.naziv : null}
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div" margin={0}>
            {`${('0' + vrP.getHours()).slice(-2)}:${('0' + vrP.getMinutes()).slice(-2)} - ${('0' + vrZ.getHours()).slice(
            -2
          )}:${('0' + vrZ.getMinutes()).slice(-2)}`}
            </Typography>
          </Stack>
        </Box>
        <Divider orientation="vertical" flexItem style={{borderColor: 'rgba(0, 0, 0, 0.2)'}}/>
        <Box padding={0}>
          <Stack
            justifyContent="center"
            alignItems="flex-start"
            spacing={0}
            style={{ marginLeft: '5px', height: '100%' }}
          >
            <Typography variant="h6" gutterBottom component="div" margin={0}>
              {selectedZTura ? selectedZTura.naziv : null}
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div" margin={0}>
              {zTuraVodic ? `${zTuraVodic.ime} ${zTuraVodic.prezime}` : null}
            </Typography>
          </Stack>
        </Box>
        </Stack>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.primary.contrastText,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <StyledDialogContent >
        <QuadoviUTuriLista/>
      </StyledDialogContent>
    </Dialog>
  );
}
export default DetaljiZavrseneTurePopup;
