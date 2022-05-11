import { ThemeProvider } from '@emotion/react';
import './App.css';
import { GlobalContext } from './contexts/GlobalContext';
import { memo, useContext } from 'react';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import QuadoviPage from './QuadoviPage';
import { VrsteQuadovaProvider } from './contexts/VrsteQuadovaContext';
import VrsteQuadovaPage from './VrsteQuadovaPage';
import { QuadoviProvider } from './contexts/QuadoviContext';
import NavBar from './components/NavBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { TureProvider } from './contexts/TureContext';
import ZavrseneTurePage from './ZavrseneTurePage';
import TureListaTabs from './components/tureLista/TureListaTabs';
import LogInPage from './LogInPage';
import { getAuth } from 'firebase/auth';
import ErrorPage from './ErrorPage';

function App() {
  const { theme } = useContext(GlobalContext);

  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} style={{ height: '100vh' }} square={true}>
        <NavBar />
        <Box style={{ paddingTop: '100px' }} square={true}>
          <Routes>
            <Route exact path="/" element={<p> pipi pupu </p>} />
            <Route
              exact
              path="/vrste-quadova"
              element={
                auth.currentUser ? 
                <VrsteQuadovaProvider>
                  <VrsteQuadovaPage />
                </VrsteQuadovaProvider> :
                <ErrorPage/>
              }
            />
            <Route
              exact
              path="/quadovi"
              element={
                auth.currentUser ? 
                <QuadoviProvider>
                  <QuadoviPage />
                </QuadoviProvider> :
                <ErrorPage/>
              }
            />
            <Route
              exact
              path="/zavrsene-ture"
              element={
                <TureProvider>
                  <TureListaTabs />
                  <ZavrseneTurePage />
                </TureProvider>
              }
            />
            <Route exact path="/prijava" element={<LogInPage />} />
          </Routes>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default memo(App);
