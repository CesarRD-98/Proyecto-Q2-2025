import React from 'react'
import Navbar from '../components/navbar/navbar'
import GetTicketsProvider from '../providers/getTicketsProvider'
import { TicketRefreshProvider } from '../providers/ticketRefreshProvider'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <TicketRefreshProvider>
                <GetTicketsProvider>
                    <Navbar />
                    {children}
                </GetTicketsProvider>
            </TicketRefreshProvider>
        </>
    )
}
