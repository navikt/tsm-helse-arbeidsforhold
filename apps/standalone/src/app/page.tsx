import { Card } from '@repo/ui/card'
import { BodyShort, Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { auth } from '../auth/auth'

const API_URL = process.env.NODE_ENV === 'production' ? 'http://helse-arbeidsforhold-api' : 'http://localhost:5000'

export default async function Page(): Promise<ReactElement> {
    const arbeidsforhold = await fetch(`${API_URL}/arbeidsforhold`, {
        headers: { 'Content-Type': 'application/json', 'X-fnr': '12345678918' },
    })
        .then((res) => res.json())
        .catch((e) => console.error(e))

    const session = await auth()

    return (
        <main className="p-8">
            <div className="max-w-prose">
                <Heading level="1" size="medium">
                    HelseID Innlogging Test
                </Heading>
                <BodyShort>Du er logget inn som bruker {session?.user?.name}</BodyShort>
            </div>
            <div className="max-w-prose mt-8">
                <Heading level="2" size="small">
                    Eksempel-API kall
                </Heading>
                {arbeidsforhold.map((it: any) => (
                    <Card
                        key={it.arbeidsgiver.organisasjonsnummer}
                        title={it.arbeidsgiver.navn}
                        detail={it.arbeidsgiver.organisasjonsnummer}
                    >
                        {it.stilling}
                    </Card>
                ))}
            </div>
        </main>
    )
}
