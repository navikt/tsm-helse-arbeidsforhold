import React, { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react'
import { Card } from '@repo/ui/card'
import { getArbeidsforhold } from '../arbeidsforhold/arbeidsforhold'

async function ExampleData(): Promise<ReactElement> {
    const arbeidsforholdResponse = await getArbeidsforhold()

    return (
        <div className="max-w-prose mt-8">
            <Heading level="2" size="small">
                Eksempel-API kall
            </Heading>
            {arbeidsforholdResponse.ok ? (
                arbeidsforholdResponse.arbeidsforhold.map((it: any) => (
                    <Card
                        key={it.arbeidsgiver.organisasjonsnummer}
                        title={it.arbeidsgiver.navn}
                        detail={it.arbeidsgiver.organisasjonsnummer}
                    >
                        {it.stilling}
                    </Card>
                ))
            ) : (
                <p>{arbeidsforholdResponse.error}</p>
            )}
        </div>
    )
}

export default ExampleData
