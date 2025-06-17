'use client'
import React, { useContext, useState } from 'react'
import { GetTicketsContext } from '../contexts/getTicketsContext'
import axios from 'axios';
import { API_URL } from '../API/api.url';
import { Ticket } from '../models/ticketModel';
import { AreasType } from '../models/areasModel';

export interface ResponseGetTickets {
    success: boolean
    data?: Ticket[]
    total?: number
    areas?: AreasType[]
}

export default function GetTicketsProvider({ children }: { children: React.ReactNode }) {

    const getTickets = async (params: any): Promise<ResponseGetTickets> => {
        const token = localStorage.getItem('token');
        console.log("Esto viene del inicio: ", params);
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
            })

            const { data, total } = response.data
            return { success: true, data, total, areas: resAreas.data }
        } catch (error) {
            console.error('Error al cargar tickets:', error);
            return { success: false }
        }
    };

    return (
        <GetTicketsContext.Provider value={{ getTickets }}>
            {children}
        </GetTicketsContext.Provider>
    )
}

export const useGetTickets = () => {
    return useContext(GetTicketsContext)
}