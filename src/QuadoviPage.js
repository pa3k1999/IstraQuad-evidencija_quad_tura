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
  const { selectedQuad, vrsteQuadova, quadovi, handleDeleteeDataQuad } = useContext(QuadoviContext);
  const { userClaims } = useContext(GlobalContext);


  const [isOpenForma, setIsOpenForma] = useState(false);
  const [isConfirmDOpen, setIsConfirmDOpen] = useState(false);

  return (
    <TabWrap title={<Typography variant="h6">Quadovi</Typography>}>
      {vrsteQuadova.map((vq) => {
        const quadoviUListi = quadovi.filter((q) => q.vrstaQuadaId === vq.id);
        if (quadoviUListi.length > 0) {
          return (
            <DropDownWrap
              key={vq.id}
              titleChildren={
                <>
                  <Avatar sx={{ width: 20, height: 20, bgcolor: `${vq.boja}`, margin: '2px', marginRight: '5px' }}>
                    {' '}
                  </Avatar>
                  <Typography style={{ margin: '0', padding: '0' }}>{vq.naziv}</Typography>
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
        text="Brisanjem ove stavke obrisati će se sve duge stavke koje su vezane sa ovom stavkom (zavrsene ture). Jeste li sigurni da želite obristai ovu stavku?"
        isOpen={isConfirmDOpen}
        handleClose={() => setIsConfirmDOpen(false)}
        handleDeleteeData={() => handleDeleteeDataQuad(selectedQuad.id)}
      />
      {userClaims.admin ? <NoviQuadPopupForma open={isOpenForma} handleSetIsOpenForma={setIsOpenForma} /> : <></>}
      
    </TabWrap>
  );
}

export default QuadoviPage;
