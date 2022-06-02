import { Avatar, Button, CircularProgress, Fab, MenuItem, Stack } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { GlobalContext } from '../../contexts/GlobalContext';
import PopupWrap from '../PopupWrap';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { TextValidator } from 'react-material-ui-form-validator';
import { Box } from '@mui/system';
import useInputState from '../../hooks/useInputState';
import { QuadoviContext } from '../../contexts/QuadoviContext';
import { SelectValidator } from 'react-material-ui-form-validator';
import styled from '@emotion/styled';

const StyledMenuItem = styled((props) => <MenuItem {...props} />)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: `${theme.palette.secondary.main}26`,
  },
  '&.Mui-selected:hover': {
    backgroundColor: `${theme.palette.secondary.main}33`,
  },
  '&.Mui-focusVisible.Mui-selected': {
    backgroundColor: `${theme.palette.secondary.main}30`,
  },
}));

function NoviQuadPopupForma({ open, handleSetIsOpenForma }) {
  const { theme } = useContext(GlobalContext);
  const { selectedQuad, quadovi, vrsteQuadova, handleNewDataQuad, handleUpdateDataQuad } = useContext(QuadoviContext);

  const [iNaziv, handleChangeiNaziv, resetiNaziv, setiNaziv] = useInputState('');
  const [iBrSasije, handleChangeIBrSasije, resetIBrSasije, setIBrSasije] = useInputState('');
  const [vrstaQuada, setVrstaQuada] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpd, setIsUpd] = useState(true);

  useEffect(() => {
    setiNaziv(selectedQuad.naziv);
    setIBrSasije(selectedQuad.brSasije);
    setVrstaQuada(selectedQuad.vrstaQuadaId);
  }, [selectedQuad]);

  const handleOpenNew = () => {
    setIsUpd(false);
    handleSetIsOpenForma(true);
    resetiNaziv('');
    resetIBrSasije('');
    setVrstaQuada('');
  };

  const handleClose = () => {
    handleSetIsOpenForma(false);
    setTimeout(() => {
      setIsUpd(true);
    }, 500);
  };

  const handleDodaj = async () => {
    const newQuad = { naziv: iNaziv, brSasije: iBrSasije, vrstaQuadaId: vrstaQuada };
    setIsLoading(true);
    (isUpd ? handleUpdateDataQuad(newQuad, selectedQuad.id) : handleNewDataQuad(newQuad)).then(() => {
      handleClose();
      setIsLoading(false);
    });
  };

  const handleChangeSelect = (event) => {
    setVrstaQuada(event.target.value);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isEmpty', (value) => {
      if (value.trim() === '') {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule('isNazivUsed', (value) => {
      return quadovi.every(
        (q) => q.id.toLowerCase() !== value.toLowerCase() || selectedQuad.id.toLowerCase() === value.toLowerCase()
      );
    });
  }, [iNaziv, iBrSasije, vrstaQuada]);

  return (
    <>
      <PopupWrap open={open} title={isUpd ? 'Azuriraj quad' : 'Dodaj quad'} handleClose={handleClose}>
        <ValidatorForm id="quad" onSubmit={handleDodaj}>
          <Stack alignItems="center" spacing={1}>
            <SelectValidator
              color="secondary"
              id="vrstaQuada-select"
              value={vrstaQuada}
              label="Vrsta quada"
              onChange={handleChangeSelect}
              sx={{ m: 1, minWidth: '300px' }}
              helperText=" "
              validators={['isEmpty']}
              errorMessages={['Nesmije bit prazno']}
            >
              {vrsteQuadova.map((vq) => (
                <StyledMenuItem key={vq.id} value={vq.id}>
                  <Stack direction="row" spacing={1}>
                    <Avatar sx={{ width: 18, height: 18, bgcolor: `${vq.boja}`, margin: '2px', marginRight: '5px' }}>
                      {' '}
                    </Avatar>
                    {vq.naziv}
                  </Stack>
                </StyledMenuItem>
              ))}
            </SelectValidator>
            <TextValidator
              label="Naziv"
              color="secondary"
              style={{ width: '300px' }}
              value={iNaziv}
              onChange={handleChangeiNaziv}
              validators={['isEmpty', 'isNazivUsed']}
              errorMessages={['Nesmije bit prazno', 'Naziv vec postoji']}
              helperText=" "
            />
            <TextValidator
              fullWidth={true}
              label="Broj sasije"
              color="secondary"
              style={{ width: '300px' }}
              value={iBrSasije}
              onChange={handleChangeIBrSasije}
              validators={['isEmpty']}
              errorMessages={['Nesmije bit prazno']}
              helperText=" "
            />
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
              <Button type="submit" form="quad" variant="contained">
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

export default NoviQuadPopupForma;
