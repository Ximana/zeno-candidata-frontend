"use client";

import { createContext, useContext, useState } from "react";

// Contexto para partilhar o estado da sidebar entre componentes
const SidebarContext = createContext(null);

// Este provider envolve toda a aplicação e guarda o estado aberta/fechada
export function SidebarProvider({ children }) {
  const [aberta, setAberta] = useState(false);

  function abrir() {
    setAberta(true);
  }

  function fechar() {
    setAberta(false);
  }

  function alternar() {
    setAberta((prev) => !prev);
  }

  return (
    <SidebarContext.Provider value={{ aberta, abrir, fechar, alternar }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Hook para usar o contexto qualquer componente
export function useSidebar() {
  const contexto = useContext(SidebarContext);
  if (!contexto) {
    throw new Error("useSidebar deve ser usado dentro do SidebarProvider");
  }
  return contexto;
}
