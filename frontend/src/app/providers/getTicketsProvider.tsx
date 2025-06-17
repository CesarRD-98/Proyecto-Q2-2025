'use client'
import React, { useCallback, useContext, useState } from 'react'
import { GetTicketsContext } from '../contexts/getTicketsContext'
import axios from 'axios';
import { API_URL } from '../API/api.url';
import { Ticket } from '../models/ticketModel';
import { AreasType } from '../models/areasModel';

export interface ResponseGetTickets {
    success: boolean
    data?: Ticket[]
    total?: number
}

export default function GetTicketsProvider({ children }: { children: React.ReactNode }) {
    const [areas, setAreas] = useState<AreasType[]>([])

    const getTickets = useCallback(async (params: any): Promise<ResponseGetTickets> => {
        const token = localStorage.getItem('token');
        const queryParams = { ...params };

        if (params?.all) {
            delete queryParams.page;
            delete queryParams.perPage;
        }
        
        try {
            const response = await axios.get(`${API_URL}/tickets`, {
                headers: { Authorization: `Bearer ${token}` },
                params: queryParams || {}
            });

            const resAreas = await axios.get(`${API_URL}/areas`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setAreas(resAreas.data);

            const { data, total } = response.data;
            return { success: true, data, total };
        } catch (error) {
            console.error('Error al cargar tickets:', error);
            return { success: false };
        }
    }, []);


    return (
        <GetTicketsContext.Provider value={{ getTickets, areas }}>
            {children}
        </GetTicketsContext.Provider>
    )
}

export const useGetTickets = () => {
    return useContext(GetTicketsContext)
}