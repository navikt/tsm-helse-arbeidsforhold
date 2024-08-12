import React, { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'
import { auth } from '../auth/auth'

async function ExampleSection(): Promise<ReactElement> {
    const session = await auth()

    return (
        <div className="max-w-prose">
            <Heading level="1" size="medium">
                HelseID Innlogging Test
            </Heading>
            <BodyShort>Du er logget inn som bruker {session?.user?.name}</BodyShort>
            <Heading level="2" size="small">
                Her er andre ting
            </Heading>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}

export default ExampleSection
