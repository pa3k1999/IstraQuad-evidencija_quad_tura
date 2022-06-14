import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Divider, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { memo, useContext, useEffect, useState } from 'react';
import DropDownWrap from './components/DropDownWrap';
import DetaljiZavrseneTurePopup from './components/popupProzori/DetaljiZavrseneTurePopup';
import NovaZTuraPopupForma from './components/popupProzori/NovaZTuraPopupForma';
import ZavrseneTureLista from './components/ZavrseneTureLista';
import { TureContext } from './contexts/TureContext';
import hrLocale from 'date-fns/locale/hr';
import { GlobalContext } from './contexts/GlobalContext';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import styled from '@emotion/styled';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Box } from '@mui/system';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import ConfirmBrisanje from './components/popupProzori/ConfirmBrisanje';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '& .MuiButtonBase-root': {
    minHeight: '30px',
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(({ theme }) => ({
  padding: 0,
  '& .MuiAccordionSummary-expandIconWrapper': {
    transition: 'all 0.5s ease-out',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'scale(1.2)',
    color: theme.palette.primary.contrastText,
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
}));

const StyledTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
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

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  padding: '8px',
  color: theme.palette.text.primary,
  '&.Mui-selected': {
    color: theme.palette.text.primary,
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2, paddingTop: 0 }}>{children}</Box>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label, data, color }) => {
  if (active && payload && payload.length) {
    return (
      <Paper elevation={5} sx={{ minWidth: '50px', padding: '0 5px' }}>
        <Typography padding={1} paddingBottom={0}>
          {data[label].datum}
        </Typography>
        <Typography padding={1} color={color}>
          Br. tura: {payload[0].value}
        </Typography>
      </Paper>
    );
  }
  return null;
};

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));

