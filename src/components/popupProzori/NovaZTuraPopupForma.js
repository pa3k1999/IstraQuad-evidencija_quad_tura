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
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Slide,
  SvgIcon,
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

function NovaZTuraPopupForma({ handleClose, isOpen = true }) {
  const { theme } = useContext(GlobalContext);
  const { vrsteTura, vodici, quadovi, vrsteQuadova } = useContext(TureContext);

  const [novaZTura, setNovaZTura] = useState({});
  const [checked, setChecked] = useState({});
  const [step, setStep] =useState(0);

  const [selectedVTure, changeSelectedVTure, resetSelectedVTure, setSelectedVTure] = useInputState('');
  const [selectedVodic, changeSelectedVodic, resetSelectedVodic, setSelectedVodic] = useInputState('');
  const [nazivTure, changeNazivTure, resetNazivTure, setNazivTure] = useInputState('');
  const [vrijemePocetka, setVrijemePocetka] = useState(new Date());
  const [vrijemeZavrsetka, setVrijemeZavrsetka] = useState(new Date());

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const temp = quadovi.map(q => [q.id, false]) 
    setChecked(Object.fromEntries(temp));
  }, [quadovi]);


  const handleStep1 = () => {
    setNovaZTura({naziv: nazivTure, vodicId: selectedVodic, vrijemePocetka: vrijemePocetka, vrijemeZavrsetka: vrijemeZavrsetka, vrstaTureId: selectedVTure});
    setStep(1);
  }

  const handleStep2 = () => {
    
  }

  const handleStep3 = () => {
    
  }

  const handleDodaj = () => {};

  const handleToggleCheck = (id) => {
    setChecked({...checked, [id]: !checked[id]});
    console.log(checked)
    console.log(id)
  }

  useEffect(() => {
   if(selectedVTure !== ''){ 
   setVrijemeZavrsetka(new Date(vrijemePocetka.getTime() + vrsteTura.find(vT => vT.id === selectedVTure).minute*60000));
   } else {
   setVrijemeZavrsetka(vrijemePocetka)
  }
  }, [vrijemePocetka, selectedVTure]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isEmpty', (value) => {
      if (value.trim() === '') {
        return false;
      }
      return true;
    });
  }, [selectedVTure, selectedVodic, nazivTure]);

  const stepContent = [
    <>
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
      <List style={{ padding: '0' }} dense={true}>
      {vrsteQuadova.map((vq) => {
        const quadoviUListi = quadovi.filter((q) => q.vrstaQuadaId === vq.id);
        if (quadoviUListi.length > 0) {
          return (
            <DropDownWrap
              key={vq.id}
              titleChildren={
                <>
                  <Avatar sx={{ width: 20, height: 20, bgcolor: `${vq.boja}`, margin:'2px', marginRight: "5px" }}> </Avatar>
                  <Typography style={{ margin: '0', padding: '0'}}>{vq.naziv}</Typography>
                </>
              }
            >
              <List style={{ padding: '0' }} dense={true}>
                {quadoviUListi.map(q => {
                  return (
                    <ListItem disablePadding style={{ padding: '0'}}>
                      <ListItemButton onClick={() => handleToggleCheck(q.id)}>
                        <ListItemIcon>
                          <Checkbox
                            checked={checked[q.id]}
                            disableRipple
                          />
                        </ListItemIcon>
                        <Typography style={{ margin: '0', padding: '0'}}>{q.naziv}</Typography>
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            </DropDownWrap>
          );
        }
      })}
      </List>
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
        <StyledDialogContent>{stepContent[step]}</StyledDialogContent>
      </Dialog>
    </>
  );
}

export default NovaZTuraPopupForma;
