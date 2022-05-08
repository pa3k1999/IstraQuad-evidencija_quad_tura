import { Dialog, DialogTitle, Slide, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React, { forwardRef, memo, useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext';

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
      <Box style={{ marginTop: '20px' }}>{children}</Box>
    </Dialog>
  );
}

export default memo(PopupWrap)

