import { Avatar, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import DropDownWrap from './components/DropDownWrap';
import ConfirmBrisanje from './components/popupProzori/ConfirmBrisanje';
import NoviQuadPopupForma from './components/popupProzori/NoviQuadPopupForma';
import QuadoviLista from './components/QuadoviLista';
import TabWrap from './components/TabWrap';
import { GlobalContext } from './contexts/GlobalContext';
import { QuadoviContext } from './contexts/QuadoviContext';

function QuadoviPage() {
  const [isOpenForma, setIsOpenForma] = useState(false);
  const [isConfirmDOpen, setIsConfirmDOpen] = useState(false);
  const { vrsteQuadova, quadovi } = useContext(GlobalContext);
  const { selectedQuad } = useContext(QuadoviContext);

  return (
    <TabWrap title="Quadovi">
      {vrsteQuadova.map((vq) => {
        const quadoviUListi = quadovi.filter((q) => q.vrstaQuadaId === vq.id);
        if (quadoviUListi.length > 0) {
          return (
            <DropDownWrap
              key={vq.id}
              titleChildren={
                <>
                  <Avatar sx={{ width: 20, height: 20, bgcolor: `${vq.boja}`, margin:'2px', marginRight: "5px" }}> </Avatar>
                  <Typography style={{ margin: '0', padding: '0'}}>{vq.naziv}</Typography>
                </>
              }
            >
              <QuadoviLista
                quadovi={quadoviUListi}
                handleSetIsOpenForma={setIsOpenForma}
                setIsConfirmDOpen={setIsConfirmDOpen}
              />
            </DropDownWrap>
          );
        }
      })}
      <ConfirmBrisanje
        isOpen={isConfirmDOpen}
        handleClose={() => setIsConfirmDOpen(false)}
        dataId={selectedQuad.id}
        dataTipe="quadovi"
      />
      <NoviQuadPopupForma open={isOpenForma} handleSetIsOpenForma={setIsOpenForma} />
    </TabWrap>
  );
}

export default QuadoviPage;
