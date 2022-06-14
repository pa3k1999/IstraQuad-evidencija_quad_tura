import { ThemeProvider } from '@emotion/react';
import './App.css';
import { GlobalContext } from './contexts/GlobalContext';
import { cloneElement, memo, useContext } from 'react';
import { Paper, Toolbar, useScrollTrigger } from '@mui/material';
import QuadoviPage from './QuadoviPage';
import { VrsteQuadovaProvider } from './contexts/VrsteQuadovaContext';
import VrsteQuadovaPage from './VrsteQuadovaPage';
import { QuadoviProvider } from './contexts/QuadoviContext';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { TureProvider } from './contexts/TureContext';
import ZavrseneTurePage from './ZavrseneTurePage';
import LogInPage from './LogInPage';
import ErrorPage from './ErrorPage';
import VodiciPage from './VodiciPage';
import { VodiciProvider } from './contexts/VodiciContext';
import styled from '@emotion/styled';
import KorisnikPage from './KorisnikPage';
import QuadInfoPage from './QuadInfoPage';
import StatistikaPage from './StatistikaPage';
import HomePage from './HomePage';

//TODO: napraviti pregled profila i uredjivanje podataka
//      loading za dodavanje zTura
//      home page

const StyledPaper = styled((props) => <Paper {...props} />)(({ theme }) => ({
  overflowY: 'scroll',
  MsOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function App() {
  const { theme, auth, userClaims } = useContext(GlobalContext);

  console.log(userClaims);

  return (
    <ThemeProvider theme={theme}>
      <>
        <ElevationScroll>
          <NavBar />
        </ElevationScroll>
        <StyledPaper elevation={0} style={{ height: '100vh', display: 'flex', flexFlow: 'column' }}>
          <Toolbar sx={{ marginBottom: 3, flex: '0 1 auto' }} />
          <div style={{ flex: '1 1 auto' }}>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route
                exact
                path="/vrste-quadova"
                element={
                  auth.currentUser && (userClaims.admin || userClaims.premiumAccount) ? (
                    <VrsteQuadovaProvider>
                      <VrsteQuadovaPage />
                    </VrsteQuadovaProvider>
                  ) : (
                    <ErrorPage />
                  )
                }
              />
              <Route
                exact
                path="/quadovi"
                element={
                  auth.currentUser && (userClaims.admin || userClaims.premiumAccount) ? (
                    <QuadoviProvider>
                      <QuadoviPage />
                    </QuadoviProvider>
                  ) : (
                    <ErrorPage />
                  )
                }
              />
              <Route
                exact
                path="/zavrsene-ture"
                element={
                  auth.currentUser && (userClaims.admin || userClaims.premiumAccount) ? (
                    <TureProvider>
                      <ZavrseneTurePage />
                    </TureProvider>
                  ) : (
                    <ErrorPage />
                  )
                }
              />
              <Route
                exact
                path="/vodici"
                element={
                  auth.currentUser && userClaims.admin ? (
                    <VodiciProvider>
                      <VodiciPage />
                    </VodiciProvider>
                  ) : (
                    <ErrorPage />
                  )
                }
              />
              <Route
                exact
                path="/vodic/:uid"
                element={
                  auth.currentUser && (userClaims.admin || userClaims.premiumAccount) ? <KorisnikPage /> : <ErrorPage />
                }
              />
              <Route
                exact
                path="/quad/:id"
                element={
                  auth.currentUser && (userClaims.admin || userClaims.premiumAccount) ? <QuadInfoPage /> : <ErrorPage />
                }
              />
              <Route
                exact
                path="/statistika"
                element={
                  auth.currentUser && (userClaims.admin || userClaims.premiumAccount) ? (
                    <StatistikaPage />
                  ) : (
                    <ErrorPage />
                  )
                }
              />
              <Route exact path="/prijava" element={<LogInPage />} />
            </Routes>
          </div>
        </StyledPaper>
      </>
    </ThemeProvider>
  );
}

export default memo(App);
