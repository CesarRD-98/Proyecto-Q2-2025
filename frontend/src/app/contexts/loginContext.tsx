import { createContext } from "react";

export const LoginContext = createContext({
    token: {} as string | null,
    authUser: async () => {}
})