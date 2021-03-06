import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Checkbox, CircularProgress, Fab, FormControlLabel, IconButton, InputAdornment, Stack } from '@mui/material';
import { GlobalContext } from '../../contexts/GlobalContext';
import useInputState from '../../hooks/useInputState';
import AddIcon from '@mui/icons-material/Add';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PopupWrap from '../PopupWrap';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { VodiciContext } from '../../contexts/VodiciContext';

function NoviVodicPopupForma({ open, handleSetIsOpenForma }) {
  const { theme } = useContext(GlobalContext);
  const { handleUpdateDataVodic, handleNewDataVodic, vodici } = useContext(VodiciContext);

  const [iIme, changeIIme, resetIIme, setIIme] = useInputState('');
  const [iPrezime, changeIPrezime, resetIPrezime, setIPrezime] = useInputState('');
  const [iKorisnickoIme, changeIKorisnickoIme, resetIKorisnickoIme, setIKorisnickoIme] = useInputState('');
  const [iEmail, changeIEmail, resetIEmail, setIEmail] = useInputState('');
  const [iLozinka, changeILozinka, resetILozinka, setILozinka] = useInputState('');
  const [iLozinkaC, changeILozinkaC, resetILozinkaC, setILozinkaC] = useInputState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLozinkaPrikaz, setIsLozinkaPrikaz] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleClose = () => {
    handleSetIsOpenForma(false);
  };

  const handleChangeIsAdmin = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleDodaj = async () => {
    const newVodici = { eMail: iEmail, ime: iIme, prezime: iPrezime, korisnickoIme: iKorisnickoIme };
    const userData = { eMail: iEmail, lozinka: iLozinkaC };
    setIsLoading(true);
    handleNewDataVodic(newVodici, userData, isAdmin).then(() => {
      handleClose();
      setIsLoading(false);
    });
  };

  const handleOpenNew = () => {
    handleSetIsOpenForma(true);
    resetIIme();
    resetIPrezime();
    resetIKorisnickoIme();
    resetIEmail();
    resetILozinka();
    resetILozinkaC();
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isEmpty', (value) => {
      if (value.trim() === '') {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule('isKImeUsed', (value) => {
      return vodici.every((v) => v.korisnickoIme.toLowerCase() !== value.toLowerCase());
    });
    ValidatorForm.addValidationRule('isEmailUsed', (value) => {
      return vodici.every((v) => v.eMail.toLowerCase() !== value.toLowerCase());
    });
    ValidatorForm.addValidationRule('isLozinkaIsta', (value) => {
      return value === iLozinka;
    });
  }, [iIme, iPrezime, iKorisnickoIme, iEmail, iLozinka, iLozinkaC]);

  const prikaziButton = (
    <InputAdornment position="end" style={{ position: 'relative', bottom: '50px', left: '250px', width: '40px' }}>
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setIsLozinkaPrikaz(false)}
        onMouseDown={() => setIsLozinkaPrikaz(true)}
        edge="end"
      >
        {isLozinkaPrikaz ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <>
      <PopupWrap open={open} title="Dodaj vodi??a" handleClose={handleClose}>
        <ValidatorForm id="vodic" onSubmit={handleDodaj}>
          <Stack alignItems="center" spacing={1}>
            <TextValidator
              label="Ime"
              color="secondary"
              style={{ width: '300px' }}
              value={iIme}
              onChange={changeIIme}
              validators={['isEmpty']}
              errorMessages={['Nesmije bit prazno']}
              helperText=" "
            />
            <TextValidator
              fullWidth={true}
              label="Prezime"
              color="secondary"
              style={{ width: '300px' }}
              value={iPrezime}
              onChange={changeIPrezime}
              validators={['isEmpty']}
              errorMessages={['Nesmije bit prazno']}
              helperText=" "
            />
            <TextValidator
              fullWidth={true}
              label="Korisni??ko ime"
              color="secondary"
              style={{ width: '300px' }}
              value={iKorisnickoIme}
              onChange={changeIKorisnickoIme}
              validators={['isEmpty', 'isKImeUsed']}
              errorMessages={['Nesmije bit prazno', 'Korisnicko ime vec postoji']}
              helperText=" "
            />
            <TextValidator
              fullWidth={true}
              label="Email"
              color="secondary"
              style={{ width: '300px' }}
              value={iEmail}
              onChange={changeIEmail}
              validators={['isEmpty', 'isEmailUsed']}
              errorMessages={['Nesmije bit prazno', 'Email adresa se vec koristi']}
              helperText=" "
            />
            <Box>
              <TextValidator
                fullWidth={true}
                label="Lozinka"
                type={isLozinkaPrikaz ? 'text' : 'password'}
                color="secondary"
                style={{ width: '300px' }}
                value={iLozinka}
                onChange={changeILozinka}
                validators={['isEmpty']}
                errorMessages={['Nesmije bit prazno']}
                helperText=" "
              />
              {prikaziButton}
            </Box>
            <Box>
              <TextValidator
                fullWidth={true}
                label="Potvrdi lozinku"
                type={isLozinkaPrikaz ? 'text' : 'password'}
                color="secondary"
                style={{ width: '300px' }}
                value={iLozinkaC}
                onChange={changeILozinkaC}
                validators={['isEmpty', 'isLozinkaIsta']}
                errorMessages={['Nesmije bit prazno', 'Lozinke nisu iste']}
                helperText=" "
              />
              {prikaziButton}
            </Box>
            <Box width='300px'>
              <FormControlLabel control={<Checkbox checked={isAdmin} onChange={handleChangeIsAdmin} />} label="Admin" />
            </Box>
          </Stack>
        </ValidatorForm>

        <Box style={{ textAlign: 'right', height: '40px', margin: '10px 10px 10px 10px' }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Button variant="text" style={{ marginRight: '10px' }} onClick={handleClose}>
                Odustani
              </Button>
              <Button type="submit" form="vodic" variant="contained">
                Dodaj
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

export default NoviVodicPopupForma;
