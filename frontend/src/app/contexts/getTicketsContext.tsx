'use client'
import { createContext } from "react";
import { ResponseGetTickets } from "../providers/getTicketsProvider";
import { AreasType } from "../models/areasModel";

interface GetTicketsType {
    getTickets: (params: any) => Promise<ResponseGetTickets>
    areas: AreasType[]
}

export const GetTicketsContext = createContext<GetTicketsType>({
    getTickets: async () => ({ success: false }),
    areas: []
})