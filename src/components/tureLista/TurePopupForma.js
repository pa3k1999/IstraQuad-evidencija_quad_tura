import React, { useContext } from 'react';
import useTrueFalse from '../../hooks/useTrueFalse'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function TurePopupForma({open, setOpenFalse}) {
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={setOpenFalse}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            llloooll
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={setOpenFalse}>Cancel</Button>
          <Button onClick={setOpenFalse}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TurePopupForma;