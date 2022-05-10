import React, { useContext, useEffect } from 'react'
import { TureContext } from './contexts/TureContext';

function ZavrseneTurePage() {

  const { getData } = useContext(TureContext);

  useEffect(() => {
    getData();
  },[])

 

  return (
    <div>ZavrseneTurePage</div>
  )
}

export default ZavrseneTurePage;