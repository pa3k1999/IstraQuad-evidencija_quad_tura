import React from 'react';
import { Paper } from '@mui/material';
import TureLista from './TureLista';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TureListaTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Paper
        elevation={4}
        style={{ maxWidth: '700px', margin: 'auto', borderRadius: '15px', overflow: 'hidden' }}
      >
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Sve" {...a11yProps(0)} />
            <Tab label="1H" {...a11yProps(1)} />
            <Tab label="2H" {...a11yProps(2)} />
            <Tab label="30m" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <TureLista />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <TureLista />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <TureLista />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <TureLista />
          </TabPanel>
        </SwipeableViews>
      </Paper>
    </>
  );
}

export default React.memo(TureListaTabs);
