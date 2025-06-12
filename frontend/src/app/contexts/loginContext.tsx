import { createContext } from "react";
import { LoginType } from "../models/loginContextModel";


export const LoginContext = createContext<LoginType>({
    user: null,
    authUser: async () => ({success: false, message: 'undefine'}),
    logout: () => {}
})