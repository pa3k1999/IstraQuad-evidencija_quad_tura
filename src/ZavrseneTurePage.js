import { Button, Typography } from '@mui/material';
import React, { memo, useContext, useEffect } from 'react';
import DropDownWrap from './components/DropDownWrap';
import DetaljiZavrseneTurePopup from './components/popupProzori/DetaljiZavrseneTurePopup';
import TabWrap from './components/TabWrap';
import ZavrseneTureLista from './components/ZavrseneTureLista';
import { TureContext } from './contexts/TureContext';

function ZavrseneTurePage() {
  const { handleGetData, zTure } = useContext(TureContext);

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
            <ZavrseneTureLista zTure={zT.tureData}/>
          </DropDownWrap>
        );
      })}

      <Button onClick={handleGetData}>btn</Button>
      <DetaljiZavrseneTurePopup/>
    </TabWrap>
  );
}

export default memo(ZavrseneTurePage);
