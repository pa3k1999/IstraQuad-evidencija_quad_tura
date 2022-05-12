import React, { useState } from 'react'
import NoviVodicPopupForma from './components/popupProzori/NoviVodicPopupForma';
import TabWrap from './components/TabWrap';
import VodiciLista from './components/VodiciLista';

function VodiciPage() {

  const [isOpenForma, setIsOpenForma] = useState(false);

  return (
    <TabWrap title='Vodici'>
      <VodiciLista/>
      <NoviVodicPopupForma open={isOpenForma} handleSetIsOpenForma={setIsOpenForma} />
    </TabWrap>
  )
}

export default VodiciPage;