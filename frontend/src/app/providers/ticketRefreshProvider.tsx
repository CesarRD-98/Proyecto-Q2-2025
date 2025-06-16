'use client'
import { useContext, useState } from "react";
import { TicketRefreshContext } from "../contexts/TicketRefreshContext";

export const TicketRefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(prev => !prev);

  return (
    <TicketRefreshContext.Provider value={{ refresh, triggerRefresh }}>
      {children}
    </TicketRefreshContext.Provider>
  );
};

export const useTicketRefresh = () => useContext(TicketRefreshContext);