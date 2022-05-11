import { unstable_createMuiStrictModeTheme } from '@mui/material';
import { amber, red, yellow } from '@mui/material/colors';
import React, { createContext, useState } from 'react';
import {
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore';
import db from '../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const GlobalContext = createContext();

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    mode: 'light',
    primary: {
      main: red[500],
    },
    secondary: {
      main: amber[500],
    },
    sideC: {
      main: yellow[500],
    },
  },
  shape: {
    borderRadius: 15,
  },
});

const getUserEmail = async (korisnickoIme) => {
  try {
    const first = query(collection(db, 'vodici'), where('korisnickoIme', '==', korisnickoIme));
    const documentSnapshotsFirst = await getDocs(first);
    return documentSnapshotsFirst.docs[0].data().eMail;
  } catch (e) {
    return 'error';
  }
};


export function GlobalProvider({ children }) {
  const auth = getAuth();
  const [isLogiran, setIsLogiran] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogiran(true);
    } else {
      setIsLogiran(false);
    }
    setIsLoading(false)
  });

  console.log(isLogiran);

 

  return (
    <GlobalContext.Provider
      value={{
        theme,
        getUserEmail,
        auth,
        isLogiran
      }}
    >
      {isLoading ? <p>Loading...</p> : children}
    </GlobalContext.Provider>
  );
}
