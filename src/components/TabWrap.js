import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

function TabWrap({title, children}) {
  const { theme } = useContext(GlobalContext);

  return (
    
    <Paper
      elevation={4}
      style={{ maxWidth: '1000px', margin: 'auto', borderRadius: '15px', overflow: 'hidden' }}
    >
      <Box style={{backgroundColor: theme.palette.primary.main, minHeight: '32px', color: 'white', padding: '10px 20px'}}>
        {title}   
      </Box>
      {children}
    </Paper>
    
  );
}

export default memo(TabWrap);
