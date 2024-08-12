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
        </div>
    )
}

export default ExampleSection
