import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { blue, grey, orange } from '@mui/material/colors';

function ChipSt({ avatar, num, color }) {
  return (
    <Chip
      avatar={
        <Avatar sx={{ bgcolor: color }} style={{ margin: 0 }}>
          {avatar}
        </Avatar>
      }
      size="small"
      style={{ height: '19px', marginRight: '10px' }}
      label={num}
    />
  );
}

function ListItemSt({ vrijeme, vrijemeIcon, nazivTure, children }) {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Typography variant="subtitle2" gutterBottom component="div" margin={0}>
          {vrijeme}
        </Typography>
      }
    >
      <ListItemButton style={{ padding: '0', paddingLeft: '10px' }}>
        <ListItemIcon>
          <Typography variant="h5" gutterBottom component="div" margin={0}>
            {vrijemeIcon}
          </Typography>
        </ListItemIcon>
        <Stack justifyContent="center" alignItems="flex-start" spacing={0} style={{ paddingBottom: '5px' }}>
          <Typography variant="subtitle1" gutterBottom component="div" margin={0}>
            {nazivTure}
          </Typography>
          <Box>{children}</Box>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}

function TureListaItem() {
  return (
    <List style={{ padding: '0' }} dense={true}>
      <ListItemSt vrijeme="13:45 - 14:45" vrijemeIcon="1H" nazivTure="Tura-0001">
        <ChipSt avatar=" " num="2+1" color={orange[500]} />
        <ChipSt avatar=" " num="3" color={blue[500]} />
      </ListItemSt>
      <Divider />
      <ListItemSt vrijeme="15:25 - 15:55" vrijemeIcon="30m" nazivTure="Tura-0002">
        <ChipSt avatar=" " num="2" color={grey[500]} />
      </ListItemSt>
    </List>
  );
}

export default TureListaItem;
