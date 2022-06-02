import { Divider, ListItem, ListItemButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo } from 'react';

function NapomenaQuadaListItem({ nazivTure, datum, napomena }) {
  return (
    <ListItem disablePadding>
      <ListItemButton style={{ padding: '0' }}>
        <Stack style={{ width: '100%' }}>
          <Stack
            justifyContent="space-between"
            direction="row"
            style={{ padding: '5px 0', backgroundColor: 'rgba(0, 0, 0, 0.05)', width: '100%' }}
          >
            <Typography style={{ margin: '0 10px', padding: '0' }}>{nazivTure}</Typography>
            <Typography style={{ margin: '0 10px', padding: '0' }}>{`${datum.getDate()}.${
              datum.getMonth() + 1
            }.${datum.getFullYear()}`}</Typography>
          </Stack>
          {napomena ? (
            <>
              <Divider />
              <Box style={{ padding: '0 10px 0 20px' }}>
                <Typography variant="subtitle1">Opis: {napomena}</Typography>
              </Box>
            </>
          ) : null}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}

export default memo(NapomenaQuadaListItem);
