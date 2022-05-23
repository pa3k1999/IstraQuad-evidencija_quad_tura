import React, { Fragment, useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  SwipeableDrawer,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import atvIcon from '../slike/atv.svg.js';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { GlobalContext } from '../contexts/GlobalContext.js';
import GroupIcon from '@mui/icons-material/Group';
import adminsUIDs from '../adminsUIDs'

const StyledSwipeableDrawer = styled((props) => <SwipeableDrawer {...props} />)(({ theme }) => ({
  '& div.MuiDrawer-paperAnchorLeft': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function NavBar() {
  const { theme, auth } = useContext(GlobalContext);

  const [isSBOpen, setIsSBOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (location) => {
    navigate(location);
    setIsSBOpen(false);
  };

  const handleOdjava = async() => {
    await auth.signOut()
    navigate('/');
  }

  return (
    <>
        <AppBar sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsSBOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Istra Quad
            </Typography>
           {auth.currentUser ? <Button color="inherit" onClick={handleOdjava}>Odjavite se</Button> : <></>}
          </Toolbar>
        </AppBar>
      
      <StyledSwipeableDrawer
        anchor="left"
        color="primary"
        open={isSBOpen}
        onClose={() => setIsSBOpen(false)}
        onOpen={() => setIsSBOpen(true)}
      >
        <Box width={250} role="presentation">
          <DrawerHeader>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Menu
            </Typography>
            <IconButton onClick={() => setIsSBOpen(false)}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon sx={{ color: 'primary.contrastText' }} />
              ) : (
                <ChevronRightIcon sx={{ color: 'primary.contrastText' }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
          {auth.currentUser && adminsUIDs.includes(auth.currentUser.uid) ? 
          <>
            <ListItem disablePadding> 
              <ListItemButton onClick={() => handleNavigate(`/vrste-quadova`)}>
                <ListItemIcon>
                  <FormatListBulletedIcon sx={{ color: 'primary.contrastText' }} />
                </ListItemIcon>
                <ListItemText primary="Vrste quadova" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate(`/quadovi`)}>
                <ListItemIcon>
                  <SvgIcon sx={{ color: 'primary.contrastText' }}>{atvIcon}</SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Quadovi" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate(`/vodici`)}>
                <ListItemIcon>
                  <GroupIcon sx={{ color: 'primary.contrastText' }}/>
                </ListItemIcon>
                <ListItemText primary="Vodic" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding> 
              <ListItemButton onClick={() => handleNavigate(`/zavrsene-ture`)}>
                <ListItemIcon>
                  <FormatListBulletedIcon sx={{ color: 'primary.contrastText' }} />
                </ListItemIcon>
                <ListItemText primary="zavrsene ture" />
              </ListItemButton>
            </ListItem>
            </> :
            <></>}
          </List>
        </Box>
      </StyledSwipeableDrawer>
    </>
  );
}

export default NavBar;
