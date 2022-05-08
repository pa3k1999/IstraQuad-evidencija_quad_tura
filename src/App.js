import { ThemeProvider } from '@emotion/react';
import './App.css';
import { GlobalContext } from './contexts/GlobalContext';
import { memo, useContext } from 'react';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import QuadoviPage from './QuadoviPage'
import { VrsteQuadovaProvider } from './contexts/VrsteQuadovaContext';
import VrsteQuadovaPage from './VrsteQuadovaPage';
import { QuadoviProvider } from './contexts/QuadoviContext';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';

function App() {
const {theme} = useContext(GlobalContext)

console.log(theme.palette.secondary.main)

  return (
      <ThemeProvider theme={theme}>
        <Paper elevation={0} style={{ height: '100vh'}} square={true}>
          <NavBar/>
          <Box style={{paddingTop: '100px'}} square={true}>
            <Routes>
              <Route exact path="/" element={<p> pipi pupu </p>}/>
              <Route exact path="/vrste-quadova" element={<VrsteQuadovaProvider><VrsteQuadovaPage/></VrsteQuadovaProvider>}/>
              <Route exact path="/quadovi" element={<QuadoviProvider><QuadoviPage/></QuadoviProvider>}/>
            </Routes> 
          </Box>
        </Paper>
      </ThemeProvider>
  );
}

export default memo(App);
