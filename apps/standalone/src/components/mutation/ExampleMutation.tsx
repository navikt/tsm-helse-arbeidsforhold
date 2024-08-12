import React, { ReactElement } from 'react'
import { Button, Heading } from '@navikt/ds-react'
import { serverActionExample } from './actions'

async function ExampleMutation(): Promise<ReactElement> {
    return (
        <div className="max-w-prose mt-8">
            <Heading level="2" size="small">
                Eksempel mutation
            </Heading>
            <form action={serverActionExample}>
                <Button type="submit">Send mutation</Button>
            </form>
        </div>
    )
}

export default ExampleMutation
