import React, { forwardRef, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import atvIcon from '../../slike/atv.svg.js';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { SelectValidator } from 'react-material-ui-form-validator';
import { TextValidator } from 'react-material-ui-form-validator';
import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Slide,
  SvgIcon,
  TextareaAutosize,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GlobalContext } from '../../contexts/GlobalContext';
import { TureContext } from '../../contexts/TureContext';
import useInputState from '../../hooks/useInputState';
import { LocalizationProvider, MobileDatePicker, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import hrLocale from 'date-fns/locale/hr';
import { Box } from '@mui/system';
import DropDownWrap from '../DropDownWrap.js';
import { Timestamp } from 'firebase/firestore';

const StyledTextareaAutosize = styled((props) => <TextareaAutosize {...props} />)(({ theme }) => ({
  ...theme.typography.subtitle2,
  width: 'auto',
  padding: '5px 10px', 
  borderRadius: 0,
  '&:focus-visible': {
    outline: 'none'
  },
}));

const StyledDialogContent = styled((props) => <DialogContent {...props} />)(() => ({
  padding: 0,
  paddingTop: '20px',
  '&.MuiDialogContent-root': {
    overflowY: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

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

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'radial-gradient(circle, rgba(246,109,51,1) 0%, rgba(255,193,7,1) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'radial-gradient(circle, rgba(246,109,51,1) 0%, rgba(255,193,7,1) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'radial-gradient(circle, rgba(246,152,51,1) 0%, rgba(255,193,7,1) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'radial-gradient(circle, rgba(246,152,51,1) 0%, rgba(255,193,7,1) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SportsScoreIcon />,
    2: <SvgIcon sx={{ color: 'primary.contrastText' }}>{atvIcon}</SvgIcon>,
    3: <ConstructionRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NovaZTuraPopupForma({ handleClose, isOpen = false }) {
  const { theme } = useContext(GlobalContext);
  const { vrsteTura, vodici, quadovi, vrsteQuadova, handleNewZTura, handleSetRaspon } = useContext(TureContext);

  const title = {
    0: 'Izrada ture',
    1: 'Odabir quadova',
    2: 'Dodavanje napomena',
  };

  const [novaZTura, setNovaZTura] = useState({quadovi: []});
  const [novaeNapomene, setNoveNapomene] = useState([]);
  const [checked, setChecked] = useState({});
  const [step, setStep] = useState(0);

  const [selectedVTure, changeSelectedVTure, resetSelectedVTure, setSelectedVTure] = useInputState('');
  const [selectedVodic, changeSelectedVodic, resetSelectedVodic, setSelectedVodic] = useInputState('');
  const [nazivTure, changeNazivTure, resetNazivTure, setNazivTure] = useInputState('');
  const [brVozaca, setBrVozaca] = useState(0);
  const [brSuvozaca, changeBrSuvozaca, resetBrSuvozaca, setBrSuvozaca] = useInputState(0);
  const [vrijemePocetka, setVrijemePocetka] = useState(new Date());
  const [vrijemeZavrsetka, setVrijemeZavrsetka] = useState(new Date());

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const temp = quadovi.map((q) => [q.id, false]);
    setChecked(Object.fromEntries(temp));
  }, [quadovi]);

  const handleStep1 = () => {
    setNovaZTura({
      naziv: nazivTure,
      vodicId: selectedVodic,
      vrijemePocetka: Timestamp.fromDate(vrijemePocetka),
      vrijemeZavrsetka: Timestamp.fromDate(vrijemeZavrsetka),
      vrstaTureId: selectedVTure
    });
    setStep(1);
  };

  const handleStep2 = () => {
    const selectedQuadovi = Object.keys(checked)
      .filter((k) => checked[k] === true)
      .map((q) => q);
    const temp = selectedQuadovi.map((q) => [q, '']);
    console.log(selectedQuadovi)
    setNoveNapomene(Object.fromEntries(temp));
    setNovaZTura({ ...novaZTura, quadovi: selectedQuadovi, brVozaca: brVozaca, brSuvozaca: parseInt(brSuvozaca)});
    setStep(2);
  };

  const handleStep3 = () => {
    console.log(novaeNapomene)
    handleNewZTura(novaZTura, novaeNapomene);
  };

  const handleStepBack = () => {
    setStep(step - 1);
  };

  const handleDodajNapomenu = (e, id) => {
    setNoveNapomene({...novaeNapomene, [id]: e.target.value});
  };

  const handleToggleCheck = (id) => {
    setChecked({ ...checked, [id]: !checked[id] });
  };

  useEffect(() => {
    setBrVozaca(Object.keys(checked).filter((k) => checked[k] === true).length);
  }, [checked]);

  useEffect(() => {
    if (selectedVTure !== '') {
      setVrijemeZavrsetka(
        new Date(vrijemePocetka.getTime() + vrsteTura.find((vT) => vT.id === selectedVTure).minute * 60000)
      );
    } else {
      setVrijemeZavrsetka(vrijemePocetka);
    }
  }, [vrijemePocetka, selectedVTure]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isEmpty', (value) => {
      if (value.trim() === '') {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule('isNum', (value) => {
      if (value === '') {
        return false;
      }
      return true;
    });
  }, []);

  const stepContent = [
    <>
      <StyledDialogContent style={{ height: '70vh', maxHeight: '500px' }}>
        <ValidatorForm id="zTuraS1" onSubmit={handleStep1}>
          <Stack alignItems="center" spacing={1} marginTop="20px">
            <TextValidator
              label="Naziv ture"
              color="secondary"
              style={{ width: '300px' }}
              value={nazivTure}
              onChange={changeNazivTure}
              validators={['isEmpty']}
              errorMessages={['Nesmije bit prazno']}
              helperText=" "
            />
            <SelectValidator
              color="secondary"
              id="vrstaTure-select"
              value={selectedVTure}
              label="Vrsta ture"
              onChange={changeSelectedVTure}
              sx={{ m: 1, minWidth: '300px' }}
              helperText=" "
              validators={['isEmpty']}
              errorMessages={['Nesmije bit prazno']}
            >
              {vrsteTura.map((vT) => (
                <StyledMenuItem key={vT.id} value={vT.id}>
                  {vT.naziv}
                </StyledMenuItem>
              ))}
            </SelectValidator>
            <SelectValidator
              color="secondary"
              id="vodic-select"
              value={selectedVodic}
              label="Vodic"
              onChange={changeSelectedVodic}
              sx={{ m: 1, minWidth: '300px' }}
              helperText=" "
              validators={['isEmpty']}
              errorMessages={['Nesmije bit prazno']}
            >
              {vodici.map((v) => (
                <StyledMenuItem key={v.id} value={v.id}>{`${v.ime} ${v.prezime}`}</StyledMenuItem>
              ))}
            </SelectValidator>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={hrLocale}>
              <Stack spacing={3} width="300px" paddingBottom="20px">
                <MobileDatePicker
                  className="aaa"
                  color="secondary"
                  label="Datum"
                  inputFormat="dd/MM/yyyy"
                  value={vrijemePocetka}
                  onChange={setVrijemePocetka}
                  renderInput={(params) => <TextField color="secondary" {...params} />}
                />
                <Stack direction="row" spacing={2}>
                  <TimePicker
                    color="secondary"
                    label="Pocetak"
                    value={vrijemePocetka}
                    onChange={setVrijemePocetka}
                    renderInput={(params) => <TextField color="secondary" {...params} />}
                  />
                  <TimePicker
                    color="secondary"
                    label="Kraj"
                    value={vrijemeZavrsetka}
                    onChange={setVrijemeZavrsetka}
                    renderInput={(params) => <TextField color="secondary" {...params} />}
                  />
                </Stack>
              </Stack>
            </LocalizationProvider>
          </Stack>
        </ValidatorForm>
      </StyledDialogContent>
      <Box style={{ textAlign: 'right', height: '40px', margin: '20px 10px 10px 10px' }}>
        <Button variant="text" style={{ marginRight: '10px' }} onClick={handleClose}>
          Odustani
        </Button>
        <Button type="submit" form="zTuraS1" variant="contained">
          Sljedece
        </Button>
      </Box>
    </>,
    <>
      <StyledDialogContent style={{ height: '70vh', maxHeight: '500px' }}>
        <ValidatorForm id="zTuraS2" onSubmit={handleStep2}>
          <Stack alignItems="center">
            <Stack direction="row" spacing={2} marginTop="20px">
              <TextValidator
                disabled
                label="Broj vozaca"
                color="secondary"
                style={{ width: '120px' }}
                value={brVozaca}
                validators={['minNumber: 1']}
                errorMessages={['']}
                helperText=" "
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextValidator
                label="Broj Suvozaca"
                color="secondary"
                style={{ width: '120px' }}
                value={brSuvozaca}
                onChange={changeBrSuvozaca}
                validators={['isNum', 'minNumber: 0', `maxNumber: ${brVozaca}`]}
                errorMessages={['', '',`Max: ${brVozaca}`]}
                helperText=" "
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
          </Stack>
        </ValidatorForm>
        <List style={{ padding: '0' }} dense={true}>
          {vrsteQuadova.map((vq) => {
            const quadoviUListi = quadovi.filter((q) => q.vrstaQuadaId === vq.id);
            if (quadoviUListi.length > 0) {
              return (
                <DropDownWrap
                  key={vq.id}
                  titleChildren={
                    <>
                      <Avatar sx={{ width: 20, height: 20, bgcolor: `${vq.boja}`, margin: '2px', marginRight: '5px' }}>
                        {' '}
                      </Avatar>
                      <Typography style={{ margin: '0', padding: '0' }}>{vq.naziv}</Typography>
                    </>
                  }
                >
                  <List style={{ padding: '0' }} dense={true}>
                    {quadoviUListi.map((q) => {
                      return (
                        <ListItem disablePadding style={{ padding: '0' }}>
                          <ListItemButton onClick={() => handleToggleCheck(q.id)}>
                            <ListItemIcon>
                              <Checkbox checked={checked[q.id]} disableRipple />
                            </ListItemIcon>
                            <Typography style={{ margin: '0', padding: '0' }}>{q.naziv}</Typography>
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </DropDownWrap>
              );
            }
          })}
        </List>
      </StyledDialogContent>
      <Box style={{ textAlign: 'right', height: '40px', margin: '20px 10px 10px 10px' }}>
        <Button variant="text" style={{ marginRight: '10px' }} onClick={handleStepBack}>
          Natrag
        </Button>
        <Button variant="contained" type="submit" form="zTuraS2">
          Sljedece
        </Button>
      </Box>
    </>,
    <>
      <StyledDialogContent style={{ height: '70vh', maxHeight: '500px' }}>
        <List style={{ padding: '0' }} dense={true}>
          {novaZTura.quadovi ? novaZTura.quadovi.map(qZT => {
            const quad = quadovi.find(q => q.id === qZT);
            const quadBoja = vrsteQuadova.find(vQ => vQ.id === quad.vrstaQuadaId).boja;
            return (
              <>
                <ListItem disablePadding>
                  <ListItemButton style={{ padding: '0'}}>
                    <Stack style={{width: '100%', overflow: 'hidden'}}>
                      <Stack direction="row" style={{ padding: '5px 10px', backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                        <Avatar sx={{ width: 20, height: 20, bgcolor: quadBoja, margin:'2px', marginRight: "5px" }}> </Avatar>
                        <Typography style={{ margin: '0', padding: '0'}}>{quad.naziv}</Typography>
                      </Stack>
                      <StyledTextareaAutosize
                        aria-label="napomena"
                        minRows={2}
                        placeholder={`Napomena za ${quad.naziv}`}
                        onChange={(e) => handleDodajNapomenu(e, quad.id)}
                        style={{ width: 'auto', padding: '5px 10px', borderRadius: 0, border: 'none'}}
                      />
                      </Stack>   
                  </ListItemButton>
                </ListItem>
              </>);
          }) : null}
        </List>
        <Divider style={{borderBottom: '1px solid rgba(0, 0, 0, 0.2)'}}/>
      </StyledDialogContent>
      <Box style={{ textAlign: 'right', height: '40px', margin: '20px 10px 10px 10px' }}>
        <Button variant="text" style={{ marginRight: '10px' }} onClick={handleStepBack}>
          Natrag
        </Button>
        <Button variant="contained" onClick={handleStep3}>
          Dodaj
        </Button>
      </Box>
    </>
  ];

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth="sm"
        onClose={handleClose}
        open={isOpen}
      >
        <DialogTitle
          style={{
            backgroundColor: `${theme.palette.primary.main}`,
            color: `${theme.palette.primary.contrastText}`,
            padding: '16px',
            paddingLeft: '8px',
          }}
        >
          <Box textAlign='center' marginBottom='10px'>
            {title[step]}
          </Box>
          <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
              </Step>
            ))}
          </Stepper>
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
        {stepContent[step]}
      </Dialog>
    </>
  );
}

export default NovaZTuraPopupForma;
