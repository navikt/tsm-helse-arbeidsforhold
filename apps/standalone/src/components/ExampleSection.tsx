import * as R from 'remeda';
import React, { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'
import { auth } from '../auth/auth'
import { getHelsepersonellInfo } from '../helsepersonell/helsepersonell'

async function ExampleSection(): Promise<ReactElement> {
    const session = (await auth())!
    const hprResult = await getHelsepersonellInfo(session.user.hpr)

    return (
        <div className="max-w-prose">
            <Heading level="1" size="medium">
                HelseID Innlogging Test
            </Heading>
            <BodyShort>Du er logget inn som bruker {session?.user?.name}</BodyShort>
            <Heading level="2" size="small">
                Her er andre ting
            </Heading>
            <pre>{JSON.stringify(R.omit(session, ['token']), null, 2)}</pre>
            <Heading level="2" size="small">
                Respons fra HPR
            </Heading>
            <pre>{JSON.stringify(hprResult, null, 2)}</pre>
        </div>
    )
}

export default ExampleSection
