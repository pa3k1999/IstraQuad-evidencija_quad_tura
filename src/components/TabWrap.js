import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo, useContext, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

function TabWrap({title, children}) {
  const { theme } = useContext(GlobalContext);
  const [isOpenForma, setIsOpenForma] = useState(false);

  return (
    
    <Paper
      elevation={4}
      style={{ maxWidth: '700px', margin: 'auto', borderRadius: '15px', overflow: 'hidden' }}
    >
      <Box style={{backgroundColor: theme.palette.primary.main, height: '32px', color: 'white', padding: '10px 20px'}}>
          <Typography variant="h6">
            {title}
          </Typography>   
      </Box>
      {children}
    </Paper>
    
  );
}

export default memo(TabWrap);
