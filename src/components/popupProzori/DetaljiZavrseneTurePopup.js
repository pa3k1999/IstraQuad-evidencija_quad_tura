import styled from '@emotion/styled';
import { Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Slide, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { forwardRef, useContext } from 'react';
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

//TODO: otvaranje i zatvaranje prozora
//      sinkronizacija s podatcima iz baze

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DetaljiZavrseneTurePopup({ handleClose }) {
  const { vrsteTura, vrsteQuadova, quadovi } = useContext(TureContext);

  const { theme } = useContext(GlobalContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <Dialog
      TransitionComponent={Transition}
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="sm"
      onClose={handleClose}
      open={true}
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
              1.4.2022.
            </Typography>
            <Typography variant="h5" gutterBottom component="div" margin={0}>
              1H
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div" margin={0}>
              10:00 - 11:00
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
              test 123
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div" margin={0}>
              vodic
            </Typography>
          </Stack>
        </Box>
        </Stack>
        <IconButton
          aria-label="close"
          onClick={''}
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
