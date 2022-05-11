import { Button, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './contexts/GlobalContext';

function ErrorPage() {
  const { theme, getUserEmail } = useContext(GlobalContext);

  const navigate = useNavigate();

  return (
    <Paper elevation={4} style={{ maxWidth: '700px', margin: 'auto', borderRadius: '15px', overflow: 'hidden' }}>
      <Box
        style={{ backgroundColor: theme.palette.primary.main, height: '32px', color: 'white', padding: '10px 20px' }}
      >
        <Typography variant="h6">Error</Typography>
      </Box>
      <Stack alignItems="center" spacing={1} style={{marginTop: '20px'}}>
        <Typography variant="body1">Domeni se nemoze pristupiti!</Typography>
      </Stack>
      <Box style={{ textAlign: 'right', height: '40px', margin: '20px 10px 10px 10px' }}>
        <Button variant="contained" onClick={() => navigate('/')}>
          Natrag
        </Button>
      </Box>
    </Paper>
  );
}

export default ErrorPage;
