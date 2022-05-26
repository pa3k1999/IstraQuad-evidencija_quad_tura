import { ThemeProvider } from '@emotion/react';
import './App.css';
import { GlobalContext } from './contexts/GlobalContext';
import { cloneElement, memo, useContext} from 'react';
import { Button, Container, Paper, Toolbar, useScrollTrigger } from '@mui/material';
import { Box } from '@mui/system';
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
import adminsUIDs from './adminsUIDs';
import VodiciPage from './VodiciPage';
import { VodiciProvider } from './contexts/VodiciContext';
import styled from '@emotion/styled';
import axios from 'axios';
import KorisnikPage from './KorisnikPage';
import QuadInfoPage from './QuadInfoPage';

//TODO: napraviti provjere brisanja i zabrane
//      napraviti pregled profila i uredjivanje podataka
//      napraviti pregled quadova (koliko odradjenih tura i sve napomene)
//      napraviti backend radi brisanja korisnika i auto logouta

const StyledPaper = styled((props) => <Paper {...props} />)(
  ({ theme }) => ({
    overflowY:'scroll',
    MsOverflowStyle: 'none',
    scrollbarWidth: 'none',
    "&::-webkit-scrollbar": {
      display: 'none',
    }
  }),
);

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
  const { theme, auth} = useContext(GlobalContext);   

  // const get = () => {auth.currentUser.getIdToken(false).then(function(idToken) {
  //   axios.get('http://localhost:4000/server', {
  //     headers: {
  //       authtoken: `${idToken}`
  //     },
  //   }).then(res => console.log(new Date(res.data.exp*1000)))
  //   })
  // }
  

  return (
    <ThemeProvider theme={theme}>
      <>
        <ElevationScroll>
        <NavBar />
        </ElevationScroll>
          <StyledPaper elevation={0} style={{height: '100vh',  display: 'flex', flexFlow: 'column'}}>
            <Toolbar sx={{marginBottom: 3, flex: '0 1 auto'}}/>
            <div style={{flex: '1 1 auto'}}>
              <Routes>
              <Route exact path="/" element={<p> pipi pupu </p>} />
              <Route
                exact
                path="/vrste-quadova"
                element={
                  auth.currentUser && adminsUIDs.includes(auth.currentUser.uid) ? (
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
                  auth.currentUser && adminsUIDs.includes(auth.currentUser.uid) ? (
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
                  <TureProvider>
                    <ZavrseneTurePage />
                  </TureProvider>
                }
              />
              <Route
                exact
                path="/vodici"
                element={
                  <VodiciProvider>
                    <VodiciPage/>
                  </VodiciProvider>
                }
              />
              <Route
                exact
                path="/vodic/:uid"
                element={
                  auth.currentUser && adminsUIDs.includes(auth.currentUser.uid) ? (
                    <KorisnikPage/>
                  ) : (
                    <ErrorPage />
                  )
                }
              />
              <Route
                exact
                path="/quad/:id"
                element={
                  auth.currentUser && adminsUIDs.includes(auth.currentUser.uid) ? (
                    <QuadInfoPage/>
                  ) : (
                    <ErrorPage />
                  )
                }
              />
              <Route exact path="/prijava" element={<LogInPage />} />
            </Routes>
            </div>
            {/* <Button onClick={get}>geeeet</Button> */}
          </StyledPaper>
          
        </>
    </ThemeProvider>
  );
}

export default memo(App);
