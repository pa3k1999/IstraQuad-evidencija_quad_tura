import React, { forwardRef, memo, useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, CircularProgress, Fab, Popover, Slide, Stack, useMediaQuery } from '@mui/material';
import { GlobalContext } from '../../contexts/GlobalContext';
import useInputState from '../../hooks/useInputState';
import AddIcon from '@mui/icons-material/Add';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { HexColorPicker } from 'react-colorful';
import { ColorLens } from '@mui/icons-material';
import styled from '@emotion/styled';
import { VrsteQuadovaContext } from '../../contexts/VrsteQuadovaContext';
import PopupWrap from '../PopupWrap';

const StyledPopover = styled((props) => (
  <Popover
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))(() => ({
  '& .MuiPaper-root': {
    borderRadius: 8,
    padding: '15px',
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow: 'none',
  },
}));

function NovaVQuadaPopupForma({ open, handleSetIsOpenForma }) {

  const { theme } = useContext(GlobalContext);
  const { selectedVrstaQuada, vrsteQuadova, handleNewDataVQuada, handleUpdateDataVQuada } = useContext(VrsteQuadovaContext);
  
  const [iNaziv, handleChangeINaziv, resetINaziv, setINaziv] = useInputState('');
  const [iObujam, handleChangeIObujam, resetIObujam, setIObujam] = useInputState('');
  const [color, setColor] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [isUpd, setIsUpd] = useState(true); 

  useEffect(() => {
    setINaziv(selectedVrstaQuada.naziv);
    setIObujam(selectedVrstaQuada.obujamMotora);
    setColor(selectedVrstaQuada.boja === '' ? '#ed361a' : selectedVrstaQuada.boja);
  }, [selectedVrstaQuada]);

  const handleClose = () => {
    handleSetIsOpenForma(false);
    setTimeout(() => {setIsUpd(true)}, 500);
  }

  const handleDodaj = async () => {
    const vrstaQuada = { naziv: iNaziv, obujamMotora: iObujam, boja: color};
    setIsLoading(true);
    (isUpd ? handleUpdateDataVQuada(vrstaQuada, selectedVrstaQuada.id) : handleNewDataVQuada(vrstaQuada, '')).then(() => {
      handleClose();
      setIsLoading(false);
    });
  };

  const handleOpenNew = () => {
    setIsUpd(false);
    handleSetIsOpenForma(true);
    resetINaziv();
    resetIObujam();
    setColor('#ed361a');
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isEmpty', (value) => {
      if (value.trim() === '') {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule('isNazivUsed', (value) => {
      return vrsteQuadova.every((VQ) => VQ.naziv.toLowerCase() !== value.toLowerCase() || selectedVrstaQuada.naziv.toLowerCase() === value.toLowerCase());
    });
  }, [iNaziv, iObujam]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openCS = Boolean(anchorEl);
  const handleClickCS = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseCS = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <PopupWrap open={open} title={isUpd ? 'Azuriraj vrstu quada' : 'Dodaj vrstu quada'} handleClose={handleClose}>
        <ValidatorForm id="vrstaQuada" onSubmit={handleDodaj}>
          <Stack alignItems="center" spacing={1}>
            <TextValidator
              label="Naziv"
              color="secondary"
              style={{ width: '300px', }}
              value={iNaziv}
              onChange={handleChangeINaziv}
              validators={['isEmpty', 'isNazivUsed']}
              errorMessages={['Nesmije bit prazno', 'Naziv vec postoji']}
              helperText=" "
            />
            <TextValidator
              fullWidth={true}
              label="Obujam motora"
              color="secondary"
              style={{ width: '300px' }}
              value={iObujam}
              onChange={handleChangeIObujam}
              validators={['isEmpty']}
              errorMessages={['Nesmije bit prazno']}
              helperText=" "
            />
            <Fab
              aria-controls={openCS ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openCS ? 'true' : undefined}
              size="medium"
              aria-label="add"
              style={{ backgroundColor: color }}
              onClick={handleClickCS}
            >
              <ColorLens />
            </Fab>
            <StyledPopover id="basic-menu" anchorEl={anchorEl} open={openCS} onClose={handleCloseCS}>
              <HexColorPicker color={color} onChange={setColor} />
            </StyledPopover>
          </Stack>
        </ValidatorForm>

        <Box style={{ textAlign: 'right', height: '40px', margin: '20px 10px 10px 10px' }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Button variant="text" style={{ marginRight: '10px' }} onClick={handleClose}>
                Odustani
              </Button>
              <Button type="submit" form="vrstaQuada" variant="contained">
                {isUpd ? 'Azuriraj' : 'Dodaj'}
              </Button>
            </>
          )}
        </Box>
      </PopupWrap>
      <Fab
        color="secondary"
        aria-label="add"
        sx={{
          position: 'fixed',
          color: `${theme.palette.mode === 'dark' ? 'common.black' : 'common.white'}`,
          bottom: 16,
          right: 16,
        }}
        onClick={handleOpenNew}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

export default memo(NovaVQuadaPopupForma);
