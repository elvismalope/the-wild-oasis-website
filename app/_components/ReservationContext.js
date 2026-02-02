"use client";

import { createContext, useState, useContext } from "react";

const RevervationContext = createContext();

const initialState = { form: undefined, to: undefined };

function RevervationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  function resetRange() {
    setRange(initialState);
  }
  return (
    <RevervationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </RevervationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(RevervationContext);
  if (context === undefined) {
    throw new Errro("Context used outside of reservation provider");
  }
  return context;
}

export { RevervationProvider, useReservation };
