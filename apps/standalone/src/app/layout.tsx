import Preload from './_preload'
import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Helse Arbeidsforhold | NAV',
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang="nb">
            <Preload />
            <body>{children}</body>
        </html>
    )
}
