import { createContext } from "react";

export const TicketRefreshContext = createContext<{
  refresh: boolean;
  triggerRefresh: () => void;
}>({
  refresh: false,
  triggerRefresh: () => {},
});