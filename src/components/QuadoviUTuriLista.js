import { Avatar, Divider, List, ListItem, ListItemButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo } from 'react'

const ListItemSt = memo(function ListItemSt({ zTura }) {

  return (
    <ListItem disablePadding>
      <ListItemButton style={{ padding: '0'}}>
        <Stack>
          <Stack direction="row" style={{ padding: '5px 10px', backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
            <Avatar sx={{ width: 20, height: 20, bgcolor: 'blue', margin:'2px', marginRight: "5px" }}> </Avatar>
            <Typography style={{ margin: '0', padding: '0'}}>Quad-01</Typography>
          </Stack>
          <Divider/>
          <Box style={{ padding: '0 10px 0 20px'}}>
            <Typography variant="subtitle1">Opis: sd sdfgsdf gsdf gsdfgs dfg sdf gsdgsfgsdfg sdfgsg sdfgsdg sdfgsdfg sdfgsd fgsdfg hjg</Typography>
          </Box>
          </Stack>
        
      </ListItemButton>
    </ListItem>
  );
});

//TODO: sinkoronizacija sa podatcima iz baze

function QuadoviUTuriLista() {
  return (
    <List style={{ padding: '0' }} dense={true}>
      
        <ListItemSt  />
        <Divider style={{borderBottom: '2px solid rgba(0, 0, 0, 0.2)'}}/>
        <ListItemSt  />
        <Divider style={{borderBottom: '2px solid rgba(0, 0, 0, 0.2)'}}/>
        <ListItemSt  />
        <Divider style={{borderBottom: '2px solid rgba(0, 0, 0, 0.2)'}}/>
        <ListItemSt  />
        <Divider style={{borderBottom: '2px solid rgba(0, 0, 0, 0.2)'}}/>
      
    </List>
  );
}

export default QuadoviUTuriLista;