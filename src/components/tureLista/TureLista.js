import React from 'react';
import TureListaItem from './TureListaItem';
import TureListaSkupItema from './TureListaSkupItema';

function TureLista() {
  return (
    <>
      <TureListaSkupItema> <TureListaItem/> </TureListaSkupItema>
      <TureListaSkupItema> <TureListaItem/> </TureListaSkupItema>
      <TureListaSkupItema> <TureListaItem/> </TureListaSkupItema>
      <TureListaSkupItema> <TureListaItem/> </TureListaSkupItema>
      <TureListaSkupItema> <TureListaItem/> </TureListaSkupItema>
      <TureListaSkupItema> <TureListaItem/> </TureListaSkupItema>
    </>
  );
}

export default React.memo(TureLista);