function ZavrseneTurePage() {
  const { zTure, handleSetRaspon, handleSetRasponOdDo, handleDeleteZTura } = useContext(TureContext);
  const { theme } = useContext(GlobalContext);

  const [isConfirmDOpen, setIsConfirmDOpen] = useState(false);
  const [isDetaljiOpen, setIsDetaljiOpen] = useState(false);
  const [isOpenForma, setIsOpenForma] = useState(false);
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);

  const [datumFilter, setDatumFilter] = useState(new Date());
  const [datumOdFilter, setDatumOdFilter] = useState(new Date());
  const [datumDoFilter, setDatumDoFilter] = useState(new Date());

  useEffect(() => {
    if (Object.values(zTure)[0]) {
      var dateArray = new Array();
      const length = Object.keys(zTure).length;
      console.log(Object.values(zTure)[length - 1]);
      const stopDateRaw = Object.values(zTure)[length - 1][0].vrijemePocetka.toDate();
      const stopDate = new Date(stopDateRaw.getFullYear(), stopDateRaw.getMonth(), stopDateRaw.getDate()+1, 0, 0, 0);
      const startDateRaw = Object.values(zTure)[0][0].vrijemePocetka.toDate();
      var startDate = new Date(startDateRaw.getFullYear(), startDateRaw.getMonth(), startDateRaw.getDate()-1, 0, 0, 0);
      while (startDate <= stopDate) {
        const stringDate = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`;
        dateArray.push({ datum: stringDate, ture: zTure[stringDate] ? zTure[stringDate].length : 0 });
        startDate.setDate(startDate.getDate() + 1);
      }
      setData(dateArray);
    }
  }, [zTure]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenDetalji = () => {
    setIsDetaljiOpen(true);
  };
  const handleCloseDetalji = () => {
    setIsDetaljiOpen(false);
  };

  const handleFiltriraj = () => {
    console.log(datumFilter);
    handleSetRaspon(datumFilter);
  };

  const handleFiltrirajOdDo = () => {
    handleSetRasponOdDo(datumOdFilter, datumDoFilter);
  };

  const handleOpenConfirm = () => {
    setIsConfirmDOpen(true);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Paper
        elevation={4}
        style={{ maxWidth: '1000px', margin: 'auto', borderRadius: '15px', overflow: 'hidden', marginBottom: '25px' }}
      >
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <Area
              dataKey="ture"
              type="monotone"
              stroke={theme.palette.primary.main}
              fill={theme.palette.primary.light}
            />
            <Tooltip content={<CustomTooltip data={data} color={theme.palette.primary.main} />} />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
      <Paper elevation={4} style={{ maxWidth: '1000px', margin: 'auto', borderRadius: '15px', overflow: 'hidden' }}>
        <Box style={{ backgroundColor: theme.palette.primary.main, minHeight: '32px', padding: '10px 20px' }}>
          <Accordion style={{ backgroundColor: theme.palette.primary.main, border: 'none' }}>
            <AccordionSummary
              expandIcon={<FilterAltRoundedIcon />}
              style={{ backgroundColor: theme.palette.primary.main, minHeight: '32px', color: 'white' }}
            >
              <Typography variant="h6">Zavrsene Ture</Typography>
            </AccordionSummary>

            <AccordionDetails
              style={{ backgroundColor: theme.palette.background.paper, border: 'none', borderRadius: '15px' }}
            >
              <Divider />
              <StyledTabs value={value} onChange={handleChange} variant="fullWidth">
                <StyledTab label="Mjesecno" {...a11yProps(0)} />
                <StyledTab label="Od-Do" {...a11yProps(1)} />
              </StyledTabs>
              <TabPanel value={value} index={0}>
                <Stack spacing={1}>
                  <Box marginTop={1}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={hrLocale}>
                      <MobileDatePicker
                        views={['year', 'month']}
                        className="aaa"
                        color="secondary"
                        label="Datum"
                        inputFormat="MM/yyyy"
                        minDate={new Date('2008-01-01')}
                        maxDate={new Date('2050-01-01')}
                        value={datumFilter}
                        onChange={setDatumFilter}
                        renderInput={(params) => <TextField color="primary" {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box width="100%" textAlign="right">
                    <Button variant="contained" onClick={handleFiltriraj}>
                      Filtriraj
                    </Button>
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Stack>
                  <Box marginTop={1}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={hrLocale}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MobileDatePicker
                          label="Od"
                          inputFormat="dd/MM/yyyy"
                          minDate={new Date('2008-01-01')}
                          maxDate={new Date('2050-01-01')}
                          value={datumOdFilter}
                          onChange={setDatumOdFilter}
                          renderInput={(params) => <TextField style={{ width: '110px' }} color="primary" {...params} />}
                        />
                        <Typography variant="h5">-</Typography>
                        <MobileDatePicker
                          label="Do"
                          inputFormat="dd/MM/yyyy"
                          minDate={new Date('2008-01-01')}
                          maxDate={new Date('2050-01-01')}
                          value={datumDoFilter}
                          onChange={setDatumDoFilter}
                          renderInput={(params) => <TextField style={{ width: '110px' }} color="primary" {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Box>
                  <Box width="100%" textAlign="right">
                    {' '}
                    <Button variant="contained" onClick={handleFiltrirajOdDo}>
                      Filtriraj
                    </Button>{' '}
                  </Box>
                </Stack>
              </TabPanel>
            </AccordionDetails>
          </Accordion>
        </Box>
        {Object.keys(zTure).map((zT) => {
          return (
            <DropDownWrap key={zT} titleChildren={<Typography style={{ margin: '0', padding: '0' }}>{zT}</Typography>}>
              <ZavrseneTureLista
                zTure={zTure[zT]}
                zTureDatumId={zT}
                handleOpenDetalji={handleOpenDetalji}
                handleOpenConfirm={handleOpenConfirm}
              />
            </DropDownWrap>
          );
        })}
        <NovaZTuraPopupForma isOpen={isOpenForma} setIsOpenForma={setIsOpenForma} />
        <DetaljiZavrseneTurePopup isOpen={isDetaljiOpen} handleClose={handleCloseDetalji} />
        <ConfirmBrisanje
          isOpen={isConfirmDOpen}
          handleClose={() => setIsConfirmDOpen(false)}
          handleDeleteeData={handleDeleteZTura}
        />
      </Paper>
    </>
  );
}

export default memo(ZavrseneTurePage);
