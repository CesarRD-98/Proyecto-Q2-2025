import { createContext } from "react";
import { User } from "../models/userModel";

export const LoginContext = createContext({
    token: {} as string,
    user: {} as User | null,
    authUser: async (email: string, password: string) => ({
        success: false,
        message: '',
        status: 400,
        role: null
    })
})