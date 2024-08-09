import Preload from './_preload'
import './globals.css'

import type { Metadata } from 'next'
import React from 'react'
import AppHeader from '../components/AppHeader'

export const metadata: Metadata = {
    title: 'Helse Arbeidsforhold | NAV',
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang="nb">
            <Preload />
            <body>
                <AppHeader />
                {children}
            </body>
        </html>
    )
}
