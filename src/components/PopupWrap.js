import styled from '@emotion/styled';
import { Dialog, DialogContent, DialogTitle, Slide, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React, { forwardRef, memo, useContext, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext';

const StyledDialogContent = styled((props) => (
  <DialogContent
    {...props}
  />
))(() => ({
  padding: 0,
  paddingTop: '20px',
  '&.MuiDialogContent-root': {
    overflowY:'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopupWrap({ handleClose, open, children, title }) {
  const { theme } = useContext(GlobalContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="sm"
      onClose={handleClose}
      open={open}
    >
      <DialogTitle
        style={{ backgroundColor: `${theme.palette.primary.main}`, color: `${theme.palette.primary.contrastText}` }}
      >
        {title}
      </DialogTitle>
      <StyledDialogContent dividers={true}>{children}</StyledDialogContent>
    </Dialog>
  );
}

export default memo(PopupWrap)

