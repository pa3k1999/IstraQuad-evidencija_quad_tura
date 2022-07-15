import React, { useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { GlobalContext } from './contexts/GlobalContext';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { TextValidator } from 'react-material-ui-form-validator';
import useInputState from './hooks/useInputState';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const StyledLozinkaTextValidator = styled((props) => <TextValidator {...props} />)(() => ({
  '& input.MuiInputBase-input': {
    paddingRight: '45px',
  },
}));

const errors = {
  'auth/invalid-email': 'Korisničko ime ili lozinka je pogrešna!',
  'auth/wrong-password': 'Korisničko ime ili lozinka je pogrešna!',
};

export default function LogInPage() {
  const { theme, getUserEmail, isLogiran, auth } = useContext(GlobalContext);

  const [korisnickoIme, changeKorisnickoIme, resetKorisnickoIme, setKorisnickoIme] = useInputState('');
  const [lozinka, changeLozinka, resetLozinka, setLozinka] = useInputState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLozinkaPrikaz, setIsLozinkaPrikaz] = useState(false);
  const [isSnackBOpen, setIsSnackBOpen] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const navigate = useNavigate();
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    if (isLogiran) {
      navigate('/');
    } else {
      setIsLoadingPage(false);
    }
  }, []);

  const handleOdustani = async () => {
    await auth.signOut();
    navigate('/');
  };

  const handleLogIn = async () => {
    setIsLoading(true);
    const email = await getUserEmail(korisnickoIme);
    console.log(email);
    signInWithEmailAndPassword(auth, email, lozinka)
      .then((userCredential) => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error.code);
        setErrorCode(error.code);
        setIsSnackBOpen(true);
        setIsLoading(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackBOpen(false);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isEmpty', (value) => {
      if (value.trim() === '') {
        return false;
      }
      return true;
    });
  }, [korisnickoIme, lozinka]);

  return isLoadingPage ? (
    <></>
  ) : (
    <>
      <Paper elevation={4} style={{ maxWidth: '400px', margin: 'auto', borderRadius: '15px', overflow: 'hidden' }}>
        <Box
          style={{ backgroundColor: theme.palette.primary.main, height: '32px', color: 'white', padding: '10px 20px' }}
        >
          <Typography variant="h6">Prijava korisnika</Typography>
        </Box>
        <ValidatorForm id="korisnik" onSubmit={handleLogIn} style={{ margin: '20px 0 0 0' }}>
          <Stack alignItems="center" spacing={1}>
            <TextValidator
              label="Korisnicko ime"
              color="secondary"
              style={{ width: '300px' }}
              value={korisnickoIme}
              onChange={changeKorisnickoIme}
              validators={['isEmpty']}
              errorMessages={['Nesmije bit prazno']}
              helperText=" "
            />
            <Box>
              <StyledLozinkaTextValidator
                fullWidth={true}
                label="Lozinka"
                type={isLozinkaPrikaz ? 'text' : 'password'}
                color="secondary"
                style={{ width: '300px' }}
                value={lozinka}
                onChange={changeLozinka}
                validators={['isEmpty']}
                errorMessages={['Nesmije bit prazno']}
                helperText=" "
              />
              <InputAdornment position="end" style={{ position: 'relative', bottom: '50px', left: '250px' }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setIsLozinkaPrikaz(false)}
                  onMouseDown={() => setIsLozinkaPrikaz(true)}
                  edge="end"
                >
                  {isLozinkaPrikaz ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </Box>
          </Stack>
          <Box style={{ textAlign: 'right', height: '40px', margin: '20px 10px 10px 10px' }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Button variant="text" style={{ marginRight: '10px' }} onClick={handleOdustani}>
                  Odustani
                </Button>
                <Button type="submit" form="korisnik" variant="contained">
                  Prijava
                </Button>
              </>
            )}
          </Box>
        </ValidatorForm>
      </Paper>
      <Snackbar
        open={isSnackBOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errors[errorCode]}
        </Alert>
      </Snackbar>
    </>
  );
}
