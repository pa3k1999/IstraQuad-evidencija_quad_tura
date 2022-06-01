import { Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import ConfirmBrisanje from './components/popupProzori/ConfirmBrisanje';
import NoviVodicPopupForma from './components/popupProzori/NoviVodicPopupForma';
import TabWrap from './components/TabWrap';
import VodiciLista from './components/VodiciLista';
import { VodiciContext } from './contexts/VodiciContext';

function VodiciPage() {

  const [isOpenForma, setIsOpenForma] = useState(false);

  return (
    <TabWrap title={<Typography variant="h6">Vodici</Typography>}>
      <VodiciLista/>
      <NoviVodicPopupForma open={isOpenForma} handleSetIsOpenForma={setIsOpenForma} />
    </TabWrap>
  )
}

export default VodiciPage;