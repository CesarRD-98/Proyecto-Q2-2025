import React from 'react'
import Navbar from '../components/navbar/navbar'
import GetTicketsProvider from '../providers/getTicketsProvider'
import { TicketRefreshProvider } from '../providers/ticketRefreshProvider'
import { Toaster } from 'react-hot-toast'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <TicketRefreshProvider>
                <GetTicketsProvider>
                    <Toaster position='top-right' />
                    <Navbar />
                    {children}
                </GetTicketsProvider>
            </TicketRefreshProvider>
        </>
    )
}
