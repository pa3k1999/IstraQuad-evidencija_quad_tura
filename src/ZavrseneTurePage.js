import { Button, Typography } from '@mui/material';
import React, { memo, useContext, useEffect } from 'react';
import DropDownWrap from './components/DropDownWrap';
import TabWrap from './components/TabWrap';
import ZavrseneTureLista from './components/ZavrseneTureLista';
import { TureContext } from './contexts/TureContext';

function ZavrseneTurePage() {
  const { handleGetData, zTure, vrsteTura, vodici, vrsteQuadova, quadovi } = useContext(TureContext);

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <TabWrap title="Vodici">
      {zTure.map((zT) => {
        const datum = `${zT.datum.getDate()}.${zT.datum.getMonth()}.${zT.datum.getFullYear()}`;
        return (
          <DropDownWrap
            key={datum}
            titleChildren={<Typography style={{ margin: '0', padding: '0' }}>{datum}</Typography>}
          >
            <ZavrseneTureLista />
          </DropDownWrap>
        );
      })}

      <Button onClick={handleGetData}>btn</Button>
    </TabWrap>
  );
}

export default memo(ZavrseneTurePage);
