import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { GlobalContext } from './contexts/GlobalContext';

function HomePage() {
  const { theme } = useContext(GlobalContext);

  return (
    <Box
      sx={{
        marginTop: -3,
        width: '100%',
        height: '30%',
        minHeight: '200px',
        maxHeight: '300px',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box paddingTop={3} style={{ maxWidth: '1000px', margin: 'auto', padding: '20px 20px 0 20px' }}>
        <Typography variant="h3" color={theme.palette.primary.contrastText}>
          <b>Istra quad</b>
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;
