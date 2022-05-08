import React, { createContext, useState } from 'react';

export const QuadoviContext = createContext();

export function QuadoviProvider({ children }) {

  const [selectedQuad, setSelectedQuad] = useState({id: '', brSasije: '', vrstaQuadaId: ''});

  return <QuadoviContext.Provider value={{ selectedQuad, setSelectedQuad }}>{children}</QuadoviContext.Provider>;
}