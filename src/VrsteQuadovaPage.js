import React, { memo, useState } from 'react';
import NovaVQuadaPopupForma from './components/popupProzori/NovaVQuadaPopupForma';
import TabWrap from './components/TabWrap';
import VrsteQuadovaLista from './components/VrsteQuadovaLista';

function VrsteQuadovaPage() {
  const [isOpenForma, setIsOpenForma] = useState(false);

  return (
    
    <TabWrap title='Vrste Quadova'>
        <VrsteQuadovaLista handleSetIsOpenForma={setIsOpenForma}/>
        <NovaVQuadaPopupForma open={isOpenForma} handleSetIsOpenForma={setIsOpenForma} />
    </TabWrap>
    
  );
}

export default memo(VrsteQuadovaPage);