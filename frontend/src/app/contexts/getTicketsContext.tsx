'use client'
import { createContext } from "react";
import { ResponseGetTickets } from "../providers/getTicketsProvider";

interface GetTicketsType {
    getTickets: (params: any) => Promise<ResponseGetTickets>
}

export const GetTicketsContext = createContext<GetTicketsType>({
    getTickets: async () => ({ success: false })
})