import { Card } from '@repo/ui/card'
import { Button } from '@navikt/ds-react'
import { ReactElement } from 'react'

export const dynamic = 'force-dynamic'

const API_URL = process.env.NODE_ENV === 'production' ? 'http://helse-arbeidsforhold-api' : 'http://localhost:5000'

export default async function Page(): Promise<ReactElement> {
    const arbeidsforhold = await fetch(`${API_URL}/arbeidsforhold`, {
        headers: { 'Content-Type': 'application/json', 'X-fnr': '12345678910' },
    }).then((res) => res.json())

    return (
        <main>
            <div className="bg-red-500">Hey</div>
            <Card title="Helllo">YEAH</Card>
            <Button>Aksel button!</Button>
            <div>{JSON.stringify(arbeidsforhold)}</div>
        </main>
    )
}
