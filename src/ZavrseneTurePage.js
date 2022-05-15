import { Button, Typography } from '@mui/material';
import React, { memo, useContext, useEffect, useState } from 'react';
import DropDownWrap from './components/DropDownWrap';
import DetaljiZavrseneTurePopup from './components/popupProzori/DetaljiZavrseneTurePopup';
import NovaZTuraPopupForma from './components/popupProzori/NovaZTuraPopupForma';
import TabWrap from './components/TabWrap';
import ZavrseneTureLista from './components/ZavrseneTureLista';
import { TureContext } from './contexts/TureContext';

function ZavrseneTurePage() {
  const { handleGetData, zTure } = useContext(TureContext);
  const [ isDetaljiOpen, setIsDetaljiOpen ] = useState(false);

  const handleOpenDetalji = () => {
    setIsDetaljiOpen(true);
  }
  const handleCloseDetalji = () => {
    setIsDetaljiOpen(false);
  }

  useEffect(() => {
    handleGetData();
  }, []);

//TODO: dodati popup za dodavanje tura

  return (
    <TabWrap title="Zavrsene ture">
      {zTure.map((zT) => {
        const datum = `${zT.datum.getDate()}.${zT.datum.getMonth()+1}.${zT.datum.getFullYear()}.`;
        return (
          <DropDownWrap
            key={datum}
            titleChildren={<Typography style={{ margin: '0', padding: '0' }}>{datum}</Typography>}
          >
            <ZavrseneTureLista zTure={zT.tureData} handleOpenDetalji={handleOpenDetalji}/>
          </DropDownWrap>
        );
      })}

      <Button onClick={handleGetData}>btn</Button>
      <NovaZTuraPopupForma/>
      <DetaljiZavrseneTurePopup isOpen={isDetaljiOpen} handleClose={handleCloseDetalji}/>
    </TabWrap>
  );
}

export default memo(ZavrseneTurePage);
