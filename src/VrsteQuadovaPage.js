import { Typography } from '@mui/material';
import React, { memo, useContext, useState } from 'react';
import NovaVQuadaPopupForma from './components/popupProzori/NovaVQuadaPopupForma';
import TabWrap from './components/TabWrap';
import VrsteQuadovaLista from './components/VrsteQuadovaLista';
import { GlobalContext } from './contexts/GlobalContext';

function VrsteQuadovaPage() {
  const [isOpenForma, setIsOpenForma] = useState(false);
  const { userClaims } = useContext(GlobalContext);

  return (
    <TabWrap title={<Typography variant="h6">Vrste Quadova</Typography>}>
      <VrsteQuadovaLista handleSetIsOpenForma={setIsOpenForma} />
      {userClaims.admin ? <NovaVQuadaPopupForma open={isOpenForma} handleSetIsOpenForma={setIsOpenForma} /> : <></>}
    </TabWrap>
  );
}

export default memo(VrsteQuadovaPage);
