import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AppBar, Divider, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { memo, useContext, useEffect, useState } from 'react';
import DropDownWrap from './components/DropDownWrap';
import DetaljiZavrseneTurePopup from './components/popupProzori/DetaljiZavrseneTurePopup';
import NovaZTuraPopupForma from './components/popupProzori/NovaZTuraPopupForma';
import TabWrap from './components/TabWrap';
import ZavrseneTureLista from './components/ZavrseneTureLista';
import { TureContext } from './contexts/TureContext';
import hrLocale from 'date-fns/locale/hr';
import { GlobalContext } from './contexts/GlobalContext';
import SearchIcon from '@mui/icons-material/Search';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import styled from '@emotion/styled';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '& .MuiButtonBase-root': {
    minHeight: '30px'
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  padding: 0,
  '& .MuiAccordionSummary-expandIconWrapper': {
    transition: 'all 0.5s ease-out'
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'scale(1.2)',
    color: theme.palette.primary.contrastText
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }) => ({
  '& .MuiTabs-scroller': {
    height: '36px',
  },
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
    padding: '8px',
    color: theme.palette.text.primary,
    '&.Mui-selected': {
      color: theme.palette.text.primary,
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0
}));

//TODO: zavrsiti search bar
//      dodati brisanje tura (mozda uredjivanje?)
//      dodati brisanje i uredjivanje napomena

function ZavrseneTurePage() {
  const { zTure } = useContext(TureContext);
  const { theme } = useContext(GlobalContext);

  const [isDetaljiOpen, setIsDetaljiOpen] = useState(false);
  const [value, setValue] = React.useState(0);

  const [vrijemePocetka, setVrijemePocetka] = useState(new Date());

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenDetalji = () => {
    setIsDetaljiOpen(true);
  };
  const handleCloseDetalji = () => {
    setIsDetaljiOpen(false);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  return (
    <Paper elevation={4} style={{ maxWidth: '700px', margin: 'auto', borderRadius: '15px', overflow: 'hidden' }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<SearchIcon />}
          style={{ backgroundColor: theme.palette.primary.main, minHeight: '32px', color: 'white', padding: '10px 20px' }}
        >
          <Typography variant="h6">Zavrsene Ture</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
        >
          <StyledTab label="Mjesecno" />
          <StyledTab label="Od-Do" />
        </StyledTabs>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={hrLocale}>
            <MobileDatePicker
              views={['year', 'month']}
              className="aaa"
              color="secondary"
              label="Datum"
              inputFormat="MM.yyyy."
              minDate={new Date('2008-01-01')}
              maxDate={new Date('2050-01-01')}
              value={vrijemePocetka}
              onChange={setVrijemePocetka}
              renderInput={(params) => <TextField color="secondary" {...params} />}
            />
          </LocalizationProvider>
        </AccordionDetails>
      </Accordion>

      {Object.keys(zTure).map((zT) => {
        return (
          <DropDownWrap key={zT} titleChildren={<Typography style={{ margin: '0', padding: '0' }}>{zT}</Typography>}>
            <ZavrseneTureLista zTure={zTure[zT]} handleOpenDetalji={handleOpenDetalji} />
          </DropDownWrap>
        );
      })}
      <NovaZTuraPopupForma />
      <DetaljiZavrseneTurePopup isOpen={isDetaljiOpen} handleClose={handleCloseDetalji} />
    </Paper>
  );
}

export default memo(ZavrseneTurePage);
