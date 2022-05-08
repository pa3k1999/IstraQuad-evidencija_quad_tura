import React, { createContext, useState } from 'react';

export const VrsteQuadovaContext = createContext();

export function VrsteQuadovaProvider({ children }) {

  const [selectedVrstaQuada, setSelectedVrstaQuada] = useState({id: '', naziv: '', obujamMotora: '', boja: ''});

  return <VrsteQuadovaContext.Provider value={{ selectedVrstaQuada, setSelectedVrstaQuada }}>{children}</VrsteQuadovaContext.Provider>;
}
