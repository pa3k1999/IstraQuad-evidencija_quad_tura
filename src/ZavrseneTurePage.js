import React, { useContext, useEffect } from 'react'
import TureListaTabs from './components/tureLista/TureListaTabs';
import { TureContext } from './contexts/TureContext';

function ZavrseneTurePage() {

  const { getData } = useContext(TureContext);

  useEffect(() => {
    getData();
  },[])

  return (
    <>    
      <TureListaTabs />
    </>
  )
}

export default ZavrseneTurePage;